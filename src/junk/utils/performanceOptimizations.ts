// Performance optimization utilities

// Debounce function for event handlers
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
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

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-lazy]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-lazy');
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  return () => {
    images.forEach(img => imageObserver.unobserve(img));
  };
};

// Preload critical resources
export const preloadCriticalAssets = (assets: string[]) => {
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = asset;
    
    if (asset.endsWith('.css')) {
      link.as = 'style';
    } else if (asset.endsWith('.js')) {
      link.as = 'script';
    } else if (asset.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
      link.as = 'image';
    } else if (asset.match(/\.(woff|woff2)$/i)) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
};

// Optimize scroll performance
export const optimizeScroll = () => {
  let ticking = false;
  
  const updateScroll = () => {
    // Dispatch custom event for components to handle
    window.dispatchEvent(new CustomEvent('optimizedscroll', {
      detail: { scrollY: window.scrollY }
    }));
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', requestTick);
  };
};

// Memory cleanup for React components
export const cleanupMemory = () => {
  // Clear any lingering timers
  const highestTimeoutId = setTimeout(() => {}, 0) as unknown as number;
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
  
  // Clear any lingering intervals
  const highestIntervalId = setInterval(() => {}, 1000) as unknown as number;
  for (let i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }
  
  // Cancel any pending animation frames
  const highestRAF = requestAnimationFrame(() => {});
  for (let i = 0; i < highestRAF; i++) {
    cancelAnimationFrame(i);
  }
};

// Check if device is low-end
export const isLowEndDevice = (): boolean => {
  const checks = {
    memory: (navigator as any).deviceMemory < 4,
    cores: navigator.hardwareConcurrency < 4,
    connection: ['slow-2g', '2g', '3g'].includes((navigator as any).connection?.effectiveType),
    saveData: (navigator as any).connection?.saveData === true
  };
  
  return Object.values(checks).some(check => check === true);
};

// Optimize animations based on device capability
export const getOptimalAnimationSettings = () => {
  const isLowEnd = isLowEndDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return {
      enableAnimations: false,
      transitionDuration: 0,
      particleCount: 0,
      complexity: 'none'
    };
  }
  
  if (isLowEnd) {
    return {
      enableAnimations: true,
      transitionDuration: 200,
      particleCount: 20,
      complexity: 'simple'
    };
  }
  
  return {
    enableAnimations: true,
    transitionDuration: 300,
    particleCount: 50,
    complexity: 'full'
  };
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) {
      link.crossOrigin = hint.crossOrigin;
    }
    document.head.appendChild(link);
  });
};