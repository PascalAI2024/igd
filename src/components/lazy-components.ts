import React from 'react';

// Service components
export const ProcessFlow3D: any = React.lazy(() => 
  import('./services/shared/ProcessFlow3D')
);

export const LeadFunnel3D = React.lazy(() => 
  import('./services/lead-generation/LeadFunnel3D')
);

export const SystemNetwork3D = React.lazy(() => 
  import('./services/system-integration/SystemNetwork3D')
);

export const NetworkVisualization3D: any = React.lazy(() => 
  import('./services/shared/NetworkVisualization3D')
);

export const WorkflowVisualization3D = React.lazy(() => 
  import('./services/business-automation/WorkflowVisualization3D')
);

export const CRMDashboard3D = React.lazy(() => 
  import('./services/crm/CRMDashboard3D')
);

export const CommunicationNetwork3D = React.lazy(() => 
  import('./services/communication/CommunicationNetwork3D')
);

export const RankingVisualizer3D = React.lazy(() => 
  import('./services/digital-marketing/RankingVisualizer3D')
);

// Charts and visualizations
export const ThreeDBarChart: any = React.lazy(() => 
  import('./charts/ThreeDBarChart')
);

export const ThreeDPieChart: any = React.lazy(() => 
  import('./charts/ThreeDPieChart')
);

// Location components
export const LocalBusinessVisualization3D: any = React.lazy(() => 
  import('./locations/LocalBusinessVisualization3D')
);

export const SEOStrategyVisualization3D: any = React.lazy(() => 
  import('./locations/SEOStrategyVisualization3D')
);

export const LocationDemographics3D: any = React.lazy(() => 
  import('./locations/LocationDemographics3D')
);