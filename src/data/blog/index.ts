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

// Import all blog posts from the centralized posts index
import allBlogPosts from './posts';

// Export the blog posts
export const blogPosts: BlogPost[] = allBlogPosts;

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
