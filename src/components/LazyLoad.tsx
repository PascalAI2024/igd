import React, { ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLazyLoad } from '../utils/performance';

interface LazyLoadProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animateIn?: boolean;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback = <div className="animate-pulse bg-gray-200 rounded-lg h-64" />,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  animateIn = true,
}) => {
  const { ref, isIntersecting } = useLazyLoad(threshold, rootMargin);

  return (
    <div ref={ref as any} className={className}>
      {isIntersecting ? (
        animateIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )
      ) : (
        fallback
      )}
    </div>
  );
};

// Component for lazy loading other components
export const LazyComponent: React.FC<{
  component: React.ComponentType<any>;
  props?: any;
  fallback?: ReactNode;
}> = ({ component: Component, props = {}, fallback }) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        )
      }
    >
      <Component {...props} />
    </Suspense>
  );
};