import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { X } from 'lucide-react';
import EnhancedButton from './EnhancedButton';

interface StickyCTAProps {
  /**
   * CTA text
   */
  text: string;
  
  /**
   * Button text
   */
  buttonText: string;
  
  /**
   * Button click handler
   */
  onButtonClick: () => void;
  
  /**
   * Show after scrolling this many pixels
   * @default 500
   */
  showAfter?: number;
  
  /**
   * Position of the CTA
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
  
  /**
   * Allow dismissing the CTA
   * @default true
   */
  dismissible?: boolean;
  
  /**
   * Background style
   * @default 'glass'
   */
  background?: 'glass' | 'solid' | 'gradient';
  
  /**
   * Additional className
   */
  className?: string;
}

/**
 * Sticky CTA component that appears on scroll
 * Features:
 * - Smooth entrance/exit animations
 * - Dismissible with memory
 * - Multiple background styles
 * - Responsive design
 */
const StickyCTA: React.FC<StickyCTAProps> = ({
  text,
  buttonText,
  onButtonClick,
  showAfter = 500,
  position = 'bottom',
  dismissible = true,
  background = 'glass',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { scrollY } = useScroll();
  
  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem('stickyCTA_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);
  
  // Monitor scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (!isDismissed && latest > showAfter) {
        setIsVisible(true);
      } else if (latest <= showAfter) {
        setIsVisible(false);
      }
    });
    
    return unsubscribe;
  }, [scrollY, showAfter, isDismissed]);
  
  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('stickyCTA_dismissed', 'true');
  };
  
  const backgroundStyles = {
    glass: 'bg-black/80 backdrop-blur-md border-y border-white/10',
    solid: 'bg-gray-900 border-y border-gray-800',
    gradient: 'bg-gradient-to-r from-gray-900 via-red-900/20 to-gray-900',
  };
  
  const positionStyles = {
    top: 'top-0',
    bottom: 'bottom-0',
  };
  
  const slideVariants = {
    hidden: {
      y: position === 'top' ? -100 : 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
      },
    },
    exit: {
      y: position === 'top' ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          className={`
            fixed left-0 right-0 z-40
            ${positionStyles[position]}
            ${backgroundStyles[background]}
            ${className}
          `}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* CTA Content */}
              <motion.div
                className="flex-1 flex items-center gap-4 flex-wrap"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white font-medium">
                  {text}
                </p>
                
                <EnhancedButton
                  onClick={onButtonClick}
                  variant="primary"
                  size="small"
                  className="whitespace-nowrap"
                >
                  {buttonText}
                </EnhancedButton>
              </motion.div>
              
              {/* Dismiss button */}
              {dismissible && (
                <motion.button
                  onClick={handleDismiss}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Dismiss"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-red-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;