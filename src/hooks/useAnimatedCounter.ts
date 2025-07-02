import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseAnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const useAnimatedCounter = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = ''
}: UseAnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const startValue = 0;
      const endValue = end;
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = startValue + (endValue - startValue) * easeOutQuart;
          setCount(currentValue);
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };
      
      animate();
    }
  }, [isInView, end, duration]);

  const displayValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { ref, displayValue };
};