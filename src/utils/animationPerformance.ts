/**
 * Animation performance utilities
 */

/**
 * Check if device is low-end based on various factors
 */
export const isLowEndDevice = (): boolean => {
  // Check for low memory
  const memoryInfo = (navigator as any).deviceMemory;
  if (memoryInfo && memoryInfo < 4) {
    return true;
  }

  // Check for low core count
  const hardwareConcurrency = navigator.hardwareConcurrency;
  if (hardwareConcurrency && hardwareConcurrency < 4) {
    return true;
  }

  // Check connection speed
  const connection = (navigator as any).connection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') {
      return true;
    }
  }

  // Check if mobile device with touch
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth < 768;
  
  return isMobile && isSmallScreen;
};

/**
 * Get optimized animation settings based on device capabilities
 */
export const getOptimizedAnimationSettings = () => {
  const isLowEnd = isLowEndDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return {
      enableAnimations: false,
      enableParticles: false,
      enableBlur: false,
      enable3D: false,
      transitionDuration: 0,
      staggerDelay: 0,
    };
  }

  if (isLowEnd) {
    return {
      enableAnimations: true,
      enableParticles: false,
      enableBlur: false,
      enable3D: false,
      transitionDuration: 0.2,
      staggerDelay: 0.05,
    };
  }

  return {
    enableAnimations: true,
    enableParticles: true,
    enableBlur: true,
    enable3D: true,
    transitionDuration: 0.3,
    staggerDelay: 0.1,
  };
};

/**
 * Throttle function for animations
 */
export const throttleAnimation = (callback: Function, delay: number) => {
  let lastCall = 0;
  let animationFrameId: number | null = null;

  return (...args: any[]) => {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    } else if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(() => {
        lastCall = Date.now();
        callback(...args);
        animationFrameId = null;
      });
    }
  };
};

/**
 * Create performant scroll observer
 */
export const createScrollObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);

  return observer;
};

/**
 * Optimize CSS transforms for GPU acceleration
 */
export const optimizeTransform = (transform: string): string => {
  // Ensure transform includes translateZ for GPU layer
  if (!transform.includes('translateZ') && !transform.includes('translate3d')) {
    return `${transform} translateZ(0)`;
  }
  return transform;
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Debounce function for resize/scroll handlers
 */
export const debounceAnimation = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Request idle callback with fallback
 */
export const requestIdleCallbackShim = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  
  // Fallback for browsers that don't support requestIdleCallback
  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    } as IdleDeadline);
  }, 1) as unknown as number;
};

/**
 * Cancel idle callback with fallback
 */
export const cancelIdleCallbackShim = (handle: number): void => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(handle);
  } else {
    clearTimeout(handle);
  }
};