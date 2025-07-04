import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '../../utils/cn';

interface StaggerRevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  cascade?: boolean;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.5,
  direction = 'up',
  cascade = false,
  threshold = 0.1,
  once = true,
  className
}) => {
  const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    fade: { x: 0, y: 0 }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
        staggerDirection: cascade ? -1 : 1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="will-change-transform"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Specialized variants for common reveal patterns

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, delay = 0, duration = 0.5, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn: React.FC<{
  children: React.ReactNode;
  from?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, from = 'bottom', delay = 0, duration = 0.5, className }) => {
  const variants = {
    left: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    top: { initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    bottom: { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 } }
  };

  return (
    <motion.div
      className={className}
      initial={variants[from].initial}
      whileInView={variants[from].animate}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}> = ({ children, delay = 0, duration = 0.5, scale = 0.8, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export const RotateIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  rotate?: number;
  className?: string;
}> = ({ children, delay = 0, duration = 0.6, rotate = -10, className }) => {
  return (
    <motion.div
      className={className}
      initial={{ rotate, opacity: 0, scale: 0.9 }}
      whileInView={{ rotate: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Text-specific reveal animations

export const TextReveal: React.FC<{
  text: string;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}> = ({ text, delay = 0, staggerDelay = 0.03, className }) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const CharacterReveal: React.FC<{
  text: string;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}> = ({ text, delay = 0, staggerDelay = 0.02, className }) => {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};