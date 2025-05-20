import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, extend, Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

// Custom shader material for the interactive particles
const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    vec3 color = vColor;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  attribute vec3 color;
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

class ShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }
}

extend({ ShaderMaterial });

// Define types for our particles
interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  baseColor: [number, number, number];
}

interface ParticlesProps {
  count?: number;
  mouse: React.MutableRefObject<{x: number, y: number} | null>;
}

// Interactive particles component
const Particles: React.FC<ParticlesProps> = ({ count = 300, mouse }) => {
  const mesh = useRef<THREE.Points>(null);
  const particles = useRef<Particle[]>([]);
  const colorArray = useRef<Float32Array | null>(null);
  const speedFactor = useRef<number[]>([]);
  
  // Initialize particles
  useEffect(() => {
    particles.current = Array.from({ length: count }, () => {
      return {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        baseColor: [
          Math.random() * 0.3 + 0.2,  // R (blue dominant)
          Math.random() * 0.3 + 0.5,  // G (with some green)
          Math.random() * 0.5 + 0.5   // B (vibrant)
        ] as [number, number, number]
      };
    });
    
    speedFactor.current = Array.from({ length: count }, () => Math.random() * 0.5 + 0.5);
    
    // Set initial positions
    const positions = new Float32Array(count * 3);
    colorArray.current = new Float32Array(count * 3);
    
    particles.current.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      
      if (colorArray.current) {
        colorArray.current[i * 3] = particle.baseColor[0];
        colorArray.current[i * 3 + 1] = particle.baseColor[1];
        colorArray.current[i * 3 + 2] = particle.baseColor[2];
      }
    });
    
    if (mesh.current) {
      mesh.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      if (colorArray.current) {
        mesh.current.geometry.setAttribute('color', new THREE.BufferAttribute(colorArray.current, 3));
      }
    }
  }, [count]);
  
  // Animation loop
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    
    const time = clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    particles.current.forEach((particle, i) => {
      // Update position based on velocity
      particle.position.x += particle.velocity.x * speedFactor.current[i];
      particle.position.y += particle.velocity.y * speedFactor.current[i];
      particle.position.z += particle.velocity.z * speedFactor.current[i];
      
      // Contain particles within bounds
      if (Math.abs(particle.position.x) > 5) particle.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1;
      
      // Interactive mouse effect
      if (mouse && mouse.current) {
        const mouseInfluence = new THREE.Vector3(
          (mouse.current.x * 10) - particle.position.x,
          (mouse.current.y * 10) - particle.position.y,
          -5 - particle.position.z
        );
        
        mouseInfluence.normalize().multiplyScalar(0.005);
        particle.velocity.add(mouseInfluence);
        
        // Limit velocity
        if (particle.velocity.length() > 0.02) {
          particle.velocity.normalize().multiplyScalar(0.02);
        }
      }
      
      // Apply position to buffer
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });
    
    // Pulse effect based on time
    const colors = mesh.current.geometry.attributes.color.array as Float32Array;
    particles.current.forEach((particle, i) => {
      const pulseFactor = (Math.sin(time * speedFactor.current[i] + i) + 1) * 0.2 + 0.8;
      
      colors[i * 3] = particle.baseColor[0] * pulseFactor;
      colors[i * 3 + 1] = particle.baseColor[1] * pulseFactor;
      colors[i * 3 + 2] = particle.baseColor[2] * pulseFactor;
    });
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

interface FloatingSphereProps {
  position: [number, number, number];
  color: string;
  radius?: number;
  intensity?: number;
}

// Floating spheres
const FloatingSphere: React.FC<FloatingSphereProps> = ({ 
  position, 
  color, 
  radius = 0.3, 
  intensity = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef<{x: number, y: number}>({x: 0, y: 0});
  
  const [spring, api] = useSpring(() => ({
    position: position,
    scale: [1, 1, 1] as [number, number, number],
    config: { mass: 2, tension: 20, friction: 10 }
  }));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Gentle floating motion
    const x = position[0] + Math.sin(t * 0.5) * 0.3;
    const y = position[1] + Math.cos(t * 0.4) * 0.2;
    const z = position[2];
    
    api.start({
      position: [x, y, z] as [number, number, number],
      scale: [
        1 + Math.sin(t) * 0.1,
        1 + Math.cos(t) * 0.1,
        1 + Math.sin(t + 1) * 0.1
      ] as [number, number, number]
    });
  });
  
  return (
    <animated.mesh
      ref={meshRef}
      position={spring.position as any}
      scale={spring.scale as any}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        roughness={0.2}
        metalness={0.8}
      />
    </animated.mesh>
  );
};

// Main scene component
const Scene: React.FC = () => {
  const mouse = useRef<{x: number, y: number} | null>(null);
  
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      
      {/* Interactive particles */}
      <Particles count={350} mouse={mouse} />
      
      {/* Floating elements */}
      <FloatingSphere position={[-2, 1, -2]} color="#4169e1" radius={0.4} intensity={1.5} />
      <FloatingSphere position={[2.5, -1, -1]} color="#41e1c0" radius={0.3} intensity={1.2} />
      <FloatingSphere position={[0, 2, -3]} color="#9941e1" radius={0.5} intensity={1} />
      <FloatingSphere position={[-1.5, -2, -2]} color="#e14183" radius={0.35} intensity={1.3} />
      
      {/* Camera controller (limited to rotation only) */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

// Main exported component
interface InteractiveBackgroundProps {
  height?: string;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ height = '70vh' }) => {
  return (
    <div className="absolute top-0 left-0 w-full z-0" style={{ height, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default InteractiveBackground;