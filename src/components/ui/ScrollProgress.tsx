import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ScrollProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  color?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  height = 4,
  color = '#f97316',
  showPercentage = false,
  className
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scaleX.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
    
    return () => unsubscribe();
  }, [scaleX]);

  return (
    <>
      <motion.div
        className={cn(
          'fixed left-0 right-0 z-50 origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          className
        )}
        style={{
          height: `${height}px`,
          scaleX,
          backgroundColor: color,
          transformOrigin: '0%'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
            filter: 'blur(8px)',
            opacity: 0.5
          }}
        />
      </motion.div>

      {/* Percentage indicator */}
      {showPercentage && percentage > 0 && (
        <motion.div
          className={cn(
            'fixed right-4 z-50 px-3 py-1 rounded-full text-xs font-medium',
            'bg-gray-900/90 backdrop-blur-sm border border-gray-800',
            position === 'top' ? 'top-8' : 'bottom-8'
          )}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          style={{ color }}
        >
          {percentage}%
        </motion.div>
      )}
    </>
  );
};