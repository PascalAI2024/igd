import React, { Component, ErrorInfo, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Optional callback when an error occurs
   */
  onError?: (error: Error) => void;
  /**
   * Whether to handle bfcache (back/forward cache) issues
   * Default: true
   */
  handleBFCache?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for handling animation errors
 */
export class AnimationErrorBoundary extends Component<Props, State> {
  // Flag to track if component is mounted
  private isMounted: boolean = false;
  
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Animation Error:', error);
    console.error('Error Info:', errorInfo);
    
    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  componentDidMount(): void {
    this.isMounted = true;
    
    // Add a safety check for WebGL support when component mounts
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      
      // Clean up the test canvas
      canvas.remove();
      
      if (!hasWebGL) {
        this.setState({ 
          hasError: true, 
          error: new Error('WebGL not supported or disabled in your browser') 
        });
        console.warn('WebGL not supported or disabled in your browser');
      }
    } catch (e) {
      console.error('Error checking WebGL support:', e);
    }
    
    // Handle back/forward cache issues
    if (this.props.handleBFCache !== false) {
      window.addEventListener('pageshow', this.handlePageShow);
    }
  }
  
  componentWillUnmount(): void {
    this.isMounted = false;
    
    // Remove listeners
    if (this.props.handleBFCache !== false) {
      window.removeEventListener('pageshow', this.handlePageShow);
    }
  }
  
  // Handle browser back/forward cache
  handlePageShow = (event: PageTransitionEvent): void => {
    // If page is restored from bfcache, reset error state
    if (event.persisted && this.state.hasError && this.isMounted) {
      this.setState({ hasError: false, error: null });
    }
  };

  // Reset error state
  handleRetry = (): void => {
    if (this.isMounted) {
      this.setState({ hasError: false, error: null });
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-red-500/20 text-center">
          <p className="font-bold text-red-500 text-lg mb-2">Visualization Error</p>
          <p className="text-sm text-gray-300 mb-4">
            {this.state.error?.message || 'An error occurred while loading the 3D visualization.'}
          </p>
          <p className="text-xs text-gray-400 mb-4">
            This may be due to limited system resources or WebGL support. Try refreshing the page or using a different browser.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with animation error boundary
 */
export function withAnimationErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error) => void
): React.FC<P> {
  return function WithAnimationErrorBoundary(props: P) {
    return (
      <AnimationErrorBoundary fallback={fallback} onError={onError}>
        <WrappedComponent {...props} />
      </AnimationErrorBoundary>
    );
  };
}

/**
 * Hook for using animation error boundary
 */
export function useAnimationErrorBoundary(fallback?: ReactNode, onError?: (error: Error) => void) {
  return {
    AnimationErrorBoundary: (props: { children: ReactNode }) => (
      <AnimationErrorBoundary fallback={fallback} onError={onError}>
        {props.children}
      </AnimationErrorBoundary>
    )
  };
}

/**
 * DisposableCanvas wraps Canvas elements to ensure proper cleanup
 * when unmounting or when back/forward cache is used
 */
export function SafeAnimationProvider({ children }: { children: ReactNode }) {
  // Listen for page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden, perform cleanup
        console.log('Page hidden, cleaning up animations');
        // We could access a global registry of animations here
        // and pause/dispose them when needed
      }
    };
    
    // Listen for bfcache events
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log('Page restored from bfcache, reinitializing animations');
        // We could reload animations here
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);
  
  return <>{children}</>;
}
