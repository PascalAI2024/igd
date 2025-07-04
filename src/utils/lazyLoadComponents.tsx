import { lazy, Suspense, ComponentType } from 'react';

/**
 * Create a lazy-loaded component with a custom loading fallback
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(loader);

  const LoadingFallback = () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-spin" />
        <div className="text-lg font-medium">Loading component...</div>
      </div>
    </div>
  );

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback || <LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Pre-configured lazy components for common heavy components
 */
export const LazyComponents = {
  // Service Components
  WebsiteVisualizer: createLazyComponent(() => 
    import('../components/services/web-development/WebsiteVisualizer')
  ),
  
  CodeShowcase: createLazyComponent(() => 
    import('../components/services/web-development/CodeShowcase')
  ),
  
  LiveCodeEditor: createLazyComponent(() => 
    import('../components/services/web-development/LiveCodeEditor')
  ),
  
  // Marketing Components
  LiveMarketingDashboard: createLazyComponent(() => 
    import('../components/services/digital-marketing/LiveMarketingDashboard')
  ),
  
  // CRM Components
  LiveCRMDashboard: createLazyComponent(() => 
    import('../components/services/crm/LiveCRMDashboard')
  ),
  
  // Animation Components
  InteractiveBackground: createLazyComponent(() => 
    import('../components/backgrounds/InteractiveBackground')
  ),
  
  ParticleBackground: createLazyComponent(() => 
    import('../components/ParticleBackground')
  ),
  
  // Industry Components
  LiveOrderingDemo: createLazyComponent(() => 
    import('../components/industries/restaurants/LiveOrderingDemo')
  ),
  
  RetailVisualization: createLazyComponent(() => 
    import('../components/industries/retail/RetailVisualization')
  ),
  
  // Interactive Tools
  // WebsiteSpeedTest: createLazyComponent(() => 
  //   import('../components/interactive-tools/WebsiteSpeedTest')
  // ),
  
  // SEOKeywordAnalyzer: createLazyComponent(() => 
  //   import('../components/interactive-tools/SEOKeywordAnalyzer')
  // ),
  
  // About Page Components
  InteractiveTeamShowcase: createLazyComponent(() => 
    import('../components/about/InteractiveTeamShowcase')
  ),
  
  InteractiveTimeline: createLazyComponent(() => 
    import('../components/about/InteractiveTimeline')
  ),
  
  // Contact Components
  InteractiveContactHub: createLazyComponent(() => 
    import('../components/contact/InteractiveContactHub')
  ),
  
  LiveResponseDemo: createLazyComponent(() => 
    import('../components/contact/LiveResponseDemo')
  ),
  
  // Solution Components
  ProcessAutomationBuilder: createLazyComponent(() => 
    import('../components/solutions/automation/ProcessAutomationBuilder')
  ),
  
  LiveWorkflowDemo: createLazyComponent(() => 
    import('../components/solutions/automation/LiveWorkflowDemo')
  ),
  
  BusinessSolutionBuilder: createLazyComponent(() => 
    import('../components/solutions/local-business/BusinessSolutionBuilder')
  ),
  
  // Chart Components
  ThreeDBarChart: createLazyComponent(() => 
    import('../components/charts/ThreeDBarChart')
  ),
  
  ThreeDPieChart: createLazyComponent(() => 
    import('../components/charts/ThreeDPieChart')
  ),
};

/**
 * Preload a component to improve perceived performance
 */
export const preloadComponent = (componentName: keyof typeof LazyComponents) => {
  const component = LazyComponents[componentName];
  if (component) {
    // Trigger the lazy load
    (component as any)._ctor();
  }
};

/**
 * Preload multiple components
 */
export const preloadComponents = (componentNames: (keyof typeof LazyComponents)[]) => {
  componentNames.forEach(preloadComponent);
};

/**
 * Hook to preload components on hover or focus
 */
export const usePreloadOnInteraction = (componentName: keyof typeof LazyComponents) => {
  const handleInteraction = () => {
    preloadComponent(componentName);
  };

  return {
    onMouseEnter: handleInteraction,
    onFocus: handleInteraction,
  };
};