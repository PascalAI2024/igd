import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, MapPin, Star } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../AnimationErrorBoundary';

const rankings = [
  {
    keyword: 'Local Business Services',
    position: 1,
    change: '+5',
    volume: '2.5K',
    icon: Search,
    color: '#ef4444'
  },
  {
    keyword: 'Best Service Provider',
    position: 2,
    change: '+3',
    volume: '1.8K',
    icon: Star,
    color: '#f59e0b'
  },
  {
    keyword: 'Service Near Me',
    position: 1,
    change: '+4',
    volume: '3.2K',
    icon: MapPin,
    color: '#3b82f6'
  },
  {
    keyword: 'Professional Services',
    position: 3,
    change: '+2',
    volume: '2.1K',
    icon: Search,
    color: '#8b5cf6'
  }
];

interface BarProps {
  height: number;
  width: number;
  position: [number, number, number];
  color: string;
  keyword: string;
  rank: number;
  volume: string;
  change: string;
  isActive: boolean;
  onClick?: () => void;
}

// 3D Bar component
const Bar = ({ height, width, position, color, keyword, rank, volume, change, isActive, onClick }: BarProps) => {
  const barRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame(({ clock }) => {
    if (barRef.current) {
      // Subtle floating animation
      barRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.02;
      
      // Scale bar on hover
      if (isActive) {
        barRef.current.scale.y = THREE.MathUtils.lerp(barRef.current.scale.y, 1.05, 0.1);
      } else {
        barRef.current.scale.y = THREE.MathUtils.lerp(barRef.current.scale.y, 1, 0.1);
      }
    }
    
    if (glowRef.current) {
      // Pulse glow effect on hover
      if (isActive) {
        glowRef.current.material.opacity = 0.6 + Math.sin(clock.getElapsedTime() * 4) * 0.2;
      } else {
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0.3, 0.1);
      }
    }
  });

  return (
    <group position={position} ref={barRef}>
      {/* Base plate */}
      <mesh position={[0, -0.025, 0]} receiveShadow>
        <boxGeometry args={[width + 0.1, 0.05, width + 0.1]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Main bar */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7} 
          roughness={0.2} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <boxGeometry args={[width + 0.05, height + 0.05, width + 0.05]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3} 
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Rank indicator */}
      <Html position={[0, height + 0.2, 0]} center>
        <div className={`px-2 py-1 rounded-full bg-white text-xs font-bold shadow-lg ${isActive ? 'scale-110' : 'scale-100'} transition-transform`} style={{ color }}>
          #{rank}
        </div>
      </Html>
      
      {/* Keyword label */}
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="top"
        maxWidth={2}
      >
        {keyword}
      </Text>
      
      {/* Stats tooltip */}
      {isActive && (
        <Html position={[0, height / 2, width/2 + 0.2]} center>
          <div className="bg-black/90 p-3 rounded-xl border border-white/20 text-white text-sm w-40 shadow-xl">
            <div className="font-semibold mb-2">{keyword}</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-gray-400">Position:</div>
              <div>#{rank}</div>
              <div className="text-gray-400">Volume:</div>
              <div>{volume}</div>
              <div className="text-gray-400">Change:</div>
              <div className="text-green-500 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {change}
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Grid and background
const Environment = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      
      {/* Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.3}
          emissive="#222222"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Grid lines */}
      <gridHelper args={[10, 20, '#333333', '#222222']} position={[0, -0.49, 0]} />
    </>
  );
};

interface RankingSceneProps {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

// Scene component
const RankingScene = ({ activeIndex, setActiveIndex }: RankingSceneProps) => {
  const barWidth = 0.4;
  const spacing = 0.8;
  const maxHeight = 2;
  
  return (
    <>
      <Environment />
      
      {rankings.map((ranking, index) => {
        const position = [(index - (rankings.length - 1) / 2) * spacing, 0, 0];
        const height = maxHeight - ((ranking.position - 1) * 0.5);
        
        return (
          <Bar 
            key={ranking.keyword}
            position={position}
            height={height}
            width={barWidth}
            color={ranking.color}
            keyword={ranking.keyword}
            rank={ranking.position}
            volume={ranking.volume}
            change={ranking.change}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          />
        );
      })}
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.8} />
      </EffectComposer>
    </>
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

// Fallback UI for when 3D rendering fails
const RankingVisualizerFallback = () => {
  return (
    <div className="bg-black/30 rounded-lg p-6 backdrop-blur-md border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Ranking Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {rankings.map((ranking, index) => (
          <div 
            key={index} 
            className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center"
            style={{ borderLeftColor: ranking.color, borderLeftWidth: '3px' }}
          >
            <div className="flex justify-between w-full mb-2">
              <div className="flex items-center gap-1">
                <ranking.icon className="w-4 h-4" style={{ color: ranking.color }} />
                <span className="text-sm font-medium">{ranking.keyword}</span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                #{ranking.position}
              </div>
            </div>
            <div className="grid grid-cols-2 w-full text-sm gap-y-1">
              <div className="text-gray-400">Volume:</div>
              <div className="text-right">{ranking.volume}</div>
              <div className="text-gray-400">Change:</div>
              <div className="text-green-500 flex items-center justify-end">
                <TrendingUp className="w-3 h-3 mr-1" />
                {ranking.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-gray-400 text-sm italic">
        3D visualization unavailable. Showing simplified rankings data instead.
      </div>
    </div>
  );
};

// Main component
const RankingVisualizer3D = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  
  return (
    <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10" ref={containerRef}>
      <h3 className="text-xl font-bold text-white mb-6">Ranking Visualization</h3>
      
      {/* 3D Visualization */}
      <div className="h-[350px] mb-8">
        <AnimationErrorBoundary fallback={<RankingVisualizerFallback />}>
          {isVisible && (
            <Canvas camera={{ position: [0, 2, 5], fov: 45 }} shadows>
              <RankingScene activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </Canvas>
          )}
        </AnimationErrorBoundary>
      </div>
      
      {/* Performance Metrics */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {rankings.map((ranking, index) => (
            <motion.div
              key={ranking.keyword}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/5 rounded-xl p-4 backdrop-blur-sm border transition-all duration-300 ${
                activeIndex === index 
                  ? 'border-red-500/40 shadow-lg shadow-red-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <ranking.icon className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-white font-medium">{ranking.keyword}</span>
                </div>
                <div className="bg-white/10 rounded-full px-2 py-0.5 text-xs font-bold text-white">
                  #{ranking.position}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Monthly Volume</span>
                <span className="text-white font-medium">{ranking.volume}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-400">Change</span>
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {ranking.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingVisualizer3D;