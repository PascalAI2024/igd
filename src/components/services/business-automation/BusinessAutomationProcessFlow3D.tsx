import React from 'react';
import { Search, Settings, Bot, Database, CheckCircle, Workflow } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the business automation process steps
const automationSteps = [
  {
    icon: Search,
    title: 'Analysis',
    description: 'Understanding your business processes',
    focus: '1-2 weeks',
    details: [
      'Process Mapping',
      'Efficiency Analysis',
      'Pain Point Identification',
      'Opportunity Assessment'
    ]
  },
  {
    icon: Settings,
    title: 'Design',
    description: 'Creating automation solutions',
    focus: '2-3 weeks',
    details: [
      'Solution Architecture',
      'Workflow Design',
      'Integration Planning',
      'System Requirements'
    ]
  },
  {
    icon: Workflow,
    title: 'Development',
    description: 'Building automation systems',
    focus: '3-4 weeks',
    details: [
      'Custom Development',
      'Integration Setup',
      'Workflow Creation',
      'Testing Environment'
    ]
  },
  {
    icon: Database,
    title: 'Data Migration',
    description: 'Transferring and organizing data',
    focus: '1-2 weeks',
    details: [
      'Data Transfer',
      'Data Validation',
      'System Integration',
      'Quality Checks'
    ]
  },
  {
    icon: Bot,
    title: 'Automation',
    description: 'Implementing automated workflows',
    focus: '2-3 weeks',
    details: [
      'Workflow Automation',
      'Bot Configuration',
      'Trigger Setup',
      'Action Mapping'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Validation',
    description: 'Testing and refining the system',
    focus: 'Ongoing',
    details: [
      'System Testing',
      'Performance Monitoring',
      'Continuous Improvement',
      'ROI Measurement'
    ]
  }
];

const BusinessAutomationProcessFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={automationSteps}
      primaryColor="#ef4444"
      secondaryColor="#0ea5e9"
      title="Business Automation Process"
      subtitle="Our comprehensive approach to automating your business operations"
    />
  );
};

export default BusinessAutomationProcessFlow3D;