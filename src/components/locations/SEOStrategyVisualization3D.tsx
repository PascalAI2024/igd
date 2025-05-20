import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Map, Star, MapPin, Globe, Users, 
  Share2, MessageSquare, TrendingUp, Award, Phone
} from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../AnimationErrorBoundary';

interface Keyword {
  term: string;
  volume: number;
  difficulty: number;
  opportunity: number;
  color: string;
}

interface SEOStrategy {
  id: string;
  title: string;
  icon: React.FC;
  color: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface SEOStrategyVisualization3DProps {
  locationName: string;
  state: string;
  cityKeywords: Keyword[];
  topStrategies: SEOStrategy[];
  keyStatistics?: {
    localSearches?: string;
    googleBusinessViews?: string;
    localRankingFactor?: string;
    competitorCount?: string;
  };
}

// Keyword sphere component
const KeywordSphere = ({ 
  keyword, 
  position,
  isHovered,
  onClick
}: { 
  keyword: Keyword;
  position: [number, number, number];
  isHovered: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Size based on search volume
  const radius = 0.2 + (keyword.volume / 1000) * 0.3;
  
  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.1;
      
      // Rotation
      meshRef.current.rotation.y += 0.005;
      
      // Scale up when hovered
      if (isHovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  });
  
  const color = new THREE.Color(keyword.color);
  
  return (
    <group 
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Keyword sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Keyword label */}
      <Text
        position={[0, radius + 0.2, 0]}
        color="white"
        fontSize={0.15}
        maxWidth={1.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {keyword.term}
      </Text>
      
      {/* Details tooltip when hovered */}
      {isHovered && (
        <Html position={[radius + 0.5, 0, 0]}>
          <div className="bg-black/90 backdrop-blur-md rounded-lg border border-white/20 p-3 text-white w-60">
            <h4 className="text-lg font-bold">{keyword.term}</h4>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div>
                <div className="text-xs text-gray-400">Volume</div>
                <div className="font-bold">{keyword.volume}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Difficulty</div>
                <div className="font-bold">{keyword.difficulty}/10</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Opportunity</div>
                <div className="font-bold text-green-500">{keyword.opportunity}/10</div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// 3D scene for keyword visualization
const KeywordCloud = ({ 
  keywords, 
  locationName,
  hoveredKeyword,
  setHoveredKeyword
}: { 
  keywords: Keyword[];
  locationName: string;
  hoveredKeyword: string | null;
  setHoveredKeyword: (term: string | null) => void;
}) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Set camera position
  React.useEffect(() => {
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Calculate positions for keywords in a cloud formation
  const positions = useMemo(() => {
    return keywords.map((_, i) => {
      // Distribute in a spherical pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2 + Math.random() * 1.5;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      return [x, y, z] as [number, number, number];
    });
  }, [keywords]);
  
  // Animation for the entire keyword cloud
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle rotation of the entire cloud
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ef4444" />
      
      {/* Location name */}
      <Float floatIntensity={0.2} speed={2} rotationIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          color="white"
          fontSize={0.3}
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          {locationName} SEO Keywords
        </Text>
      </Float>
      
      {/* Keyword cloud */}
      <group ref={groupRef}>
        {keywords.map((keyword, index) => (
          <KeywordSphere
            key={keyword.term}
            keyword={keyword}
            position={positions[index]}
            isHovered={hoveredKeyword === keyword.term}
            onClick={() => setHoveredKeyword(hoveredKeyword === keyword.term ? null : keyword.term)}
          />
        ))}
      </group>
      
      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

// Strategy card component
const StrategyCard = ({ 
  strategy,
  isActive,
  onClick
}: { 
  strategy: SEOStrategy;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = strategy.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
        isActive ? 'border-red-500/40 shadow-lg shadow-red-500/10' : 'border-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${strategy.color}20` }}>
          <Icon className="w-6 h-6" style={{ color: strategy.color }} />
        </div>
        <div>
          <h4 className="text-white font-semibold">{strategy.title}</h4>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{strategy.description}</p>
        </div>
      </div>
      
      {/* Expanded metrics */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="grid grid-cols-2 gap-3">
              {strategy.metrics.map((metric) => (
                <div key={metric.label} className="bg-white/5 rounded-lg p-2">
                  <div className="text-xs text-gray-400">{metric.label}</div>
                  <div className="font-bold text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main component
const SEOStrategyVisualization3D: React.FC<SEOStrategyVisualization3DProps> = ({
  locationName,
  state,
  cityKeywords,
  topStrategies,
  keyStatistics = {}
}) => {
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const [activeStrategy, setActiveStrategy] = useState<string | null>(null);
  
  // Default keywords if none provided
  const defaultKeywords: Keyword[] = [
    {
      term: `${locationName} Web Design`,
      volume: 720,
      difficulty: 6,
      opportunity: 8,
      color: '#ef4444' // Red
    },
    {
      term: `${locationName} SEO`,
      volume: 580,
      difficulty: 5,
      opportunity: 9,
      color: '#f59e0b' // Amber
    },
    {
      term: `Digital Marketing ${locationName}`,
      volume: 890,
      difficulty: 7,
      opportunity: 8,
      color: '#3b82f6' // Blue
    },
    {
      term: `Best Web Designers ${locationName}`,
      volume: 320,
      difficulty: 4,
      opportunity: 9,
      color: '#10b981' // Green
    },
    {
      term: `${locationName} Website Development`,
      volume: 480,
      difficulty: 6,
      opportunity: 7,
      color: '#8b5cf6' // Purple
    },
    {
      term: `SEO Company ${locationName}`,
      volume: 390,
      difficulty: 7,
      opportunity: 8,
      color: '#ec4899' // Pink
    },
    {
      term: `${locationName} Local SEO`,
      volume: 290,
      difficulty: 5,
      opportunity: 9,
      color: '#0ea5e9' // Sky blue
    },
    {
      term: `Web Agency ${locationName}`,
      volume: 210,
      difficulty: 4,
      opportunity: 8,
      color: '#f97316' // Orange
    }
  ];
  
  // Default strategies if none provided
  const defaultStrategies: SEOStrategy[] = [
    {
      id: 'gmb',
      title: 'Google Business Profile Optimization',
      icon: MapPin,
      color: '#ef4444', // Red
      description: `Optimize your Google Business Profile to increase visibility for ${locationName} searches.`,
      metrics: [
        { label: 'Impact', value: 'High' },
        { label: 'Difficulty', value: 'Low' },
        { label: 'Time Frame', value: '2-4 weeks' },
        { label: 'Local Boost', value: '+65%' }
      ]
    },
    {
      id: 'local-content',
      title: 'Local Content Strategy',
      icon: Map,
      color: '#3b82f6', // Blue
      description: `Create ${locationName}-specific content that addresses local customer needs.`,
      metrics: [
        { label: 'Impact', value: 'High' },
        { label: 'Difficulty', value: 'Medium' },
        { label: 'Time Frame', value: '1-3 months' },
        { label: 'Engagement', value: '+45%' }
      ]
    },
    {
      id: 'citations',
      title: 'Local Citations Building',
      icon: Globe,
      color: '#10b981', // Green
      description: `Create consistent NAP (Name, Address, Phone) citations across local directories.`,
      metrics: [
        { label: 'Impact', value: 'Medium' },
        { label: 'Difficulty', value: 'Low' },
        { label: 'Time Frame', value: '1-2 months' },
        { label: 'Trust Signals', value: '+80%' }
      ]
    },
    {
      id: 'reviews',
      title: 'Review Management',
      icon: Star,
      color: '#f59e0b', // Amber
      description: `Actively manage and respond to reviews to build local reputation in ${locationName}.`,
      metrics: [
        { label: 'Impact', value: 'High' },
        { label: 'Difficulty', value: 'Low' },
        { label: 'Time Frame', value: 'Ongoing' },
        { label: 'Conversion', value: '+35%' }
      ]
    },
    {
      id: 'local-schema',
      title: 'Local Schema Markup',
      icon: Code,
      color: '#8b5cf6', // Purple
      description: `Implement local business schema markup to help search engines understand your ${locationName} business.`,
      metrics: [
        { label: 'Impact', value: 'Medium' },
        { label: 'Difficulty', value: 'Medium' },
        { label: 'Time Frame', value: '2-4 weeks' },
        { label: 'Rich Results', value: '+120%' }
      ]
    },
    {
      id: 'localized-pages',
      title: 'Localized Service Pages',
      icon: FileText,
      color: '#ec4899', // Pink
      description: `Create dedicated service pages optimized for ${locationName}-specific keywords.`,
      metrics: [
        { label: 'Impact', value: 'High' },
        { label: 'Difficulty', value: 'Medium' },
        { label: 'Time Frame', value: '1-2 months' },
        { label: 'Targeting', value: '+90%' }
      ]
    }
  ];
  
  // Use provided data or defaults
  const keywords = cityKeywords && cityKeywords.length > 0 ? cityKeywords : defaultKeywords;
  const strategies = topStrategies && topStrategies.length > 0 ? topStrategies : defaultStrategies;
  
  // Default statistics
  const stats = {
    localSearches: keyStatistics.localSearches || '15,800/mo',
    googleBusinessViews: keyStatistics.googleBusinessViews || '4,250/mo',
    localRankingFactor: keyStatistics.localRankingFactor || '32%',
    competitorCount: keyStatistics.competitorCount || '45'
  };
  
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gradient">
            {locationName} SEO Strategy
          </h2>
          <div className="text-sm text-gray-400">
            Local Search Optimization
          </div>
        </div>
        
        {/* 3D keyword visualization */}
        <div className="h-[400px] w-full mb-8">
          <AnimationErrorBoundary>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <KeywordCloud 
                keywords={keywords}
                locationName={locationName}
                hoveredKeyword={hoveredKeyword}
                setHoveredKeyword={setHoveredKeyword}
              />
            </Canvas>
          </AnimationErrorBoundary>
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Search className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.localSearches}</div>
            <div className="text-xs text-gray-400">Monthly Local Searches</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.googleBusinessViews}</div>
            <div className="text-xs text-gray-400">Google Business Views</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Map className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.localRankingFactor}</div>
            <div className="text-xs text-gray-400">Local Ranking Factor</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.competitorCount}</div>
            <div className="text-xs text-gray-400">Local Competitors</div>
          </div>
        </div>
        
        {/* Strategy section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Top SEO Strategies for {locationName}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.slice(0, 6).map((strategy) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                isActive={activeStrategy === strategy.id}
                onClick={() => setActiveStrategy(activeStrategy === strategy.id ? null : strategy.id)}
              />
            ))}
          </div>
        </div>
        
        {/* SEO implementation plan */}
        <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
          <h3 className="text-xl font-bold text-white mb-3 flex items-center">
            <Award className="w-5 h-5 text-red-500 mr-2" />
            {locationName} SEO Implementation Plan
          </h3>
          
          <p className="text-gray-300 mb-4">
            Our strategic approach to improve your visibility in {locationName}, {state} searches:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/20 rounded-lg p-3">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2 text-sm font-bold">1</div>
                Research & Foundation
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    {locationName} keyword research & analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Competitor analysis in {locationName}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Complete Google Business Profile setup
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm font-bold">2</div>
                Local SEO Implementation
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Local citations & directory listings
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Location pages with schema markup
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    {locationName}-specific content strategy
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3">
              <h4 className="font-bold text-white mb-2 flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-2 text-sm font-bold">3</div>
                Growth & Management
              </h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Review management & reputation building
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Local backlink acquisition
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Performance tracking & reporting
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing icons declaration
const Code: React.FC<{ className?: string; style?: React.CSSProperties }> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const TrendingUp: React.FC<{ className?: string; style?: React.CSSProperties }> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const FileText: React.FC<{ className?: string; style?: React.CSSProperties }> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export default SEOStrategyVisualization3D;