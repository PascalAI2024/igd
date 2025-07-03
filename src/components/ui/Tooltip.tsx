import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

export type TooltipVariant = 'info' | 'help' | 'warning' | 'success';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  variant?: TooltipVariant;
  position?: TooltipPosition;
  delay?: number;
  showIcon?: boolean;
  maxWidth?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  variant = 'info',
  position = 'top',
  delay = 300,
  showIcon = true,
  maxWidth = 300,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case 'help':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          text: 'text-blue-100',
          icon: <HelpCircle className="w-4 h-4 text-blue-400" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
          text: 'text-yellow-100',
          icon: <AlertCircle className="w-4 h-4 text-yellow-400" />
        };
      case 'success':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          text: 'text-green-100',
          icon: <CheckCircle className="w-4 h-4 text-green-400" />
        };
      default:
        return {
          bg: 'bg-gray-800/90',
          border: 'border-gray-700',
          text: 'text-gray-100',
          icon: <Info className="w-4 h-4 text-gray-400" />
        };
    }
  };

  const getPositionStyles = () => {
    const positions = {
      top: {
        initial: { opacity: 0, y: 10, x: '-50%' },
        animate: { opacity: 1, y: 0, x: '-50%' },
        exit: { opacity: 0, y: 10, x: '-50%' },
        className: 'bottom-full left-1/2 mb-2'
      },
      bottom: {
        initial: { opacity: 0, y: -10, x: '-50%' },
        animate: { opacity: 1, y: 0, x: '-50%' },
        exit: { opacity: 0, y: -10, x: '-50%' },
        className: 'top-full left-1/2 mt-2'
      },
      left: {
        initial: { opacity: 0, x: 10, y: '-50%' },
        animate: { opacity: 1, x: 0, y: '-50%' },
        exit: { opacity: 0, x: 10, y: '-50%' },
        className: 'right-full top-1/2 mr-2'
      },
      right: {
        initial: { opacity: 0, x: -10, y: '-50%' },
        animate: { opacity: 1, x: 0, y: '-50%' },
        exit: { opacity: 0, x: -10, y: '-50%' },
        className: 'left-full top-1/2 ml-2'
      }
    };

    return positions[calculatedPosition];
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Check viewport boundaries and adjust position if needed
  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !triggerRef.current) return;

    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = position;

    // Check horizontal overflow
    if (position === 'right' && triggerRect.right + tooltipRect.width > viewportWidth) {
      newPosition = 'left';
    } else if (position === 'left' && triggerRect.left - tooltipRect.width < 0) {
      newPosition = 'right';
    }

    // Check vertical overflow
    if (position === 'top' && triggerRect.top - tooltipRect.height < 0) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight) {
      newPosition = 'top';
    }

    if (newPosition !== calculatedPosition) {
      setCalculatedPosition(newPosition);
    }
  }, [isVisible, position, calculatedPosition]);

  const styles = getVariantStyles();
  const positionStyles = getPositionStyles();

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={positionStyles.initial}
            animate={positionStyles.animate}
            exit={positionStyles.exit}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute z-50 ${positionStyles.className} pointer-events-none`}
            style={{ maxWidth }}
          >
            <div
              className={`
                ${styles.bg} ${styles.border} ${styles.text}
                backdrop-blur-sm border rounded-lg shadow-xl
                px-3 py-2 text-sm
              `}
            >
              {showIcon && (
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
                  <div className="flex-1">{content}</div>
                </div>
              )}
              {!showIcon && content}

              {/* Arrow */}
              <div
                className={`
                  absolute w-0 h-0 border-solid
                  ${calculatedPosition === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-8 border-x-8 border-x-transparent border-b-0' : ''}
                  ${calculatedPosition === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-8 border-x-8 border-x-transparent border-t-0' : ''}
                  ${calculatedPosition === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-8 border-y-8 border-y-transparent border-r-0' : ''}
                  ${calculatedPosition === 'right' ? 'right-full top-1/2 -translate-y-1/2 border-r-8 border-y-8 border-y-transparent border-l-0' : ''}
                `}
                style={{
                  borderTopColor: calculatedPosition === 'top' ? (variant === 'info' ? '#1f2937' : 'inherit') : 'transparent',
                  borderBottomColor: calculatedPosition === 'bottom' ? (variant === 'info' ? '#1f2937' : 'inherit') : 'transparent',
                  borderLeftColor: calculatedPosition === 'left' ? (variant === 'info' ? '#1f2937' : 'inherit') : 'transparent',
                  borderRightColor: calculatedPosition === 'right' ? (variant === 'info' ? '#1f2937' : 'inherit') : 'transparent'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Convenience component for inline tooltips with icons
export const TooltipIcon: React.FC<Omit<TooltipProps, 'children'> & { iconClassName?: string }> = ({
  iconClassName = '',
  ...props
}) => {
  const { icon } = getVariantStyles(props.variant || 'info');
  
  return (
    <Tooltip {...props}>
      <span className={`inline-flex items-center justify-center cursor-help ${iconClassName}`}>
        {React.cloneElement(icon, { className: 'w-4 h-4' })}
      </span>
    </Tooltip>
  );
};

function getVariantStyles(variant: TooltipVariant) {
  switch (variant) {
    case 'help':
      return { icon: <HelpCircle /> };
    case 'warning':
      return { icon: <AlertCircle /> };
    case 'success':
      return { icon: <CheckCircle /> };
    default:
      return { icon: <Info /> };
  }
}

export default Tooltip;