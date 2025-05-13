import { CaseStudy } from './types';
import { automotive } from './automotive';
import { retail } from './retail';
import { manufacturing } from './manufacturing';
import { healthcare } from './healthcare';
import { restaurant } from './restaurant';
import { ecommerce } from './ecommerce';
import { realestate } from './realestate';
import { fintech } from './fintech';
import { education } from './education';

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
    imageUrl: `/images/case-studies/healthcare-platform.webp`,
    image: `/images/case-studies/healthcare-platform.webp`,
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
  },
  {
    ...restaurant,
    imageUrl: `/images/case-studies/erp-platform.webp`,
    image: `/images/case-studies/erp-platform.webp`,
    subtitle: 'Boosting Revenue Through Digital Innovation',
    description: 'How we helped a local restaurant increase revenue by 75% through digital ordering, marketing, and customer engagement solutions.',
    technologies: [
      'React',
      'Node.js',
      'Square POS Integration',
      'Custom CRM',
      'Google Business Profile',
      'Local SEO',
      'Instagram/Facebook Ads',
      'Email Marketing'
    ]
  },
  {
    ...ecommerce,
    imageUrl: `/images/case-studies/fintech-platform.webp`,
    image: `/images/case-studies/fintech-platform.webp`,
    subtitle: 'Scaling Online Sales for Specialty Retailer',
    description: 'How we helped a specialty retailer increase online sales by 215% through platform optimization and digital marketing.',
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Shopify API',
      'Stripe',
      'Algolia Search',
      'Google Analytics 4',
      'AWS'
    ]
  },
  {
    ...realestate,
    imageUrl: `/images/case-studies/erp-platform.webp`,
    image: `/images/case-studies/erp-platform.webp`,
    subtitle: 'Modernizing Property Management and Sales',
    description: 'How we helped a local real estate agency increase listings by 120% and improve client satisfaction through digital innovation.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'AWS',
      'Matterport Integration',
      'HubSpot CRM',
      'MLS Integration',
      'Google Maps API'
    ]
  },
  {
    ...fintech,
    imageUrl: `/images/case-studies/fintech-platform.webp`,
    image: `/images/case-studies/fintech-platform.webp`,
    subtitle: 'Revolutionizing Small Business Payments',
    description: 'How we built a secure, scalable payment platform that helped small businesses process over $50M in transactions.',
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Stripe API',
      'Plaid API'
    ]
  },
  {
    ...education,
    imageUrl: `/images/case-studies/healthcare-platform.webp`,
    image: `/images/case-studies/healthcare-platform.webp`,
    subtitle: 'Transforming Education Through Technology',
    description: 'How we helped a local educational institution increase student engagement by 85% with a comprehensive digital learning platform.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'AWS',
      'WebRTC',
      'Socket.io',
      'Canvas API',
      'Firebase'
    ]
  }
];

export default caseStudies;
