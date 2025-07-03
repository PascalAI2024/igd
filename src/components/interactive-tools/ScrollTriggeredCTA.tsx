import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowRight, X, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';

interface ScrollTriggeredCTAProps {
  triggerPercentage?: number; // Percentage of page scrolled before showing
  delay?: number; // Delay in ms after reaching trigger point
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  variant?: 'banner' | 'floating' | 'slide-in';
}

const ScrollTriggeredCTA: React.FC<ScrollTriggeredCTAProps> = ({
  triggerPercentage = 50,
  delay = 500,
  position = 'bottom-right',
  variant = 'floating'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Check if CTA was dismissed in this session
    const dismissed = sessionStorage.getItem('scrollCTADismissed');
    if (dismissed === 'true') {
      setHasBeenDismissed(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const percentage = progress * 100;
      
      if (percentage >= triggerPercentage && !isVisible && !hasBeenDismissed) {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    });

    return () => {
      unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollYProgress, triggerPercentage, delay, isVisible, hasBeenDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
    sessionStorage.setItem('scrollCTADismissed', 'true');
  };

  const handleAction = (action: string) => {
    console.log(`CTA Action: ${action}`);
    // Track the action for analytics
    // You can implement actual navigation or modal opening here
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-8 left-8';
      case 'bottom-center':
        return 'bottom-8 left-1/2 -translate-x-1/2';
      default:
        return 'bottom-8 right-8';
    }
  };

  const renderFloatingVariant = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ type: 'spring', damping: 15 }}
      className={`fixed ${getPositionClasses()} z-40 max-w-sm`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to grow your business?
          </h3>
          <p className="text-gray-600 mb-4">
            Get a free consultation with our digital marketing experts
          </p>
          
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction('schedule')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </motion.button>
            
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction('call')}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Now
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction('chat')}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Live Chat
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderBannerVariant = () => (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-40"
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center">
              <p className="text-sm sm:text-base">
                <span className="font-semibold">Limited Time Offer:</span> Get 20% off your first month of services!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
              >
                Claim Offer
              </motion.a>
              <button
                onClick={handleDismiss}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSlideInVariant = () => (
    <motion.div
      initial={{ x: position.includes('right') ? 400 : -400 }}
      animate={{ x: 0 }}
      exit={{ x: position.includes('right') ? 400 : -400 }}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed ${getPositionClasses()} z-40`}
    >
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-l-2xl shadow-2xl p-6 max-w-xs">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <h4 className="font-bold text-lg mb-2">Need help choosing?</h4>
        <p className="text-sm text-blue-100 mb-4">
          Our experts can guide you to the perfect solution
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAction('contact')}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold w-full flex items-center justify-center hover:shadow-lg transition-shadow"
        >
          <Mail className="w-4 h-4 mr-2" />
          Get Expert Advice
        </motion.button>
      </div>
    </motion.div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'banner':
        return renderBannerVariant();
      case 'slide-in':
        return renderSlideInVariant();
      default:
        return renderFloatingVariant();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && !hasBeenDismissed && renderVariant()}
    </AnimatePresence>
  );
};

export default ScrollTriggeredCTA;