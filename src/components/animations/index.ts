/**
 * Central export for all animation-related components and utilities
 */

// Animation wrappers
export {
  FadeIn,
  SlideIn,
  SlideBlur,
  ScaleIn,
  StaggerContainer,
  InteractiveWrapper,
  RevealOnScroll,
  LoadingAnimation,
  ErrorAnimation,
  AnimationComposer,
} from '../AnimationWrappers';

// Animation system
export { default as animationSystem } from '../../styles/animation-system';

// Re-export commonly used constants
export { 
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ANIMATION_TRANSITIONS,
  fadeVariants,
  slideVariants,
  scaleVariants,
  blurVariants,
  containerVariants,
  hoverVariants,
  tapVariants,
  focusVariants,
  loadingVariants,
  errorVariants,
  successVariants,
  THREE_ANIMATION,
  prefersReducedMotion,
  getMotionSafeVariants,
  createStaggerContainer,
  createSlideVariants,
  composeVariants,
  createAnimationPreset,
  animationClasses,
  PERFORMANCE_CONFIG,
} from '../../styles/animation-system';

// Type exports
export type {
  AnimationDuration,
  AnimationTransition,
  AnimationVariant,
  AnimationPreset,
} from '../../styles/animation-system';