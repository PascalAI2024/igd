import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  // Existing posts...
  {
    id: 'serverless-architecture',
    title: 'Serverless Architecture: The Future of Cloud Computing',
    excerpt: 'Understanding serverless architecture and its business benefits.',
    content: `
      # Serverless Architecture: The Future of Cloud Computing

      Serverless computing is transforming how we build and deploy applications...

      ## Key Benefits
      - Reduced Operational Costs
      - Automatic Scaling
      - Faster Time to Market
      - Improved Developer Productivity

      ## Implementation Strategies
      [Detailed strategies...]
    `,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: 'Cloud Computing',
    author: {
      name: 'Pascal',
      role: 'Cloud Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-13',
    readTime: '12 min read',
    tags: ['Serverless', 'Cloud', 'Architecture']
  },
  {
    id: 'cloud-cost-optimization',
    title: 'Cloud Cost Optimization Strategies',
    excerpt: 'Effective methods for managing and optimizing cloud costs.',
    content: `
      # Cloud Cost Optimization Strategies

      Managing cloud costs effectively is crucial for business success...

      ## Optimization Techniques
      - Resource Right-sizing
      - Reserved Instances
      - Spot Instances
      - Automated Scaling

      ## Implementation Guide
      [Detailed implementation steps...]
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    category: 'Cloud Computing',
    author: {
      name: 'Pascal',
      role: 'Cloud Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-12',
    readTime: '10 min read',
    tags: ['Cloud', 'Cost Optimization', 'AWS']
  }
];