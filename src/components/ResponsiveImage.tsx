import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSizes?: {
    sm?: string; // Small mobile (default < 640px)
    md?: string; // Medium mobile (640px - 768px)
  };
  desktopSizes?: {
    base?: string; // Base desktop (768px - 1024px)
    lg?: string;   // Large desktop (1024px - 1280px)
    xl?: string;   // Extra large desktop (> 1280px)
  };
  fallbackClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  mobileSizes = {},
  desktopSizes = {},
  fallbackClassName,
  onLoad,
  onError,
  priority = false,
  objectFit = 'cover'
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );
  const [imageSrc, setImageSrc] = useState<string>(src);

  // Function to select the appropriate image source based on window width
  const selectImageSource = (width: number) => {
    // Default to the original source
    let selectedSrc = src;

    // Extract base filename and extension
    const lastDotIndex = src.lastIndexOf('.');
    const baseName = lastDotIndex !== -1 ? src.substring(0, lastDotIndex) : src;
    const extension = lastDotIndex !== -1 ? src.substring(lastDotIndex) : '';

    // Mobile sizes
    if (width < 640 && mobileSizes.sm) {
      selectedSrc = mobileSizes.sm;
    } else if (width >= 640 && width < 768 && mobileSizes.md) {
      selectedSrc = mobileSizes.md;
    }
    // Desktop sizes
    else if (width >= 768 && width < 1024 && desktopSizes.base) {
      selectedSrc = desktopSizes.base;
    } else if (width >= 1024 && width < 1280 && desktopSizes.lg) {
      selectedSrc = desktopSizes.lg;
    } else if (width >= 1280 && desktopSizes.xl) {
      selectedSrc = desktopSizes.xl;
    }

    return selectedSrc;
  };

  // Update image source when window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial image source
    setImageSrc(selectImageSource(windowWidth));

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, src, mobileSizes, desktopSizes]);

  // Update image source when window width changes
  useEffect(() => {
    setImageSrc(selectImageSource(windowWidth));
  }, [windowWidth]);

  return (
    <OptimizedImage
      src={imageSrc}
      alt={alt}
      className={className}
      fallbackClassName={fallbackClassName}
      onLoad={onLoad}
      onError={onError}
      priority={priority}
      objectFit={objectFit}
    />
  );
};

export default ResponsiveImage;