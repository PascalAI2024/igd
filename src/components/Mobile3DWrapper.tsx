import React from 'react';
import { useDeviceCapabilities } from '../hooks/useDeviceCapabilities';
import { motion } from 'framer-motion';
import { SlideBlur } from './AnimationWrappers';

/**
 * Props for the Mobile3DWrapper component
 */
interface Mobile3DWrapperProps {
  /** The 3D component to render on desktop */
  children: React.ReactNode;
  /** Fallback content for mobile devices */
  mobileFallback?: React.ReactNode;
  /** Optional title for the fallback placeholder */
  fallbackTitle?: string;
  /** Optional description for the fallback placeholder */
  fallbackDescription?: string;
  /** Force disable 3D even on desktop (for testing) */
  forceDisable?: boolean;
  /** Additional className for the wrapper */
  className?: string;
  /** Show loading state while determining device capabilities */
  showLoadingState?: boolean;
}

/**
 * A wrapper component that automatically disables 3D content on mobile devices
 * to improve performance and prevent rendering issues.
 * 
 * @example
 * ```tsx
 * <Mobile3DWrapper
 *   fallbackTitle="3D Visualization"
 *   fallbackDescription="This interactive visualization is available on desktop devices"
 * >
 *   <ThreeDBarChart data={data} />
 * </Mobile3DWrapper>
 * ```
 */
const Mobile3DWrapper: React.FC<Mobile3DWrapperProps> = ({
  children,
  mobileFallback,
  fallbackTitle = "3D Visualization",
  fallbackDescription = "This interactive 3D visualization is optimized for desktop viewing.",
  forceDisable = false,
  className = '',
  showLoadingState = false
}) => {
  const { isMobile, isLowEndDevice } = useDeviceCapabilities();
  const [isLoading, setIsLoading] = React.useState(showLoadingState);

  React.useEffect(() => {
    if (showLoadingState) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [showLoadingState]);

  // Disable 3D on mobile, low-end devices, or when forced
  const shouldDisable3D = forceDisable || isMobile || isLowEndDevice;

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400"
        >
          Loading visualization...
        </motion.div>
      </div>
    );
  }

  if (shouldDisable3D) {
    // Return custom fallback if provided
    if (mobileFallback) {
      return <>{mobileFallback}</>;
    }

    // Default fallback for mobile
    return (
      <SlideBlur direction="up">
        <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center ${className}`}>
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center">
                <svg 
                  className="w-10 h-10 text-red-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </motion.div>

            <h3 className="text-xl font-semibold text-white mb-3">
              {fallbackTitle}
            </h3>
            
            <p className="text-gray-400 mb-6">
              {fallbackDescription}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-500"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span>Best viewed on desktop devices</span>
            </motion.div>
          </div>
        </div>
      </SlideBlur>
    );
  }

  // Render 3D content on desktop
  return <>{children}</>;
};

export default Mobile3DWrapper;

/**
 * Hook to check if 3D should be disabled
 * Useful for conditional rendering in components
 */
export const useShould3DBeDisabled = (): boolean => {
  const { isMobile, isLowEndDevice } = useDeviceCapabilities();
  return isMobile || isLowEndDevice;
};