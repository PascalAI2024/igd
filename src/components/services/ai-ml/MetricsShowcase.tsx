import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface MetricsShowcaseProps {
  title: string;
  description: string;
  metrics: Metric[];
  columns?: 2 | 3 | 4;
  animationDelay?: number;
}

const MetricsShowcase: React.FC<MetricsShowcaseProps> = ({
  title,
  description,
  metrics,
  columns = 3,
  animationDelay = 0.3
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));
  
  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update counts based on progress
      setCounts(metrics.map(metric => 
        Math.round(metric.value * progress)
      ));
      
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [isVisible, metrics]);
  
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
      
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-black/50 to-black/20 border border-white/5"
          >
            {/* Background glow effect */}
            <div 
              className="absolute -inset-1 blur-xl opacity-30" 
              style={{ 
                background: `radial-gradient(circle at center, ${metric.color || 'rgba(255, 0, 0, 0.8)'}, transparent 70%)`,
                transform: 'translate(0, 0)'
              }}
            />
            
            <div className="relative z-10">
              {/* Icon if provided */}
              {metric.icon && (
                <div className="mb-4">{metric.icon}</div>
              )}
              
              {/* Value with animation */}
              <div className="flex items-baseline">
                {metric.prefix && (
                  <span className="text-xl text-gray-300 mr-1">{metric.prefix}</span>
                )}
                <motion.div
                  key={`count-${index}-${isVisible}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: animationDelay + 0.1 * index, duration: 0.3 }}
                  className="text-4xl font-bold"
                  style={{ color: metric.color || '#FF0000' }}
                >
                  {counts[index]}
                </motion.div>
                {metric.suffix && (
                  <span className="text-xl text-gray-300 ml-1">{metric.suffix}</span>
                )}
              </div>
              
              {/* Label */}
              <div className="text-gray-300 mt-2">{metric.label}</div>
              
              {/* Description if provided */}
              {metric.description && (
                <div className="text-sm text-gray-400 mt-2">{metric.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MetricsShowcase;
