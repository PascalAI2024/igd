import React from 'react';
import { motion } from 'framer-motion';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { trackInteraction } from '../utils/analytics';

interface NavigationButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ to, children, className = '', onClick }) => {
  const navigateWithTransition = useNavigateWithTransition();

  const handleClick = () => {
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

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      style={{
        transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        willChange: 'transform, opacity, box-shadow'
      }}
    >
      {children}
    </motion.button>
  );
};

export default NavigationButton;
