import { useState, useEffect, useRef, useCallback } from 'react';
import { trackPerformance } from './analytics';

interface PerformanceEntryWithStart extends PerformanceEntry {
  processingStart?: number;
  responseStart?: number;
  requestStart?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

/**
 * Performance utilities for optimizing the application
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Get device performance score
export const getDevicePerformance = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'high';
  
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  if (memory && memory < 4) return 'low';
  if (cores && cores < 4) return 'low';
  if (memory && memory >= 8 && cores && cores >= 8) return 'high';
  
  return 'medium';
};

// Image optimization with blur placeholder
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
};

// Lazy loading hook
export const useLazyLoad = (
  threshold: number = 0.1,
  rootMargin: string = '50px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
};

// Animation performance hook
export const useAnimationPerformance = () => {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;
    
    const measureFPS = () => {
      frameCount.current++;
      
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime.current;
      
      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / elapsed);
        setFps(currentFps);
        setIsLowPerformance(currentFps < 30);
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };
    
    animationId = requestAnimationFrame(measureFPS);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return { fps, isLowPerformance, devicePerformance: getDevicePerformance() };
};

// Debounce hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        lastRun.current = Date.now();
        return callback(...args);
      }
    }) as T,
    [callback, delay]
  );
};

// Memory usage monitor
export const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    if (!('memory' in performance)) return;

    const updateMemory = () => {
      const memory = (performance as any).memory;
      if (memory) {
        const used = memory.usedJSHeapSize;
        const total = memory.totalJSHeapSize;
        const percentage = (used / total) * 100;
        
        setMemoryUsage({ used, total, percentage });
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryUsage;
};

// Network speed detection
export const getNetworkSpeed = (): 'fast' | 'slow' | 'unknown' => {
  if (!('connection' in navigator)) return 'unknown';
  
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;
  
  if (effectiveType === '4g') return 'fast';
  if (effectiveType === '3g' || effectiveType === '2g') return 'slow';
  
  return 'unknown';
};

// Viewport visibility hook
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

// Battery status hook
export const useBatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);

  useEffect(() => {
    if (!('getBattery' in navigator)) return;

    (navigator as any).getBattery().then((battery: any) => {
      const updateBatteryInfo = () => {
        setBatteryLevel(battery.level);
        setIsCharging(battery.charging);
      };

      updateBatteryInfo();

      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);

      return () => {
        battery.removeEventListener('levelchange', updateBatteryInfo);
        battery.removeEventListener('chargingchange', updateBatteryInfo);
      };
    });
  }, []);

  return { batteryLevel, isCharging };
};

export const measurePerformance = () => {
  // Track First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        trackPerformance(
          'first_contentful_paint',
          entry.startTime,
          'core_web_vitals'
        );
      }
    }
  });
  observer.observe({ entryTypes: ['paint'] });

  // Track Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    trackPerformance(
      'largest_contentful_paint',
      lastEntry.startTime,
      'core_web_vitals'
    );
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as PerformanceEntryWithStart;
      if (fidEntry.processingStart) {
        trackPerformance(
          'first_input_delay',
          fidEntry.processingStart - fidEntry.startTime,
          'core_web_vitals'
        );
      }
    }
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Track Cumulative Layout Shift
  const clsObserver = new PerformanceObserver((list) => {
    let clsValue = 0;
    for (const entry of list.getEntries()) {
      const shiftEntry = entry as LayoutShiftEntry;
      if (!shiftEntry.hadRecentInput) {
        clsValue += shiftEntry.value;
      }
    }
    trackPerformance(
      'cumulative_layout_shift',
      clsValue,
      'core_web_vitals'
    );
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });

  // Track Time to First Byte
  const navigationObserver = new PerformanceObserver((list) => {
    const navigation = list.getEntries()[0] as PerformanceEntryWithStart;
    if (navigation.responseStart && navigation.requestStart) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      trackPerformance(
        'time_to_first_byte',
        ttfb,
        'core_web_vitals'
      );
    }
  });
  navigationObserver.observe({ entryTypes: ['navigation'] });

  // Track Resource Loading Performance
  const resourceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        trackPerformance(
          `resource_load_${resource.initiatorType}`,
          resource.duration,
          'resource_timing'
        );
      }
    });
  });
  resourceObserver.observe({ entryTypes: ['resource'] });

  // Cleanup function
  return () => {
    observer.disconnect();
    lcpObserver.disconnect();
    fidObserver.disconnect();
    clsObserver.disconnect();
    navigationObserver.disconnect();
    resourceObserver.disconnect();
  };
};

// Track errors
export const trackError = (error: Error) => {
  trackPerformance(
    'js_error',
    1,
    error.name,
  );
};
