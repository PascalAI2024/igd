import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, useTexture } from '@react-three/drei';
import { Users, Filter, Target, Zap, LucideIcon, TrendingUp, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

interface Metric {
  label: string;
  value: number | string;
  rate?: number;
  trend?: string;
}

interface Stage {
  title: string;
  icon: LucideIcon;
  description: string;
  metrics: Metric[];
  color: string;
  details: string[];
}

const stages: Stage[] = [
  {
    title: 'Lead Capture',
    icon: Users,
    description: 'Multi-channel lead acquisition',
    metrics: [
      { label: 'Visitors', value: 10000, trend: '+25%' },
      { label: 'Form Fills', value: 500, trend: '+15%' },
      { label: 'Conversion', value: '5%', rate: 0.05, trend: '+2%' }
    ],
    color: '#22c55e',
    details: [
      'Website Forms',
      'Landing Pages',
      'Social Media',
      'Email Campaigns'
    ]
  },
  {
    title: 'Lead Qualification',
    icon: Filter,
    description: 'Automated lead scoring and filtering',
    metrics: [
      { label: 'Qualified', value: 300, trend: '+20%' },
      { label: 'Score > 80', value: 200, trend: '+18%' },
      { label: 'Quality', value: '60%', rate: 0.60, trend: '+5%' }
    ],
    color: '#3b82f6',
    details: [
      'Behavior Scoring',
      'Demographics',
      'Intent Signals',
      'Engagement Level'
    ]
  },
  {
    title: 'Lead Nurturing',
    icon: Target,
    description: 'Personalized lead nurturing flows',
    metrics: [
      { label: 'Engaged', value: 150, trend: '+30%' },
      { label: 'MQLs', value: 100, trend: '+25%' },
      { label: 'Rate', value: '50%', rate: 0.50, trend: '+8%' }
    ],
    color: '#f59e0b',
    details: [
      'Email Sequences',
      'Content Delivery',
      'Lead Scoring',
      'Engagement Tracking'
    ]
  },
  {
    title: 'Conversion',
    icon: Zap,
    description: 'Converting leads into customers',
    metrics: [
      { label: 'SQLs', value: 75, trend: '+35%' },
      { label: 'Closed', value: 45, trend: '+40%' },
      { label: 'Rate', value: '45%', rate: 0.45, trend: '+12%' }
    ],
    color: '#ef4444',
    details: [
      'Sales Handoff',
      'Deal Closing',
      'Revenue Tracking',
      'Customer Success'
    ]
  }
];

// Particle system for lead flow visualization
interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  stage: number;
  color: string;
  size: number;
  active: boolean;
  lifetime: number;
  maxLifetime: number;
}

// 3D Funnel component
const Funnel = ({ 
  hoveredStage, 
  expandedStage,
  setHoveredStage,
  setExpandedStage
}: { 
  hoveredStage: number | null;
  expandedStage: number | null;
  setHoveredStage: (stage: number | null) => void;
  setExpandedStage: (stage: number | null) => void;
}) => {
  const { camera } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const funnelRef = useRef<THREE.Mesh>(null);
  const stagesRef = useRef<THREE.Group>(null);
  const particles = useRef<Particle[]>([]);
  const geometry = useRef<THREE.BufferGeometry>(null);
  const positionAttribute = useRef<Float32Array>(new Float32Array(1000 * 3));
  const colorAttribute = useRef<Float32Array>(new Float32Array(1000 * 3));
  const sizeAttribute = useRef<Float32Array>(new Float32Array(1000));
  
  // Create the funnel shape
  const funnelShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-4, 2);
    shape.lineTo(4, 2);
    shape.lineTo(2, -2);
    shape.lineTo(-2, -2);
    shape.closePath();
    return shape;
  }, []);

  // Set up initial state
  useEffect(() => {
    camera.position.set(0, 0, 8);
    
    // Initialize particle system
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positionAttribute.current, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colorAttribute.current, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizeAttribute.current, 1));
    
    // Use as non-null assertion to get around TypeScript's readonly protection
    (geometry as { current: THREE.BufferGeometry | null }).current = geo;
    
    if (pointsRef.current && geometry.current) {
      // In TypeScript, we need to be more careful with these assignments
      // This is a safe way to update the geometry
      Object.assign(pointsRef.current, { geometry: geometry.current });
    }
  }, [camera]);
  
  // Light references for animation
  const lightRefs = useRef<THREE.Group[]>([]);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  
  // Set up light refs
  useEffect(() => {
    lightRefs.current = [];
  }, []);
  
  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Add new particles at the top of the funnel
    if (Math.random() < 0.1) {
      const x = (Math.random() - 0.5) * 6;
      const newParticle: Particle = {
        position: new THREE.Vector3(x, 2, Math.random() - 0.5),
        velocity: new THREE.Vector3(0, -0.03 - Math.random() * 0.02, 0),
        stage: 0,
        color: stages[0].color,
        size: 0.05 + Math.random() * 0.05,
        active: true,
        lifetime: 0,
        maxLifetime: 100 + Math.random() * 100
      };
      particles.current.push(newParticle);
    }
    
    // Update particles
    const particlesToKeep: Particle[] = [];
    
    for (let i = 0; i < particles.current.length; i++) {
      const particle = particles.current[i];
      
      // Update position
      particle.position.add(particle.velocity);
      
      // Apply funnel physics - particles move toward center as they fall
      const centerPull = 0.001 * (particle.position.y + 2) / 4;
      particle.velocity.x -= particle.position.x * centerPull;
      
      // Add some randomness to movement
      particle.velocity.x += (Math.random() - 0.5) * 0.002;
      particle.velocity.z += (Math.random() - 0.5) * 0.002;
      
      // Check stage transitions
      const stageTop = 2;
      const stageBottom = -2;
      const stageHeight = stageTop - stageBottom;
      const normalizedY = (particle.position.y - stageBottom) / stageHeight;
      const currentStage = Math.min(3, Math.floor((1 - normalizedY) * 4));
      
      // Apply stage transitions with conversion rates
      if (currentStage > particle.stage) {
        const stageRate = stages[currentStage].metrics.find(m => m.rate)?.rate || 0.5;
        if (Math.random() < stageRate) {
          particle.stage = currentStage;
          particle.color = stages[currentStage].color;
        } else {
          // Remove particles that don't convert
          particle.active = false;
        }
      }
      
      // Track lifetime and remove old particles
      particle.lifetime += 1;
      if (particle.lifetime > particle.maxLifetime || !particle.active) {
        continue; // Skip this particle
      }
      
      // Keep active particles
      particlesToKeep.push(particle);
    }
    
    particles.current = particlesToKeep;
    
    // Update particle attributes
    for (let i = 0; i < particles.current.length && i < 1000; i++) {
      const idx = i * 3;
      const particle = particles.current[i];
      
      // Position
      positionAttribute.current[idx] = particle.position.x;
      positionAttribute.current[idx + 1] = particle.position.y;
      positionAttribute.current[idx + 2] = particle.position.z;
      
      // Color
      const color = new THREE.Color(particle.color);
      colorAttribute.current[idx] = color.r;
      colorAttribute.current[idx + 1] = color.g;
      colorAttribute.current[idx + 2] = color.b;
      
      // Size
      sizeAttribute.current[i] = particle.size;
    }
    
    // Update geometry attributes
    if (geometry.current) {
      geometry.current.attributes.position.needsUpdate = true;
      geometry.current.attributes.color.needsUpdate = true;
      geometry.current.attributes.size.needsUpdate = true;
      geometry.current.setDrawRange(0, particles.current.length);
    }
    
    // Rotate funnel slightly to add visual interest
    if (funnelRef.current) {
      funnelRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
    
    // Animate stage indicators
    if (stagesRef.current) {
      stagesRef.current.children.forEach((child, index) => {
        // Add pulse effect to hovered stage
        if (hoveredStage === index) {
          child.scale.x = 1.1 + Math.sin(time * 5) * 0.05;
          child.scale.y = 1.1 + Math.sin(time * 5) * 0.05;
          child.scale.z = 1.1 + Math.sin(time * 5) * 0.05;
        } else {
          child.scale.x = THREE.MathUtils.lerp(child.scale.x, 1, 0.1);
          child.scale.y = THREE.MathUtils.lerp(child.scale.y, 1, 0.1);
          child.scale.z = THREE.MathUtils.lerp(child.scale.z, 1, 0.1);
        }
      });
    }
    
    // Animate spotlight
    if (spotlightRef.current) {
      // Animate spotlight intensity
      spotlightRef.current.intensity = 2 + Math.sin(time * 0.5) * 1;
      
      // Animate spotlight position
      spotlightRef.current.position.x = Math.sin(time * 0.2) * 1.5;
      
      // Animate spotlight angle
      spotlightRef.current.angle = 0.5 + Math.sin(time * 0.3) * 0.1;
    }
    
    // Animate the point lights
    lightRefs.current.forEach((lightGroup, index) => {
      if (lightGroup) {
        // Get the point light, assuming it's the first child mesh
        const light = lightGroup.children[0] as THREE.PointLight;
        
        if (light) {
          // Custom animation for each light
          const offset = index * 0.5;
          
          // Pulsing intensity
          light.intensity = 1.5 + Math.sin(time * 0.8 + offset) * 0.5;
          
          // Subtle position movement
          lightGroup.position.y = Math.sin(time * 0.5 + offset) * 0.3;
          lightGroup.position.x = THREE.MathUtils.lerp(-4, 4, index / (stages.length - 1)) + Math.sin(time * 0.3 + offset) * 0.2;
          
          // Animate distance 
          light.distance = 5 + Math.sin(time * 0.7 + offset) * 2;
        }
      }
    });
  });
  
  // Create point material with custom shader for better particles
  const pointsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: new THREE.TextureLoader().load('/images/particle.png') }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 1.0);
          gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
          if (gl_FragColor.a < 0.3) discard;
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ff0000" />
      
      {/* Animated lights under funnel */}
      <group position={[0, -3, -1]}>
        {/* Center spotlight */}
        <spotLight 
          ref={spotlightRef}
          position={[0, 0, 2]} 
          angle={0.5} 
          penumbra={0.8}
          intensity={3} 
          color="#ef4444" 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        
        {/* Animated light particles */}
        {stages.map((stage, index) => {
          // Calculate position based on stage
          const t = index / (stages.length - 1);
          const x = THREE.MathUtils.lerp(-4, 4, t);
          
          return (
            <group 
              key={`light-${index}`}
              position={[x, Math.sin(index * 2) * 0.5, 0]}
              ref={(el) => {
                if (el && !lightRefs.current.includes(el)) {
                  lightRefs.current[index] = el;
                }
              }}
            >
              <pointLight
                intensity={1.5}
                color={stage.color}
                distance={5}
                decay={2}
              >
                <mesh>
                  <sphereGeometry args={[0.05, 16, 16]} />
                  <meshBasicMaterial color={stage.color} />
                </mesh>
              </pointLight>
              
              {/* Light ray effect */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <coneGeometry args={[0.5, 1, 16, 1, true]} />
                <meshBasicMaterial 
                  color={stage.color} 
                  transparent={true} 
                  opacity={0.15} 
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}

        {/* Add volumetric light beams */}
        <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[3, 0.5, 3, 32, 1, true]} />
            <meshBasicMaterial 
              color="#ef4444" 
              transparent={true} 
              opacity={0.05} 
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>
      
      {/* Floor for light reflection */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial 
          color="#111111"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Funnel shape */}
      <mesh ref={funnelRef} position={[0, 0, 0]} castShadow>
        <extrudeGeometry 
          args={[
            funnelShape, 
            { 
              depth: 0.5, 
              bevelEnabled: true,
              bevelSegments: 2,
              steps: 1,
              bevelSize: 0.1,
              bevelThickness: 0.1
            }
          ]} 
        />
        <meshPhongMaterial 
          color="#111111"
          emissive="#222222"
          specular="#555555"
          shininess={30}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Stage indicators */}
      <group ref={stagesRef}>
        {stages.map((stage, index) => {
          // Calculate position based on stage
          const t = index / (stages.length - 1);
          const x = THREE.MathUtils.lerp(-3, 3, 1 - t);
          const y = THREE.MathUtils.lerp(1.5, -1.5, t);
          
          return (
            <group 
              key={stage.title} 
              position={[x, y, 0.3]}
              onClick={() => setExpandedStage(expandedStage === index ? null : index)}
              onPointerOver={() => setHoveredStage(index)}
              onPointerOut={() => setHoveredStage(null)}
            >
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshPhongMaterial color={stage.color} emissive={stage.color} emissiveIntensity={0.5} />
              </mesh>
              <Text
                position={[0, 0.4, 0]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {stage.title}
              </Text>
            </group>
          );
        })}
      </group>
      
      {/* Particle system */}
      <points ref={pointsRef}>
        <bufferGeometry />
        <primitive object={pointsMaterial} attach="material" />
      </points>
      
      {/* Add subtle controls for interaction */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        rotateSpeed={0.5}
      />
    </>
  );
};

// Fallback UI when 3D rendering fails
const LeadFunnelFallback = () => {
  return (
    <div className="bg-black/30 rounded-lg p-8 backdrop-blur-md border border-white/10">
      <h3 className="text-2xl font-semibold mb-4 text-center">Lead Generation Funnel</h3>
      
      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex items-start">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: stage.color }}
              >
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <stage.icon className="w-5 h-5" />
                {stage.title}
              </h4>
              <p className="text-gray-400 mb-2">{stage.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-2">
                {stage.metrics.map(metric => (
                  <div key={metric.label} className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-lg font-bold text-red-500">{metric.value}</div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                    {metric.trend && (
                      <div className="flex items-center justify-center text-xs">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-green-500">{metric.trend}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Visibility detection hook
const useIsVisible = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

// Main component
const LeadFunnel3D = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);

  return (
    <div className="relative min-h-[600px]" ref={containerRef}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
        >
          {isAnimating ? 'Pause' : 'Resume'} Animation
        </button>
      </div>
      
      {/* Lead Funnel Headline */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gradient mb-2">Lead Generation Funnel</h2>
        <p className="text-lg text-gray-300 italic">
          Watch your leads progress through our optimized funnel
        </p>
      </div>

      {/* 3D Lead Funnel Visualization */}
      <div className="h-[450px] w-full">
        <AnimationErrorBoundary fallback={<LeadFunnelFallback />}>
          {isVisible && (
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} shadows>
              <fog attach="fog" args={['#000000', 5, 15]} />
              <Funnel 
                hoveredStage={hoveredStage} 
                expandedStage={expandedStage}
                setHoveredStage={setHoveredStage}
                setExpandedStage={setExpandedStage}
              />
            </Canvas>
          )}
        </AnimationErrorBoundary>
      </div>

      {/* Metrics */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onHoverStart={() => setHoveredStage(index)}
            onHoverEnd={() => setHoveredStage(null)}
            onClick={() => setExpandedStage(expandedStage === index ? null : index)}
            className="group relative cursor-pointer"
          >
            <motion.div
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300
                ${expandedStage === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
              whileHover={{ scale: 1.02 }}
              animate={expandedStage === index ? { y: -10 } : { y: 0 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: expandedStage === index || hoveredStage === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stage.icon className="w-full h-full text-white" />
                    </motion.div>
                    <div className="ml-3">
                      <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
                      <p className="text-sm text-gray-400">{stage.description}</p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      expandedStage === index ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {stage.metrics.map(metric => (
                    <div
                      key={metric.label}
                      className="text-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="text-lg font-bold text-red-500">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                      {metric.trend && (
                        <div className="flex items-center justify-center text-xs">
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                          <span className="text-green-500">{metric.trend}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedStage === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 pt-4"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {stage.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.1 }}
                            className="flex items-center space-x-2 text-gray-400"
                          >
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            <span className="text-sm">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeadFunnel3D;