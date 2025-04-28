import { useState, useCallback } from 'react';
import { useAnimation } from 'framer-motion';

export const useServiceAnimation = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const controls = useAnimation();

  const handleHover = useCallback((index: number | null) => {
    setActiveService(index);
    if (index !== null) {
      controls.start({ scale: 1.05 });
    } else {
      controls.start({ scale: 1 });
    }
  }, [controls]);

  return {
    activeService,
    controls,
    handleHover
  };
};