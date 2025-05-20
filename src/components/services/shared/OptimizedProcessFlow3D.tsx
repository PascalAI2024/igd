import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Float, Trail, PointMaterial } from '@react-three/drei';
import { LucideIcon } from 'lucide-react';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { usePerformance } from '../../../contexts/PerformanceContext';

interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  focus: string;
  details: string[];
  iconUrl?: string; // Optional 3D model URL
}

interface ProcessFlow3DProps {
  steps: ProcessStep[];
  primaryColor?: string;
  secondaryColor?: string;
  title?: string;
  subtitle?: string;
}

// Optimized StepConnector with React.memo for preventing unnecessary re-renders
const StepConnector = React.memo(({ 
  start, 
  end, 
  color,
  active
}: { 
  start: [number, number, number], 
  end: [number, number, number],
  color: string,
  active: boolean 
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { performanceLevel, particleMultiplier } = usePerformance();
  
  // Adjust particle count based on device capabilities
  const particleCount = useMemo(() => 
    Math.floor(20 * particleMultiplier), 
    [particleMultiplier]
  );
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      position: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      size: 0.03 + Math.random() * 0.02,
    }));
  }, [particleCount]);
  
  // Create line geometry - optimized to use useMemo
  const linePoints = useMemo(() => {
    // Use fewer points for curve on low-end devices
    const numPoints = performanceLevel === 'low' ? 10 : 20;
    const points = [];
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const x = THREE.MathUtils.lerp(start[0], end[0], t);
      const y = THREE.MathUtils.lerp(start[1], end[1], t);
      
      // Add a slight curve
      const midY = (start[1] + end[1]) / 2 + 0.3;
      const curveY = THREE.MathUtils.lerp(
        y,
        t < 0.5 ? THREE.MathUtils.lerp(start[1], midY, t * 2) : THREE.MathUtils.lerp(midY, end[1], (t - 0.5) * 2),
        Math.sin(t * Math.PI)
      );
      
      const z = THREE.MathUtils.lerp(start[2], end[2], t);
      points.push(new THREE.Vector3(x, curveY, z));
    }
    return points;
  }, [start, end, performanceLevel]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(linePoints);
  }, [linePoints]);

  const particlePositions = useMemo(() => {
    return new Float32Array(particles.length * 3);
  }, [particles]);
  
  // Geometry attributes for more efficient updates
  const linePositionsAttr = useMemo(() => {
    return new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z]));
  }, [linePoints]);

  useFrame(({ clock }) => {
    if (!active) return;
    
    // Animate line opacity
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
    
    // Update particle positions along the curve
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      // Skip every other particle on low performance devices
      const updateInterval = performanceLevel === 'low' ? 2 : 1;
      
      for (let i = 0; i < particles.length; i += updateInterval) {
        const particle = particles[i];
        
        // Update position along curve
        particle.position += particle.speed;
        if (particle.position > 1) particle.position = 0;
        
        // Get position on curve
        const point = curve.getPointAt(particle.position);
        
        // Update geometry
        const idx = i * 3;
        positions[idx] = point.x;
        positions[idx + 1] = point.y;
        positions[idx + 2] = point.z;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Line path */}
      <primitive object={new THREE.Line()} ref={lineRef as React.RefObject<THREE.Line>}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePoints.length}
            array={linePositionsAttr}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </primitive>
      
      {/* Particles - only render if active and performance allows */}
      {active && performanceLevel !== 'low' && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color={color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for React.memo
  return (
    prevProps.active === nextProps.active &&
    prevProps.color === nextProps.color &&
    prevProps.start[0] === nextProps.start[0] &&
    prevProps.start[1] === nextProps.start[1] &&
    prevProps.start[2] === nextProps.start[2] &&
    prevProps.end[0] === nextProps.end[0] &&
    prevProps.end[1] === nextProps.end[1] &&
    prevProps.end[2] === nextProps.end[2]
  );
});

// Optimize Step component with React.memo
const Step = React.memo(({ 
  step, 
  position, 
  index,
  isHovered,
  isActive,
  isExpanded,
  color,
  totalSteps,
  onHover,
  onClick
}: { 
  step: ProcessStep;
  position: [number, number, number];
  index: number;
  isHovered: boolean;
  isActive: boolean;
  isExpanded: boolean;
  color: string;
  totalSteps: number;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}) => {
  const nodeRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const { performanceLevel, particleMultiplier } = usePerformance();
  
  // Optimize by adjusting particle count based on device capabilities
  const particleCount = useMemo(() => 
    Math.floor(50 * particleMultiplier), 
    [particleMultiplier]
  );
  
  // Particle effects - only create when needed
  const particlesRef = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => {
    return new Float32Array(particleCount * 3);
  }, [particleCount]);
  
  useFrame(({ clock }) => {
    if (!nodeRef.current) return;
    
    // Skip some animations on low-performance devices
    const skipHeavyAnimations = performanceLevel === 'low';
    
    if (!skipHeavyAnimations) {
      // Subtle floating animation
      nodeRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + index) * 0.03;
    }
    
    // Glow effect when hovered - simplified for low-performance devices
    if (glowRef.current) {
      if (isHovered || isActive) {
        if (!skipHeavyAnimations) {
          glowRef.current.scale.set(
            1.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1,
            1.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1,
            1.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1
          );
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
        } else {
          // Simpler animation for low-end devices
          glowRef.current.scale.set(1.2, 1.2, 1.2);
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3;
        }
      } else {
        glowRef.current.scale.x = THREE.MathUtils.lerp(glowRef.current.scale.x, 1, 0.1);
        glowRef.current.scale.y = THREE.MathUtils.lerp(glowRef.current.scale.y, 1, 0.1);
        glowRef.current.scale.z = THREE.MathUtils.lerp(glowRef.current.scale.z, 1, 0.1);
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity, 0.1, 0.1
        );
      }
    }
    
    // Skip particle updates on low-performance devices
    if (skipHeavyAnimations) return;
    
    // Update particles - only when needed
    if (particlesRef.current && (isHovered || isActive)) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 0.2 + Math.sin(time + i * 0.1) * 0.05;
        
        positions[i3] = Math.cos(angle + time * 0.5) * radius;
        positions[i3 + 1] = Math.sin(time * 0.3 + i * 0.1) * 0.1;
        positions[i3 + 2] = Math.sin(angle + time * 0.5) * radius;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  // Always face the camera
  useFrame(() => {
    if (nodeRef.current) {
      nodeRef.current.quaternion.copy(camera.quaternion);
    }
  });
  
  // Cleanup function for useEffect
  useEffect(() => {
    // This effect creates a cleanup function that will run when the component unmounts
    return () => {
      // Dispose geometries and materials to prevent memory leaks
      if (particlesRef.current) {
        const geometry = particlesRef.current.geometry;
        const material = particlesRef.current.material as THREE.Material;
        
        geometry.dispose();
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      }
      
      if (glowRef.current) {
        const geometry = glowRef.current.geometry;
        const material = glowRef.current.material as THREE.Material;
        
        geometry.dispose();
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      }
    };
  }, []);
  
  // Memoize handler functions
  const handlePointerOver = useCallback(() => onHover(index), [onHover, index]);
  const handlePointerOut = useCallback(() => onHover(null), [onHover]);
  const handleClick = useCallback(() => onClick(index), [onClick, index]);
  
  return (
    <group
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Main node */}
      <group ref={nodeRef} scale={isActive ? 1.1 : 1}>
        {/* Background glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide} 
          />
        </mesh>
        
        {/* Main sphere */}
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.5} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>
        
        {/* Step number */}
        <Text
          position={[0, 0, 0.16]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          {index + 1}
        </Text>
        
        {/* Title below node */}
        <Text
          position={[0, -0.25, 0]}
          fontSize={0.08}
          maxWidth={1}
          color="white"
          anchorX="center"
          anchorY="top"
          font="/fonts/Inter-Medium.woff"
        >
          {step.title}
        </Text>
        
        {/* Particles - only render on medium/high performance devices */}
        {(isHovered || isActive) && performanceLevel !== 'low' && (
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particleCount}
                array={particlePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.01}
              color={color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </points>
        )}
        
        {/* Detail panel */}
        {isExpanded && (
          <Html
            position={[0, 0.4, 0]}
            center
            distanceFactor={8}
            className="pointer-events-none"
          >
            <div className="w-64 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-white">
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-gray-300 mb-3">{step.description}</p>
              <div className="mb-2 bg-white/10 px-2 py-1 rounded text-xs inline-block">
                {step.focus}
              </div>
              <ul className="space-y-1 text-sm">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start">
                    <span className="mr-2 text-red-500">•</span>
                    <span className="text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Only re-render when these specific props change
  return (
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.color === nextProps.color &&
    prevProps.position[0] === nextProps.position[0] &&
    prevProps.position[1] === nextProps.position[1] &&
    prevProps.position[2] === nextProps.position[2]
  );
});

// Optimized Process Flow Scene with performance considerations
const ProcessFlowScene = React.memo(({ 
  steps, 
  primaryColor,
  secondaryColor,
  hoveredStep,
  expandedStep,
  setHoveredStep,
  setExpandedStep
}: { 
  steps: ProcessStep[];
  primaryColor: string;
  secondaryColor: string;
  hoveredStep: number | null;
  expandedStep: number | null;
  setHoveredStep: (step: number | null) => void;
  setExpandedStep: (step: number | null) => void;
}) => {
  const { camera } = useThree();
  const { performanceLevel, canUsePostProcessing } = usePerformance();
  
  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    
    // Cleanup function
    return () => {
      // Reset camera when component unmounts
      camera.position.set(0, 0, 0);
      camera.lookAt(0, 0, 0);
    };
  }, [camera]);
  
  // Calculate positions for steps - use useMemo to avoid recalculation
  const stepPositions = useMemo(() => {
    return steps.map((_, index) => {
      const totalSteps = steps.length;
      const angle = (index / totalSteps) * Math.PI * 2;
      const radius = 2;
      return [
        Math.sin(angle) * radius,
        0,
        Math.cos(angle) * radius
      ] as [number, number, number];
    });
  }, [steps]);
  
  // Memoize handlers to prevent unnecessary re-renders
  const handleHover = useCallback(setHoveredStep, [setHoveredStep]);
  const handleExpand = useCallback((index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  }, [expandedStep, setExpandedStep]);
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={primaryColor} />
      
      {/* Background - simplified for low-end devices */}
      {performanceLevel !== 'low' ? (
        <mesh>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial color="black" side={THREE.BackSide} />
        </mesh>
      ) : (
        <color attach="background" args={["#000000"]} />
      )}
      
      {/* Grid - only show on medium and high performance devices */}
      {performanceLevel !== 'low' && (
        <gridHelper 
          args={[20, 20, "#444444", "#222222"]} 
          position={[0, -1, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
        />
      )}
      
      {/* Connectors */}
      {steps.map((_, index) => {
        if (index === steps.length - 1) return null;
        const nextIndex = (index + 1) % steps.length;
        return (
          <StepConnector
            key={`connector-${index}`}
            start={stepPositions[index]}
            end={stepPositions[nextIndex]}
            color={primaryColor}
            active={
              hoveredStep === index || 
              hoveredStep === nextIndex || 
              expandedStep === index || 
              expandedStep === nextIndex
            }
          />
        );
      })}
      
      {/* Steps */}
      {steps.map((step, index) => (
        <Step
          key={`step-${index}`}
          step={step}
          position={stepPositions[index]}
          index={index}
          isHovered={hoveredStep === index}
          isActive={hoveredStep === index || expandedStep === index}
          isExpanded={expandedStep === index}
          color={primaryColor}
          totalSteps={steps.length}
          onHover={handleHover}
          onClick={handleExpand}
        />
      ))}
      
      {/* Post-processing effects - only on high-performance devices */}
      {canUsePostProcessing && (
        <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            kernelSize={KernelSize.LARGE} 
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      )}
    </>
  );
});

// Visibility detection hook with cleanup
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

    // Cleanup function - properly disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isVisible;
};

// Fallback UI for 3D rendering failures
const ProcessFlowFallback = React.memo(({ 
  steps, 
  primaryColor, 
  title, 
  subtitle 
}: { 
  steps: ProcessStep[], 
  primaryColor: string, 
  title: string, 
  subtitle: string 
}) => {
  return (
    <div className="bg-black/30 rounded-lg p-8 backdrop-blur-md border border-white/10">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{subtitle}</p>
      </div>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex items-start">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                {index + 1}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
              <p className="text-gray-400 mb-2">{step.description}</p>
              <div className="text-sm px-2 py-1 rounded bg-white/10 inline-block">{step.focus}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// Main component - optimize with React.memo to prevent unnecessary re-renders
const OptimizedProcessFlow3D: React.FC<ProcessFlow3DProps> = React.memo(({ 
  steps, 
  primaryColor = '#ef4444', 
  secondaryColor = '#3b82f6',
  title = 'Our Process',
  subtitle = 'How we deliver results'
}) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  const { performanceLevel } = usePerformance();
  
  // Set canvas quality based on device capabilities
  const dpr = useMemo(() => {
    switch (performanceLevel) {
      case 'high': return [1, 2];
      case 'medium': return [1, 1.5];
      case 'low': return [0.5, 1];
      default: return [1, 1];
    }
  }, [performanceLevel]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-lg text-gray-400">{subtitle}</p>
      </div>
      
      {/* 3D Process Visualization - only render when visible */}
      <div className="h-[500px] w-full mb-12">
        {isVisible && (
          <Canvas 
            dpr={dpr} 
            camera={{ position: [0, 0, 5], fov: 50 }}
            performance={{ 
              min: performanceLevel === 'low' ? 0.2 : 0.5,
              max: performanceLevel === 'high' ? 1 : 0.8
            }}
          >
            <ProcessFlowScene 
              steps={steps}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              hoveredStep={hoveredStep}
              expandedStep={expandedStep}
              setHoveredStep={setHoveredStep}
              setExpandedStep={setExpandedStep}
            />
          </Canvas>
        )}
      </div>
      
      {/* Responsive card list for smaller screens and SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            onClick={() => setExpandedStep(expandedStep === index ? null : index)}
          >
            <motion.div
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 h-full cursor-pointer
                ${hoveredStep === index ? 'border-red-500/40 bg-white/10' : 'hover:border-red-500/20'}
                ${expandedStep === index ? 'ring-2 ring-red-500/50' : ''}`}
              whileHover={{ scale: 1.02 }}
              animate={expandedStep === index ? { y: -10 } : { y: 0 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="w-full h-full text-white" />
                </motion.div>

                <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  {step.focus}
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <motion.li
                            key={detail}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center text-gray-400"
                          >
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated Background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"
                  style={{
                    opacity: hoveredStep === index ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </div>
            </motion.div>

            {/* Step Number */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              whileHover={{ scale: 1.1 }}
              animate={hoveredStep === index ? { scale: 1.1 } : { scale: 1 }}
            >
              {index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

// Export with displayName for better debugging
OptimizedProcessFlow3D.displayName = 'OptimizedProcessFlow3D';

export default OptimizedProcessFlow3D;