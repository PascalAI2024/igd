/**
 * Performance optimization configuration
 */

export const performanceConfig = {
  // Image optimization
  images: {
    lazyLoadOffset: '50px', // Start loading images 50px before they enter viewport
    blurPlaceholder: true,
    quality: {
      high: 90,
      medium: 75,
      low: 60,
    },
    formats: ['avif', 'webp', 'jpg'], // Preferred formats in order
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024,
      wide: 1280,
    },
  },

  // Animation settings
  animations: {
    enableGPU: true,
    reducedMotion: {
      duration: 0.1, // Minimal duration for reduced motion
      stagger: 0,
    },
    default: {
      duration: 0.3,
      stagger: 0.1,
      ease: 'easeOut',
    },
    fps: {
      target: 60,
      mobile: 30, // Lower FPS on mobile for battery
    },
  },

  // Code splitting
  bundleSplitting: {
    maxChunkSize: 244 * 1024, // 244KB max chunk size
    preloadDelay: 1000, // Delay before preloading non-critical chunks
    criticalChunks: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
  },

  // 3D rendering
  threejs: {
    mobile: {
      maxVertices: 10000,
      shadowQuality: 'low',
      antialias: false,
      pixelRatio: 1,
    },
    desktop: {
      maxVertices: 50000,
      shadowQuality: 'high',
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    },
  },

  // Lazy loading
  lazyLoad: {
    rootMargin: '100px',
    threshold: 0.01,
    fadeInDuration: 300,
  },

  // Network optimization
  network: {
    prefetch: {
      enabled: true,
      strategy: 'hover', // Prefetch on hover
      delay: 200, // Delay before prefetching
    },
    cache: {
      images: 86400, // 24 hours
      api: 300, // 5 minutes
      static: 2592000, // 30 days
    },
  },

  // Accessibility
  accessibility: {
    focusVisible: true,
    skipLinks: true,
    announcements: true,
    keyboardShortcuts: true,
  },

  // SEO
  seo: {
    prerenderTimeout: 5000, // Wait up to 5s for content to load
    structuredData: true,
    openGraph: true,
    twitterCards: true,
  },
};

/**
 * Get performance settings based on device capabilities
 */
export const getPerformanceSettings = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  const hasSlowConnection = (navigator as any).connection?.effectiveType === '2g' || 
                           (navigator as any).connection?.effectiveType === 'slow-2g';
  
  const isLowEndDevice = isMobile || hasLowMemory || hasSlowConnection;

  return {
    enableAnimations: !isLowEndDevice,
    enable3D: !isLowEndDevice,
    enableParticles: !isLowEndDevice,
    imageQuality: isLowEndDevice ? 'low' : 'high',
    chunkPreloading: !hasSlowConnection,
    ...performanceConfig,
  };
};