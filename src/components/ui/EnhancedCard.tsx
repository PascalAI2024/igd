import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/utils/cn';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'spotlight';
  tiltStrength?: number;
  spotlightColor?: string;
  glassOpacity?: number;
  children: React.ReactNode;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  variant = 'default',
  tiltStrength = 15,
  spotlightColor = '#f97316',
  glassOpacity = 0.1,
  children,
  className,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXRelative = useMotionValue(0.5);
  const mouseYRelative = useMotionValue(0.5);

  // Spring configuration for smooth animations
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D tilt transforms
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltStrength, tiltStrength]);

  // Dynamic shadow transforms
  const shadowX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  // Spotlight position
  const spotlightX = useTransform(mouseXRelative, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseYRelative, [0, 1], [0, 100]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized coordinates for tilt (-0.5 to 0.5)
    const normalizedX = (event.clientX - centerX) / rect.width;
    const normalizedY = (event.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    // Relative coordinates for spotlight (0 to 1)
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    mouseXRelative.set(relativeX);
    mouseYRelative.set(relativeY);
  }, [mouseX, mouseY, mouseXRelative, mouseYRelative]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    mouseXRelative.set(0.5);
    mouseYRelative.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY, mouseXRelative, mouseYRelative]);

  // Variant styles
  const variantStyles = {
    default: 'bg-gray-800 border border-gray-700',
    glass: `bg-white/${glassOpacity * 100} backdrop-blur-lg border border-white/20`,
    gradient: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700',
    spotlight: 'bg-gray-900 border border-gray-800'
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      className={cn(
        'relative rounded-xl p-6 overflow-hidden',
        'transform-gpu will-change-transform',
        variantStyles[variant],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
      {...props}
    >
      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 -z-20 rounded-xl bg-black/50 blur-xl"
        style={{
          x: shadowX,
          y: shadowY,
          opacity: isHovered ? 0.3 : 0.1
        }}
      />

      {/* Glass morphism backdrop for glass variant */}
      {variant === 'glass' && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5" />
        </div>
      )}

      {/* Spotlight effect */}
      {variant === 'spotlight' && isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-0"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${spotlightX.get()}% ${spotlightY.get()}%, ${spotlightColor}30 0%, transparent 50%)`,
            filter: 'blur(40px)'
          }}
        />
      )}

      {/* Gradient shine effect */}
      {(variant === 'gradient' || variant === 'glass') && (
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            backgroundPosition: isHovered ? '-100% -100%' : '200% 200%'
          }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* 3D depth layer for content */}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
        {children}
      </div>

      {/* Edge glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(to bottom, ${spotlightColor}20, transparent)`,
            boxShadow: `inset 0 0 20px ${spotlightColor}20`
          }}
        />
      )}

      {/* Animated border gradient */}
      {variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          style={{
            background: 'conic-gradient(from 0deg, #f97316, #ec4899, #8b5cf6, #3b82f6, #f97316)',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}
    </motion.div>
  );
};