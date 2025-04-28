import { CaseStudy } from './types';

export const retail: CaseStudy = {
  id: 'local-retail-digital',
  title: 'Local Retail Growth',
  subtitle: 'Digital Solutions for Local Store',
  description: 'Helping a local retail store compete with big-box retailers through digital transformation.',
  industry: 'Local Retail',
  services: ['Digital Marketing', 'CRM', 'Web Development'],
  challenge: 'A local retail store was losing customers to large chain stores and needed to modernize their operations and online presence.',
  solution: 'We implemented a comprehensive digital solution including e-commerce, local marketing, and customer management systems.',
  results: [
    'Online store implementation',
    '60% increase in local visibility',
    'Customer loyalty program',
    'Streamlined inventory management'
  ],
  image: '/case-studies/fintech-platform.webp',
  imageUrl: '/case-studies/fintech-platform.webp',
  technologies: [
    'React',
    'Node.js',
    'High Level CRM',
    'Google Business Profile',
    'Local SEO Tools',
    'Inventory Management System'
  ],
  metrics: [
    {
      label: 'Local Visibility',
      value: '+60%'
    },
    {
      label: 'Customer Retention',
      value: '85%'
    },
    {
      label: 'Online Sales',
      value: '+125%'
    },
    {
      label: 'Customer Satisfaction',
      value: '92%'
    }
  ],
  testimonial: {
    quote: "The digital transformation has revolutionized our business. We're now able to compete effectively with larger retailers while maintaining our local charm.",
    author: "Sarah Thompson",
    position: "Store Owner",
    image: "/team/retail-owner.webp"
  }
};
