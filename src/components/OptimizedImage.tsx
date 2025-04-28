import React, { useState, useEffect } from 'react';
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
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    
    // Create new image to preload
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

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
      src={imageSrc || ''}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

export default OptimizedImage;
