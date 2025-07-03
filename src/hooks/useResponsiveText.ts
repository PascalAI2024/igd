import { useEffect, useState } from 'react';
import { useDeviceCapabilities } from './useDeviceCapabilities';

interface ResponsiveTextSizes {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

/**
 * Hook for responsive text sizing that prevents overflow on mobile
 */
export const useResponsiveText = () => {
  const { isMobile } = useDeviceCapabilities();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive font sizes based on viewport
  const getResponsiveSize = (baseSize: number): number => {
    if (viewportWidth < 320) {
      return baseSize * 0.85; // Small phones
    } else if (viewportWidth < 375) {
      return baseSize * 0.9; // Standard phones
    } else if (viewportWidth < 414) {
      return baseSize * 0.95; // Large phones
    } else if (viewportWidth < 768) {
      return baseSize; // Tablets
    }
    return baseSize; // Desktop
  };

  // Mobile-optimized text sizes
  const textSizes: ResponsiveTextSizes = {
    xs: isMobile ? `${getResponsiveSize(0.75)}rem` : '0.75rem',
    sm: isMobile ? `${getResponsiveSize(0.875)}rem` : '0.875rem',
    base: isMobile ? `${getResponsiveSize(1)}rem` : '1rem',
    lg: isMobile ? `${getResponsiveSize(1.125)}rem` : '1.125rem',
    xl: isMobile ? `${getResponsiveSize(1.25)}rem` : '1.25rem',
    '2xl': isMobile ? `${getResponsiveSize(1.5)}rem` : '1.5rem',
    '3xl': isMobile ? `${getResponsiveSize(1.875)}rem` : '1.875rem',
    '4xl': isMobile ? `${getResponsiveSize(2.25)}rem` : '2.25rem',
    '5xl': isMobile ? `${getResponsiveSize(3)}rem` : '3rem',
    '6xl': isMobile ? `${getResponsiveSize(3.75)}rem` : '3.75rem',
  };

  // Utility function to clamp text for mobile
  const clampText = (lines: number = 3) => ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  // Get heading size with mobile optimization
  const getHeadingSize = (level: 1 | 2 | 3 | 4 | 5 | 6): string => {
    const sizes = {
      1: isMobile ? textSizes['4xl'] : textSizes['6xl'],
      2: isMobile ? textSizes['3xl'] : textSizes['5xl'],
      3: isMobile ? textSizes['2xl'] : textSizes['4xl'],
      4: isMobile ? textSizes['xl'] : textSizes['3xl'],
      5: isMobile ? textSizes['lg'] : textSizes['2xl'],
      6: isMobile ? textSizes['base'] : textSizes['xl'],
    };
    return sizes[level];
  };

  // Responsive line height
  const getLineHeight = (size: keyof ResponsiveTextSizes): number => {
    const lineHeights = {
      xs: 1.5,
      sm: 1.5,
      base: 1.5,
      lg: 1.4,
      xl: 1.4,
      '2xl': 1.3,
      '3xl': 1.3,
      '4xl': 1.2,
      '5xl': 1.2,
      '6xl': 1.1,
    };
    return isMobile ? lineHeights[size] * 1.1 : lineHeights[size];
  };

  return {
    textSizes,
    clampText,
    getHeadingSize,
    getLineHeight,
    isMobile,
    viewportWidth,
  };
};