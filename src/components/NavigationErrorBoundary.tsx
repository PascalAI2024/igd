import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class NavigationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Navigation error caught:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Track error for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `Navigation Error: ${error.message}`,
        fatal: false
      });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 text-center bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <AlertTriangle className="text-red-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">
            Navigation Error
          </h3>
          <p className="text-gray-400 mb-6 max-w-md">
            There was an issue with the navigation. This could be a temporary problem.
          </p>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Try Again
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Home size={16} />
              Go Home
            </motion.button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-6 text-left max-w-lg">
              <summary className="text-gray-400 cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-4 bg-black/50 rounded text-xs text-red-300 overflow-auto">
                {this.state.error.message}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default NavigationErrorBoundary;