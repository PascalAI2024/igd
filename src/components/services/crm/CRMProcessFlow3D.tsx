import React from 'react';
import { Search, Settings, BookOpen, Zap, Shield, FileText, MessageSquare, Users } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the CRM implementation process steps
const crmProcessSteps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your business needs and processes',
    focus: '1-2 days',
    details: [
      'Business process analysis',
      'Current system evaluation',
      'Success metrics definition',
      'Requirements gathering'
    ]
  },
  {
    icon: Settings,
    title: 'Setup & Configuration',
    description: 'Customizing your CRM system for optimal performance',
    focus: '2-3 days',
    details: [
      'CRM platform configuration',
      'Clean data migration',
      'Third-party integrations',
      'Workflow automation setup'
    ]
  },
  {
    icon: BookOpen,
    title: 'Training',
    description: 'Comprehensive team training and documentation',
    focus: '1-2 days',
    details: [
      'Hands-on system training',
      'Process documentation',
      '24/7 support setup',
      'Knowledge transfer'
    ]
  },
  {
    icon: Zap,
    title: 'Launch & Optimization',
    description: 'System launch and continuous improvement',
    focus: 'Ongoing',
    details: [
      'System go-live',
      'Performance monitoring',
      'Continuous improvement',
      'Regular updates'
    ]
  }
];

const CRMProcessFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={crmProcessSteps}
      primaryColor="#ef4444"
      secondaryColor="#3b82f6"
      title="CRM Implementation Process"
      subtitle="Our systematic approach to transforming your customer relationships"
    />
  );
};

export default CRMProcessFlow3D;