import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import animationSystem from '../../styles/animation-system';

/**
 * Type of CTA button - controls visual styling
 */
export type CTAButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost';

/**
 * Size variants for the button
 */
export type CTAButtonSize = 'small' | 'medium' | 'large';

/**
 * Properties for the CTAButton component
 */
interface CTAButtonProps {
  /** Button text content */
  children: React.ReactNode;
  /** Type of button - controls styling */
  buttonType?: CTAButtonType;
  /** Size of the button */
  size?: CTAButtonSize;
  /** URL to navigate to when clicked (use instead of onClick for navigation) */
  to?: string;
  /** Function to call when button is clicked */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Show arrow icon on the right */
  showArrow?: boolean;
  /** Additional class names */
  className?: string;
  /** Custom icon to show instead of arrow */
  icon?: React.ReactNode;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Text to show when button is loading */
  loadingText?: string;
  /** Whether to use an external link (uses <a> tag with target="_blank") */
  external?: boolean;
  /** The URL for an external link */
  href?: string;
  /** Data attributes */
  [key: `data-${string}`]: string | undefined;
}

/**
 * A standardized CTA button component that ensures consistent styling
 * and behavior across the site.
 * 
 * @example
 * ```tsx
 * // Primary CTA with link
 * <CTAButton buttonType="primary" to="/contact">
 *   Start Your Project
 * </CTAButton>
 * 
 * // Secondary CTA with click handler
 * <CTAButton buttonType="secondary" onClick={handleClick}>
 *   Learn More
 * </CTAButton>
 * 
 * // External link
 * <CTAButton external href="https://example.com">
 *   Visit Example
 * </CTAButton>
 * ```
 */
const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  buttonType = 'primary',
  size = 'medium',
  to,
  onClick,
  showArrow = false,
  className = '',
  icon,
  isLoading = false,
  disabled = false,
  loadingText,
  external = false,
  href,
  ...rest
}) => {
  // Determine base classes based on button type
  const getBaseClasses = (): string => {
    switch (buttonType) {
      case 'primary':
        return 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-500/25 transition-shadow duration-300';
      
      case 'secondary':
        return 'bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-300';
      
      case 'tertiary':
        return 'bg-transparent text-red-500 hover:text-red-400 underline-offset-4 hover:underline transition-colors duration-200';
      
      case 'ghost':
        return 'bg-transparent text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-colors duration-300';
      
      default:
        return 'bg-gradient-to-r from-red-600 to-red-700 text-white transition-shadow duration-300';
    }
  };

  // Determine size classes
  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      
      case 'medium':
        return 'px-6 py-3';
      
      case 'large':
        return 'px-8 py-4 text-lg';
      
      default:
        return 'px-6 py-3';
    }
  };

  // Combine all classes
  const buttonClasses = `
    ${getBaseClasses()}
    ${getSizeClasses()}
    rounded-lg
    inline-flex items-center justify-center
    font-medium
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  // Common element props
  const commonProps = {
    className: buttonClasses,
    ...rest
  };

  // Icon component (either provided or default arrow)
  const IconComponent = icon || (showArrow ? <ArrowRight className="ml-2 w-5 h-5" /> : null);

  // Content based on loading state
  const content = (
    <>
      {isLoading ? loadingText || 'Loading...' : children}
      {!isLoading && IconComponent}
    </>
  );

  // Handle external links
  if (external && href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={disabled || isLoading ? {} : animationSystem.states.hover.scale.whileHover}
        whileTap={disabled || isLoading ? {} : animationSystem.states.tap.press.whileTap}
        transition={{ duration: animationSystem.duration.fast }}
        style={{ willChange: 'transform' }}
        {...commonProps}
      >
        {content}
      </motion.a>
    );
  }

  // Handle internal links
  if (to) {
    return (
      <motion.div
        whileHover={disabled || isLoading ? {} : animationSystem.states.hover.scale.whileHover}
        whileTap={disabled || isLoading ? {} : animationSystem.states.tap.press.whileTap}
        transition={{ duration: animationSystem.duration.fast }}
        style={{ willChange: 'transform' }}
      >
        <Link 
          to={to}
          {...commonProps}
          onClick={e => {
            if (disabled || isLoading) {
              e.preventDefault();
              return;
            }
            onClick?.(e);
          }}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  // Default button
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : animationSystem.states.hover.scale.whileHover}
      whileTap={disabled || isLoading ? {} : animationSystem.states.tap.press.whileTap}
      transition={{ duration: animationSystem.duration.fast }}
      style={{ willChange: 'transform' }}
      {...commonProps}
    >
      {content}
    </motion.button>
  );
};

export default CTAButton;