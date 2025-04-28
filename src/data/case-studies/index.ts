import { CaseStudy } from './types';
import { automotive } from './automotive';
import { retail } from './retail';
import { manufacturing } from './manufacturing';
import { healthcare } from './healthcare';

const baseImageUrl = '/case-studies';

export const caseStudies: CaseStudy[] = [
  {
    ...automotive,
    imageUrl: `${baseImageUrl}/erp-platform.webp`,
    image: `${baseImageUrl}/erp-platform.webp`,
    subtitle: 'Comprehensive Digital Solutions for Auto Repair',
    description: 'Complete digital transformation for a local auto repair shop, including professional media and automation.',
    technologies: [
      'React',
      'Node.js',
      'High Level CRM',
      'Google Business Profile',
      'Local SEO Tools'
    ]
  },
  {
    ...retail,
    imageUrl: `${baseImageUrl}/fintech-platform.webp`,
    image: `${baseImageUrl}/fintech-platform.webp`,
    subtitle: 'Multi-Channel Growth for Local Store',
    description: 'Helping a local retail store compete effectively with integrated digital solutions.',
    technologies: [
      'React',
      'Node.js',
      'High Level CRM',
      'Google Business Profile',
      'Local SEO Tools',
      'Inventory Management System'
    ]
  },
  {
    ...manufacturing,
    imageUrl: `${baseImageUrl}/healthcare-platform.webp`,
    image: `${baseImageUrl}/healthcare-platform.webp`,
    subtitle: 'Smart Automation for Local Manufacturer',
    description: 'Digital transformation and automation solutions for improved manufacturing operations.',
    technologies: [
      'Python',
      'Node.js',
      'TypeScript',
      'InfluxDB',
      'Azure IoT Hub',
      'TensorFlow',
      'Docker',
      'Kubernetes',
      'OpenCV',
      'GraphQL',
      'MQTT',
      'Time Series Analytics'
    ]
  },
  {
    ...healthcare,
    imageUrl: `${baseImageUrl}/healthcare-platform.webp`,
    image: `${baseImageUrl}/healthcare-platform.webp`,
    subtitle: 'Digital Solutions for Medical Practice',
    description: 'Comprehensive digital presence and automation for a local healthcare provider.',
    technologies: [
      'React.js',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'AWS HIPAA-Compliant Cloud',
      'Twilio Video SDK',
      'Azure Active Directory',
      'GraphQL',
      'WebRTC',
      'TensorFlow',
      'Kubernetes',
      'Machine Learning'
    ]
  }
];

export default caseStudies;
