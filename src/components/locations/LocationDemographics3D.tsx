import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Float, Sky } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Home, DollarSign, Briefcase, Target, Baby, GraduationCap, Car, Building } from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../AnimationErrorBoundary';

interface DemographicData {
  category: string;
  value: number | string;
  percentage?: number;
  icon: React.ElementType; // Using ElementType instead of React.FC for lucide-react icons
  color: string;
  description: string;
}

interface LocationDemographics3DProps {
  locationName: string;
  state: string;
  population: string;
  medianAge?: string;
  medianIncome?: string;
  medianHomeValue?: string;
  employmentRate?: string;
  topIndustries?: string[];
  educationRate?: string;
  householdSize?: string;
  commuteTime?: string;
  additionalInfo?: {
    label: string;
    value: string;
  }[];
}

// Bar chart in 3D space
const DemographicBars = ({ 
  data, 
  hoveredBar, 
  setHoveredBar 
}: { 
  data: DemographicData[]; 
  hoveredBar: number | null;
  setHoveredBar: (index: number | null) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Set up the camera
  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation for better perspective
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0001) * 0.1;
    }
  });
  
  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => 
    typeof item.value === 'number' ? 
      item.value : 
      item.percentage || 0
  ));
  
  // Calculate bar width based on number of bars
  const barWidth = Math.max(0.4, 3 / data.length);
  const spacing = barWidth * 1.5;
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[data.length * spacing + 2, 0.1, 3]} />
        <meshStandardMaterial 
          color="#222222" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Grid lines */}
      <group position={[0, 0, 0]}>
        {[0.25, 0.5, 0.75, 1].map((height, i) => (
          <line key={i}>
            <bufferGeometry>
              <float32BufferAttribute 
                attach="attributes-position" 
                args={[new Float32Array([
                  -data.length * spacing / 2 - 0.5, height * 3, 0,
                  data.length * spacing / 2 + 0.5, height * 3, 0
                ]), 3]} 
              />
            </bufferGeometry>
            <lineBasicMaterial color="#444444" transparent opacity={0.5} />
          </line>
        ))}
      </group>
      
      {/* Data bars */}
      {data.map((item, index) => {
        const normalizedValue = typeof item.value === 'number' ? 
          item.value / maxValue : 
          (item.percentage || 0) / 100;
        
        const barHeight = Math.max(0.1, normalizedValue * 3);
        const barDepth = 0.8;
        const x = (index - (data.length - 1) / 2) * spacing;
        const isHovered = hoveredBar === index;
        
        const color = new THREE.Color(item.color);
        
        return (
          <group 
            key={index} 
            position={[x, barHeight / 2, 0]}
            onPointerOver={() => setHoveredBar(index)}
            onPointerOut={() => setHoveredBar(null)}
          >
            {/* Bar */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[barWidth, barHeight, barDepth]} />
              <meshStandardMaterial 
                color={color} 
                emissive={color}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Icon above bar */}
            <Html position={[0, barHeight + 0.3, 0]} center transform>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'bg-white scale-110' : 'bg-white/80'
                }`}
                style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
              >
                {React.createElement(item.icon, { size: 24, color: item.color })}
              </div>
            </Html>
            
            {/* Label below bar */}
            <Text
              position={[0, -barHeight / 2 - 0.2, 0]}
              color="white"
              fontSize={0.15}
              maxWidth={1.5}
              textAlign="center"
              anchorX="center"
              anchorY="top"
            >
              {item.category}
            </Text>
            
            {/* Value on top of bar */}
            <Text
              position={[0, barHeight / 2 + 0.1, 0]}
              color="white"
              fontSize={0.2}
              fontWeight={700}
              anchorX="center"
              anchorY="bottom"
            >
              {typeof item.value === 'number' ? 
                item.value.toLocaleString() :
                item.value}
            </Text>
            
            {/* Detail tooltip on hover */}
            {isHovered && (
              <Html position={[1, barHeight / 2, 0]} center>
                <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/20 text-white w-60">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: item.color }}>
                      {React.createElement(item.icon, { size: 16, color: "white" })}
                    </div>
                    <h4 className="text-lg font-bold">{item.category}</h4>
                  </div>
                  <div className="font-bold">
                    {typeof item.value === 'number' ? 
                      item.value.toLocaleString() :
                      item.value}
                    {item.percentage && (
                      <span className="text-sm ml-2">({item.percentage}%)</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

// Main scene component
const DemographicsScene = ({ 
  data, 
  locationName 
}: { 
  data: DemographicData[]; 
  locationName: string;
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { camera } = useThree();
  
  // Set camera position
  React.useEffect(() => {
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 1, 0);
  }, [camera]);
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#ffffff" />
      
      {/* Sky background */}
      <Sky sunPosition={[500, 100, -1000]} turbidity={0.5} />
      
      {/* City name */}
      <Float floatIntensity={0.2} speed={2} rotationIntensity={0.2}>
        <Text
          position={[0, 3.5, -1]}
          color="white"
          fontSize={0.5}
          font="/fonts/Inter-Bold.woff"
          anchorX="center"
          anchorY="middle"
        >
          {locationName}
        </Text>
      </Float>
      
      {/* Bar chart */}
      <DemographicBars 
        data={data} 
        hoveredBar={hoveredBar}
        setHoveredBar={setHoveredBar}
      />
      
      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

// Card component for additional data
const DemographicCard = ({ 
  title, 
  value, 
  icon, 
  color,
  description
}: { 
  title: string;
  value: string;
  icon: React.ElementType; // Using ElementType instead of React.FC for lucide-react icons
  color: string;
  description: string;
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
          {React.createElement(Icon, { size: 24, color })}
        </div>
        <div>
          <h4 className="text-white font-semibold">{title}</h4>
          <div className="text-2xl font-bold mt-1" style={{ color }}>{value}</div>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main component
const LocationDemographics3D: React.FC<LocationDemographics3DProps> = ({
  locationName,
  state,
  population,
  medianAge = "38.5",
  medianIncome = "$58,250",
  medianHomeValue = "$325,000",
  employmentRate = "95.5%",
  topIndustries = ["Healthcare", "Retail", "Technology", "Education"],
  educationRate = "32%",
  householdSize = "2.6",
  commuteTime = "26 min",
  additionalInfo = []
}) => {
  // Format population with commas
  const formattedPopulation = parseInt(population).toLocaleString();
  
  // Prepare demographic data for visualization
  const demographicData: DemographicData[] = [
    {
      category: "Population",
      value: parseInt(population),
      icon: Users,
      color: "#ef4444", // Red
      description: `${locationName} has a population of ${formattedPopulation} residents.`
    },
    {
      category: "Median Age",
      value: medianAge,
      icon: Baby,
      color: "#3b82f6", // Blue
      description: `The median age of residents in ${locationName} is ${medianAge} years.`
    },
    {
      category: "Median Income",
      value: medianIncome,
      icon: DollarSign,
      color: "#10b981", // Green
      description: `The median household income in ${locationName} is ${medianIncome} annually.`
    },
    {
      category: "Home Value",
      value: medianHomeValue,
      icon: Home,
      color: "#f59e0b", // Amber
      description: `The median home value in ${locationName} is ${medianHomeValue}.`
    },
    {
      category: "Education",
      value: educationRate,
      percentage: parseInt(educationRate),
      icon: GraduationCap,
      color: "#8b5cf6", // Purple
      description: `${educationRate} of ${locationName} residents have a bachelor's degree or higher.`
    }
  ];
  
  // Additional demographic data for cards
  const cardData = [
    {
      title: "Employment Rate",
      value: employmentRate,
      icon: Briefcase,
      color: "#0ea5e9", // Sky
      description: `${employmentRate} of ${locationName} residents are employed.`
    },
    {
      title: "Household Size",
      value: householdSize,
      icon: Users,
      color: "#ec4899", // Pink
      description: `The average household in ${locationName} has ${householdSize} people.`
    },
    {
      title: "Commute Time",
      value: commuteTime,
      icon: Car,
      color: "#f97316", // Orange
      description: `The average commute time in ${locationName} is ${commuteTime}.`
    },
    {
      title: "Top Industry",
      value: topIndustries[0],
      icon: Building,
      color: "#6366f1", // Indigo
      description: `The leading industry in ${locationName} is ${topIndustries[0]}.`
    }
  ];
  
  // Render the component
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gradient">
            {locationName} Demographics
          </h2>
          <div className="text-sm text-gray-400">
            Market Research Data
          </div>
        </div>
        
        {/* 3D visualization */}
        <div className="h-[400px] w-full mb-8">
          <AnimationErrorBoundary>
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <DemographicsScene 
                data={demographicData} 
                locationName={locationName}
              />
            </Canvas>
          </AnimationErrorBoundary>
        </div>
        
        {/* Additional info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cardData.map((card, index) => (
            <DemographicCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              description={card.description}
            />
          ))}
        </div>
        
        {/* Top industries */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="mr-2">
              {React.createElement(Target, { size: 24, color: "#ef4444" })}
            </div>
            <h3 className="text-xl font-bold text-white">Top Industries in {locationName}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topIndustries.map((industry, index) => (
              <div
                key={industry}
                className="bg-white/5 rounded-lg p-3 text-center"
              >
                <div className="text-lg font-bold text-white">{industry}</div>
                <div className="text-sm text-gray-400">Industry {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Market insights */}
        <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4">
          <h3 className="text-xl font-bold text-white mb-3">Market Insights</h3>
          <p className="text-gray-300 mb-4">
            Understanding the demographics of {locationName}, {state} provides valuable insights for 
            targeting your digital marketing campaigns and tailoring your business strategies 
            to the local market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-lg p-3">
              <h4 className="font-bold text-white mb-2">Business Opportunities</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Target audience with median income of {medianIncome}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Growing {topIndustries[0]} and {topIndustries[1]} sectors
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Highly educated workforce ({educationRate} college graduates)
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <h4 className="font-bold text-white mb-2">Digital Marketing Focus</h4>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Geo-targeted campaigns within {locationName} area
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Demographics-based audience segmentation
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">
                    Industry-specific content marketing
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

export default LocationDemographics3D;