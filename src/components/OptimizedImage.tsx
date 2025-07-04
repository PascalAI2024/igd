import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateBlurDataURL, OptimizedImageProps } from '../utils/performance';
import { useLazyLoad } from '../utils/performance';

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, isIntersecting } = useLazyLoad(0.1, '50px');
  
  // For priority images, load immediately
  const shouldLoad = priority || isIntersecting;
  
  // Generate blur placeholder
  const blurDataURL = generateBlurDataURL(width || 10, height || 10);

  useEffect(() => {
    if (shouldLoad && !isLoaded && !error) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [shouldLoad, src, isLoaded, error]);

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <div 
      ref={ref as any}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      <img
        src={blurDataURL}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      
      {/* Actual image */}
      {shouldLoad && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          sizes={sizes}
          className={`relative z-10 w-full h-full object-cover ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

// Picture element for responsive images
interface ResponsiveImageProps extends OptimizedImageProps {
  sources?: Array<{
    srcSet: string;
    media?: string;
    type?: string;
  }>;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  sources = [],
  ...imageProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isIntersecting } = useLazyLoad(0.1, '50px');
  
  const shouldLoad = imageProps.priority || isIntersecting;

  return (
    <div ref={ref as any} className="relative">
      {shouldLoad && (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              media={source.media}
              type={source.type}
            />
          ))}
          <OptimizedImage
            {...imageProps}
            priority={true}
          />
        </picture>
      )}
    </div>
  );
};