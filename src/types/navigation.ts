// Navigation types for improved type safety

export interface NavigationState {
  isOpen: boolean;
  activeDropdown: string | null;
  hoveredDropdown: string | null;
  selectedIndex: number;
}

export interface NavigationAction {
  type: 'TOGGLE_MENU' | 'CLOSE_MENU' | 'TOGGLE_DROPDOWN' | 'SET_HOVER' | 'SET_SELECTED';
  payload?: any;
}

export interface NavigationConfig {
  enableKeyboardNavigation: boolean;
  enablePrefetching: boolean;
  enableSearch: boolean;
  maxDropdownItems: number;
  animationDuration: number;
  focusTrapEnabled: boolean;
}

export interface NavigationMetrics {
  clicksPerSession: number;
  averageTimeToNavigate: number;
  mostUsedRoutes: string[];
  dropdownInteractions: number;
  searchQueries: string[];
  errorCount: number;
}

export interface NavigationPerformance {
  renderTime: number;
  animationFPS: number;
  memoryUsage: number;
  prefetchHits: number;
  prefetchMisses: number;
}

export interface AccessibilityOptions {
  announcePageChanges: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReaderMode: boolean;
}

// Hook types
export type NavigationHook = () => {
  navigate: (path: string) => void;
  goBack: () => void;
  goForward: () => void;
  currentPath: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
};

export type KeyboardNavigationHook = (
  isOpen: boolean,
  setIsOpen: (open: boolean) => void,
  activeDropdown: string | null,
  setActiveDropdown: (dropdown: string | null) => void
) => void;

// Component prop types
export interface BaseNavigationProps {
  className?: string;
  'aria-label'?: string;
  role?: string;
  tabIndex?: number;
  disabled?: boolean;
}

export interface NavigationButtonProps extends BaseNavigationProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  prefetch?: boolean;
  external?: boolean;
  download?: boolean | string;
}

export interface DropdownProps extends BaseNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  title: string;
  items: Array<{
    name: string;
    path: string;
    description?: string;
    icon?: string;
  }>;
}

export interface BreadcrumbProps extends BaseNavigationProps {
  maxItems?: number;
  separator?: React.ReactNode;
  showHome?: boolean;
  showCurrent?: boolean;
}

export interface SearchProps extends BaseNavigationProps {
  placeholder?: string;
  maxResults?: number;
  onResultClick?: (path: string) => void;
  onClose?: () => void;
  autoFocus?: boolean;
}

// Error types
export interface NavigationError {
  code: string;
  message: string;
  stack?: string;
  timestamp: number;
  path: string;
  userAgent: string;
}

export type NavigationErrorBoundaryState = {
  hasError: boolean;
  error?: NavigationError;
};

// Analytics types
export interface NavigationAnalytics {
  trackNavigation: (from: string, to: string, method: 'click' | 'keyboard' | 'programmatic') => void;
  trackDropdownInteraction: (dropdown: string, action: 'open' | 'close' | 'hover') => void;
  trackSearchQuery: (query: string, resultCount: number) => void;
  trackError: (error: NavigationError) => void;
  trackPerformance: (metrics: NavigationPerformance) => void;
}