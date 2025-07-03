/**
 * Mobile optimization utilities for touch interactions, performance, and UX
 */

/**
 * Touch target size requirements
 */
export const TOUCH_TARGET = {
  MIN_SIZE: 44, // Apple's HIG recommendation
  RECOMMENDED_SIZE: 48, // Material Design recommendation
  SPACING: 8, // Minimum spacing between targets
} as const;

/**
 * Mobile breakpoints
 */
export const MOBILE_BREAKPOINTS = {
  SMALL: 320,
  MEDIUM: 375,
  LARGE: 414,
  LANDSCAPE: 812,
} as const;

/**
 * Check if device supports hover
 */
export const supportsHover = (): boolean => {
  return window.matchMedia('(hover: hover)').matches;
};

/**
 * Check if device has touch support
 */
export const supportsTouch = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get safe area insets for notched devices
 */
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    top: parseInt(style.getPropertyValue('--sat') || '0'),
    right: parseInt(style.getPropertyValue('--sar') || '0'),
    bottom: parseInt(style.getPropertyValue('--sab') || '0'),
    left: parseInt(style.getPropertyValue('--sal') || '0'),
  };
};

/**
 * Debounce function for touch events
 */
export const debounceTouch = <T extends (...args: any[]) => any>(
  func: T,
  wait: number = 100
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for scroll events
 */
export const throttleScroll = <T extends (...args: any[]) => any>(
  func: T,
  limit: number = 16 // ~60fps
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Prevent bounce scroll on iOS
 */
export const preventBounceScroll = (element: HTMLElement): void => {
  let startY = 0;

  element.addEventListener('touchstart', (e) => {
    startY = e.touches[0].pageY;
  }, { passive: false });

  element.addEventListener('touchmove', (e) => {
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const height = element.clientHeight;
    const isScrollable = scrollHeight > height;
    
    if (!isScrollable) {
      e.preventDefault();
      return;
    }

    const deltaY = e.touches[0].pageY - startY;
    const isAtTop = deltaY > 0 && scrollTop === 0;
    const isAtBottom = deltaY < 0 && scrollTop + height >= scrollHeight;

    if (isAtTop || isAtBottom) {
      e.preventDefault();
    }
  }, { passive: false });
};

/**
 * Format phone number for tel: links
 */
export const formatPhoneForLink = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Get viewport dimensions accounting for mobile browser UI
 */
export const getViewportDimensions = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    vh,
    vw: window.innerWidth * 0.01,
  };
};

/**
 * Detect if keyboard is visible (mobile)
 */
export const isKeyboardVisible = (): boolean => {
  const threshold = 150;
  const viewport = window.visualViewport;
  
  if (viewport) {
    return window.innerHeight - viewport.height > threshold;
  }
  
  // Fallback for older browsers
  return window.innerHeight < window.screen.height * 0.75;
};

/**
 * Haptic feedback for supported devices
 */
export const triggerHapticFeedback = (
  type: 'light' | 'medium' | 'heavy' = 'light'
): void => {
  if ('vibrate' in navigator) {
    const durations = {
      light: 10,
      medium: 20,
      heavy: 30,
    };
    navigator.vibrate(durations[type]);
  }
};

/**
 * Check if element is in thumb reach zone
 */
export const isInThumbReach = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  
  // Bottom 60% of screen is easier to reach
  const isVerticallyReachable = rect.top > viewportHeight * 0.4;
  
  // Center 80% of screen width is easier to reach
  const horizontalMargin = viewportWidth * 0.1;
  const isHorizontallyReachable = 
    rect.left > horizontalMargin && 
    rect.right < viewportWidth - horizontalMargin;
  
  return isVerticallyReachable && isHorizontallyReachable;
};

/**
 * Optimize image for mobile
 */
export const getMobileImageSize = (originalWidth: number): number => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const viewportWidth = window.innerWidth;
  
  // Cap at 2x for performance
  const effectiveDPR = Math.min(devicePixelRatio, 2);
  
  // Mobile optimization
  if (viewportWidth <= MOBILE_BREAKPOINTS.SMALL) {
    return Math.min(originalWidth, 640 * effectiveDPR);
  } else if (viewportWidth <= MOBILE_BREAKPOINTS.LARGE) {
    return Math.min(originalWidth, 828 * effectiveDPR);
  }
  
  return originalWidth;
};

/**
 * Lock body scroll (useful for modals)
 */
export const lockBodyScroll = (): (() => void) => {
  const scrollY = window.scrollY;
  const body = document.body;
  
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  
  return () => {
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflow = '';
    window.scrollTo(0, scrollY);
  };
};

/**
 * Get orientation
 */
export const getOrientation = (): 'portrait' | 'landscape' => {
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Monitor orientation changes
 */
export const onOrientationChange = (
  callback: (orientation: 'portrait' | 'landscape') => void
): (() => void) => {
  const handleChange = () => callback(getOrientation());
  
  window.addEventListener('orientationchange', handleChange);
  window.addEventListener('resize', handleChange);
  
  return () => {
    window.removeEventListener('orientationchange', handleChange);
    window.removeEventListener('resize', handleChange);
  };
};