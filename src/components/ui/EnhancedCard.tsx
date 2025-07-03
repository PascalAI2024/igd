import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface EnhancedCardProps {
  children: React.ReactNode;
  /**
   * Card hover effect
   * @default 'lift'
   */
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'none';
  
  /**
   * Background style
   * @default 'glass'
   */
  background?: 'glass' | 'solid' | 'gradient' | 'mesh';
  
  /**
   * Border style
   * @default true
   */
  border?: boolean;
  
  /**
   * Padding size
   * @default 'medium'
   */
  padding?: 'small' | 'medium' | 'large';
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Additional className
   */
  className?: string;
  
  /**
   * Spotlight effect on hover
   * @default false
   */
  spotlight?: boolean;
}

/**
 * Enhanced card component with sophisticated depth and interaction
 * Features:
 * - 3D tilt effect
 * - Dynamic shadows
 * - Spotlight tracking
 * - Glass morphism
 * - Gradient mesh backgrounds
 */
const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  hoverEffect = 'lift',
  background = 'glass',
  border = true,
  padding = 'medium',
  onClick,
  className = '',
  spotlight = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const springConfig = { stiffness: 300, damping: 30 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform mouse position to rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  
  // Spotlight position
  const spotlightX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(y, [-0.5, 0.5], [0, 100]);
  
  // Handle mouse movement for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect !== 'tilt' || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Background styles
  const backgroundStyles = {
    glass: 'bg-white/5 backdrop-blur-md',
    solid: 'bg-gray-800',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900',
    mesh: 'bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10',
  };
  
  // Padding styles
  const paddingStyles = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };
  
  // Hover effect styles
  const getHoverStyles = () => {
    switch (hoverEffect) {
      case 'lift':
        return 'hover:-translate-y-2 hover:shadow-2xl';
      case 'glow':
        return 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]';
      case 'tilt':
        return '';
      default:
        return '';
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`
        relative
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${border ? 'border border-white/10' : ''}
        rounded-xl
        transition-all duration-300
        ${getHoverStyles()}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={hoverEffect === 'tilt' ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Base shadow */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg" />
      
      {/* Dynamic shadow for depth */}
      {hoverEffect === 'lift' && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-black/20 -z-10"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
            y: isHovered ? 8 : 0,
            filter: `blur(${isHovered ? 16 : 0}px)`,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Spotlight effect */}
      {spotlight && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${spotlightX.get()}% ${spotlightY.get()}%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%
            )`,
          }}
        />
      )}
      
      {/* Inner glow for glass effect */}
      {background === 'glass' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      
      {/* Content with transform style preservation */}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
        {children}
      </div>
      
      {/* Hover indicator */}
      {hoverEffect === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default EnhancedCard;