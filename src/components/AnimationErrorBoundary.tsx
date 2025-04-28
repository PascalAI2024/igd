import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for handling animation errors
 */
export class AnimationErrorBoundary extends Component<Props, State> {
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
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-red-500/10 rounded-lg p-4 text-red-500">
          <p className="font-bold">Animation Error</p>
          <p className="text-sm">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
  fallback?: ReactNode
): React.FC<P> {
  return function WithAnimationErrorBoundary(props: P) {
    return (
      <AnimationErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </AnimationErrorBoundary>
    );
  };
}

/**
 * Hook for using animation error boundary
 */
export function useAnimationErrorBoundary(fallback?: ReactNode) {
  return {
    AnimationErrorBoundary: (props: { children: ReactNode }) => (
      <AnimationErrorBoundary fallback={fallback}>
        {props.children}
      </AnimationErrorBoundary>
    )
  };
}
