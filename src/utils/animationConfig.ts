// Performance-optimized animation configurations
export const animationConfig = {
  // Reduced motion check
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  
  // Frame rate limits based on device capability
  getFrameRate: () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = (navigator as any).deviceMemory < 4 || navigator.hardwareConcurrency < 4;
    
    if (animationConfig.reducedMotion) return 0;
    if (isMobile || isLowEnd) return 30;
    return 60;
  },
  
  // Throttled animation frame
  throttleAnimation: (callback: FrameRequestCallback, fps: number) => {
    let lastTime = 0;
    const interval = 1000 / fps;
    
    return (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time;
        callback(time);
      }
    };
  },
  
  // Visibility check for animations
  isElementVisible: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Battery-aware animation settings
  getBatteryAwareSettings: async () => {
    try {
      const battery = await (navigator as any).getBattery?.();
      if (battery) {
        const isLowBattery = battery.level < 0.2 && !battery.charging;
        return {
          enableComplexAnimations: !isLowBattery,
          particleCount: isLowBattery ? 20 : 50,
          animationQuality: isLowBattery ? 'low' : 'high'
        };
      }
    } catch (e) {
      // Battery API not supported
    }
    
    return {
      enableComplexAnimations: true,
      particleCount: 50,
      animationQuality: 'high'
    };
  },
  
  // Standard animation variants
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    stagger: {
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    }
  },
  
  // Performance hints
  performanceHints: {
    willChange: 'opacity, transform',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    WebkitBackfaceVisibility: 'hidden' as any
  }
};

// Export animation hooks
export const useOptimizedAnimation = () => {
  const frameRate = animationConfig.getFrameRate();
  const shouldAnimate = frameRate > 0;
  
  return {
    frameRate,
    shouldAnimate,
    variants: shouldAnimate ? animationConfig.variants : {},
    performanceHints: animationConfig.performanceHints
  };
};