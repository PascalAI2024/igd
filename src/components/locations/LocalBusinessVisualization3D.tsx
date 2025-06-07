import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Sky, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Coffee, Utensils, Home, Building, Users, Map, CheckSquare, TrendingUp, Target } from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../AnimationErrorBoundary';

interface BusinessType {
  id: string;
  name: string;
  count: number;
  icon: React.FC<any>;
  color: string;
  description: string;
}

interface LocalBusinessVisualization3DProps {
  locationName: string;
  state: string;
  topBusinessTypes: BusinessType[];
  businessCount: number;
  growthRate: string;
  competitiveIndex: number;
  localSearchVolume: string;
}

// 3D building component
const Building3D = ({ 
  position, 
  height, 
  width, 
  depth, 
  color, 
  isHovered
}: { 
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
  isHovered: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (isHovered) {
        // Float up slightly when hovered
        meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.05 + 0.1;
        
        // Subtle rotation
        meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.05;
      } else {
        // Reset position when not hovered
        meshRef.current.position.y = position[1];
        
        // Subtle idle animation
        meshRef.current.rotation.y = 0;
      }
    }
  });
  
  // No texture used for building facade to avoid missing file issues
  
  // Random window pattern
  const windowPattern = useMemo(() => {
    // Create RGBA data (4 components per pixel)
    const size = 16 * 16;
    const data = new Uint8Array(size * 4);
    for (let i = 0; i < size; i++) {
      const stride = i * 4;
      const value = Math.random() > 0.5 ? 255 : 0;
      data[stride] = value;     // R
      data[stride + 1] = value; // G
      data[stride + 2] = value; // B
      data[stride + 3] = 255;   // A (full opacity)
    }
    
    // Create texture with RGBA format
    const pattern = new THREE.DataTexture(
      data, 16, 16, THREE.RGBAFormat
    );
    pattern.needsUpdate = true;
    return pattern;
  }, []);
  
  return (
    <group position={position}>
      {/* Main building */}
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow
        position={[0, height/2, 0]}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>
      
      {/* Windows (overlay) */}
      <mesh position={[0, height/2, depth/2 + 0.01]}>
        <planeGeometry args={[width - 0.1, height - 0.1]} />
        <meshStandardMaterial 
          alphaMap={windowPattern}
          transparent
          opacity={0.3}
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, height + 0.05, 0]} castShadow>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshStandardMaterial 
          color="#444444" 
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

// Business district visualization
const BusinessDistrict = ({ 
  businessTypes, 
  locationName,
  hoveredBusiness,
  setHoveredBusiness
}: { 
  businessTypes: BusinessType[];
  locationName: string;
  hoveredBusiness: string | null;
  setHoveredBusiness: (id: string | null) => void;
}) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Use a larger reference height to scale buildings
  const maxCount = Math.max(...businessTypes.map(b => b.count));
  const heightFactor = 3 / maxCount;
  
  // Set camera position
  React.useEffect(() => {
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 2, 0);
  }, [camera]);
  
  // Calculate positions in a circular layout
  const positions = useMemo(() => {
    const radius = Math.max(5, businessTypes.length * 0.8);
    return businessTypes.map((_, index) => {
      const angle = (index / businessTypes.length) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      return [x, 0, z] as [number, number, number];
    });
  }, [businessTypes]);
  
  // Animation for rotation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle rotation of the entire scene
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  // No ground texture to avoid missing file issues
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffaa00" />
      
      {/* Sky and clouds */}
      <Sky sunPosition={[100, 10, 100]} turbidity={0.3} />
      <Cloud position={[-10, 15, -10]} speed={0.2} opacity={0.5} />
      <Cloud position={[10, 12, -15]} speed={0.2} opacity={0.3} />
      
      {/* City name */}
      <Text
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        color="#ffffff"
        fontSize={1.5}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        {locationName}
      </Text>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#444444" 
          roughness={0.8}
        />
      </mesh>
      
      {/* Business buildings */}
      <group ref={groupRef}>
        {businessTypes.map((business, index) => {
          const buildingHeight = business.count * heightFactor;
          const buildingWidth = 1.5;
          const buildingDepth = 1.5;
          const position = positions[index];
          
          const isHovered = hoveredBusiness === business.id;
          
          return (
            <group 
              key={business.id}
              onPointerOver={() => setHoveredBusiness(business.id)}
              onPointerOut={() => setHoveredBusiness(null)}
            >
              <Building3D 
                position={position}
                height={buildingHeight}
                width={buildingWidth}
                depth={buildingDepth}
                color={business.color}
                isHovered={isHovered}
              />
              
              {/* Business icon */}
              <Html position={[position[0], buildingHeight + 1, position[2]]} center>
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'bg-white scale-125' : 'bg-white/80'
                  }`}
                  style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
                >
                  {React.createElement(business.icon, { className: "w-6 h-6", style: { color: business.color } })}
                </div>
              </Html>
              
              {/* Business name */}
              <Text
                position={[position[0], buildingHeight + 0.4, position[2]]}
                color="white"
                fontSize={0.3}
                maxWidth={2}
                textAlign="center"
                anchorX="center"
                anchorY="bottom"
              >
                {business.name}
              </Text>
              
              {/* Count on building */}
              <Text
                position={[position[0], buildingHeight / 2, position[2] + buildingDepth / 2 + 0.01]}
                color="white"
                fontSize={0.4}
                font="/fonts/Inter-Bold.woff"
                anchorX="center"
                anchorY="middle"
              >
                {business.count}
              </Text>
              
              {/* Detail tooltip on hover */}
              {isHovered && (
                <Html position={[position[0] + 2, buildingHeight / 2, position[2]]} center>
                  <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/20 text-white w-60">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: business.color }}>
                        {React.createElement(business.icon, { className: "w-4 h-4 text-white" })}
                      </div>
                      <h4 className="text-lg font-bold">{business.name}</h4>
                    </div>
                    <div className="text-2xl font-bold" style={{ color: business.color }}>
                      {business.count}
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{business.description}</p>
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>
      
      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

// Market opportunity card
const MarketOpportunityCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  color 
}: { 
  title: string;
  value: string | number;
  description: string;
  icon: React.FC;
  color: string;
}) => {
  const Icon = icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-red-500/20 transition-all"
    >
      <div className="flex items-start">
        <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${color}20` }}>
          {React.createElement(Icon as any, { className: "w-6 h-6", style: { color } })}
        </div>
        <div>
          <h4 className="text-white font-semibold">{title}</h4>
          <div className="text-2xl font-bold mt-1" style={{ color }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const LocalBusinessVisualization3D: React.FC<LocalBusinessVisualization3DProps> = ({
  locationName,
  state,
  topBusinessTypes,
  businessCount,
  growthRate,
  competitiveIndex,
  localSearchVolume
}) => {
  const [hoveredBusiness, setHoveredBusiness] = useState<string | null>(null);
  
  // Default business types if none provided
  const defaultBusinessTypes: BusinessType[] = [
    {
      id: 'retail',
      name: 'Retail',
      count: 427,
      icon: ShoppingBag,
      color: '#ef4444', // Red
      description: `Retail businesses make up a significant portion of ${locationName}'s local economy.`
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      count: 312,
      icon: Utensils,
      color: '#f59e0b', // Amber
      description: `${locationName} has a thriving food scene with numerous restaurants.`
    },
    {
      id: 'cafes',
      name: 'Cafes',
      count: 186,
      icon: Coffee,
      color: '#8b5cf6', // Purple
      description: `Coffee shops and cafes are popular gathering spots in ${locationName}.`
    },
    {
      id: 'professional',
      name: 'Professional',
      count: 275,
      icon: Building,
      color: '#3b82f6', // Blue
      description: `Professional services firms provide essential support to ${locationName} businesses.`
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      count: 148,
      icon: Home,
      color: '#10b981', // Green
      description: `Real estate businesses are thriving in the growing ${locationName} market.`
    }
  ];
  
  // Use provided business types or default ones
  const businesses = topBusinessTypes && topBusinessTypes.length > 0 ? 
    topBusinessTypes : defaultBusinessTypes;
  
  // Market opportunity metrics
  const marketOpportunities = [
    {
      title: "Total Businesses",
      value: businessCount || 1348,
      description: `${locationName} has a diverse business ecosystem with growth opportunities.`,
      icon: Building,
      color: "#ef4444" // Red
    },
    {
      title: "Growth Rate",
      value: growthRate || "4.8%",
      description: `Business growth rate in ${locationName} shows a healthy market.`,
      icon: TrendingUp,
      color: "#10b981" // Green
    },
    {
      title: "Local Searches",
      value: localSearchVolume || "28.5K/mo",
      description: `Monthly local search volume for businesses in ${locationName}.`,
      icon: Map,
      color: "#3b82f6" // Blue
    },
    {
      title: "Competition Index",
      value: competitiveIndex || 6.4,
      description: `Competitive index (1-10) indicates moderate competition.`,
      icon: Users,
      color: "#f59e0b" // Amber
    }
  ];
  
  // Business competition rating
  const competitionRating = competitiveIndex || 6.4;
  const competitionLevel = 
    competitionRating < 4 ? "Low" :
    competitionRating < 7 ? "Moderate" : "High";
  const competitionColor = 
    competitionRating < 4 ? "#10b981" :
    competitionRating < 7 ? "#f59e0b" : "#ef4444";
  
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gradient">
            {locationName} Business Landscape
          </h2>
          <div className="text-sm text-gray-400">
            Local Business Analysis
          </div>
        </div>
        
        {/* 3D visualization */}
        <div className="h-[400px] w-full mb-8">
          <AnimationErrorBoundary>
            <Canvas shadows camera={{ position: [0, 5, 15], fov: 50 }}>
              <BusinessDistrict 
                businessTypes={businesses}
                locationName={locationName}
                hoveredBusiness={hoveredBusiness}
                setHoveredBusiness={setHoveredBusiness}
              />
            </Canvas>
          </AnimationErrorBoundary>
        </div>
        
        {/* Market opportunity metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {marketOpportunities.map((opportunity) => (
            <MarketOpportunityCard
              key={opportunity.title}
              title={opportunity.title}
              value={opportunity.value}
              description={opportunity.description}
              icon={opportunity.icon}
              color={opportunity.color}
            />
          ))}
        </div>
        
        {/* Competition analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Competition level */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-white">Competition Analysis</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Competition Level:</span>
                <span className="font-bold" style={{ color: competitionColor }}>{competitionLevel}</span>
              </div>
              
              {/* Competition gauge */}
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(competitionRating / 10) * 100}%`,
                    backgroundColor: competitionColor
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckSquare className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  {competitionRating < 5 ? 
                    `Lower competition in ${locationName} means greater opportunities for new businesses to establish market presence.` :
                    competitionRating < 7 ?
                    `Moderate competition in ${locationName} indicates a balanced market with room for well-positioned businesses.` :
                    `High competition in ${locationName} requires strategic differentiation and targeted marketing.`
                  }
                </p>
              </div>
              <div className="flex items-start">
                <CheckSquare className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  Your business can stand out with strategic local SEO and targeted digital marketing tailored to the {locationName} audience.
                </p>
              </div>
            </div>
          </div>
          
          {/* Market insights */}
          <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
            <h3 className="text-xl font-bold text-white mb-4">Digital Marketing Implications</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Map className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Local SEO Focus</h4>
                  <p className="text-sm text-gray-300">
                    With {localSearchVolume || "28.5K"} monthly local searches, optimizing for 
                    {locationName}-specific keywords offers significant visibility opportunities.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Industry Targeting</h4>
                  <p className="text-sm text-gray-300">
                    Focus digital marketing efforts on these top business categories to maximize 
                    relevance and engagement with the {locationName} market.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Growth Opportunity</h4>
                  <p className="text-sm text-gray-300">
                    With a {growthRate || "4.8%"} business growth rate, {locationName} offers 
                    expanding opportunities for businesses with effective digital presence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessVisualization3D;