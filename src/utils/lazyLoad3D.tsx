import React, { lazy, Suspense, ReactNode } from 'react';
import { AnimationErrorBoundary } from '../components/AnimationErrorBoundary';

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

  return (props: any) => (
    <AnimationErrorBoundary>
      <Suspense fallback={fallback || <LoadingFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    </AnimationErrorBoundary>
  );
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
  SEOStrategyVisualization3D: lazyLoad3DComponent(() => 
    import('../components/locations/SEOStrategyVisualization3D')
  )
};