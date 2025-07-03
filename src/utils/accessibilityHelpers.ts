// Accessibility helper utilities

// Announce content changes to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Trap focus within a modal or dialog
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    const isTabPressed = e.key === 'Tab';
    
    if (!isTabPressed) return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  };
  
  element.addEventListener('keydown', handleKeyDown);
  firstFocusable?.focus();
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
};

// Generate unique IDs for form labels
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Check color contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(val => {
      const sRGB = parseInt(val) / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Skip link component props
export const skipLinkProps = {
  href: '#main-content',
  className: 'skip-link',
  children: 'Skip to main content'
};

// ARIA labels for common UI elements
export const ariaLabels = {
  navigation: {
    main: 'Main navigation',
    mobile: 'Mobile navigation menu',
    breadcrumb: 'Breadcrumb navigation',
    pagination: 'Pagination navigation'
  },
  buttons: {
    menu: 'Open navigation menu',
    close: 'Close',
    search: 'Search',
    submit: 'Submit form',
    next: 'Next',
    previous: 'Previous',
    play: 'Play',
    pause: 'Pause'
  },
  forms: {
    required: 'Required field',
    error: 'Error:',
    success: 'Success:',
    loading: 'Loading, please wait'
  },
  regions: {
    header: 'Site header',
    footer: 'Site footer',
    sidebar: 'Sidebar',
    complementary: 'Complementary content'
  }
};

// Keyboard navigation helpers
export const handleKeyboardNavigation = (
  e: React.KeyboardEvent,
  callbacks: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) => {
  switch (e.key) {
    case 'Enter':
      callbacks.onEnter?.();
      break;
    case ' ':
    case 'Space':
      e.preventDefault();
      callbacks.onSpace?.();
      break;
    case 'Escape':
      callbacks.onEscape?.();
      break;
    case 'ArrowUp':
      e.preventDefault();
      callbacks.onArrowUp?.();
      break;
    case 'ArrowDown':
      e.preventDefault();
      callbacks.onArrowDown?.();
      break;
    case 'ArrowLeft':
      callbacks.onArrowLeft?.();
      break;
    case 'ArrowRight':
      callbacks.onArrowRight?.();
      break;
  }
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

// Add focus visible class for older browsers
export const addFocusVisibleClass = () => {
  if (!supportsFocusVisible()) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get appropriate transition duration based on user preference
export const getTransitionDuration = (defaultDuration: number = 300): number => {
  return prefersReducedMotion() ? 0 : defaultDuration;
};