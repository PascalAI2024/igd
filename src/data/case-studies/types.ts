import { LucideIcon } from 'lucide-react';

export interface MetricItem {
  label: string;
  value: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  position?: string;
  role?: string;
  image?: string;
}

export interface Timeline {
  planning: string;
  development: string;
  testing: string;
  deployment: string;
}

export interface Metrics {
  [key: string]: string;
}

export interface AdditionalResource {
  type: string;
  title: string;
  url: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client?: string;
  description: string;
  industry: string;
  services?: string[];
  challenge: string;
  solution: string;
  results: string[];
  imageUrl: string;
  image?: string;
  technologies: string[];
  features?: string[];
  metrics?: Metrics | MetricItem[];
  icon?: LucideIcon;
  testimonial?: Testimonial;
  timeline?: Timeline;
  nextSteps?: string[];
  videoDemo?: string;
  reliability?: string;
  adoption?: string;
  satisfaction?: string;
  compliance?: string;
  roi?: string;
  additionalResources?: AdditionalResource[];
}

// Make all properties required for type safety in components
export type RequiredCaseStudy = Required<Omit<CaseStudy, 'icon' | 'additionalResources'>> & {
  icon?: LucideIcon;
  additionalResources?: AdditionalResource[];
};
