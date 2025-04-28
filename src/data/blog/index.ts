import { Brain, Shield, Cloud, Code2, Lightbulb, BarChart } from 'lucide-react';
import type { BlogPost, BlogCategory } from './types';

export const categories: BlogCategory[] = [
  {
    id: 'marketing',
    name: 'Digital Marketing',
    description: 'Digital marketing strategies and best practices',
    icon: BarChart
  },
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

// Import all blog posts
import { posts as aiPosts } from './posts/ai-ml';
import { posts as securityPosts } from './posts/security';
import { post as cloudPost } from './posts/cloud-computing';
import { post as devPost } from './posts/software-development';
import { post as transformationPost } from './posts/digital-transformation';
import { post as marketingTrendsPost } from './posts/digital-marketing-trends';
import { post as seoPost } from './posts/seo-strategies';
import { post as webDevPost } from './posts/web-development-best-practices';

// Combine all posts and sort by date
export const blogPosts: BlogPost[] = [
  ...aiPosts,
  ...securityPosts,
  cloudPost,
  devPost,
  transformationPost,
  marketingTrendsPost,
  seoPost,
  webDevPost
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Helper functions
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  if (categoryId.toLowerCase() === 'all') return blogPosts;
  const category = categories.find(c => c.id === categoryId);
  if (!category) return blogPosts;
  return blogPosts.filter(post => post.category === category.name);
};

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};
