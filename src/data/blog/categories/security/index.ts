import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'cybersecurity-florida',
    title: 'Cybersecurity Best Practices for South Florida Businesses',
    excerpt: 'Essential security measures for businesses in the digital age.',
    content: `
      As cyber threats evolve, businesses in South Florida need robust security strategies...
      
      ## Essential Security Measures
      - Regular security audits
      - Employee training
      - Data encryption
      - Incident response planning
      
      ## Local Compliance Requirements
      - Florida Information Protection Act
      - Industry-specific regulations
      - Data breach notification laws
    `,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80',
    category: 'Security',
    author: {
      name: 'Pascal',
      role: 'Security Solutions Architect',
      image: '/team/pascal.jpg'
    },
    date: '2024-03-08',
    readTime: '6 min read',
    tags: ['Cybersecurity', 'Business', 'Florida', 'South Florida Tech']
  }
];
