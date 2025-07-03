import React, { useState, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '../../utils/cn';
import { 
  TOUCH_TARGET, 
  triggerHapticFeedback,
  supportsTouch 
} from '../../utils/mobileOptimizations';

interface MobileTouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onLongPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hapticFeedback?: boolean;
  rippleEffect?: boolean;
  touchActiveScale?: number;
  ariaLabel?: string;
}

/**
 * Enhanced mobile-optimized button with touch gestures and feedback
 */
const MobileTouchButton: React.FC<MobileTouchButtonProps> = ({
  children,
  onClick,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  className,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  hapticFeedback = true,
  rippleEffect = true,
  touchActiveScale = 0.95,
  ariaLabel,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  // Size classes ensuring minimum touch target
  const sizeClasses = {
    small: `min-h-[${TOUCH_TARGET.MIN_SIZE}px] px-4 py-2 text-sm`,
    medium: `min-h-[${TOUCH_TARGET.RECOMMENDED_SIZE}px] px-6 py-3 text-base`,
    large: 'min-h-[56px] px-8 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-red-600 text-white shadow-lg active:bg-red-700',
    secondary: 'bg-white/10 text-white border border-white/20 active:bg-white/20',
    ghost: 'text-gray-300 hover:text-white active:bg-white/10',
  };

  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;
    
    setIsPressed(true);
    
    // Haptic feedback
    if (hapticFeedback && supportsTouch()) {
      triggerHapticFeedback('light');
    }

    // Create ripple effect
    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const id = rippleId.current++;
      
      setRipples(prev => [...prev, { x, y, id }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }

    // Long press detection
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        if (hapticFeedback) {
          triggerHapticFeedback('heavy');
        }
        onLongPress();
        setIsPressed(false);
      }, 500);
    }
  }, [disabled, hapticFeedback, rippleEffect, onLongPress]);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  // Handle pan gestures for swipe
  const handlePan = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    
    if (info.offset.x > threshold && onSwipeRight) {
      if (hapticFeedback) {
        triggerHapticFeedback('medium');
      }
      onSwipeRight();
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      if (hapticFeedback) {
        triggerHapticFeedback('medium');
      }
      onSwipeLeft();
    }
  }, [onSwipeLeft, onSwipeRight, hapticFeedback]);

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-lg font-medium',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black',
        'select-none touch-manipulation', // Prevent text selection and optimize touch
        sizeClasses[size],
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onClick={disabled ? undefined : onClick}
      onPan={handlePan}
      disabled={disabled}
      aria-label={ariaLabel}
      whileTap={disabled ? {} : { scale: touchActiveScale }}
      style={{
        WebkitTapHighlightColor: 'transparent', // Remove iOS tap highlight
      }}
    >
      {/* Ripple effects */}
      {rippleEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              className="absolute bg-white/30 rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ 
                width: 200, 
                height: 200, 
                opacity: 0 
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {/* Touch feedback overlay */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPressed ? 0.1 : 0 }}
        transition={{ duration: 0.1 }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default MobileTouchButton;