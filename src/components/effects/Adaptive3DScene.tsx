import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useMobilePerformance } from '../../hooks/useMobilePerformance';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import Mobile3DWrapper from '../Mobile3DWrapper';
import { motion } from 'framer-motion';

interface Adaptive3DSceneProps {
  children: React.ReactNode;
  fallbackContent?: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  adaptiveQuality?: boolean;
}

/**
 * Adaptive 3D scene that adjusts quality based on device capabilities
 */
const Adaptive3DScene: React.FC<Adaptive3DSceneProps> = ({
  children,
  fallbackContent,
  className,
  cameraPosition = [0, 0, 5],
  enableControls = true,
  adaptiveQuality = true
}) => {
  const { quality, animationFPS, enable3D } = useMobilePerformance();
  const { isMobile, connectionType } = useDeviceCapabilities();
  const [pixelRatio, setPixelRatio] = useState(1);
  const [shadows, setShadows] = useState(true);
  const frameLoopRef = useRef<'always' | 'demand'>('always');

  // Adjust rendering quality based on performance
  useEffect(() => {
    if (!adaptiveQuality) {
      setPixelRatio(window.devicePixelRatio);
      return;
    }

    switch (quality) {
      case 'low':
        setPixelRatio(0.5);
        setShadows(false);
        frameLoopRef.current = 'demand';
        break;
      case 'medium':
        setPixelRatio(1);
        setShadows(false);
        frameLoopRef.current = 'always';
        break;
      case 'high':
        setPixelRatio(Math.min(window.devicePixelRatio, 2));
        setShadows(true);
        frameLoopRef.current = 'always';
        break;
    }
  }, [quality, adaptiveQuality]);

  // Monitor network changes
  useEffect(() => {
    if (!adaptiveQuality) return;

    const handleConnectionChange = () => {
      // Reduce quality on slow connections
      if (connectionType === '2g' || connectionType === 'slow-2g') {
        setPixelRatio(0.5);
        setShadows(false);
      }
    };

    // @ts-ignore - Network Information API
    if ('connection' in navigator) {
      // @ts-ignore
      navigator.connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        // @ts-ignore
        navigator.connection.removeEventListener('change', handleConnectionChange);
      };
    }
  }, [connectionType, adaptiveQuality]);

  // Don't render 3D on devices that can't handle it
  if (!enable3D) {
    return (
      <Mobile3DWrapper
        fallbackTitle="3D Content"
        fallbackDescription="This 3D visualization requires a more powerful device"
        mobileFallback={fallbackContent}
      >
        {children}
      </Mobile3DWrapper>
    );
  }

  // Render quality indicator for debugging
  const QualityIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-white z-10"
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          quality === 'high' ? 'bg-green-500' : 
          quality === 'medium' ? 'bg-yellow-500' : 
          'bg-red-500'
        }`} />
        <span>Quality: {quality}</span>
        <span>• FPS: {animationFPS}</span>
      </div>
    </motion.div>
  );

  return (
    <Mobile3DWrapper
      mobileFallback={fallbackContent}
      className={className}
    >
      <div className="relative w-full h-full">
        {process.env.NODE_ENV === 'development' && adaptiveQuality && (
          <QualityIndicator />
        )}
        
        <Canvas
          dpr={pixelRatio}
          shadows={shadows}
          frameloop={frameLoopRef.current}
          className={className}
          gl={{
            powerPreference: quality === 'low' ? 'low-power' : 'high-performance',
            antialias: quality !== 'low',
            alpha: true,
            stencil: false,
            depth: true,
            failIfMajorPerformanceCaveat: true
          }}
          style={{ touchAction: 'none' }}
        >
          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={isMobile ? 60 : 75}
          />
          
          {enableControls && (
            <OrbitControls
              enablePan={!isMobile}
              enableZoom={!isMobile}
              enableRotate={true}
              rotateSpeed={isMobile ? 0.5 : 1}
              // Touch-specific settings
              touches={{
                ONE: 1, // ROTATE
                TWO: 2  // DOLLY_PAN
              }}
              enableDamping
              dampingFactor={0.05}
            />
          )}

          {/* Adaptive lighting */}
          <ambientLight intensity={quality === 'low' ? 0.8 : 0.6} />
          {quality !== 'low' && (
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow={shadows}
              shadow-mapSize={quality === 'high' ? 2048 : 1024}
            />
          )}

          {/* Scene content with performance adjustments */}
          <AdaptiveContent quality={quality}>
            {children}
          </AdaptiveContent>
        </Canvas>
      </div>
    </Mobile3DWrapper>
  );
};

/**
 * Wrapper to apply performance optimizations to 3D content
 */
const AdaptiveContent: React.FC<{
  children: React.ReactNode;
  quality: 'low' | 'medium' | 'high';
}> = ({ children, quality }) => {
  // Apply LOD (Level of Detail) based on quality
  React.useEffect(() => {
    // This would be implemented based on specific 3D content
    // For example, reducing polygon count, texture resolution, etc.
  }, [quality]);

  return <>{children}</>;
};

export default Adaptive3DScene;