import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/utils/cn';

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  depth?: boolean;
  magneticStrength?: number;
  children: React.ReactNode;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glowColor,
  depth = true,
  magneticStrength = 0.2,
  children,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // 3D rotation based on mouse position
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  // Handle ripple effect
  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleEffect = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  // Handle magnetic hover effect
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (event.clientX - centerX) / rect.width;
    const distanceY = (event.clientY - centerY) / rect.height;

    mouseX.set(distanceX * magneticStrength);
    mouseY.set(distanceY * magneticStrength);
  }, [mouseX, mouseY, magneticStrength, disabled]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(event);
    onClick?.(event);
  }, [createRipple, onClick]);

  // Variant styles
  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/25',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 shadow-gray-800/25',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800/50 shadow-transparent',
    gradient: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-orange-500/25'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Glow color based on variant
  const defaultGlowColors = {
    primary: '#f97316',
    secondary: '#1f2937',
    ghost: '#d1d5db',
    gradient: '#f97316'
  };

  const actualGlowColor = glowColor || defaultGlowColors[variant];

  return (
    <motion.button
      ref={buttonRef}
      style={{
        x,
        y,
        rotateX: depth ? rotateX : 0,
        rotateY: depth ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      className={cn(
        'relative overflow-hidden rounded-lg font-medium transition-all duration-300',
        'transform-gpu will-change-transform',
        depth && 'shadow-lg hover:shadow-xl',
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{
          opacity: isHovered ? 0.15 : 0
        }}
        style={{
          background: `radial-gradient(circle at center, ${actualGlowColor}, transparent)`
        }}
      />

      {/* Dynamic glow effect */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            filter: `blur(20px)`,
            background: actualGlowColor,
            transform: 'scale(1.2)'
          }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Button content with 3D depth */}
      <span className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </span>

      {/* Shimmer effect for gradient variant */}
      {variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)',
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      )}
    </motion.button>
  );
};