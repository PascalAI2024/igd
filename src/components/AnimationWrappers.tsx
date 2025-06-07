import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import animationSystem from '../styles/animation-system';

/**
 * Common props for all animation wrappers
 */
interface BaseAnimationProps extends Omit<MotionProps, 'variants' | 'initial' | 'animate' | 'exit'> {
  children: ReactNode;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Custom duration override (in seconds) */
  duration?: number;
  /** Whether to respect reduced motion preferences */
  respectReducedMotion?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Props for directional animations
 */
interface DirectionalAnimationProps extends BaseAnimationProps {
  /** Direction of the animation */
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * FadeIn Animation Wrapper
 * 
 * @example
 * ```tsx
 * <FadeIn delay={0.2}>
 *   <h1>Fading in content</h1>
 * </FadeIn>
 * ```
 */
export const FadeIn: React.FC<BaseAnimationProps> = ({
  children,
  delay = 0,
  duration,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(animationSystem.variants.fade)
    : animationSystem.variants.fade;

  const customTransition = duration ? { duration } : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...customTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * SlideIn Animation Wrapper
 * 
 * @example
 * ```tsx
 * <SlideIn direction="up" delay={0.1}>
 *   <Card>Content slides up</Card>
 * </SlideIn>
 * ```
 */
export const SlideIn: React.FC<DirectionalAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(animationSystem.variants.slide[direction])
    : animationSystem.variants.slide[direction];

  const customTransition = duration ? { duration } : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...customTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * SlideBlur Animation Wrapper
 * Combines slide and blur for a premium effect
 * 
 * @example
 * ```tsx
 * <SlideBlur direction="up">
 *   <Hero />
 * </SlideBlur>
 * ```
 */
export const SlideBlur: React.FC<Omit<DirectionalAnimationProps, 'direction'> & { direction?: 'up' | 'down' }> = ({
  children,
  direction = 'up',
  delay = 0,
  duration,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(animationSystem.variants.slideBlur[direction as 'up' | 'down'])
    : animationSystem.variants.slideBlur[direction as 'up' | 'down'];

  const customTransition = duration ? { duration } : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...customTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScaleIn Animation Wrapper
 * 
 * @example
 * ```tsx
 * <ScaleIn delay={0.3}>
 *   <Icon />
 * </ScaleIn>
 * ```
 */
export const ScaleIn: React.FC<BaseAnimationProps> = ({
  children,
  delay = 0,
  duration,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(animationSystem.variants.scale)
    : animationSystem.variants.scale;

  const customTransition = duration ? { duration } : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...customTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Props for stagger container
 */
interface StaggerContainerProps extends BaseAnimationProps {
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Whether to stagger in reverse on exit */
  reverseOnExit?: boolean;
}

/**
 * StaggerContainer Animation Wrapper
 * Animates children with staggered timing
 * 
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.1}>
 *   <SlideIn><Card /></SlideIn>
 *   <SlideIn><Card /></SlideIn>
 *   <SlideIn><Card /></SlideIn>
 * </StaggerContainer>
 * ```
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = animationSystem.duration.stagger,
  reverseOnExit = true,
  delay = 0,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(
        animationSystem.utils.createStaggerContainer(staggerDelay, delay)
      )
    : animationSystem.utils.createStaggerContainer(staggerDelay, delay);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Props for interactive wrapper
 */
interface InteractiveWrapperProps extends BaseAnimationProps {
  /** Type of hover animation */
  hoverType?: 'scale' | 'lift' | 'glow' | 'brighten';
  /** Type of tap animation */
  tapType?: 'scale' | 'press';
  /** Whether to show focus ring */
  showFocusRing?: boolean;
}

/**
 * InteractiveWrapper Animation Component
 * Adds hover, tap, and focus animations to any element
 * 
 * @example
 * ```tsx
 * <InteractiveWrapper hoverType="lift" tapType="press">
 *   <button>Click me</button>
 * </InteractiveWrapper>
 * ```
 */
export const InteractiveWrapper: React.FC<InteractiveWrapperProps> = ({
  children,
  hoverType = 'scale',
  tapType = 'scale',
  showFocusRing = true,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const hoverAnimation = respectReducedMotion 
    ? {} 
    : animationSystem.states.hover[hoverType];
  
  const tapAnimation = respectReducedMotion 
    ? {} 
    : animationSystem.states.tap[tapType];
  
  const focusAnimation = showFocusRing && !respectReducedMotion
    ? animationSystem.states.focus.ring
    : {};

  return (
    <motion.div
      {...hoverAnimation}
      {...tapAnimation}
      {...focusAnimation}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Props for reveal animation
 */
interface RevealOnScrollProps extends BaseAnimationProps {
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  /** Whether animation should only play once */
  once?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * RevealOnScroll Animation Wrapper
 * Reveals content when it enters the viewport
 * 
 * @example
 * ```tsx
 * <RevealOnScroll threshold={0.2} once>
 *   <Section />
 * </RevealOnScroll>
 * ```
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  threshold = 0.1,
  once = true,
  rootMargin = '0px',
  delay = 0,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(animationSystem.variants.slideBlur.up)
    : animationSystem.variants.slideBlur.up;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once, amount: threshold, margin: rootMargin }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Props for loading animation
 */
interface LoadingAnimationProps extends BaseAnimationProps {
  /** Type of loading animation */
  type?: 'pulse' | 'spinner' | 'dots';
}

/**
 * LoadingAnimation Component
 * Shows loading state with animation
 * 
 * @example
 * ```tsx
 * <LoadingAnimation type="pulse">
 *   <Skeleton />
 * </LoadingAnimation>
 * ```
 */
export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  children,
  type = 'pulse',
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion 
    ? {} 
    : animationSystem.states.loading[type];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Props for error animation
 */
interface ErrorAnimationProps extends BaseAnimationProps {
  /** Type of error animation */
  type?: 'shake' | 'pulse';
  /** Whether to auto-trigger animation */
  trigger?: boolean;
}

/**
 * ErrorAnimation Component
 * Shows error state with animation
 * 
 * @example
 * ```tsx
 * <ErrorAnimation type="shake" trigger={hasError}>
 *   <ErrorMessage />
 * </ErrorAnimation>
 * ```
 */
export const ErrorAnimation: React.FC<ErrorAnimationProps> = ({
  children,
  type = 'shake',
  trigger = true,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  const variants = respectReducedMotion || !trigger
    ? {} 
    : animationSystem.states.error[type];

  return (
    <motion.div
      variants={trigger ? variants : undefined}
      initial={trigger ? "hidden" : undefined}
      animate={trigger ? "visible" : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Composable animation wrapper that combines multiple animation types
 * 
 * @example
 * ```tsx
 * <AnimationComposer
 *   animations={['fade', 'slide']}
 *   options={{ slide: { direction: 'up' } }}
 * >
 *   <Content />
 * </AnimationComposer>
 * ```
 */
interface AnimationComposerProps extends BaseAnimationProps {
  /** Array of animation types to compose */
  animations: Array<'fade' | 'slide' | 'scale' | 'blur' | 'rotate'>;
  /** Options for specific animations */
  options?: {
    slide?: { direction: 'up' | 'down' | 'left' | 'right' };
  };
}

export const AnimationComposer: React.FC<AnimationComposerProps> = ({
  children,
  animations,
  options = {},
  delay = 0,
  duration,
  respectReducedMotion = true,
  className = '',
  ...props
}) => {
  // Build composed variants
  const variantsList = animations.map(animType => {
    switch (animType) {
      case 'slide':
        return animationSystem.variants.slide[options.slide?.direction || 'up'];
      case 'fade':
        return animationSystem.variants.fade;
      case 'scale':
        return animationSystem.variants.scale;
      case 'blur':
        return animationSystem.variants.blur;
      case 'rotate':
        return animationSystem.variants.rotate;
      default:
        return animationSystem.variants.fade;
    }
  });

  const composedVariants = animationSystem.utils.composeVariants(...variantsList);
  const variants = respectReducedMotion 
    ? animationSystem.utils.getMotionSafeVariants(composedVariants)
    : composedVariants;

  const customTransition = duration ? { duration } : undefined;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ ...customTransition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};