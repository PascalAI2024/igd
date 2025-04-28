import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  // Existing posts...
  {
    id: 'digital-workplace-transformation',
    title: 'Digital Workplace Transformation in 2024',
    excerpt: 'Creating modern digital workplaces for enhanced productivity.',
    content: `
      # Digital Workplace Transformation in 2024

      Modern workplaces require comprehensive digital transformation...

      ## Key Elements
      - Collaboration Tools
      - Digital Workflows
      - Employee Experience
      - Security Integration

      ## Implementation Framework
      [Detailed framework...]
    `,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    category: 'Digital Transformation',
    author: {
      name: 'Pascal',
      role: 'Digital Strategy Consultant',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-11',
    readTime: '9 min read',
    tags: ['Digital Workplace', 'Transformation', 'Productivity']
  },
  {
    id: 'data-driven-transformation',
    title: 'Data-Driven Digital Transformation',
    excerpt: 'Leveraging data analytics for successful digital transformation.',
    content: `
      # Data-Driven Digital Transformation

      Data analytics is key to successful digital transformation...

      ## Key Components
      - Data Strategy
      - Analytics Implementation
      - Decision Making
      - Performance Measurement

      ## Success Stories
      [Detailed case studies...]
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    category: 'Digital Transformation',
    author: {
      name: 'Pascal',
      role: 'Digital Strategy Consultant',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-10',
    readTime: '11 min read',
    tags: ['Data Analytics', 'Digital Transformation', 'Strategy']
  }
];