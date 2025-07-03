import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import animationSystem from '../../styles/animation-system';

interface RippleProps {
  x: number;
  y: number;
  size: number;
}

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  ripple?: boolean;
  glow?: boolean;
  magnetic?: boolean;
  depth?: boolean;
}

/**
 * Enhanced button with sophisticated micro-interactions:
 * - Ripple effect on click
 * - Magnetic hover effect
 * - 3D depth on press
 * - Glow effect
 * - Spring animations
 */
const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ripple = true,
  glow = true,
  magnetic = true,
  depth = true,
}) => {
  const [ripples, setRipples] = useState<RippleProps[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Motion values for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  
  // 3D rotation based on mouse position
  const rotateX = useTransform(springY, [-30, 30], [5, -5]);
  const rotateY = useTransform(springX, [-30, 30], [-5, 5]);
  
  // Handle ripple effect
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled) return;
    
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, size };
    setRipples([...ripples, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r !== newRipple));
    }, 600);
  };
  
  // Handle magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Limit the magnetic effect range
    const maxDistance = 30;
    const limitedX = Math.max(-maxDistance, Math.min(maxDistance, distanceX * 0.3));
    const limitedY = Math.max(-maxDistance, Math.min(maxDistance, distanceY * 0.3));
    
    x.set(limitedX);
    y.set(limitedY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  // Handle click with ripple
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick?.(e);
  };
  
  // Base styles
  const baseStyles = {
    primary: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
    secondary: 'bg-white/10 text-white backdrop-blur-sm border border-white/20',
    ghost: 'bg-transparent text-white border border-white/10',
  };
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3',
    large: 'px-8 py-4 text-lg',
  };
  
  // Glow effect styles
  const glowStyles = glow && !disabled && variant === 'primary' 
    ? 'hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] ' 
    : '';
  
  return (
    <motion.button
      ref={buttonRef}
      className={`
        relative overflow-hidden
        ${baseStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg font-medium
        transition-all duration-300
        transform-gpu
        ${depth ? 'shadow-lg hover:shadow-xl' : ''}
        ${glowStyles}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        x: springX,
        y: springY,
        rotateX: depth ? rotateX : 0,
        rotateY: depth ? rotateY : 0,
        transformPerspective: 1000,
      }}
      whileHover={disabled || loading ? {} : { 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={disabled || loading ? {} : { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : null}
        {children}
      </span>
      
      {/* Ripple effects */}
      {ripples.map((ripple, index) => (
        <motion.span
          key={index}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default EnhancedButton;