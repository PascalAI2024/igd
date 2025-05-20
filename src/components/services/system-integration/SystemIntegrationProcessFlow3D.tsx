import React from 'react';
import { Search, Code, Database, Server, CheckCircle, Settings } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the system integration process steps
const integrationSteps = [
  {
    icon: Search,
    title: 'Analysis',
    description: 'System analysis and requirements gathering',
    focus: '1-2 weeks',
    details: [
      'System Audit & Evaluation',
      'Integration Requirements',
      'Architecture Planning',
      'Technical Feasibility'
    ]
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Integration development and testing',
    focus: '4-8 weeks',
    details: [
      'API Development',
      'Data Structure Mapping',
      'Integration Testing',
      'Connector Building'
    ]
  },
  {
    icon: Database,
    title: 'Data Migration',
    description: 'Secure data transfer between systems',
    focus: '2-4 weeks',
    details: [
      'Data Cleansing',
      'Schema Transformation',
      'Validation Rules',
      'Historical Data Transfer'
    ]
  },
  {
    icon: Server,
    title: 'Deployment',
    description: 'System deployment and configuration',
    focus: '1-2 weeks',
    details: [
      'Environment Setup',
      'Load Testing',
      'Monitoring Configuration',
      'Performance Optimization'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Validation',
    description: 'Comprehensive system validation',
    focus: '1-2 weeks',
    details: [
      'Integration Verification',
      'End-to-End Testing',
      'User Acceptance',
      'Performance Benchmarking'
    ]
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description: 'Ongoing support and optimization',
    focus: 'Ongoing',
    details: [
      'Monitoring & Alerting',
      'Performance Tuning',
      'Version Updates',
      'Continuous Improvement'
    ]
  }
];

const SystemIntegrationProcessFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={integrationSteps}
      primaryColor="#ef4444"
      secondaryColor="#3b82f6"
      title="System Integration Process"
      subtitle="Our comprehensive approach to connecting your business systems"
    />
  );
};

export default SystemIntegrationProcessFlow3D;