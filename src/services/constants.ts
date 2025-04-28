import { ServiceBase } from './types';
import { 
  Globe, 
  Layout, 
  Target, 
  Brain, 
  Cloud, 
  Shield 
} from 'lucide-react';

export const SERVICES: ServiceBase[] = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description: 'Stunning, high-performance websites that convert visitors into customers.',
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'Landing Page Optimization'
    ],
    metrics: [
      { value: '3s', label: 'Load Time' },
      { value: '99%', label: 'Uptime' },
      { value: '90+', label: 'Performance Score' }
    ],
    path: '/services/web-development',
    color: 'from-red-500 to-orange-500'
  },
  // ... other services
];

export const ROUTES = {
  SERVICES: '/services',
  CONTACT: '/contact'
} as const;