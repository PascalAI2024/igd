import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, BarChart2 } from 'lucide-react';

interface ResultItem {
  label: string;
  before: number;
  after: number;
  unit: string;
  icon?: React.ReactNode;
}

interface ResultsComparisonProps {
  title: string;
  description: string;
  results: ResultItem[];
  animationDelay?: number;
}

const ResultsComparison: React.FC<ResultsComparisonProps> = ({
  title,
  description,
  results,
  animationDelay = 0.3
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Animate when visible
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const duration = 1500; // 1.5 seconds
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);
  
  // Calculate the maximum improvement percentage for scaling
  const maxImprovement = Math.max(
    ...results.map(item => ((item.after - item.before) / item.before) * 100)
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      onViewportEnter={() => setIsVisible(true)}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-6">
        {results.map((item, index) => {
          const improvement = ((item.after - item.before) / item.before) * 100;
          const normalizedImprovement = improvement / maxImprovement;
          const beforeWidth = 20; // Minimum width percentage
          const afterWidth = beforeWidth + (80 * normalizedImprovement * animationProgress);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {item.icon || <BarChart2 className="w-5 h-5 text-red-500 mr-2" />}
                  <span className="text-white">{item.label}</span>
                </div>
                <div className="text-sm text-green-400">
                  +{Math.round(improvement * animationProgress)}%
                </div>
              </div>
              
              <div className="relative h-12 bg-black/30 rounded-lg overflow-hidden">
                {/* Before Bar */}
                <div 
                  className="absolute left-0 top-0 h-full bg-gray-700 flex items-center justify-end px-2 transition-all duration-500 ease-out"
                  style={{ width: `${beforeWidth}%` }}
                >
                  <span className="text-xs text-white whitespace-nowrap">
                    {item.before}{item.unit}
                  </span>
                </div>
                
                {/* After Bar */}
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-end px-2 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${afterWidth}%`,
                    clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)'
                  }}
                >
                  <span className="text-xs text-white font-bold whitespace-nowrap mr-4">
                    {Math.round(item.before + ((item.after - item.before) * animationProgress))}{item.unit}
                  </span>
                </div>
                
                {/* Arrow */}
                <div className="absolute left-0 top-0 h-full flex items-center transition-all duration-500 ease-out"
                  style={{ left: `${beforeWidth}%` }}>
                  <ArrowRight className="w-5 h-5 text-white/50" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResultsComparison;
