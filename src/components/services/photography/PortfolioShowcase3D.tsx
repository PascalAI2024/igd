import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text, 
  Image as DreiImage, 
  Float, 
  OrbitControls, 
  Html, 
  PerspectiveCamera 
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

// Portfolio items
const portfolioItems = [
  {
    title: 'Product Photography',
    image: '/images/case-studies/erp-platform.webp',
    description: 'High-quality product photography with perfect lighting and composition.',
    tags: ['Products', 'E-commerce', 'Studio']
  },
  {
    title: 'Corporate Portraits',
    image: '/images/testimonials/client1.webp',
    description: 'Professional headshots and team photos for company websites and marketing materials.',
    tags: ['Corporate', 'Team', 'Headshots']
  },
  {
    title: 'Real Estate',
    image: '/images/case-studies/healthcare-platform.webp',
    description: 'Interior and exterior photography that showcases properties at their best.',
    tags: ['Real Estate', 'Architecture', 'Interiors']
  },
  {
    title: 'Food Photography',
    image: '/images/case-studies/new/restaurant.webp',
    description: 'Appetizing food photography for restaurants, menus, and promotional materials.',
    tags: ['Food', 'Restaurants', 'Culinary']
  },
  {
    title: 'Event Coverage',
    image: '/images/case-studies/new/ecommerce.webp',
    description: 'Comprehensive event photography capturing key moments and atmosphere.',
    tags: ['Events', 'Corporate', 'Conferences']
  },
  {
    title: 'Retail & Location',
    image: '/images/case-studies/fintech-platform.webp',
    description: 'Showcase your retail space, offices, or business location.',
    tags: ['Retail', 'Commercial', 'Locations']
  }
];

// Individual 3D portfolio item component
const PortfolioItem = ({
  item,
  position,
  index,
  totalItems,
  isActive,
  onClick
}: {
  item: typeof portfolioItems[0];
  position: [number, number, number];
  index: number;
  totalItems: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Hover state
  const [hovered, setHovered] = useState(false);

  // Animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Floating animation
    const time = clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.1;
    
    // Rotation animation when hovered or active
    if (isActive || hovered) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(time * 0.5) * 0.1,
        0.1
      );
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        0.1
      );
    }
    
    // Scale animation for frame
    if (frameRef.current) {
      if (isActive || hovered) {
        frameRef.current.scale.x = THREE.MathUtils.lerp(frameRef.current.scale.x, 1.05, 0.1);
        frameRef.current.scale.y = THREE.MathUtils.lerp(frameRef.current.scale.y, 1.05, 0.1);
      } else {
        frameRef.current.scale.x = THREE.MathUtils.lerp(frameRef.current.scale.x, 1, 0.1);
        frameRef.current.scale.y = THREE.MathUtils.lerp(frameRef.current.scale.y, 1, 0.1);
      }
    }
  });

  // Make title face the camera
  useFrame(() => {
    if (groupRef.current) {
      // Keep the portfolio item facing the camera
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      
      // Create a rotation that faces the camera
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(
          new THREE.Vector3(),
          direction.negate(),
          new THREE.Vector3(0, 1, 0)
        )
      );
      
      // Apply rotation to group
      groupRef.current.quaternion.slerp(targetQuaternion, 0.1);
    }
  });

  // Calculate aspect ratio for image
  const aspectRatio = 3 / 2; // Typical photography aspect ratio
  const width = 2;
  const height = width / aspectRatio;

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Image frame */}
      <mesh ref={frameRef} position={[0, 0, -0.01]}>
        <planeGeometry args={[width + 0.2, height + 0.2]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.8}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={isActive || hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Image */}
      <DreiImage 
        ref={meshRef as any}
        url={item.image} 
        transparent
        scale={[width, height] as [number, number]}
      />
      
      {/* Title */}
      <Text
        position={[0, -height/2 - 0.3, 0]}
        color="white"
        fontSize={0.2}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {item.title}
      </Text>
      
      {/* Info panel when active or hovered */}
      {(isActive || hovered) && (
        <Html position={[width/2 + 0.5, 0, 0]} center transform>
          <div className="bg-black/80 backdrop-blur-md p-3 rounded border border-white/20 text-white text-sm w-48">
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-xs text-gray-300 mb-2">{item.description}</p>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Particles around the gallery
const GalleryParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  // Generate initial positions for particles
  const positions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 4;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 2; // Centered around gallery
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Subtle motion for particles
      positions[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.01;
      positions[i3 + 1] += Math.cos(time * 0.1 + i * 0.01) * 0.01;
      positions[i3 + 2] += Math.sin(time * 0.1 + i * 0.02) * 0.01;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

// Main 3D gallery scene
const PortfolioGalleryScene = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  
  // Calculate positions for portfolio items in a hexagonal pattern
  const itemPositions = React.useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 4; // Distance from center
    
    // Calculate positions for a hexagonal arrangement
    for (let i = 0; i < portfolioItems.length; i++) {
      const angle = (i / portfolioItems.length) * Math.PI * 2;
      positions.push([
        radius * Math.sin(angle),
        0,
        radius * Math.cos(angle)
      ]);
    }
    
    return positions;
  }, []);
  
  // Rotate camera to focus on selected item
  useFrame(({ clock }) => {
    if (!camRef.current) return;
    
    const time = clock.getElapsedTime();
    
    if (activeItem !== null) {
      // Get the position of the active item
      const targetPosition = itemPositions[activeItem];
      
      // Calculate angle to the active item
      const angle = Math.atan2(targetPosition[0], targetPosition[2]);
      
      // Set camera position along circle but opposite to the item
      camRef.current.position.x = Math.sin(angle + Math.PI) * 6;
      camRef.current.position.z = Math.cos(angle + Math.PI) * 6;
      camRef.current.position.y = 2;
      
      // Look at the item position
      camRef.current.lookAt(
        targetPosition[0],
        targetPosition[1],
        targetPosition[2]
      );
    } else {
      // Auto-rotate camera when no item is selected
      camRef.current.position.x = Math.sin(time * 0.2) * 8;
      camRef.current.position.z = Math.cos(time * 0.2) * 8;
      camRef.current.position.y = 2 + Math.sin(time * 0.1) * 0.5;
      camRef.current.lookAt(0, 0, 0);
    }
  });
  
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera 
        ref={camRef} 
        makeDefault
        position={[0, 2, 8]} 
        fov={50}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ec4899" />
      
      {/* Gallery environment */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[12, 32]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      
      {/* Background */}
      <mesh>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.BackSide} />
      </mesh>
      
      {/* Gallery particles */}
      <GalleryParticles />
      
      {/* Portfolio items */}
      {portfolioItems.map((item, index) => (
        <Float key={index} speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <PortfolioItem
            item={item}
            position={itemPositions[index]}
            index={index}
            totalItems={portfolioItems.length}
            isActive={activeItem === index}
            onClick={() => setActiveItem(activeItem === index ? null : index)}
          />
        </Float>
      ))}
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8}
          kernelSize={KernelSize.LARGE}
        />
        <Vignette darkness={0.5} offset={0.5} />
      </EffectComposer>
      
      {/* Camera controls */}
      {activeItem === null && (
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />
      )}
    </>
  );
};

// Fallback component for when 3D rendering fails
const PortfolioFallback = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
            <div className="relative aspect-[3/2]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
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

// Main exported component
const PortfolioShowcase3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile devices
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="w-full" ref={containerRef}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Our Portfolio</h2>
        <p className="text-lg text-gray-400">Explore our photography work across different industries</p>
      </div>
      
      <div className="h-[600px] w-full mb-12">
        <AnimationErrorBoundary fallback={<PortfolioFallback />}>
          {isVisible && !isMobile && (
            <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
              <PortfolioGalleryScene />
            </Canvas>
          )}
          {(isMobile || !isVisible) && <PortfolioFallback />}
        </AnimationErrorBoundary>
      </div>
    </div>
  );
};

export default PortfolioShowcase3D;