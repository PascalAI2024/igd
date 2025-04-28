import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'tech-industry-florida',
    title: 'The Growing Tech Industry in South Florida',
    excerpt: 'Analysis of the expanding technology sector in South Florida.',
    content: `
      # The Growing Tech Industry in South Florida

      South Florida's technology sector is experiencing unprecedented growth...

      ## Growth Factors
      - Business-friendly environment
      - Growing talent pool
      - Quality of life
      - Strategic location

      ## Opportunities
      [Detailed analysis of opportunities...]
    `,
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80',
    category: 'Industry Insights',
    author: {
      name: 'Pascal',
      role: 'Industry Analyst',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-11',
    readTime: '11 min read',
    tags: ['Tech Industry', 'South Florida', 'Growth']
  },
  {
    id: 'fintech-innovation',
    title: 'FinTech Innovation in South Florida',
    excerpt: 'How financial technology is transforming the local financial sector.',
    content: `
      # FinTech Innovation in South Florida

      The intersection of finance and technology in South Florida...

      ## Key Trends
      - Digital banking
      - Blockchain adoption
      - Payment innovation
      - RegTech solutions

      ## Case Studies
      [Detailed case studies...]
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    category: 'Industry Insights',
    author: {
      name: 'Pascal',
      role: 'Industry Analyst',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-06',
    readTime: '9 min read',
    tags: ['FinTech', 'Innovation', 'Finance']
  }
];