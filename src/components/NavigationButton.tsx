import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
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
  role = 'link'
}) => {
  const location = useLocation();
  const linkRef = useRef<HTMLAnchorElement>(null);
  
  // Check if this is the current page
  const isActive = location.pathname === to;
  const route = getRouteByPath(to);
  
  // Add active state styling
  const finalClassName = `${className} ${isActive ? 'nav-link-active' : ''} nav-button inline-block`.trim();
  
  // Prefetch route on hover if enabled
  useEffect(() => {
    if (prefetch && linkRef.current) {
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

      linkRef.current.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        linkRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, [prefetch, to]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    // Track the navigation interaction
    trackInteraction(
      'navigation-button',
      className,
      `navigate_to_${to.replace(/\//g, '_')}`
    );

    if (onClick) {
      onClick();
    }
  };

  // For disabled links, render a span instead
  if (disabled) {
    return (
      <motion.span
        className={finalClassName}
        whileHover={animationSystem.states.hover.scale.whileHover}
        whileTap={animationSystem.states.tap.scale.whileTap}
        transition={{ duration: animationSystem.duration.fast }}
        aria-label={ariaLabel || (route?.description)}
        aria-current={isActive ? 'page' : undefined}
        role={role}
        style={{
          willChange: 'transform',
          opacity: 0.6,
          cursor: 'not-allowed'
        }}
      >
        {children}
      </motion.span>
    );
  }

  // Use motion.div as wrapper and Link inside for proper navigation
  return (
    <motion.div
      className="inline-block"
      whileHover={animationSystem.states.hover.scale.whileHover}
      whileTap={animationSystem.states.tap.scale.whileTap}
      transition={{ duration: animationSystem.duration.fast }}
      style={{
        willChange: 'transform'
      }}
    >
      <Link
        ref={linkRef}
        to={to}
        onClick={handleClick}
        className={finalClassName}
        aria-label={ariaLabel || (route?.description)}
        aria-current={isActive ? 'page' : undefined}
        role={role}
        style={{
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
};

export default NavigationButton;
