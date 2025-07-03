/**
 * Image optimization utilities
 */

/**
 * Generate a blur data URL for image placeholders
 * This creates a small base64 encoded placeholder that can be displayed while the main image loads
 */
export const generateBlurDataURL = (width: number = 10, height: number = 10, color: string = '#1f2937'): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return '';
  }
  
  // Create a gradient or solid color placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustColor(color, -20));
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Adjust color brightness
 */
const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
};

/**
 * Preload images for better performance
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = (srcs: string[]): Promise<HTMLImageElement[]> => {
  return Promise.all(srcs.map(preloadImage));
};

/**
 * Get optimized image URL with query parameters
 */
export const getOptimizedImageUrl = (
  src: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string => {
  const url = new URL(src, window.location.origin);
  
  if (options.width) {
    url.searchParams.set('w', options.width.toString());
  }
  
  if (options.height) {
    url.searchParams.set('h', options.height.toString());
  }
  
  if (options.quality) {
    url.searchParams.set('q', options.quality.toString());
  }
  
  if (options.format) {
    url.searchParams.set('fm', options.format);
  }
  
  return url.toString();
};

/**
 * Check if browser supports modern image formats
 */
export const supportsModernFormats = (): {
  webp: boolean;
  avif: boolean;
} => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return {
    webp: canvas.toDataURL('image/webp').indexOf('image/webp') === 5,
    avif: canvas.toDataURL('image/avif').indexOf('image/avif') === 5,
  };
};

/**
 * Get the appropriate image format based on browser support
 */
export const getBestImageFormat = (fallback: string = 'jpg'): string => {
  const support = supportsModernFormats();
  
  if (support.avif) {
    return 'avif';
  }
  
  if (support.webp) {
    return 'webp';
  }
  
  return fallback;
};

/**
 * Calculate aspect ratio for responsive images
 */
export const calculateAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};