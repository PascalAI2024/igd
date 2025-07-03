import { useEffect, useState, useCallback } from 'react';
import { useDeviceCapabilities } from './useDeviceCapabilities';
import { 
  getMobileImageSize,
  throttleScroll,
  getViewportDimensions 
} from '../utils/mobileOptimizations';

interface MobilePerformanceOptions {
  enableAdaptiveQuality?: boolean;
  enableLazyLoading?: boolean;
  enableScrollThrottling?: boolean;
  reduceMotion?: boolean;
}

interface MobilePerformanceState {
  quality: 'low' | 'medium' | 'high';
  shouldReduceMotion: boolean;
  imageQuality: number;
  animationFPS: number;
  enable3D: boolean;
  enableComplexAnimations: boolean;
}

/**
 * Hook for optimizing performance on mobile devices
 */
export const useMobilePerformance = (
  options: MobilePerformanceOptions = {}
): MobilePerformanceState => {
  const {
    enableAdaptiveQuality = true,
    enableLazyLoading = true,
    enableScrollThrottling = true,
    reduceMotion = false
  } = options;

  const { 
    isMobile, 
    isLowEndDevice, 
    deviceMemory, 
    hardwareConcurrency,
    connectionType 
  } = useDeviceCapabilities();

  const [performanceState, setPerformanceState] = useState<MobilePerformanceState>({
    quality: 'high',
    shouldReduceMotion: reduceMotion,
    imageQuality: 1,
    animationFPS: 60,
    enable3D: true,
    enableComplexAnimations: true
  });

  // Determine quality level based on device capabilities
  useEffect(() => {
    if (!enableAdaptiveQuality) return;

    let quality: 'low' | 'medium' | 'high' = 'high';
    let imageQuality = 1;
    let animationFPS = 60;
    let enable3D = true;
    let enableComplexAnimations = true;

    if (isLowEndDevice) {
      quality = 'low';
      imageQuality = 0.6;
      animationFPS = 30;
      enable3D = false;
      enableComplexAnimations = false;
    } else if (isMobile) {
      // Check device capabilities
      const isSlowDevice = deviceMemory < 4 || hardwareConcurrency < 4;
      const isSlowConnection = connectionType === '2g' || connectionType === '3g';

      if (isSlowDevice || isSlowConnection) {
        quality = 'medium';
        imageQuality = 0.8;
        animationFPS = 45;
        enable3D = !isSlowDevice;
        enableComplexAnimations = !isSlowConnection;
      }
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldReduceMotion = reduceMotion || prefersReducedMotion;

    if (shouldReduceMotion) {
      animationFPS = 30;
      enableComplexAnimations = false;
    }

    setPerformanceState({
      quality,
      shouldReduceMotion,
      imageQuality,
      animationFPS,
      enable3D,
      enableComplexAnimations
    });
  }, [
    isMobile, 
    isLowEndDevice, 
    deviceMemory, 
    hardwareConcurrency, 
    connectionType, 
    enableAdaptiveQuality,
    reduceMotion
  ]);

  // Optimize image loading
  useEffect(() => {
    if (!enableLazyLoading || !isMobile) return;

    // Add native lazy loading to images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

    // Intersection Observer for advanced lazy loading
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              // Optimize image size for mobile
              const originalWidth = parseInt(img.dataset.width || '0');
              if (originalWidth) {
                const optimizedWidth = getMobileImageSize(originalWidth);
                img.src = src.replace(/w=\d+/, `w=${optimizedWidth}`);
              } else {
                img.src = src;
              }
              
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before visible
      }
    );

    // Observe all lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    return () => {
      imageObserver.disconnect();
    };
  }, [enableLazyLoading, isMobile]);

  // Optimize scroll performance
  useEffect(() => {
    if (!enableScrollThrottling || !isMobile) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update viewport dimensions for mobile browser UI changes
          getViewportDimensions();
          ticking = false;
        });
        ticking = true;
      }
    };

    const throttledScroll = throttleScroll(handleScroll, 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [enableScrollThrottling, isMobile]);

  // Reduce JavaScript execution on low-end devices
  useEffect(() => {
    if (!isLowEndDevice) return;

    // Disable non-essential features
    const disableFeatures = () => {
      // Disable parallax effects
      document.body.classList.add('no-parallax');
      
      // Disable hover effects on touch devices
      if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
      }

      // Reduce particle effects or animations
      document.body.classList.add('reduce-animations');
    };

    disableFeatures();

    return () => {
      document.body.classList.remove('no-parallax', 'touch-device', 'reduce-animations');
    };
  }, [isLowEndDevice]);

  return performanceState;
};

/**
 * Hook for optimizing animations based on device performance
 */
export const useOptimizedAnimation = (
  baseConfig: any,
  performanceLevel?: 'low' | 'medium' | 'high'
) => {
  const { quality } = useMobilePerformance();
  const level = performanceLevel || quality;

  const optimizedConfig = useCallback(() => {
    switch (level) {
      case 'low':
        return {
          ...baseConfig,
          duration: baseConfig.duration * 0.5, // Faster animations
          delay: 0, // No delays
          stagger: 0, // No stagger
          ease: 'linear' // Simple easing
        };
      case 'medium':
        return {
          ...baseConfig,
          duration: baseConfig.duration * 0.75,
          stagger: baseConfig.stagger * 0.5
        };
      default:
        return baseConfig;
    }
  }, [baseConfig, level]);

  return optimizedConfig();
};