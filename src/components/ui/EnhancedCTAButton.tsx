import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Zap, Star, Shield, Award } from 'lucide-react';
import animationSystem from '../../styles/animation-system';

/**
 * Enhanced CTA Button Variants for different contexts
 */
export type CTAVariant = 'urgent' | 'value' | 'social' | 'trust' | 'limited' | 'default';

/**
 * Enhanced CTA button properties with conversion optimization features
 */
interface EnhancedCTAButtonProps {
  children: React.ReactNode;
  variant?: CTAVariant;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  size?: 'small' | 'medium' | 'large';
  showArrow?: boolean;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  external?: boolean;
  href?: string;
  urgencyText?: string;
  socialProof?: {
    count: number;
    text: string;
  };
  limitedTime?: {
    endTime: Date;
    text?: string;
  };
  trustBadges?: Array<'secure' | 'guarantee' | 'rated'>;
  pulseAnimation?: boolean;
  testVariant?: 'A' | 'B' | 'C'; // For A/B testing
  [key: `data-${string}`]: string | undefined;
}

/**
 * Enhanced CTA Button with conversion optimization features
 * Including urgency, social proof, trust signals, and A/B testing support
 */
const EnhancedCTAButton: React.FC<EnhancedCTAButtonProps> = ({
  children,
  variant = 'default',
  to,
  onClick,
  size = 'medium',
  showArrow = true,
  className = '',
  disabled = false,
  isLoading = false,
  loadingText,
  external = false,
  href,
  urgencyText,
  socialProof,
  limitedTime,
  trustBadges,
  pulseAnimation = false,
  testVariant = 'A',
  ...rest
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [recentActivity, setRecentActivity] = useState<boolean>(false);

  // Countdown timer for limited time offers
  useEffect(() => {
    if (!limitedTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const endTime = limitedTime.endTime.getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeLeft('Offer Expired');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [limitedTime]);

  // Simulate recent activity for social proof
  useEffect(() => {
    if (!socialProof) return;

    const showActivity = () => {
      setRecentActivity(true);
      setTimeout(() => setRecentActivity(false), 3000);
    };

    // Show activity immediately and then periodically
    showActivity();
    const interval = setInterval(showActivity, 15000);

    return () => clearInterval(interval);
  }, [socialProof]);

  // Get variant-specific styling
  const getVariantStyles = () => {
    const baseStyles = {
      A: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      B: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
      C: 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700'
    };

    switch (variant) {
      case 'urgent':
        return `${baseStyles[testVariant]} shadow-lg hover:shadow-red-500/30 ring-2 ring-red-500/50 ring-offset-2 ring-offset-black`;
      case 'value':
        return `${baseStyles[testVariant]} shadow-lg hover:shadow-xl`;
      case 'social':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg';
      case 'trust':
        return 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg';
      case 'limited':
        return `${baseStyles[testVariant]} shadow-lg hover:shadow-red-500/30 animate-pulse`;
      default:
        return baseStyles[testVariant];
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  // Combined button classes
  const buttonClasses = `
    ${getVariantStyles()}
    ${getSizeClasses()}
    rounded-lg
    inline-flex items-center justify-center
    font-medium text-white
    transition-all duration-300
    relative overflow-hidden
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${pulseAnimation && !disabled ? 'animate-pulse' : ''}
    ${className}
  `.trim();

  // Common props
  const commonProps = {
    className: buttonClasses,
    ...rest
  };

  // Button content with enhancements
  const buttonContent = (
    <>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      
      {/* Main content */}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{loadingText || 'Loading...'}</span>
          </>
        ) : (
          <>
            {children}
            {showArrow && (
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
          </>
        )}
      </span>

      {/* Trust badges */}
      {trustBadges && trustBadges.length > 0 && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          {trustBadges.includes('secure') && (
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          )}
          {trustBadges.includes('guarantee') && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
          )}
          {trustBadges.includes('rated') && (
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      )}
    </>
  );

  // Urgency indicator
  const urgencyIndicator = urgencyText && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute -top-8 left-0 right-0 text-center"
    >
      <span className="text-xs text-red-400 font-medium flex items-center justify-center gap-1">
        <Zap className="w-3 h-3" />
        {urgencyText}
      </span>
    </motion.div>
  );

  // Social proof indicator
  const socialProofIndicator = socialProof && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute -bottom-8 left-0 right-0 text-center"
    >
      <AnimatePresence>
        {recentActivity && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-xs text-green-400 font-medium flex items-center justify-center gap-1"
          >
            <Users className="w-3 h-3" />
            {socialProof.count}+ {socialProof.text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Limited time indicator
  const limitedTimeIndicator = limitedTime && timeLeft && (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-1/2 -translate-y-1/2 -left-32"
    >
      <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-1">
        <span className="text-xs text-red-400 font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {limitedTime.text || 'Ends in'} {timeLeft}
        </span>
      </div>
    </motion.div>
  );

  // Determine which element to render
  let buttonElement;

  if (external && href) {
    buttonElement = (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        transition={{ duration: animationSystem.duration.fast }}
        {...commonProps}
      >
        {buttonContent}
      </motion.a>
    );
  } else if (to) {
    buttonElement = (
      <motion.div
        whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        transition={{ duration: animationSystem.duration.fast }}
      >
        <Link
          to={to}
          onClick={e => {
            if (disabled || isLoading) {
              e.preventDefault();
              return;
            }
            onClick?.(e);
          }}
          {...commonProps}
        >
          {buttonContent}
        </Link>
      </motion.div>
    );
  } else {
    buttonElement = (
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        transition={{ duration: animationSystem.duration.fast }}
        {...commonProps}
      >
        {buttonContent}
      </motion.button>
    );
  }

  // Return with wrapper if indicators are present
  if (urgencyText || socialProof || limitedTime) {
    return (
      <div className="relative inline-block">
        {urgencyIndicator}
        {socialProofIndicator}
        {limitedTimeIndicator}
        {buttonElement}
      </div>
    );
  }

  return buttonElement;
};

export default EnhancedCTAButton;