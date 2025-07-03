import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';

interface BackToTopProps {
  /**
   * Scroll threshold to show the button (in pixels)
   * @default 300
   */
  threshold?: number;
  
  /**
   * Position of the button
   * @default { bottom: 20, right: 20 }
   */
  position?: {
    bottom?: number;
    right?: number;
    left?: number;
  };
  
  /**
   * Icon variant
   * @default 'arrow'
   */
  icon?: 'arrow' | 'chevron';
  
  /**
   * Show progress ring
   * @default true
   */
  showProgress?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Z-index
   * @default 40
   */
  zIndex?: number;
}

/**
 * Back to top button with smooth scroll and animations
 * Features:
 * - Progress ring showing scroll position
 * - Smooth scroll animation
 * - Magnetic hover effect
 * - Entrance/exit animations
 */
const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  position = { bottom: 20, right: 20 },
  icon = 'arrow',
  showProgress = true,
  className = '',
  zIndex = 40,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setIsVisible(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  // Update progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
    
    return unsubscribe;
  }, [scrollYProgress]);
  
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const Icon = icon === 'arrow' ? ArrowUp : ChevronUp;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`
            fixed z-${zIndex}
            w-12 h-12 md:w-14 md:h-14
            bg-red-600 hover:bg-red-700
            text-white
            rounded-full
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            cursor-pointer
            group
            ${className}
          `}
          style={{
            bottom: `${position.bottom}px`,
            right: position.right ? `${position.right}px` : undefined,
            left: position.left ? `${position.left}px` : undefined,
          }}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Progress ring */}
          {showProgress && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.2"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  pathLength: scrollProgress,
                  strokeDasharray: '283',
                  strokeDashoffset: '0',
                }}
              />
            </svg>
          )}
          
          {/* Icon with hover animation */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </motion.div>
          
          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-600"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: [1, 1.5],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;