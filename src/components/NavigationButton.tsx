import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { trackInteraction } from '../utils/analytics';
import animationSystem from '../styles/animation-system';
import { getRouteByPath } from '../data/routes';

interface NavigationButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetch?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  role?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  to, 
  children, 
  className = '', 
  onClick,
  prefetch = false,
  disabled = false,
  'aria-label': ariaLabel,
  role = 'button'
}) => {
  const navigateWithTransition = useNavigateWithTransition();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Check if this is the current page
  const isActive = location.pathname === to;
  const route = getRouteByPath(to);
  
  // Add active state styling
  const finalClassName = `${className} ${isActive ? 'nav-link-active' : ''} nav-button`.trim();
  
  // Prefetch route on hover if enabled
  useEffect(() => {
    if (prefetch && buttonRef.current) {
      const prefetchRoute = () => {
        // Use link prefetch strategy
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = to;
        document.head.appendChild(link);
        
        // Clean up after a timeout
        setTimeout(() => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        }, 10000);
      };

      const handleMouseEnter = () => {
        prefetchRoute();
      };

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        buttonRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [prefetch, to]);

  const handleClick = () => {
    if (disabled) return;
    
    // Track the navigation interaction
    trackInteraction(
      'navigation-button',
      className,
      `navigate_to_${to.replace(/\//g, '_')}`
    );

    if (onClick) {
      onClick();
    }
    navigateWithTransition(to);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle Enter and Space key activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={disabled ? {} : animationSystem.states.hover.scale.whileHover}
      whileTap={disabled ? {} : animationSystem.states.tap.scale.whileTap}
      transition={{ duration: animationSystem.duration.fast }}
      className={finalClassName}
      disabled={disabled}
      aria-label={ariaLabel || (route?.description)}
      aria-current={isActive ? 'page' : undefined}
      role={role}
      tabIndex={disabled ? -1 : 0}
      style={{
        willChange: 'transform',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </motion.button>
  );
};

export default NavigationButton;
