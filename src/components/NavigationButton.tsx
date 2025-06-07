import React from 'react';
import { motion } from 'framer-motion';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { trackInteraction } from '../utils/analytics';
import animationSystem from '../styles/animation-system';

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
      whileHover={animationSystem.states.hover.scale.whileHover}
      whileTap={animationSystem.states.tap.scale.whileTap}
      transition={{ duration: animationSystem.duration.fast }}
      className={className}
      style={{
        willChange: 'transform'
      }}
    >
      {children}
    </motion.button>
  );
};

export default NavigationButton;
