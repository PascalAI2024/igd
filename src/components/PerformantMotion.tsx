import React, { useEffect, useRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PerformantMotionProps extends MotionProps {
  children: React.ReactNode;
  reduceMotionVariant?: any;
  enableGPU?: boolean;
  willChange?: string | 'auto';
}

/**
 * Performance-optimized motion component that:
 * - Respects prefers-reduced-motion
 * - Uses GPU acceleration when appropriate
 * - Implements will-change for better performance
 * - Only animates transform and opacity
 */
export const PerformantMotion: React.FC<PerformantMotionProps> = ({
  children,
  reduceMotionVariant,
  enableGPU = true,
  willChange = 'auto',
  initial,
  animate,
  exit,
  transition,
  style,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);

  // Apply will-change when animation starts
  useEffect(() => {
    if (!elementRef.current || willChange === 'auto') return;

    const element = elementRef.current;
    
    // Set will-change before animation
    element.style.willChange = willChange;

    // Remove will-change after animation completes
    const cleanup = setTimeout(() => {
      element.style.willChange = 'auto';
    }, ((transition as any)?.duration || 0.3) * 1000 + 100);

    return () => {
      clearTimeout(cleanup);
      if (element) {
        element.style.willChange = 'auto';
      }
    };
  }, [willChange, transition]);

  // If user prefers reduced motion, use static or reduced variants
  if (prefersReducedMotion) {
    if (reduceMotionVariant) {
      return (
        <motion.div
          ref={elementRef}
          initial={reduceMotionVariant.initial || false}
          animate={reduceMotionVariant.animate || false}
          exit={reduceMotionVariant.exit || false}
          transition={{ duration: 0 }}
          style={style}
          {...props}
        >
          {children}
        </motion.div>
      );
    }
    
    // Return static element if no reduced variant provided
    return (
      <div ref={elementRef} style={style} {...props}>
        {children}
      </div>
    );
  }

  // Performance-optimized style with GPU acceleration
  const optimizedStyle = {
    ...style,
    ...(enableGPU && {
      transform: 'translateZ(0)', // Force GPU layer
      backfaceVisibility: 'hidden' as const,
      perspective: 1000,
    }),
  };

  return (
    <motion.div
      ref={elementRef}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      style={optimizedStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Animation variants optimized for performance
 */
export const performanceVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  slideUp: {
    initial: { opacity: 0, transform: 'translateY(20px) translateZ(0)' },
    animate: { opacity: 1, transform: 'translateY(0) translateZ(0)' },
    exit: { opacity: 0, transform: 'translateY(-20px) translateZ(0)' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  slideInLeft: {
    initial: { opacity: 0, transform: 'translateX(-20px) translateZ(0)' },
    animate: { opacity: 1, transform: 'translateX(0) translateZ(0)' },
    exit: { opacity: 0, transform: 'translateX(20px) translateZ(0)' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  scale: {
    initial: { opacity: 0, transform: 'scale(0.95) translateZ(0)' },
    animate: { opacity: 1, transform: 'scale(1) translateZ(0)' },
    exit: { opacity: 0, transform: 'scale(0.95) translateZ(0)' },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  // Reduced motion variants
  reduced: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 }
    },
    
    static: {
      initial: false,
      animate: false,
      exit: false
    }
  }
};

/**
 * Hook to get optimized animation props based on device capabilities
 */
export const useOptimizedAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const getAnimationProps = (variant: keyof typeof performanceVariants) => {
    if (prefersReducedMotion) {
      return performanceVariants.reduced.fadeIn;
    }
    
    return performanceVariants[variant];
  };
  
  return { getAnimationProps, prefersReducedMotion };
};