import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { 
  lockBodyScroll, 
  preventBounceScroll,
  triggerHapticFeedback,
  TOUCH_TARGET 
} from '../../utils/mobileOptimizations';
import MobileTouchButton from './MobileTouchButton';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
  swipeToClose?: boolean;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  position?: 'center' | 'bottom' | 'top';
}

/**
 * Mobile-optimized modal component with touch gestures
 */
const MobileModal: React.FC<MobileModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  fullScreen = false,
  swipeToClose = true,
  closeOnBackdrop = true,
  showCloseButton = true,
  position = 'center'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const unlock = lockBodyScroll();
      return unlock;
    }
  }, [isOpen]);

  // Prevent bounce scroll on modal content
  useEffect(() => {
    if (contentRef.current && isOpen) {
      preventBounceScroll(contentRef.current);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        triggerHapticFeedback('light');
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle swipe to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = 500;

    if (position === 'bottom' && info.offset.y > threshold && info.velocity.y > velocity) {
      triggerHapticFeedback('light');
      onClose();
    } else if (position === 'top' && info.offset.y < -threshold && info.velocity.y < -velocity) {
      triggerHapticFeedback('light');
      onClose();
    } else if (position === 'center' && Math.abs(info.offset.y) > threshold) {
      triggerHapticFeedback('light');
      onClose();
    }
  };

  // Position-specific animations
  const getAnimationVariants = () => {
    switch (position) {
      case 'bottom':
        return {
          initial: { y: '100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '100%', opacity: 0 }
        };
      case 'top':
        return {
          initial: { y: '-100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '-100%', opacity: 0 }
        };
      default:
        return {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.9, opacity: 0 }
        };
    }
  };

  const variants = getAnimationVariants();

  // Position classes
  const positionClasses = {
    center: 'items-center justify-center p-4',
    bottom: 'items-end justify-end',
    top: 'items-start justify-start'
  };

  const modalClasses = cn(
    fullScreen ? 'w-full h-full' : 'w-full max-w-lg',
    position === 'bottom' && !fullScreen && 'rounded-t-2xl',
    position === 'top' && !fullScreen && 'rounded-b-2xl',
    position === 'center' && !fullScreen && 'rounded-2xl mx-4',
    'bg-black/95 backdrop-blur-md',
    'border border-white/10',
    'max-h-[90vh]',
    'flex flex-col',
    'relative',
    'overflow-hidden',
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeOnBackdrop ? onClose : undefined}
            style={{ touchAction: 'none' }}
          />

          {/* Modal Container */}
          <div 
            className={cn(
              'fixed inset-0 z-50 flex',
              positionClasses[position]
            )}
            style={{ touchAction: 'none' }}
          >
            <motion.div
              ref={modalRef}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              drag={swipeToClose ? 'y' : false}
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={swipeToClose ? handleDragEnd : undefined}
              className={modalClasses}
              style={{ 
                WebkitOverflowScrolling: 'touch',
                // Add safe area padding for notched devices
                paddingTop: fullScreen ? 'env(safe-area-inset-top)' : undefined,
                paddingBottom: fullScreen ? 'env(safe-area-inset-bottom)' : undefined,
              }}
            >
              {/* Drag Handle for bottom sheet */}
              {position === 'bottom' && swipeToClose && (
                <div className="w-full py-3 flex justify-center">
                  <div className="w-12 h-1 bg-white/20 rounded-full" />
                </div>
              )}

              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  {title && (
                    <h2 className="text-lg font-semibold text-white">
                      {title}
                    </h2>
                  )}
                  
                  {showCloseButton && (
                    <MobileTouchButton
                      onClick={onClose}
                      variant="ghost"
                      size="small"
                      className={cn(
                        'p-2',
                        `min-w-[${TOUCH_TARGET.MIN_SIZE}px]`,
                        `min-h-[${TOUCH_TARGET.MIN_SIZE}px]`,
                        !title && 'ml-auto'
                      )}
                      ariaLabel="Close modal"
                      hapticFeedback
                    >
                      <X className="w-5 h-5" />
                    </MobileTouchButton>
                  )}
                </div>
              )}

              {/* Content */}
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto overscroll-contain p-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileModal;