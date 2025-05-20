import React from 'react';
import { Target, Users, LineChart, Zap } from 'lucide-react';
import ProcessFlow3D from '../shared/ProcessFlow3D';

// Define the lead generation process steps
const leadGenSteps = [
  {
    icon: Target,
    title: 'Targeting',
    description: 'Identify ideal customer profiles and market opportunities',
    focus: '1-2 weeks',
    details: [
      'Audience research and segmentation',
      'Competitive analysis',
      'Channel selection',
      'Targeting strategy development'
    ]
  },
  {
    icon: Users,
    title: 'Engagement',
    description: 'Multi-channel lead generation campaigns and outreach',
    focus: '2-4 weeks',
    details: [
      'Campaign setup and launch',
      'Lead capture form optimization',
      'Content development',
      'Multi-channel distribution'
    ]
  },
  {
    icon: LineChart,
    title: 'Nurturing',
    description: 'Automated lead nurturing and qualification process',
    focus: 'Ongoing',
    details: [
      'Lead scoring implementation',
      'Email nurture sequences',
      'Personalized content delivery',
      'Behavioral tracking'
    ]
  },
  {
    icon: Zap,
    title: 'Conversion',
    description: 'Strategic conversion optimization and closing process',
    focus: 'Continuous',
    details: [
      'Sales handoff automation',
      'Conversion path optimization',
      'Follow-up sequence',
      'Performance analysis'
    ]
  }
];

const LeadGenerationProcessFlow3D = () => {
  return (
    <ProcessFlow3D 
      steps={leadGenSteps}
      primaryColor="#ef4444"
      secondaryColor="#f59e0b"
      title="Our Lead Generation Process"
      subtitle="A systematic approach to generating and nurturing leads"
    />
  );
};

export default LeadGenerationProcessFlow3D;