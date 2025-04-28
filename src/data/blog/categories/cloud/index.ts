import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'cloud-migration-florida',
    title: 'Cloud Migration Strategies for Florida Businesses',
    excerpt: 'Best practices for moving your business to the cloud in the Sunshine State.',
    content: `
      Florida businesses are increasingly adopting cloud solutions...
      
      ## Migration Considerations
      - Hurricane preparedness
      - Data sovereignty
      - Performance optimization
      - Cost management
      
      ## Best Practices
      - Assessment and planning
      - Security measures
      - Implementation steps
      - Monitoring and optimization
      
      ## Local Success Stories
      - Case studies
      - Lessons learned
      - ROI analysis
    `,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: 'Cloud Computing',
    author: {
      name: 'Pascal',
      role: 'Cloud Infrastructure Architect',
      image: '/team/pascal.jpg'
    },
    date: '2024-02-28',
    readTime: '10 min read',
    tags: ['Cloud Migration', 'Florida Business', 'Technology Infrastructure', 'Disaster Recovery']
  }
];
