import React, { lazy, Suspense, ReactNode, useState, useEffect, useRef } from 'react';
import { AnimationErrorBoundary, SafeAnimationProvider } from '../components/AnimationErrorBoundary';

/**
 * Utility function to lazy load 3D components with proper error handling
 * @param importPath Function that returns the dynamic import of the component
 * @param fallback Optional fallback component to display while loading
 * @returns The wrapped component with Suspense and error boundary
 */
export const lazyLoad3DComponent = (
  importPath: () => Promise<any>,
  fallback: ReactNode = null
) => {
  const LazyComponent = lazy(importPath);

  const LoadingFallback = () => {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-lg">Loading 3D visualization...</div>
          <div className="text-sm text-gray-500 mt-2">This may take a moment</div>
        </div>
      </div>
    );
  };

  return (props: any) => {
    // Create state to track component mounting
    const [isMounted, setIsMounted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const unmountingRef = useRef(false);
    
    // Use effect to set mounted state after a short delay to prevent flickering
    useEffect(() => {
      unmountingRef.current = false;
      
      // Add a small delay to prevent flickering during transitions
      const timer = setTimeout(() => {
        if (!unmountingRef.current) {
          setIsMounted(true);
        }
      }, 100);
      
      // Handle browser back/forward cache
      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          // Page was restored from bfcache, reset state
          setIsMounted(false);
          setHasError(false);
          
          // Re-mount after a delay
          setTimeout(() => {
            if (!unmountingRef.current) {
              setIsMounted(true);
            }
          }, 100);
        }
      };
      
      // Handle visibility changes
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          // Page is being hidden, might go into bfcache
          setIsMounted(false);
        } else if (document.visibilityState === 'visible' && !unmountingRef.current) {
          // Page is visible again
          setTimeout(() => {
            if (!unmountingRef.current) {
              setIsMounted(true);
            }
          }, 100);
        }
      };
      
      window.addEventListener('pageshow', handlePageShow);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        unmountingRef.current = true;
        clearTimeout(timer);
        setIsMounted(false);
        window.removeEventListener('pageshow', handlePageShow);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
    
    // Handle errors
    const handleError = (error: Error) => {
      console.error('3D component error:', error);
      setHasError(true);
    };
    
    return (
      <SafeAnimationProvider>
        <AnimationErrorBoundary onError={handleError}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative',
            visibility: isMounted && !hasError ? 'visible' : 'hidden',
            display: isMounted ? 'block' : 'none',
            opacity: isMounted ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}>
            <Suspense fallback={fallback || <LoadingFallback />}>
              {isMounted && <LazyComponent {...props} />}
            </Suspense>
          </div>
        </AnimationErrorBoundary>
      </SafeAnimationProvider>
    );
  };
};

/**
 * Utility function for dynamically importing 3D components only when needed
 * Helps reduce initial bundle size
 */
export const lazy3D = {
  // Business Automation
  BusinessAutomationProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/business-automation/BusinessAutomationProcessFlow3D')
  ),
  WorkflowVisualization3D: lazyLoad3DComponent(() => 
    import('../components/services/business-automation/WorkflowVisualization3D')
  ),
  
  // CRM
  CRMDashboard3D: lazyLoad3DComponent(() => 
    import('../components/services/crm/CRMDashboard3D')
  ),
  CRMProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/crm/CRMProcessFlow3D')
  ),
  
  // Communication
  CommunicationNetwork3D: lazyLoad3DComponent(() => 
    import('../components/services/communication/CommunicationNetwork3D')
  ),
  
  // Digital Marketing
  DigitalMarketingProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/digital-marketing/DigitalMarketingProcessFlow3D')
  ),
  RankingVisualizer3D: lazyLoad3DComponent(() => 
    import('../components/services/digital-marketing/RankingVisualizer3D')
  ),
  
  // Lead Generation
  LeadFunnel3D: lazyLoad3DComponent(() => 
    import('../components/services/lead-generation/LeadFunnel3D')
  ),
  LeadGenerationProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/lead-generation/LeadGenerationProcessFlow3D')
  ),
  
  // System Integration
  SystemIntegrationProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/system-integration/SystemIntegrationProcessFlow3D')
  ),
  SystemNetwork3D: lazyLoad3DComponent(() => 
    import('../components/services/system-integration/SystemNetwork3D')
  ),
  
  // Web Development
  WebDevelopmentProcess3D: lazyLoad3DComponent(() => 
    import('../components/services/web-development/WebDevelopmentProcess3D')
  ),
  
  // Shared
  ProcessFlow3D: lazyLoad3DComponent(() => 
    import('../components/services/shared/ProcessFlow3D')
  ),
  NetworkVisualization3D: lazyLoad3DComponent(() => 
    import('../components/services/shared/NetworkVisualization3D')
  ),
  
  // Locations
  LocalBusinessVisualization3D: lazyLoad3DComponent(() => 
    import('../components/locations/LocalBusinessVisualization3D')
  ),
  LocationDemographics3D: lazyLoad3DComponent(() => 
    import('../components/locations/LocationDemographics3D')
  ),
  OptimizedLocationDemographics: lazyLoad3DComponent(() => 
    import('../components/locations/OptimizedLocationDemographics')
  ),
  SEOStrategyVisualization3D: lazyLoad3DComponent(() => 
    import('../components/locations/SEOStrategyVisualization3D')
  )
};