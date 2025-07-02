import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent * 100);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-red-500 to-purple-500"
        style={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      />
    </motion.div>
  );
};

export default ReadingProgress;