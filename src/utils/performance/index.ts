/**
 * Performance optimization utilities
 * Centralized exports for all performance-related functions and components
 */

// Image optimization
export { generateBlurDataURL, preloadImage, preloadImages, getOptimizedImageUrl, getBestImageFormat } from '../imageUtils';

// Animation performance
export { 
  isLowEndDevice, 
  getOptimizedAnimationSettings, 
  throttleAnimation, 
  createScrollObserver,
  optimizeTransform,
  debounceAnimation,
  requestIdleCallbackShim,
  cancelIdleCallbackShim
} from '../animationPerformance';

// Accessibility
export {
  makeKeyboardAccessible,
  trapFocus,
  announceToScreenReader,
  generateAriaId,
  skipToMainContent,
  prefersReducedMotion,
  getHeadingLevel,
  formatTimeForScreenReader,
  createAccessibleError,
  handleEscapeKey
} from '../accessibility';

// Lazy loading
export { createLazyComponent, LazyComponents, preloadComponent, preloadComponents, usePreloadOnInteraction } from '../lazyLoadComponents';
export { lazyLoad3DComponent, lazy3D } from '../lazyLoad3D';

// Hooks
export { useReducedMotion, getAnimationDuration, getAnimationConfig } from '../../hooks/useReducedMotion';

// Performance monitoring
export const measurePerformance = (markName: string) => {
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(markName);
  }
};

export const measurePerformanceBetween = (startMark: string, endMark: string, measureName: string) => {
  if ('performance' in window && 'measure' in window.performance) {
    try {
      window.performance.measure(measureName, startMark, endMark);
      const measure = window.performance.getEntriesByName(measureName)[0];
      console.log(`${measureName}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (e) {
      console.error('Performance measurement error:', e);
    }
  }
  return null;
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if ('web-vital' in window) {
    // Track Core Web Vitals
    const vitals = ['CLS', 'FID', 'LCP', 'FCP', 'TTFB'];
    vitals.forEach(vital => {
      (window as any).webVitals?.[vital]?.((metric: any) => {
        console.log(`${vital}:`, metric.value);
        // Send to analytics service
      });
    });
  }
};

// Bundle size helpers
export const importWhenVisible = (
  loader: () => Promise<any>,
  elementSelector: string,
  rootMargin = '100px'
) => {
  return new Promise((resolve) => {
    const element = document.querySelector(elementSelector);
    if (!element) {
      resolve(loader());
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          resolve(loader());
        }
      },
      { rootMargin }
    );

    observer.observe(element);
  });
};

// Resource hints
export const addResourceHint = (url: string, type: 'prefetch' | 'preload' | 'preconnect' | 'dns-prefetch') => {
  const link = document.createElement('link');
  link.rel = type;
  link.href = url;
  
  if (type === 'preload') {
    link.as = 'script'; // or 'style', 'image', etc.
  }
  
  document.head.appendChild(link);
};

// Memory management
export const cleanupUnusedAssets = () => {
  // Clean up unused images from memory
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!isElementInViewport(img as HTMLElement)) {
      (img as HTMLImageElement).src = '';
    }
  });
  
  // Trigger garbage collection hint (if available)
  if ('gc' in window) {
    (window as any).gc();
  }
};

const isElementInViewport = (el: HTMLElement): boolean => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};