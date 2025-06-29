import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward } from 'lucide-react';

const LightweightLoadingSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Loading...');
  
  const messages = [
    'Loading...',
    'Preparing content...',
    'Almost ready...'
  ];

  useEffect(() => {
    let messageIndex = 0;
    const totalDuration = 4000; // 4 seconds total for better readability
    const messageInterval = totalDuration / messages.length;
    
    const interval = setInterval(() => {
      if (messageIndex < messages.length) {
        setCurrentMessage(messages[messageIndex]);
        setProgress(((messageIndex + 1) / messages.length) * 100);
        messageIndex++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, messageInterval);

    // Auto-complete after max time
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, totalDuration + 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        exit={{
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: 'easeOut'
          }
        }}
      >
        <div className="text-center px-4">
          {/* Simple logo or spinner */}
          <div className="w-16 h-16 mx-auto mb-6">
            <motion.div
              className="w-full h-full border-4 border-red-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Loading text */}
          <h2 className="text-red-500 font-mono text-lg mb-4">
            {currentMessage}
          </h2>

          {/* Progress bar */}
          <div className="w-64 mx-auto mb-6">
            <div className="h-1 bg-red-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Skip button - always visible */}
          <motion.button
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-6 py-3 bg-red-500/30 border-2 border-red-500 rounded-md text-red-500 font-medium flex items-center justify-center mx-auto hover:bg-red-500/40 transition-all duration-200"
            aria-label="Skip loading"
          >
            <span>Enter Site</span>
            <SkipForward className="ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightweightLoadingSequence;