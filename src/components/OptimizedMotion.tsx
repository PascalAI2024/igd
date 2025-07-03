import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionProps, useReducedMotion as framerUseReducedMotion } from 'framer-motion';
import { isElementInViewport, getOptimizedAnimationSettings } from '../utils/animationPerformance';

interface OptimizedMotionProps extends MotionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * Optimized motion component that:
 * - Only animates when in viewport
 * - Respects reduced motion preferences
 * - Uses GPU-accelerated transforms
 * - Automatically manages will-change
 */
export const OptimizedMotion: React.FC<OptimizedMotionProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  delay = 0,
  initial,
  animate,
  exit,
  transition,
  style,
  variants,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = framerUseReducedMotion();
  const animationSettings = getOptimizedAnimationSettings();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!hasAnimated || !triggerOnce)) {
            setTimeout(() => {
              setIsInView(true);
              if (triggerOnce) {
                setHasAnimated(true);
              }
            }, delay);
          } else if (!triggerOnce && !entry.isIntersecting) {
            setIsInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  // If reduced motion is preferred, render static element
  if (shouldReduceMotion || !animationSettings.enableAnimations) {
    return (
      <div ref={ref} style={style} {...props}>
        {children}
      </div>
    );
  }

  // Optimize animation values
  const optimizedInitial = initial || { opacity: 0, y: 20 };
  const optimizedAnimate = isInView ? (animate || { opacity: 1, y: 0 }) : optimizedInitial;
  const optimizedTransition = {
    duration: animationSettings.transitionDuration,
    ease: 'easeOut',
    ...transition,
  };

  // GPU-optimized styles
  const gpuStyle = {
    ...style,
    transform: 'translateZ(0)', // Force GPU layer
    backfaceVisibility: 'hidden' as const,
  };

  return (
    <motion.div
      ref={ref}
      initial={optimizedInitial}
      animate={optimizedAnimate}
      exit={exit}
      transition={optimizedTransition}
      style={gpuStyle}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger container for optimized stagger animations
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
}) => {
  const animationSettings = getOptimizedAnimationSettings();
  const actualStaggerDelay = animationSettings.enableAnimations ? staggerDelay : 0;

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: actualStaggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Optimized variants for common animations
 */
export const optimizedVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  },
  
  slideUp: {
    hidden: { 
      opacity: 0, 
      y: 20,
      transform: 'translateZ(0)', // GPU optimization
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transform: 'translateZ(0)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  },
  
  slideInLeft: {
    hidden: { 
      opacity: 0, 
      x: -20,
      transform: 'translateZ(0)',
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transform: 'translateZ(0)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  },
  
  scale: {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      transform: 'scale(0.9) translateZ(0)',
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transform: 'scale(1) translateZ(0)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  },
};