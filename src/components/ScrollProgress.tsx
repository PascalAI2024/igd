import React, { useEffect, useState, useCallback } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const prevProgressRef = React.useRef(0);
  const frameIdRef = React.useRef<number>(0);
  
  // Throttled update function to improve performance
  const updateProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return; // Avoid division by zero
    
    const scrolled = window.scrollY;
    const currentProgress = Math.min(Math.max((scrolled / scrollHeight) * 100, 0), 100);
    
    // Only update state if progress changed by at least 0.5%
    if (Math.abs(currentProgress - prevProgressRef.current) > 0.5) {
      prevProgressRef.current = currentProgress;
      setProgress(currentProgress);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!frameIdRef.current) {
        frameIdRef.current = requestAnimationFrame(() => {
          updateProgress();
          frameIdRef.current = 0;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress(); // Initial update

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = 0;
      }
    };
  }, [updateProgress]);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 z-50"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;