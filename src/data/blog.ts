import { Brain, Shield, Cloud, Code2, Lightbulb } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const categories: Category[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Latest developments in artificial intelligence and machine learning',
    icon: Brain
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security trends, threats, and best practices',
    icon: Shield
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Cloud technologies and infrastructure solutions',
    icon: Cloud
  },
  {
    id: 'software-development',
    name: 'Software Development',
    description: 'Best practices and trends in software development',
    icon: Code2
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    description: 'Business transformation through technology',
    icon: Lightbulb
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'ai-enterprise-software',
    title: 'The Future of AI in Enterprise Software Development',
    excerpt: 'Exploring how artificial intelligence is revolutionizing enterprise applications.',
    content: `
      Artificial intelligence is transforming the way we develop and maintain enterprise software. 
      
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
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI & Machine Learning',
    author: 'Pascal',
    date: '2024-03-10',
    readTime: '8 min read',
    tags: ['AI', 'Enterprise', 'Software Development']
  },
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
    category: 'Cybersecurity',
    author: 'Pascal',
    date: '2024-03-08',
    readTime: '6 min read',
    tags: ['Cybersecurity', 'Business', 'Florida']
  },
  {
    id: 'cloud-transformation',
    title: 'Cloud Transformation Success Stories',
    excerpt: 'Real-world examples of successful cloud migration strategies.',
    content: `
      Learn from successful cloud transformation journeys and best practices.
      
      ## Key Success Factors
      - Thorough planning and assessment
      - Phased migration approach
      - Strong security measures
      - Employee training and adoption
      
      ## Implementation Steps
      1. Assessment and planning
      2. Architecture design
      3. Migration execution
      4. Optimization and monitoring
    `,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: 'Cloud Computing',
    author: 'Pascal',
    date: '2024-03-06',
    readTime: '10 min read',
    tags: ['Cloud', 'Digital Transformation', 'Case Study']
  }
];

// Helper function to get posts by category
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  return blogPosts.filter(post => {
    const category = categories.find(c => c.id === categoryId);
    return category ? post.category === category.name : false;
  });
};

// Helper function to get post by ID
export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};