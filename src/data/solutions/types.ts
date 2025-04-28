import { LucideIcon } from 'lucide-react';

export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string | LucideIcon;
  features: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  metrics?: {
    [key: string]: string;
  };
  showcaseImage?: string;
  path: string;
}

export interface SolutionCategory {
  id: string;
  title: string;
  solutions: Solution[];
}
