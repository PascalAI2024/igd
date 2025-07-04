import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, Clock, MapPin, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';
import MobileTouchButton from './ui/MobileTouchButton';
import { getOrientation, onOrientationChange, triggerHapticFeedback } from '../utils/mobileOptimizations';

interface MobileCTASectionProps {
  phoneNumber?: string;
  showSchedule?: boolean;
  className?: string;
  position?: 'bottom' | 'floating';
}

const MobileCTASection: React.FC<MobileCTASectionProps> = ({
  phoneNumber = '(208) 555-0123',
  showSchedule = true,
  className,
  position = 'floating'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [orientation, setOrientation] = useState(getOrientation());
  const [businessHours, setBusinessHours] = useState<'open' | 'closed'>('open');
  const shouldReduceMotion = useReducedMotion();

  // Double-check we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Monitor orientation changes
  useEffect(() => {
    const cleanup = onOrientationChange(setOrientation);
    return cleanup;
  }, []);

  // Check business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const day = now.getDay();
      
      // Mon-Fri 8am-6pm, Sat 9am-2pm, closed Sunday
      if (day === 0) {
        setBusinessHours('closed');
      } else if (day === 6) {
        setBusinessHours(hours >= 9 && hours < 14 ? 'open' : 'closed');
      } else {
        setBusinessHours(hours >= 8 && hours < 18 ? 'open' : 'closed');
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleCall = useCallback(() => {
    triggerHapticFeedback('medium');
    window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
  }, [phoneNumber]);

  const handleContact = useCallback(() => {
    triggerHapticFeedback('medium');
    window.location.href = '/contact';
  }, []);

  const handleSchedule = useCallback(() => {
    triggerHapticFeedback('medium');
    window.location.href = '/contact#schedule';
  }, []);

  const handleDirections = useCallback(() => {
    triggerHapticFeedback('medium');
    window.open('https://maps.google.com/?q=Ingenious+Digital+Boise+ID', '_blank');
  }, []);

  // Don't render on desktop
  if (!isMobile) {
    return null;
  }

  if (position === 'floating') {
    return (
      <>
        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: shouldReduceMotion ? 0 : 1, 
            type: shouldReduceMotion ? 'tween' : 'spring',
            duration: shouldReduceMotion ? 0.1 : 0.5
          }}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            orientation === 'landscape' && 'bottom-4 right-4',
            className
          )}
        >
          <MobileTouchButton
            onClick={() => setIsExpanded(!isExpanded)}
            variant="primary"
            size="large"
            className="rounded-full w-14 h-14 p-0 shadow-2xl transform-gpu"
            hapticFeedback
            ariaLabel="Contact options"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              {isExpanded ? <ChevronUp className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
            </motion.div>
          </MobileTouchButton>

          {/* Business Hours Indicator */}
          <div className={cn(
            'absolute -top-1 -right-1 w-3 h-3 rounded-full',
            businessHours === 'open' ? 'bg-green-500' : 'bg-gray-500',
            'animate-pulse'
          )} />

          {/* Expanded Options */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ 
                  type: shouldReduceMotion ? 'tween' : 'spring', 
                  damping: 25,
                  duration: shouldReduceMotion ? 0.1 : undefined
                }}
                className="absolute bottom-16 right-0 space-y-3 z-50"
              >
                {/* Call Button */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1 rounded-lg whitespace-nowrap">
                    Call Now
                  </span>
                  <MobileTouchButton
                    onClick={handleCall}
                    variant="primary"
                    size="medium"
                    className="rounded-full w-12 h-12 p-0 bg-green-600 hover:bg-green-700"
                    hapticFeedback
                  >
                    <Phone className="w-5 h-5" />
                  </MobileTouchButton>
                </motion.div>

                {/* Contact Button */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1 rounded-lg whitespace-nowrap">
                    Contact Us
                  </span>
                  <MobileTouchButton
                    onClick={handleContact}
                    variant="primary"
                    size="medium"
                    className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700"
                    hapticFeedback
                  >
                    <MessageCircle className="w-5 h-5" />
                  </MobileTouchButton>
                </motion.div>

                {/* Schedule Button */}
                {showSchedule && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-white text-sm font-medium bg-black/80 px-3 py-1 rounded-lg whitespace-nowrap">
                      Schedule
                    </span>
                    <MobileTouchButton
                      onClick={handleSchedule}
                      variant="primary"
                      size="medium"
                      className="rounded-full w-12 h-12 p-0 bg-purple-600 hover:bg-purple-700"
                      hapticFeedback
                    >
                      <Calendar className="w-5 h-5" />
                    </MobileTouchButton>
                  </motion.div>
                )}

                {/* Directions Button */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-white text-sm font-medium bg-black/80 px-3 py-1 rounded-lg whitespace-nowrap">
                    Directions
                  </span>
                  <MobileTouchButton
                    onClick={handleDirections}
                    variant="primary"
                    size="medium"
                    className="rounded-full w-12 h-12 p-0 bg-orange-600 hover:bg-orange-700"
                    hapticFeedback
                  >
                    <MapPin className="w-5 h-5" />
                  </MobileTouchButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </>
    );
  }

  // Static bottom bar variant
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: shouldReduceMotion ? 'tween' : 'spring', 
        damping: 30,
        duration: shouldReduceMotion ? 0.1 : undefined
      }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-black/95 backdrop-blur-md border-t border-white/10',
        'px-4 py-3',
        orientation === 'landscape' && 'py-2',
        className
      )}
    >
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between gap-3">
          {/* Call Button */}
          <MobileTouchButton
            onClick={handleCall}
            variant="primary"
            size="medium"
            className="flex-1"
            hapticFeedback
          >
            <Phone className="w-5 h-5 mr-2" />
            <span>Call Now</span>
          </MobileTouchButton>

          {/* Contact Button */}
          <MobileTouchButton
            onClick={handleContact}
            variant="secondary"
            size="medium"
            className="flex-1"
            hapticFeedback
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            <span>Contact</span>
          </MobileTouchButton>

          {/* Schedule Button */}
          {showSchedule && (
            <MobileTouchButton
              onClick={handleSchedule}
              variant="secondary"
              size="medium"
              className="flex-1"
              hapticFeedback
            >
              <Calendar className="w-5 h-5" />
            </MobileTouchButton>
          )}
        </div>

        {/* Business Hours */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <Clock className="w-3 h-3" />
            {businessHours === 'open' ? (
              <span>We're Open! Mon-Fri 8-6, Sat 9-2</span>
            ) : (
              <span>Currently Closed - Leave a Message</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileCTASection;