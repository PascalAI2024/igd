import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'shimmer';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height
}) => {
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  };

  const baseStyles = cn(
    'bg-gray-800/50',
    variantStyles[variant],
    className
  );

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%')
  };

  if (animation === 'pulse') {
    return (
      <motion.div
        className={baseStyles}
        style={style}
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    );
  }

  if (animation === 'wave') {
    return (
      <div className={cn(baseStyles, 'relative overflow-hidden')} style={style}>
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"
          animate={{
            x: ['0%', '200%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    );
  }

  // Shimmer animation
  return (
    <div className={cn(baseStyles, 'relative overflow-hidden')} style={style}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)'
        }}
        animate={{
          x: ['0%', '200%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

// Predefined skeleton components for common use cases

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={16}
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('bg-gray-900 rounded-lg p-6 space-y-4', className)}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="text" height={16} width="60%" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton variant="rounded" height={32} width={80} />
        <Skeleton variant="rounded" height={32} width={80} />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4,
  className 
}) => {
  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 border-b border-gray-800">
        {[...Array(columns)].map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            height={20}
            width={i === 0 ? '30%' : '100%'}
          />
        ))}
      </div>
      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-b border-gray-800/50">
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              height={16}
              width={colIndex === 0 ? '30%' : '100%'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const SkeletonImage: React.FC<{ 
  aspectRatio?: string; 
  className?: string;
}> = ({ 
  aspectRatio = '16/9',
  className 
}) => {
  return (
    <div 
      className={cn('relative overflow-hidden bg-gray-800/50 rounded-lg', className)}
      style={{ aspectRatio }}
    >
      <Skeleton
        variant="rectangular"
        animation="shimmer"
        width="100%"
        height="100%"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-gray-700/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    </div>
  );
};