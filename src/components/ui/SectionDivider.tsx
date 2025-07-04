import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SectionDividerProps {
  variant?: 'default' | 'gradient' | 'dots' | 'wave' | 'glow';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'default',
  spacing = 'md',
  animated = true,
  className
}) => {
  const spacingStyles = {
    sm: 'my-8',
    md: 'my-12',
    lg: 'my-16',
    xl: 'my-24'
  };

  const renderDivider = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div className="relative h-px w-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              animate={animated ? {
                x: ['-100%', '100%']
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>
        );

      case 'dots':
        return (
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-600"
                animate={animated ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        );

      case 'wave':
        return (
          <div className="relative h-8 w-full overflow-hidden">
            <svg
              viewBox="0 0 1200 40"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,20 Q300,0 600,20 T1200,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-700"
                animate={animated ? {
                  d: [
                    'M0,20 Q300,0 600,20 T1200,20',
                    'M0,20 Q300,40 600,20 T1200,20',
                    'M0,20 Q300,0 600,20 T1200,20'
                  ]
                } : {}}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </svg>
          </div>
        );

      case 'glow':
        return (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>
            <motion.div
              className="relative flex items-center justify-center"
              animate={animated ? {
                scale: [1, 1.1, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              <motion.div
                className="absolute w-32 h-8 bg-orange-500/20 blur-xl"
                animate={animated ? {
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>
        );

      default:
        return (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        );
    }
  };

  return (
    <div
      className={cn(
        'relative w-full',
        spacingStyles[spacing],
        className
      )}
      role="separator"
      aria-hidden="true"
    >
      {renderDivider()}
    </div>
  );
};