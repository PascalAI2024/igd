import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { EnhancedButton } from './EnhancedButton';

interface StickyCTAProps {
  title: string;
  description?: string;
  buttonText: string;
  onButtonClick: () => void;
  position?: 'bottom' | 'top';
  showAfter?: number; // Scroll distance in pixels
  hideOnScroll?: boolean;
  dismissible?: boolean;
  variant?: 'default' | 'minimal' | 'gradient';
  className?: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  position = 'bottom',
  showAfter = 500,
  hideOnScroll = false,
  dismissible = true,
  variant = 'default',
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we should show the CTA
      if (currentScrollY > showAfter && !isDismissed) {
        if (hideOnScroll) {
          // Hide when scrolling down, show when scrolling up
          setIsVisible(currentScrollY < lastScrollY);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter, hideOnScroll, isDismissed, lastScrollY]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const variantStyles = {
    default: 'bg-gray-900/95 backdrop-blur-lg border-gray-800',
    minimal: 'bg-gray-900/90 backdrop-blur-md',
    gradient: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-lg'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed left-0 right-0 z-40 border',
            position === 'bottom' ? 'bottom-0 border-t' : 'top-0 border-b',
            variantStyles[variant],
            className
          )}
          initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <motion.h3
                  className="text-lg md:text-xl font-semibold text-white mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {title}
                </motion.h3>
                {description && (
                  <motion.p
                    className="text-sm md:text-base text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {description}
                  </motion.p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <EnhancedButton
                    onClick={onButtonClick}
                    variant={variant === 'gradient' ? 'gradient' : 'primary'}
                    size="md"
                  >
                    {buttonText}
                  </EnhancedButton>
                </motion.div>

                {dismissible && (
                  <motion.button
                    onClick={handleDismiss}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Dismiss"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Progress indicator for gradient variant */}
          {variant === 'gradient' && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            />
          )}

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};