import { BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    id: 'future-of-ai-enterprise',
    title: 'The Future of AI in Enterprise Software Development',
    excerpt: 'Exploring how artificial intelligence is revolutionizing enterprise applications.',
    content: `
      Artificial intelligence is transforming the way we develop and maintain enterprise software. 
      From automated testing to intelligent code optimization, AI is becoming an integral part of 
      the software development lifecycle.

      ## Key Benefits
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
    image: '/blog/ai-enterprise.jpg',
    category: 'AI & Machine Learning',
    author: {
      name: 'Pascal',
      role: 'AI Solutions Architect',
      image: '/team/pascal.jpg'
    },
    date: '2024-03-10',
    readTime: '8 min read',
    tags: ['AI', 'Enterprise', 'Software Development']
  },
  {
    id: 'ai-powered-automation',
    title: 'AI-Powered Automation: Transforming Business Operations',
    excerpt: 'How AI automation is revolutionizing business processes and improving efficiency.',
    content: `
      AI-powered automation is reshaping how businesses operate, from customer service to 
      internal processes. Learn how organizations are leveraging AI to achieve unprecedented 
      levels of efficiency and innovation.

      ## Key Areas of Impact
      - Process Automation
      - Customer Service
      - Data Analysis
      - Decision Making

      ## Implementation Guide
      1. Identify automation opportunities
      2. Select appropriate AI tools
      3. Train and deploy models
      4. Monitor and optimize results
    `,
    image: '/blog/ai-automation.jpg',
    category: 'AI & Machine Learning',
    author: {
      name: 'Pascal',
      role: 'AI Solutions Architect',
      image: '/team/pascal.jpg'
    },
    date: '2024-03-08',
    readTime: '10 min read',
    tags: ['AI', 'Automation', 'Business']
  }
];
