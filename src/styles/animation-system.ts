/**
 * Unified Animation Design System
 * 
 * This module provides a comprehensive animation system for the entire application,
 * ensuring consistency across all animated elements while maintaining performance.
 */

import { Variants, Transition, AnimationControls } from 'framer-motion';
import { CSSProperties } from 'react';

// ===========================
// Timing & Easing Constants
// ===========================

/**
 * Standard animation durations in seconds
 */
export const ANIMATION_DURATION = {
  instant: 0.1,
  fast: 0.2,
  medium: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
  
  // Specific use cases
  pageTransition: 0.6,
  modalOpen: 0.4,
  hover: 0.2,
  tap: 0.1,
  stagger: 0.1,
} as const;

/**
 * Easing functions for different animation types
 */
export const ANIMATION_EASING = {
  // Spring-based easings (preferred for most interactions)
  spring: {
    default: { type: 'spring', damping: 20, stiffness: 300 },
    gentle: { type: 'spring', damping: 30, stiffness: 200 },
    bouncy: { type: 'spring', damping: 15, stiffness: 400 },
    stiff: { type: 'spring', damping: 30, stiffness: 500 },
  },
  
  // Cubic bezier easings
  bezier: {
    easeInOut: [0.4, 0, 0.2, 1],
    easeOut: [0.0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    linear: [0, 0, 1, 1],
    
    // Premium easings
    smooth: [0.22, 1, 0.36, 1],
    elegant: [0.25, 0.46, 0.45, 0.94],
    snappy: [0.68, -0.55, 0.265, 1.55],
  },
} as const;

/**
 * Standard transition configurations
 */
export const ANIMATION_TRANSITIONS: Record<string, Transition> = {
  // Default transitions
  default: {
    duration: ANIMATION_DURATION.normal,
    ease: ANIMATION_EASING.bezier.easeInOut,
  },
  
  // Spring transitions
  spring: ANIMATION_EASING.spring.default,
  springGentle: ANIMATION_EASING.spring.gentle,
  springBouncy: ANIMATION_EASING.spring.bouncy,
  springStiff: ANIMATION_EASING.spring.stiff,
  
  // Fast transitions
  fast: {
    duration: ANIMATION_DURATION.fast,
    ease: ANIMATION_EASING.bezier.easeOut,
  },
  
  // Smooth transitions
  smooth: {
    duration: ANIMATION_DURATION.medium,
    ease: ANIMATION_EASING.bezier.smooth,
  },
  
  // Page transitions
  page: {
    duration: ANIMATION_DURATION.pageTransition,
    ease: ANIMATION_EASING.bezier.smooth,
  },
  
  // Elegant transitions
  elegant: {
    duration: ANIMATION_DURATION.slow,
    ease: ANIMATION_EASING.bezier.elegant,
  },
};

// ===========================
// Animation Variants
// ===========================

/**
 * Standard fade variants
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: ANIMATION_TRANSITIONS.default,
  },
  exit: { 
    opacity: 0,
    transition: ANIMATION_TRANSITIONS.fast,
  },
};

/**
 * Slide variants with direction
 */
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  left: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  right: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
};

/**
 * Scale variants
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: ANIMATION_TRANSITIONS.spring,
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: ANIMATION_TRANSITIONS.fast,
  },
};

/**
 * Blur variants
 */
export const blurVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: ANIMATION_TRANSITIONS.smooth,
  },
  exit: { 
    opacity: 0, 
    filter: 'blur(10px)',
    transition: ANIMATION_TRANSITIONS.fast,
  },
};

/**
 * Combined slide and blur variants (premium feel)
 */
export const slideBlurVariants = {
  up: {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: 'blur(5px)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  down: {
    hidden: { 
      opacity: 0, 
      y: -20, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(5px)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  left: {
    hidden: { 
      opacity: 0, 
      x: 20, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      x: -20, 
      filter: 'blur(5px)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  right: {
    hidden: { 
      opacity: 0, 
      x: -20, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      x: 20, 
      filter: 'blur(5px)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
};

/**
 * Rotate variants
 */
export const rotateVariants: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: ANIMATION_TRANSITIONS.spring,
  },
  exit: { 
    opacity: 0, 
    rotate: 10,
    transition: ANIMATION_TRANSITIONS.fast,
  },
};

/**
 * Container variants for staggered children
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_DURATION.stagger,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// ===========================
// Interaction States
// ===========================

/**
 * Hover animations
 */
export const hoverVariants = {
  scale: {
    whileHover: { scale: 1.05, transition: ANIMATION_TRANSITIONS.fast },
  },
  lift: {
    whileHover: { 
      y: -5, 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      transition: ANIMATION_TRANSITIONS.spring,
    },
  },
  glow: {
    whileHover: { 
      boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
  brighten: {
    whileHover: { 
      filter: 'brightness(1.1)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
};

/**
 * Tap animations
 */
export const tapVariants = {
  scale: {
    whileTap: { scale: 0.95, transition: ANIMATION_TRANSITIONS.fast },
  },
  press: {
    whileTap: { scale: 0.98, y: 1, transition: ANIMATION_TRANSITIONS.fast },
  },
};

/**
 * Focus animations
 */
export const focusVariants = {
  ring: {
    whileFocus: {
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.5)',
      transition: ANIMATION_TRANSITIONS.fast,
    },
  },
};

// ===========================
// Loading States
// ===========================

/**
 * Loading animations
 */
export const loadingVariants = {
  pulse: {
    hidden: { opacity: 0.5, scale: 1 },
    visible: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  spinner: {
    hidden: { rotate: 0 },
    visible: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  dots: {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  },
};

// ===========================
// Error & Success States
// ===========================

/**
 * Error state animations
 */
export const errorVariants = {
  shake: {
    hidden: { x: 0 },
    visible: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  },
  pulse: {
    hidden: { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
    visible: {
      boxShadow: [
        '0 0 0 0 rgba(239, 68, 68, 0)',
        '0 0 0 10px rgba(239, 68, 68, 0.3)',
        '0 0 0 0 rgba(239, 68, 68, 0)',
      ],
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  },
};

/**
 * Success state animations
 */
export const successVariants = {
  checkmark: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: 'easeInOut' },
        opacity: { duration: 0.1 },
      },
    },
  },
  bounce: {
    hidden: { y: 0 },
    visible: {
      y: [0, -20, 0],
      transition: ANIMATION_TRANSITIONS.springBouncy,
    },
  },
};

// ===========================
// 3D Animation Constants
// ===========================

/**
 * Constants for Three.js animations
 */
export const THREE_ANIMATION = {
  // Rotation speeds (radians per second)
  rotation: {
    slow: 0.001,
    normal: 0.005,
    fast: 0.01,
  },
  
  // Camera movements
  camera: {
    transitionDuration: 2000, // milliseconds
    easing: 'easeInOutCubic',
  },
  
  // Material transitions
  material: {
    colorTransition: 1000, // milliseconds
    opacityTransition: 500, // milliseconds
  },
};

// ===========================
// Utility Functions
// ===========================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation variants with reduced motion support
 */
export const getMotionSafeVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    // Return instant transitions for reduced motion
    return {
      hidden: variants.hidden,
      visible: {
        ...variants.visible,
        transition: { duration: 0 },
      },
      ...(variants.exit && {
        exit: {
          ...variants.exit,
          transition: { duration: 0 },
        },
      }),
    };
  }
  return variants;
};

/**
 * Create custom stagger container variants
 */
export const createStaggerContainer = (
  staggerDelay: number = ANIMATION_DURATION.stagger,
  delayChildren: number = 0.1,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerDelay * 0.5,
      staggerDirection: -1,
    },
  },
});

/**
 * Create custom slide variants with specific distance
 */
export const createSlideVariants = (
  distance: number = 20,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
): Variants => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const sign = direction === 'up' || direction === 'left' ? 1 : -1;
  
  return {
    hidden: { 
      opacity: 0, 
      [axis]: distance * sign,
    },
    visible: { 
      opacity: 1, 
      [axis]: 0,
      transition: ANIMATION_TRANSITIONS.smooth,
    },
    exit: { 
      opacity: 0, 
      [axis]: -distance * sign,
      transition: ANIMATION_TRANSITIONS.fast,
    },
  };
};

/**
 * Compose multiple animation variants
 */
export const composeVariants = (...variantsList: Variants[]): Variants => {
  return variantsList.reduce((acc, variants) => ({
    hidden: { ...acc.hidden, ...variants.hidden },
    visible: { ...acc.visible, ...variants.visible },
    exit: { ...acc.exit, ...variants.exit },
  }), {} as Variants);
};

// ===========================
// CSS Animation Classes
// ===========================

/**
 * CSS classes for animations that can't use Framer Motion
 */
export const animationClasses = {
  // Entrance animations
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  slideDown: 'animate-slideDown',
  slideLeft: 'animate-slideLeft',
  slideRight: 'animate-slideRight',
  scaleIn: 'animate-scaleIn',
  
  // Continuous animations
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  float: 'animate-float',
  
  // Hover states
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverLift: 'hover:-translate-y-1 transition-transform duration-200',
  hoverGlow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-shadow duration-200',
  
  // Timing functions
  timingSmooth: 'ease-[cubic-bezier(0.22,1,0.36,1)]',
  timingElastic: 'ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
};

// ===========================
// Performance Guidelines
// ===========================

/**
 * Animation performance configuration
 */
export const PERFORMANCE_CONFIG = {
  // Maximum concurrent animations
  maxConcurrent: 5,
  
  // FPS targets
  targetFPS: {
    desktop: 60,
    mobile: 30,
    lowPower: 24,
  },
  
  // Complexity thresholds
  complexity: {
    simple: 10, // elements
    moderate: 50,
    complex: 100,
  },
  
  // Optimization strategies
  optimization: {
    useGPU: true,
    throttleScroll: true,
    pauseOffscreen: true,
    reducedMotion: 'respect', // 'respect' | 'ignore' | 'force'
  },
};

// ===========================
// Export Types
// ===========================

export type AnimationDuration = typeof ANIMATION_DURATION[keyof typeof ANIMATION_DURATION];
export type AnimationTransition = typeof ANIMATION_TRANSITIONS[keyof typeof ANIMATION_TRANSITIONS];
export type AnimationVariant = Variants;

/**
 * Animation preset configurations
 */
export interface AnimationPreset {
  variants: Variants;
  transition?: Transition;
  hover?: any;
  tap?: any;
  focus?: any;
}

/**
 * Create a custom animation preset
 */
export const createAnimationPreset = (
  variants: Variants,
  options?: {
    hover?: any;
    tap?: any;
    focus?: any;
    transition?: Transition;
  },
): AnimationPreset => ({
  variants,
  transition: options?.transition,
  hover: options?.hover,
  tap: options?.tap,
  focus: options?.focus,
});

// ===========================
// Default Export
// ===========================

const animationSystem = {
  // Constants
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
  transitions: ANIMATION_TRANSITIONS,
  
  // Variants
  variants: {
    fade: fadeVariants,
    slide: slideVariants,
    scale: scaleVariants,
    blur: blurVariants,
    slideBlur: slideBlurVariants,
    rotate: rotateVariants,
    container: containerVariants,
  },
  
  // States
  states: {
    hover: hoverVariants,
    tap: tapVariants,
    focus: focusVariants,
    loading: loadingVariants,
    error: errorVariants,
    success: successVariants,
  },
  
  // 3D
  three: THREE_ANIMATION,
  
  // Utilities
  utils: {
    prefersReducedMotion,
    getMotionSafeVariants,
    createStaggerContainer,
    createSlideVariants,
    composeVariants,
    createAnimationPreset,
  },
  
  // CSS Classes
  classes: animationClasses,
  
  // Performance
  performance: PERFORMANCE_CONFIG,
};

export default animationSystem;