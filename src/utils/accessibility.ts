/**
 * Accessibility utilities for better keyboard navigation and screen reader support
 */

/**
 * Make an element keyboard accessible
 */
export const makeKeyboardAccessible = (
  onClick: () => void,
  options: {
    role?: string;
    ariaLabel?: string;
    ariaPressed?: boolean;
    ariaExpanded?: boolean;
    tabIndex?: number;
  } = {}
) => {
  return {
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    role: options.role || 'button',
    'aria-label': options.ariaLabel,
    'aria-pressed': options.ariaPressed,
    'aria-expanded': options.ariaExpanded,
    tabIndex: options.tabIndex ?? 0,
    style: { cursor: 'pointer' },
  };
};

/**
 * Trap focus within a modal or dialog
 */
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstFocusable?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
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
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Generate unique ID for accessibility
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Skip to main content link helper
 */
export const skipToMainContent = () => {
  const main = document.querySelector('main') || document.getElementById('main-content');
  if (main) {
    (main as HTMLElement).focus();
    (main as HTMLElement).scrollIntoView();
  }
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get appropriate heading level based on context
 */
export const getHeadingLevel = (currentLevel: number, isNested: boolean = false): number => {
  if (isNested) {
    return Math.min(currentLevel + 1, 6);
  }
  return currentLevel;
};

/**
 * Format time for screen readers
 */
export const formatTimeForScreenReader = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds} seconds`;
  } else if (remainingSeconds === 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''} and ${remainingSeconds} seconds`;
  }
};

/**
 * Create accessible error message
 */
export const createAccessibleError = (fieldName: string, errorMessage: string): string => {
  return `Error in ${fieldName}: ${errorMessage}`;
};

/**
 * Handle escape key to close modals/dialogs
 */
export const handleEscapeKey = (callback: () => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};