import { Smartphone, Layers, Zap, Globe } from 'lucide-react';
import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'native-apps',
    title: 'Native Mobile Apps',
    description: 'High-performance native applications for iOS and Android.',
    icon: Smartphone,
    features: [
      'iOS Development',
      'Android Development',
      'Native Performance',
      'Platform Features'
    ],
    benefits: [
      {
        title: 'Performance',
        description: 'Optimal speed and efficiency'
      },
      {
        title: 'User Experience',
        description: 'Platform-specific design'
      }
    ],
    technologies: [
      'Swift',
      'Kotlin',
      'SwiftUI',
      'Jetpack Compose'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Design',
        description: 'Create native UI/UX'
      },
      {
        step: '02',
        title: 'Development',
        description: 'Build native features'
      }
    ],
    metrics: {
      performance: '60fps',
      size: 'Optimized',
      rating: '4.8+'
    },
    path: '/services/mobile/native'
  }
  // Add more mobile solutions...
];