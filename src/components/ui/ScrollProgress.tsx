import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollProgressProps {
  /**
   * Position of the progress bar
   * @default 'top'
   */
  position?: 'top' | 'bottom';
  
  /**
   * Height of the progress bar
   * @default 3
   */
  height?: number;
  
  /**
   * Color of the progress bar (can be gradient)
   * @default 'linear-gradient(to right, #ef4444, #f97316)'
   */
  color?: string;
  
  /**
   * Show percentage text
   * @default false
   */
  showPercentage?: boolean;
  
  /**
   * Z-index of the progress bar
   * @default 50
   */
  zIndex?: number;
  
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Scroll progress indicator that shows reading progress
 * Features:
 * - Smooth spring animation
 * - Gradient support
 * - Optional percentage display
 * - Customizable position and styling
 */
const ScrollProgress: React.FC<ScrollProgressProps> = ({
  position = 'top',
  height = 3,
  color = 'linear-gradient(to right, #ef4444, #f97316)',
  showPercentage = false,
  zIndex = 50,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });
  
  // Transform to percentage
  const scrollPercentage = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100]
  );
  
  // Show/hide based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.01);
    });
    
    return unsubscribe;
  }, [scrollYProgress]);
  
  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={`fixed left-0 right-0 ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
        style={{ 
          height: `${height}px`,
          zIndex,
          transformOrigin: 'left',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background track */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Progress fill */}
        <motion.div
          className="absolute inset-y-0 left-0 right-0"
          style={{
            scaleX,
            background: color,
            transformOrigin: 'left',
          }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-sm"
            style={{ background: color, opacity: 0.5 }}
          />
        </motion.div>
        
        {/* Leading edge highlight */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white/50"
          style={{
            left: '100%',
            scaleX,
            transformOrigin: 'left',
            filter: 'blur(2px)',
          }}
        />
      </motion.div>
      
      {/* Percentage indicator */}
      {showPercentage && (
        <motion.div
          className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium`}
          style={{ zIndex: zIndex + 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span>
            {scrollPercentage.get().toFixed(0)}%
          </motion.span>
        </motion.div>
      )}
    </>
  );
};

export default ScrollProgress;