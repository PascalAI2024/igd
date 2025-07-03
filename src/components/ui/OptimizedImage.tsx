import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { getMobileImageSize } from '../../utils/mobileOptimizations';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  srcSet?: string;
}

/**
 * Optimized image component with lazy loading and mobile optimization
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  sizes,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isMobile, connectionType } = useDeviceCapabilities();

  // Determine image quality based on connection
  const getOptimizedQuality = () => {
    if (connectionType === '2g' || connectionType === 'slow-2g') return 50;
    if (connectionType === '3g') return 60;
    if (isMobile) return 70;
    return quality;
  };

  // Generate optimized src
  const getOptimizedSrc = () => {
    if (!width || !src) return src;
    
    const optimizedWidth = isMobile ? getMobileImageSize(width) : width;
    const optimizedQuality = getOptimizedQuality();
    
    // If src already has query params, append to them
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}w=${optimizedWidth}&q=${optimizedQuality}`;
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    if (!width || !src) return undefined;

    const widths = isMobile 
      ? [320, 640, 828] 
      : [640, 1024, 1920, 2560];
    
    const optimizedQuality = getOptimizedQuality();
    
    return widths
      .filter(w => w <= (width * 2)) // Don't go above 2x original size
      .map(w => {
        const separator = src.includes('?') ? '&' : '?';
        return `${src}${separator}w=${w}&q=${optimizedQuality} ${w}w`;
      })
      .join(', ');
  };

  // Generate sizes attribute
  const generateSizes = () => {
    if (sizes) return sizes;
    
    // Default responsive sizes
    return isMobile
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      : '(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 33vw';
  };

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: isMobile ? '50px' : '200px',
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, isMobile]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setError(true);
    onError?.();
  };

  // Placeholder styles
  const placeholderStyles = cn(
    'absolute inset-0',
    placeholder === 'blur' && 'backdrop-blur-2xl bg-gray-900/50',
    placeholder === 'empty' && 'bg-gray-900'
  );

  // Generate blur data URL if not provided
  const defaultBlurDataURL = `data:image/svg+xml,%3Csvg width='${width || 100}' height='${height || 100}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23374151'/%3E%3C/svg%3E`;

  return (
    <div 
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={{ 
        aspectRatio: width && height ? `${width} / ${height}` : undefined 
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !error && (
        <div className={placeholderStyles}>
          {placeholder === 'blur' && blurDataURL && (
            <img 
              src={blurDataURL || defaultBlurDataURL}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-gray-500 text-center p-4">
            <svg 
              className="w-12 h-12 mx-auto mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Main image */}
      {isInView && !error && (
        <motion.img
          src={getOptimizedSrc()}
          srcSet={generateSrcSet()}
          sizes={generateSizes()}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'w-full h-full object-cover',
            className
          )}
          style={{
            // Prevent layout shift
            aspectRatio: width && height ? `${width} / ${height}` : undefined
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;