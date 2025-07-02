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
    'Online store launched after 3-month development',
    '35% increase in local visibility over 6 months',
    'Customer loyalty program with 425 active members',
    'Inventory accuracy improved from 72% to 89%'
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
      value: '+35%'
    },
    {
      label: 'Customer Retention',
      value: '72%'
    },
    {
      label: 'Online Sales',
      value: '+48%'
    },
    {
      label: 'Customer Satisfaction',
      value: '86%'
    }
  ],
  testimonial: {
    quote: "The transition wasn't easy - we had to train staff and adjust our processes. But after 6 months, we're seeing steady growth in online sales and better inventory control. We still have work to do, but we're moving in the right direction.",
    author: "Sarah Thompson",
    position: "Store Owner",
  }
};
