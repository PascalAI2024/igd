import React, { useState, useEffect, useRef } from 'react';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackIcon?: React.ReactNode;
  fallbackClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean; // Add priority loading option
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackIcon = <ImageOff className="w-8 h-8 text-red-500/70" />,
  fallbackClassName = 'flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800',
  onLoad,
  onError,
  priority = false,
  objectFit = 'cover'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 2;

  // Handle image loading with retry logic
  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    retryCount.current = 0;

    const loadImage = () => {
      // Create new image to preload
      const img = new Image();

      // Add timestamp to URL to prevent caching issues if needed
      const imageUrl = src.includes('?') ? src : `${src}?t=${Date.now()}`;
      img.src = imageUrl;

      // Set loading priority
      if (priority) {
        img.fetchPriority = 'high';
      }

      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        onLoad?.();
      };

      img.onerror = () => {
        // Retry loading a few times before showing error
        if (retryCount.current < maxRetries) {
          retryCount.current += 1;
          setTimeout(loadImage, 1000); // Wait 1 second before retry
        } else {
          setIsLoading(false);
          setHasError(true);
          onError?.();
        }
      };
    };

    loadImage();

    return () => {
      // Cleanup
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src, onLoad, onError, priority]);

  if (hasError) {
    return (
      <div
        className={`${fallbackClassName} ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        role="img"
        aria-label={`${alt} (image failed to load)`}
      >
        {fallbackIcon}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`animate-pulse bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        role="img"
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc || ''}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      style={{ objectFit }}
      onError={(e) => {
        // Add additional error handling for runtime errors
        if (retryCount.current < maxRetries) {
          retryCount.current += 1;
          // Try reloading with a cache-busting parameter
          const target = e.target as HTMLImageElement;
          const newSrc = `${src}?retry=${retryCount.current}&t=${Date.now()}`;
          target.src = newSrc;
        } else {
          setHasError(true);
          onError?.();
        }
      }}
    />
  );
};

export default OptimizedImage;
