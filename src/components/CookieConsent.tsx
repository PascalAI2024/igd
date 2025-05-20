import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { setUserConsent, checkExistingConsent } from '../utils/analytics';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already provided consent
    const hasConsent = checkExistingConsent();
    
    if (!hasConsent) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    setUserConsent(true);
    setIsVisible(false);
  };
  
  const declineCookies = () => {
    setUserConsent(false);
    setIsVisible(false);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/90 backdrop-blur-sm border-t border-white/10"
        >
          <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1">Cookie Consent</h3>
              <p className="text-gray-300 text-sm">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                <a href="/privacy" className="text-red-400 ml-1 underline">
                  Learn more about how we use cookies
                </a>
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <button
                onClick={declineCookies}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
              >
                Accept All
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="sm:hidden inline-flex items-center justify-center p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;