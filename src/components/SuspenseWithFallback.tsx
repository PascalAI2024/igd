import React, { Suspense, ReactNode } from 'react';

interface SuspenseWithFallbackProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
  height?: string | number;
  withBoundary?: boolean;
}

export const LoadingIndicator: React.FC<{ name?: string; height?: string | number }> = ({ 
  name = '3D Visualization', 
  height = '500px' 
}) => {
  return (
    <div 
      className="flex flex-col items-center justify-center bg-black/30 rounded-lg backdrop-blur-md border border-white/10 p-6 text-center"
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mb-4"></div>
      <h4 className="text-lg font-semibold text-white mb-2">Loading {name}</h4>
      <p className="text-sm text-gray-400">
        Preparing interactive visualization...
      </p>
    </div>
  );
};

export const SuspenseWithFallback: React.FC<SuspenseWithFallbackProps> = ({ 
  children, 
  fallback, 
  name,
  height,
  withBoundary = true
}) => {
  const defaultFallback = <LoadingIndicator name={name} height={height} />;
  
  // If withBoundary is false, just return the Suspense without AnimationErrorBoundary
  if (!withBoundary) {
    return (
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    );
  }
  
  // Dynamically import AnimationErrorBoundary only when needed
  const AnimationErrorBoundary = React.lazy(() => 
    import('./AnimationErrorBoundary').then(module => ({ 
      default: module.AnimationErrorBoundary 
    }))
  );
  
  return (
    <Suspense fallback={defaultFallback}>
      <AnimationErrorBoundary fallback={fallback}>
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      </AnimationErrorBoundary>
    </Suspense>
  );
};

export default SuspenseWithFallback;