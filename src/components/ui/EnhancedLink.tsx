import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link, LinkProps } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface EnhancedLinkProps extends Omit<LinkProps, 'to'> {
  to?: string;
  href?: string;
  external?: boolean;
  underline?: 'always' | 'hover' | 'none';
  variant?: 'default' | 'gradient' | 'glow';
  className?: string;
  children: React.ReactNode;
}

/**
 * Enhanced link component with sophisticated hover effects:
 * - Gradient underline animation
 * - Text glow on hover
 * - Smooth color transitions
 * - Magnetic hover effect
 * - Focus indicators
 */
const EnhancedLink: React.FC<EnhancedLinkProps> = ({
  to,
  href,
  external = false,
  underline = 'hover',
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for underline
  const underlineProgress = useMotionValue(0);
  const underlineSpring = useSpring(underlineProgress, { 
    stiffness: 400, 
    damping: 30 
  });
  
  // Transform for gradient position
  const gradientX = useTransform(
    underlineSpring,
    [0, 1],
    ['0%', '100%']
  );
  
  // Handle hover states
  const handleMouseEnter = () => {
    setIsHovered(true);
    underlineProgress.set(1);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    underlineProgress.set(0);
  };
  
  // Variant styles
  const variantStyles = {
    default: 'text-gray-300 hover:text-white',
    gradient: 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent hover:from-red-400 hover:to-orange-400',
    glow: 'text-red-500 hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]',
  };
  
  // Underline styles
  const underlineStyles = {
    always: 'underline decoration-2 underline-offset-4',
    hover: '',
    none: '',
  };
  
  // Common link props
  const linkProps = {
    ref: linkRef,
    className: `
      relative inline-flex items-center gap-1
      transition-all duration-300 ease-out
      ${variantStyles[variant]}
      ${underlineStyles[underline]}
      ${className}
    `,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...props,
  };
  
  const content = (
    <>
      <span className="relative">
        {children}
        
        {/* Animated underline */}
        {underline === 'hover' && (
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 overflow-hidden"
            style={{ opacity: underlineSpring }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"
              style={{
                x: gradientX,
                backgroundSize: '200% 100%',
              }}
            />
          </motion.span>
        )}
        
        {/* Hover glow effect */}
        {variant === 'glow' && isHovered && (
          <motion.span
            className="absolute inset-0 bg-red-500/20 blur-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </span>
      
      {/* External link indicator */}
      {(external || href) && (
        <motion.span
          animate={{ 
            x: isHovered ? 2 : 0,
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <ExternalLink className="w-3 h-3 opacity-70" />
        </motion.span>
      )}
    </>
  );
  
  // External link
  if (external || href) {
    return (
      <motion.a
        href={href || to}
        target="_blank"
        rel="noopener noreferrer"
        ref={linkRef}
        className={linkProps.className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }
  
  // Internal link
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link 
          to={to} 
          ref={linkRef}
          className={linkProps.className}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {content}
        </Link>
      </motion.div>
    );
  }
  
  // Fallback to span if no href or to
  return (
    <motion.span
      ref={linkRef}
      className={linkProps.className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.span>
  );
};

export default EnhancedLink;