import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { AnimationErrorBoundary } from '../../components/AnimationErrorBoundary';
import * as THREE from 'three';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ThreeDBarChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  height?: number;
  width?: number;
  animationDelay?: number;
}

// Bar component with animation
const Bar = ({
  position,
  size,
  color,
  label,
  value,
  index
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  label: string;
  value: number;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isMountedRef = useRef(true);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  
  // Clean up on unmount
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      // Dispose of shader material
      if (materialRef.current) {
        materialRef.current.dispose();
        materialRef.current = null;
      }
    };
  }, []);

  // Animation on mount
  useFrame((state) => {
    if (!meshRef.current || !isMountedRef.current) return;

    try {
      // Animate height on mount
      const targetHeight = size[1];
      const currentHeight = meshRef.current.scale.y * targetHeight;
      const newHeight = THREE.MathUtils.lerp(currentHeight, targetHeight, 0.05);
      meshRef.current.scale.y = newHeight / targetHeight;
  
      // Adjust position based on scale to keep bottom fixed
      meshRef.current.position.y = position[1] + (newHeight - targetHeight) / 2;
  
      // Add subtle floating animation
      const t = state.clock.getElapsedTime() + index;
      meshRef.current.position.y += Math.sin(t * 2) * 0.01;
  
      // Rotate slightly when hovered
      if (hovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.PI * 0.05,
          0.1
        );
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          0,
          0.1
        );
      }
    } catch (error) {
      console.error("Error in bar animation:", error);
      // Don't throw the error to prevent crashing the animation loop
    }
  });

  // Create gradient material
  const gradientMaterial = useMemo(() => {
    // Dispose old material if it exists
    if (materialRef.current) {
      materialRef.current.dispose();
    }
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color(color) },
        color2: { value: new THREE.Color('#000000') },
        hovered: { value: hovered ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float hovered;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(color1, color2, vUv.y);
          // Add glow when hovered
          color = mix(color, color1 * 1.5, hovered * 0.3);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    materialRef.current = material;
    return material;
  }, [color]);
  
  // Update hovered uniform
  useEffect(() => {
    if (gradientMaterial) {
      gradientMaterial.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
  }, [hovered, gradientMaterial]);

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Bar */}
      <mesh
        ref={meshRef}
        position={position}
        scale={[1, 0.01, 1]} // Start with minimal height for animation
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <boxGeometry args={size} />
        <primitive object={gradientMaterial} attach="material" />
      </mesh>

      {/* Label */}
      <Text
        position={[position[0], position[1] - size[1] / 2 - 0.3, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>

      {/* Value */}
      <Text
        position={[position[0], position[1] + size[1] / 2 + 0.2, position[2]]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        {value.toString()}
      </Text>
    </group>
  );
};

// Grid component
const Grid = ({ size, divisions = 10 }: { size: number, divisions?: number }) => {
  return (
    <gridHelper
      args={[size, divisions, '#444444', '#222222']}
      position={[0, -0.01, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

// Scene setup
const ChartScene = ({ data }: { data: DataPoint[] }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  
  // Set initial camera position and handle cleanup
  React.useEffect(() => {
    isMountedRef.current = true;
    
    // Set camera position
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    return () => {
      isMountedRef.current = false;
      
      // Clean up controls to prevent memory leaks
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [camera]);

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 0.8;
  const spacing = 0.4;
  const totalWidth = data.length * (barWidth + spacing) - spacing;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff0000" />

      <Grid size={10} divisions={10} />

      {/* Render bars */}
      {data.map((point, index) => {
        const normalizedValue = point.value / maxValue * 3; // Scale height
        const xPos = index * (barWidth + spacing) - totalWidth / 2 + barWidth / 2;

        return (
          <Bar
            key={point.label}
            position={[xPos, normalizedValue / 2, 0]}
            size={[barWidth, normalizedValue, barWidth]}
            color={point.color || `hsl(${index * 30}, 70%, 50%)`}
            label={point.label}
            value={point.value}
            index={index}
          />
        );
      })}

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={4}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
const ThreeDBarChart: React.FC<ThreeDBarChartProps> = ({
  title,
  description,
  data,
  height = 400,
  width = '100%',
  animationDelay = 0.3
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-400 mb-6">{description}</p>}

      <div style={{ height, width }} className="relative">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
          <ChartScene data={data} />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default ThreeDBarChart;
