import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Home, DollarSign, Briefcase, Target, Baby, GraduationCap, Car, Building, MapPin, Info } from 'lucide-react';

interface DemographicData {
  category: string;
  value: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface LocationDemographicsProps {
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

// Bar chart component with interactive elements
const DemographicBarChart = ({ 
  data, 
  locationName 
}: { 
  data: DemographicData[]; 
  locationName: string;
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  return (
    <div className="py-8">
      <div className="mb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2"
        >
          <MapPin className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-white font-semibold">{locationName} Demographics</span>
        </motion.div>
      </div>
      
      <div className="relative h-[300px] w-full mb-12">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((_, i) => (
            <div key={i} className="w-full h-px bg-gray-700/30" />
          ))}
        </div>
        
        {/* Percentage labels */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-xs text-gray-400">
          {[100, 75, 50, 25, 0].map((percent) => (
            <div key={percent} className="flex items-center h-6 -ml-2">
              <span>{percent}%</span>
            </div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-center pl-8">
          <div className="flex items-end justify-center w-full h-full space-x-8 md:space-x-16">
            {data.map((item, index) => {
              // Calculate height percentage based on category
              // This is simplified - normally you'd calculate based on actual values
              const percentValue = index === 0 ? 85 : // Population
                                   index === 1 ? 60 : // Median Age
                                   index === 2 ? 75 : // Median Income
                                   index === 3 ? 65 : // Home Value
                                   index === 4 ? parseFloat(item.value) : 50; // Education has % value
              
              return (
                <div key={index} className="flex flex-col items-center relative group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${percentValue}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                    onHoverStart={() => setHoveredBar(index)}
                    onHoverEnd={() => setHoveredBar(null)}
                    className="w-12 md:w-16 rounded-t-md cursor-pointer relative"
                    style={{ 
                      backgroundColor: `${item.color}40`,
                      borderTop: `3px solid ${item.color}`,
                      boxShadow: hoveredBar === index ? `0 0 15px ${item.color}80` : 'none'
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-t-md"
                      style={{ backgroundColor: item.color }}
                      initial={{ opacity: 0.1 }}
                      animate={{ 
                        opacity: hoveredBar === index ? [0.2, 0.3, 0.2] : 0.1
                      }}
                      transition={{
                        repeat: hoveredBar === index ? Infinity : 0,
                        duration: 1.5
                      }}
                    />
                  </motion.div>
                  
                  {/* Icon above bar */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.5 + index * 0.2,
                      duration: 0.5
                    }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: item.color }}
                    >
                      {React.createElement(item.icon, { size: 20, color: "white" })}
                    </div>
                  </motion.div>
                  
                  {/* Value at top of bar */}
                  <div className="h-8 flex items-center justify-center mt-2">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="text-white font-bold"
                    >
                      {item.value}
                    </motion.span>
                  </div>
                  
                  {/* Category below bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.2 }}
                    className="text-center mt-2"
                  >
                    <div className="text-gray-300 text-sm font-medium">{item.category}</div>
                  </motion.div>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredBar === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-10 w-48 md:w-64 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/20 text-white shadow-xl"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: item.color }}>
                            {React.createElement(item.icon, { size: 14, color: "white" })}
                          </div>
                          <h4 className="font-bold">{item.category}</h4>
                        </div>
                        <div className="font-bold text-lg" style={{ color: item.color }}>{item.value}</div>
                        <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                        
                        {/* Arrow pointing down */}
                        <div 
                          className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black/80"
                          style={{ borderRight: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
  icon: React.ElementType;
  color: string;
  description: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-red-500/20 transition-all relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-start">
        <motion.div 
          className="p-2 rounded-lg mr-3" 
          style={{ backgroundColor: `${color}20` }}
          animate={{ 
            backgroundColor: isHovered ? `${color}30` : `${color}20`,
            scale: isHovered ? 1.05 : 1
          }}
        >
          {React.createElement(icon, { size: 24, color })}
        </motion.div>
        <div>
          <h4 className="text-white font-semibold">{title}</h4>
          <div className="text-2xl font-bold mt-1" style={{ color }}>{value}</div>
          <AnimatePresence>
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-gray-400 mt-2 overflow-hidden"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Info icon for smaller screens */}
      <div className="absolute top-4 right-4 md:hidden">
        <Info size={16} className="text-gray-500" />
      </div>
    </motion.div>
  );
};

// Main component
const OptimizedLocationDemographics: React.FC<LocationDemographicsProps> = ({
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
      value: formattedPopulation,
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
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
    >
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-3xl font-bold text-gradient">
            {locationName} Demographics
          </h2>
          <div className="text-sm text-gray-400">
            Market Research Data
          </div>
        </motion.div>
        
        {/* Bar chart visualization */}
        <DemographicBarChart 
          data={demographicData}
          locationName={locationName}
        />
        
        {/* Additional info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <DemographicCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                description={card.description}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Top industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: "#ef444420" }}>
              <Target size={24} color="#ef4444" />
            </div>
            <h3 className="text-xl font-bold text-white">Top Industries in {locationName}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topIndustries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                className="bg-white/5 rounded-lg p-3 text-center hover:bg-red-500/10 transition-colors"
                whileHover={{ y: -3 }}
              >
                <div className="text-lg font-bold text-white">{industry}</div>
                <div className="text-sm text-gray-400">Industry {index + 1}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Market insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-red-500/10 to-blue-500/10 backdrop-blur-sm border border-red-500/20 rounded-xl p-4"
        >
          <h3 className="text-xl font-bold text-white mb-3">Market Insights</h3>
          <p className="text-gray-300 mb-4">
            Understanding the demographics of {locationName}, {state} provides valuable insights for 
            targeting your digital marketing campaigns and tailoring your business strategies 
            to the local market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-black/20 rounded-lg p-3"
            >
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
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-black/20 rounded-lg p-3"
            >
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OptimizedLocationDemographics;