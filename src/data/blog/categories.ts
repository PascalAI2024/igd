import { Brain, Shield, Cloud, Code2, Lightbulb } from 'lucide-react';
import type { BlogCategory } from './types';

export const categories: BlogCategory[] = [
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