import { CaseStudy } from './types';
import { automotive } from './automotive';
import { retail } from './retail';
import { manufacturing } from './manufacturing';
import { healthcare } from './healthcare';

const baseImageUrl = '/case-studies';

// Enhanced case studies with more visually appealing images and detailed descriptions
export const caseStudies: CaseStudy[] = [
  {
    ...automotive,
    imageUrl: `/images/case-studies/erp-platform.webp`,
    image: `/images/case-studies/erp-platform.webp`,
    subtitle: 'Comprehensive Digital Solutions for Auto Repair',
    description: 'Complete digital transformation for a leading auto repair shop, boosting online visibility and streamlining operations with custom digital tools.',
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
    imageUrl: `/images/case-studies/fintech-platform.webp`,
    image: `/images/case-studies/fintech-platform.webp`,
    subtitle: 'Multi-Channel Growth Strategy for Local Retailer',
    description: 'Helping a local boutique retailer increase sales by 215% with an integrated e-commerce solution and targeted digital marketing campaigns.',
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
    imageUrl: `/images/case-studies/erp-platform.webp`,
    image: `/images/case-studies/erp-platform.webp`,
    subtitle: 'Smart Manufacturing Automation Solutions',
    description: 'Revolutionizing production efficiency with IoT sensors and real-time analytics, resulting in 47% reduction in downtime and 32% increase in output.',
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
    imageUrl: `/images/case-studies/healthcare-platform.webp`,
    image: `/images/case-studies/healthcare-platform.webp`,
    subtitle: 'Transforming Patient Care with Digital Innovation',
    description: 'Comprehensive digital transformation for a regional healthcare system, improving patient outcomes and reducing administrative burden by 65%.',
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
