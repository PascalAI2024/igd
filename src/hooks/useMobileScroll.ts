import { useEffect, useCallback, useRef } from 'react';
import { throttleScroll } from '../utils/mobileOptimizations';

interface UseMobileScrollOptions {
  threshold?: number;
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onScrollEnd?: () => void;
  enableMomentumScroll?: boolean;
}

/**
 * Hook for handling mobile scroll events with optimizations
 */
export const useMobileScroll = (options: UseMobileScrollOptions = {}) => {
  const {
    threshold = 50,
    onScrollUp,
    onScrollDown,
    onScrollEnd,
    enableMomentumScroll = true
  } = options;

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const isScrolling = useRef(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const difference = currentScrollY - lastScrollY.current;

    // Detect scroll direction
    if (Math.abs(difference) > threshold) {
      if (difference > 0 && onScrollDown) {
        onScrollDown();
      } else if (difference < 0 && onScrollUp) {
        onScrollUp();
      }
      lastScrollY.current = currentScrollY;
    }

    // Detect scroll end
    if (!isScrolling.current) {
      isScrolling.current = true;
    }

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set timeout for scroll end detection
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      if (onScrollEnd) {
        onScrollEnd();
      }
    }, 150);
  }, [threshold, onScrollUp, onScrollDown, onScrollEnd]);

  useEffect(() => {
    const throttledScroll = throttleScroll(handleScroll, 16); // 60fps

    // Add passive listener for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Handle iOS momentum scrolling
    if (enableMomentumScroll) {
      (document.body.style as any).webkitOverflowScrolling = 'touch';
    }

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll, enableMomentumScroll]);

  // Return scroll utilities
  return {
    scrollToTop: (smooth = true) => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
      });
    },
    scrollToElement: (elementId: string, offset = 0, smooth = true) => {
      const element = document.getElementById(elementId);
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top,
          behavior: smooth ? 'smooth' : 'auto'
        });
      }
    },
    disableScroll: () => {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    },
    enableScroll: () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  };
};