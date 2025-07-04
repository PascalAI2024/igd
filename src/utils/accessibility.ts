import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Accessibility utilities for improving user experience
 */

// Announce message to screen readers
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Focus management hook
export const useFocusTrap = (isActive: boolean = true) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);
  
  return containerRef;
};

// Keyboard navigation hook
export const useKeyboardNavigation = (
  items: any[],
  onSelect: (index: number) => void,
  isActive: boolean = true
) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(focusedIndex);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
    }
  }, [isActive, items.length, focusedIndex, onSelect]);
  
  useEffect(() => {
    if (isActive) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, isActive]);
  
  return { focusedIndex, setFocusedIndex };
};

// Skip to content link helper
export const skipToContent = (contentId: string = 'main-content') => {
  const element = document.getElementById(contentId);
  if (element) {
    element.focus();
    element.scrollIntoView();
  }
};

// ARIA label generator for interactive elements
export const generateAriaLabel = (
  action: string,
  target: string,
  context?: string
): string => {
  if (context) {
    return `${action} ${target} in ${context}`;
  }
  return `${action} ${target}`;
};

// Focus visible polyfill check
export const supportsFocusVisible = (): boolean => {
  try {
    document.querySelector(':focus-visible');
    return true;
  } catch {
    return false;
  }
};

// Reduced motion preference
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// High contrast mode detection
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Color scheme preference
export const prefersColorScheme = (): 'light' | 'dark' | 'no-preference' => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'no-preference';
};

// Live region hook for dynamic content
export const useLiveRegion = (ariaLive: 'polite' | 'assertive' = 'polite') => {
  const regionRef = useRef<HTMLDivElement>(null);
  
  const announce = useCallback((message: string) => {
    if (regionRef.current) {
      regionRef.current.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);
  
  return { regionRef, announce };
};

// Focus restoration hook
export const useFocusRestore = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);
  
  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);
  
  return { saveFocus, restoreFocus };
};

// Screen reader only text component props
export interface SROnlyProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

// Visually hidden but accessible to screen readers
export const visuallyHiddenStyles = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
} as const;