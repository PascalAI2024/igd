import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  /**
   * Style variant of the divider
   * @default 'gradient'
   */
  variant?: 'gradient' | 'dots' | 'wave' | 'fade' | 'geometric';
  
  /**
   * Spacing around the divider
   * @default 'medium'
   */
  spacing?: 'small' | 'medium' | 'large';
  
  /**
   * Animation on scroll
   * @default true
   */
  animate?: boolean;
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Color theme
   * @default 'default'
   */
  theme?: 'default' | 'subtle' | 'accent';
}

/**
 * Sophisticated section dividers for visual hierarchy
 * Features:
 * - Multiple style variants
 * - Scroll animations
 * - Responsive sizing
 * - Theme support
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'gradient',
  spacing = 'medium',
  animate = true,
  className = '',
  theme = 'default',
}) => {
  const spacingClasses = {
    small: 'my-8',
    medium: 'my-16',
    large: 'my-24',
  };
  
  const themeColors = {
    default: {
      primary: '#ef4444',
      secondary: '#f97316',
      neutral: 'rgba(255, 255, 255, 0.1)',
    },
    subtle: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.05)',
      neutral: 'rgba(255, 255, 255, 0.03)',
    },
    accent: {
      primary: '#dc2626',
      secondary: '#ea580c',
      neutral: 'rgba(239, 68, 68, 0.2)',
    },
  };
  
  const colors = themeColors[theme];
  
  const renderDivider = () => {
    switch (variant) {
      case 'gradient':
        return (
          <motion.div
            className="relative h-px w-full overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${colors.primary} 20%, 
                  ${colors.secondary} 50%, 
                  ${colors.primary} 80%, 
                  transparent
                )`,
              }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 blur-sm"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${colors.primary} 20%, 
                  ${colors.secondary} 50%, 
                  ${colors.primary} 80%, 
                  transparent
                )`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        );
      
      case 'dots':
        return (
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
              />
            ))}
          </div>
        );
      
      case 'wave':
        return (
          <motion.svg
            viewBox="0 0 1200 40"
            className="w-full h-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.path
              d="M0,20 Q300,0 600,20 T1200,20"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </motion.svg>
        );
      
      case 'fade':
        return (
          <motion.div
            className="relative h-16 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, 
                  ${colors.primary}20 0%, 
                  transparent 70%
                )`,
              }}
            />
          </motion.div>
        );
      
      case 'geometric':
        return (
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="h-px flex-1"
              style={{ backgroundColor: colors.neutral, transformOrigin: 'right' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                delay: 0.3,
              }}
            >
              <div
                className="w-2 h-2"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="absolute inset-0 w-2 h-2 blur-md"
                style={{ backgroundColor: colors.primary }}
              />
            </motion.div>
            <motion.div
              className="h-px flex-1"
              style={{ backgroundColor: colors.neutral, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {renderDivider()}
    </div>
  );
};

export default SectionDivider;