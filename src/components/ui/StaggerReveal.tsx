import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  /**
   * Delay between each child animation
   * @default 0.1
   */
  staggerDelay?: number;
  
  /**
   * Initial delay before animations start
   * @default 0
   */
  initialDelay?: number;
  
  /**
   * Animation type
   * @default 'fadeUp'
   */
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur';
  
  /**
   * Trigger animation only once
   * @default true
   */
  once?: boolean;
  
  /**
   * Viewport amount before triggering (0-1)
   * @default 0.2
   */
  threshold?: number;
  
  /**
   * Custom className for container
   */
  className?: string;
  
  /**
   * Container element type
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Staggered reveal component for smooth content appearance
 * Features:
 * - Multiple animation types
 * - Viewport-based triggering
 * - Customizable timing
 * - Smooth spring animations
 */
const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  animation = 'fadeUp',
  once = true,
  threshold = 0.2,
  className = '',
  as: Component = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Animation variants
  const animationVariants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  };
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
  
  const itemVariants = {
    ...animationVariants[animation],
    visible: {
      ...animationVariants[animation].visible,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };
  
  // Convert children to array and wrap each in motion.div
  const childrenArray = React.Children.toArray(children);
  
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * Text reveal component with word-by-word animation
 */
export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}> = ({ text, className = '', delay = 0, staggerDelay = 0.03, once = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  const words = text.split(' ');
  
  return (
    <motion.span ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            delay: delay + index * staggerDelay,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * Line reveal component for heading animations
 */
export const LineReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}> = ({ children, className = '', delay = 0, once = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          delay,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StaggerReveal;