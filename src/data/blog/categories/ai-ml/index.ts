import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'ai-enterprise-software',
    title: 'The Future of AI in Enterprise Software Development',
    excerpt: 'Exploring how artificial intelligence is revolutionizing enterprise applications in South Florida.',
    content: `
      Artificial intelligence is transforming the way Fort Lauderdale businesses develop and maintain enterprise software...
      
      ## Key Benefits for South Florida Businesses
      - Automated testing and quality assurance
      - Intelligent code optimization
      - Predictive maintenance
      - Enhanced user experiences
      
      ## Implementation Strategies
      1. Start with clear objectives
      2. Choose the right AI technologies
      3. Ensure data quality
      4. Monitor and optimize performance
    `,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI & Machine Learning',
    author: {
      name: 'Pascal',
      role: 'AI Solutions Architect',
      image: '/team/pascal.jpg'
    },
    date: '2024-03-10',
    readTime: '8 min read',
    tags: ['AI', 'Enterprise', 'Software Development', 'Fort Lauderdale Tech']
  }
];
