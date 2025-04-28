import { Code2, Globe, Smartphone, Database, Cog } from 'lucide-react';
import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'web-applications',
    title: 'Web Applications',
    description: 'Modern, scalable web applications built with cutting-edge technologies.',
    icon: Globe,
    features: [
      'Single Page Applications',
      'Progressive Web Apps',
      'Enterprise Portals',
      'Custom CMS'
    ],
    benefits: [
      {
        title: 'User Experience',
        description: 'Engaging and responsive interfaces'
      },
      {
        title: 'Performance',
        description: 'Fast and efficient applications'
      }
    ],
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'GraphQL'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Design',
        description: 'Create user experience'
      },
      {
        step: '02',
        title: 'Development',
        description: 'Build application'
      }
    ],
    metrics: {
      performance: '95+',
      uptime: '99.9%',
      satisfaction: '90%'
    },
    path: '/services/custom-software/web-applications'
  }
  // Add more custom software solutions...
];