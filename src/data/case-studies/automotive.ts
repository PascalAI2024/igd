import { CaseStudy } from './types';

export const automotive: CaseStudy = {
  id: 'auto-service-digital',
  title: 'Local Auto Service Success',
  subtitle: 'Digital Transformation for Auto Repair Shop',
  description: 'How we helped a local auto repair shop increase bookings by 45% through digital solutions.',
  industry: 'Auto Services',
  services: ['Digital Marketing', 'CRM', 'Web Development'],
  challenge: 'A local auto repair shop was struggling to compete with larger chains and needed to modernize their customer booking and management systems.',
  solution: 'We implemented a comprehensive digital solution including online booking, customer management, and local SEO optimization.',
  results: [
    'Online booking system implementation',
    '45% increase in service appointments',
    'Automated customer follow-ups',
    'Improved customer satisfaction'
  ],
  image: '/case-studies/erp-platform.webp',
  imageUrl: '/case-studies/erp-platform.webp',
  technologies: [
    'React',
    'Node.js',
    'High Level CRM',
    'Google Business Profile',
    'Local SEO Tools'
  ],
  metrics: [
    {
      label: 'Appointment Increase',
      value: '45%'
    },
    {
      label: 'Customer Satisfaction',
      value: '95%'
    },
    {
      label: 'Local Search Visibility',
      value: '+320%'
    },
    {
      label: 'Return Customers',
      value: '78%'
    }
  ],
  testimonial: {
    quote: "The digital transformation has completely changed how we do business. We're booking more appointments than ever and our customers love the convenience.",
    author: "Mike Johnson",
    position: "Owner",
    image: "/team/auto-owner.webp"
  }
};
