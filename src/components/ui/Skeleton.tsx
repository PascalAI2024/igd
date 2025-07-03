import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  /**
   * Type of skeleton
   * @default 'text'
   */
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  
  /**
   * Width of the skeleton
   * @default '100%'
   */
  width?: string | number;
  
  /**
   * Height of the skeleton
   * @default 'auto'
   */
  height?: string | number;
  
  /**
   * Number of lines for text variant
   * @default 1
   */
  lines?: number;
  
  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';
  
  /**
   * Custom className
   */
  className?: string;
  
  /**
   * Rounded corners
   * @default true
   */
  rounded?: boolean;
}

/**
 * Skeleton loading component for smooth loading states
 * Features:
 * - Multiple variants
 * - Smooth animations
 * - Customizable dimensions
 * - Responsive design
 */
const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height = 'auto',
  lines = 1,
  animation = 'pulse',
  className = '',
  rounded = true,
}) => {
  const getHeight = () => {
    if (height !== 'auto') return height;
    
    switch (variant) {
      case 'text':
        return '1em';
      case 'circular':
        return width;
      case 'card':
        return '200px';
      default:
        return '60px';
    }
  };
  
  const baseClasses = `
    bg-white/5
    ${rounded ? (variant === 'circular' ? 'rounded-full' : 'rounded-md') : ''}
    ${className}
  `;
  
  const pulseAnimation = {
    animate: {
      opacity: [0.5, 1, 0.5],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };
  
  const waveAnimation = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  };
  
  const renderSkeleton = () => {
    if (variant === 'text' && lines > 1) {
      return (
        <div className="space-y-2">
          {[...Array(lines)].map((_, index) => (
            <motion.div
              key={index}
              className={baseClasses}
              style={{
                width: index === lines - 1 ? '80%' : width,
                height: getHeight(),
                ...(animation === 'wave' && {
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                  backgroundSize: '200% 100%',
                }),
              }}
              {...(animation === 'pulse' ? pulseAnimation : {})}
              {...(animation === 'wave' ? waveAnimation : {})}
            />
          ))}
        </div>
      );
    }
    
    if (variant === 'card') {
      return (
        <motion.div
          className={`${baseClasses} p-4`}
          style={{ width, height: getHeight() }}
          {...(animation === 'pulse' ? pulseAnimation : {})}
        >
          <div className="space-y-3">
            {/* Avatar and title */}
            <div className="flex items-center space-x-3">
              <Skeleton variant="circular" width={40} height={40} animation={animation} />
              <div className="flex-1">
                <Skeleton variant="text" width="60%" animation={animation} />
                <Skeleton variant="text" width="40%" animation={animation} className="mt-1" />
              </div>
            </div>
            
            {/* Content lines */}
            <div className="space-y-2">
              <Skeleton variant="text" animation={animation} />
              <Skeleton variant="text" animation={animation} />
              <Skeleton variant="text" width="90%" animation={animation} />
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <Skeleton variant="rectangular" width={80} height={32} animation={animation} />
              <Skeleton variant="rectangular" width={80} height={32} animation={animation} />
            </div>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div
        className={baseClasses}
        style={{
          width,
          height: getHeight(),
          ...(animation === 'wave' && {
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
            backgroundSize: '200% 100%',
          }),
        }}
        {...(animation === 'pulse' ? pulseAnimation : {})}
        {...(animation === 'wave' ? waveAnimation : {})}
      />
    );
  };
  
  return renderSkeleton();
};

/**
 * Skeleton container for loading lists
 */
export const SkeletonList: React.FC<{
  count?: number;
  variant?: SkeletonProps['variant'];
  className?: string;
}> = ({ count = 3, variant = 'card', className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Skeleton variant={variant} />
        </motion.div>
      ))}
    </div>
  );
};

export default Skeleton;