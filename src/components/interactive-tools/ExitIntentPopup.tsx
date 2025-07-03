import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Download, Mail, Clock, Percent } from 'lucide-react';

interface ExitIntentPopupProps {
  delay?: number;
  cookieDuration?: number; // Days before showing again
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ 
  delay = 1000, 
  cookieDuration = 7 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if popup has been shown recently
    const lastShown = localStorage.getItem('exitIntentLastShown');
    if (lastShown) {
      const daysSinceShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceShown < cookieDuration) {
        return;
      }
    }

    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('exitIntentSubscribed');
    if (hasSubscribed === 'true') {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !hasTriggered) {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
          setHasTriggered(true);
          localStorage.setItem('exitIntentLastShown', Date.now().toString());
        }, delay);
      }
    };

    const handleMouseEnter = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Add event listeners
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Mobile exit intent - detect when user scrolls up quickly
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = lastScrollY - currentScrollY;
      
      // If user scrolls up quickly near top of page
      if (scrollVelocity > 50 && currentScrollY < 200 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        localStorage.setItem('exitIntentLastShown', Date.now().toString());
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, cookieDuration, hasTriggered]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    localStorage.setItem('exitIntentSubscribed', 'true');
    
    // Auto-close after success
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, [email]);

  const offers = [
    {
      icon: <Percent className="w-6 h-6" />,
      text: '20% off your first project'
    },
    {
      icon: <Download className="w-6 h-6" />,
      text: 'Free digital marketing guide'
    },
    {
      icon: <Gift className="w-6 h-6" />,
      text: 'Exclusive industry insights'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Wait! Don't miss out!</h2>
              <p className="text-blue-100">Get exclusive offers before you go</p>
            </div>

            <div className="p-8">
              {!isSubmitted ? (
                <>
                  {/* Offers */}
                  <div className="mb-6 space-y-3">
                    {offers.map((offer, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 text-gray-700"
                      >
                        <div className="text-blue-600">{offer.icon}</div>
                        <span>{offer.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="exit-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter your email to claim these offers
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="exit-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Processing...
                        </span>
                      ) : (
                        'Claim Your Offers'
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>

                  {/* Urgency */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 flex items-center justify-center text-sm text-gray-600"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Offers expire in 24 hours</span>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Success!</h3>
                  <p className="text-gray-600 mb-4">Check your email for your exclusive offers</p>
                  <p className="text-sm text-gray-500">This popup will close automatically...</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;