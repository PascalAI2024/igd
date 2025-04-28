import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'tech-hub-fort-lauderdale',
    title: 'Fort Lauderdale: The Rising Tech Hub of South Florida',
    excerpt: 'How Fort Lauderdale is becoming a major technology center in the Southeast.',
    content: `
      Fort Lauderdale's tech ecosystem is experiencing unprecedented growth...
      
      ## Growth Factors
      - Strategic location
      - Growing talent pool
      - Business-friendly environment
      - High quality of life
      
      ## Tech Sectors
      - Software development
      - Cybersecurity
      - FinTech
      - Healthcare technology
      
      ## Local Success Stories
      - Notable startups
      - Corporate expansions
      - Innovation centers
    `,
    image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&q=80',
    category: 'Tech Trends',
    author: {
      name: 'Pascal',
      role: 'Technology Strategist',
      image: '/team/pascal.jpg'
    },
    date: '2024-03-07',
    readTime: '10 min read',
    tags: ['Fort Lauderdale', 'Tech Hub', 'South Florida', 'Business Growth']
  }
];
