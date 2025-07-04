import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BackToTopProps {
  threshold?: number;
  position?: 'left' | 'right';
  offset?: number;
  smooth?: boolean;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  position = 'right',
  offset = 20,
  smooth = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      
      setIsVisible(scrollTop > threshold);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-20 z-50 group',
            position === 'right' ? `right-${offset}` : `left-${offset}`,
            className
          )}
          style={{
            [position]: `${offset}px`
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <div className="relative">
            {/* Progress ring */}
            <svg
              className="absolute inset-0 -rotate-90 w-12 h-12"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-700"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-orange-500"
                style={{
                  pathLength: scrollProgress / 100,
                  strokeDasharray: '126',
                  strokeDashoffset: 0
                }}
              />
            </svg>

            {/* Button content */}
            <div className="relative w-12 h-12 bg-gray-900/90 backdrop-blur-sm rounded-full border border-gray-800 flex items-center justify-center group-hover:bg-gray-800/90 transition-colors">
              <ArrowUp className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            {/* Pulse effect on appear */}
            <motion.div
              className="absolute inset-0 rounded-full border border-orange-500/50"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Tooltip */}
          <motion.div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-xs text-gray-300 rounded whitespace-nowrap pointer-events-none',
              position === 'right' ? 'right-full mr-2' : 'left-full ml-2'
            )}
            initial={{ opacity: 0, x: position === 'right' ? 10 : -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            Back to top
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};