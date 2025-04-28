import { Cloud, Database, Shield, Cpu, GitBranch } from 'lucide-react';
import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'cloud-migration',
    title: 'Cloud Migration',
    description: 'Seamless transition of your infrastructure to the cloud.',
    icon: Cloud,
    features: [
      'Infrastructure Assessment',
      'Migration Strategy',
      'Data Transfer',
      'Legacy System Integration'
    ],
    benefits: [
      {
        title: 'Cost Optimization',
        description: 'Reduce infrastructure costs'
      },
      {
        title: 'Scalability',
        description: 'Scale resources on demand'
      }
    ],
    technologies: [
      'AWS',
      'Azure',
      'Google Cloud',
      'Kubernetes'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Assessment',
        description: 'Evaluate current infrastructure'
      },
      {
        step: '02',
        title: 'Planning',
        description: 'Design migration strategy'
      }
    ],
    metrics: {
      uptime: '99.99%',
      savings: '40%',
      performance: '3x'
    },
    path: '/services/cloud/migration'
  }
  // Add more cloud solutions...
];