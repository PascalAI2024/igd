import { CaseStudy } from './types';
import { Cloud } from 'lucide-react';

export const saas: CaseStudy = {
  id: 'saas-platform',
  title: 'Enterprise SaaS Platform',
  client: 'Tech Innovators Inc.',
  industry: 'Technology',
  challenge: 'The client needed a scalable SaaS platform to manage complex business operations across multiple departments with real-time data synchronization and advanced analytics capabilities.',
  solution: 'We developed a comprehensive SaaS solution with microservices architecture, real-time data processing, and AI-powered analytics dashboard that integrated with their existing systems.',
  results: [
    '320% increase in operational efficiency',
    '45% reduction in manual data entry',
    'Seamless integration with 12+ third-party services',
    'Scalable architecture supporting 10,000+ concurrent users',
    'Advanced analytics providing actionable business insights'
  ],
  icon: Cloud,
  testimonial: {
    quote: "The SaaS platform transformed our business operations completely. What used to take days now happens in minutes, and the insights we're getting from the analytics have opened new revenue opportunities we hadn't even considered.",
    author: "Sarah Johnson",
    role: "CTO, Tech Innovators Inc."
  },
  technologies: [
    'React',
    'Node.js',
    'TypeScript',
    'GraphQL',
    'MongoDB',
    'Redis',
    'Docker',
    'Kubernetes',
    'AWS',
    'TensorFlow',
    'Elasticsearch'
  ],
  imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop",
  description: "How we built a scalable SaaS platform that transformed business operations for a leading tech company, resulting in 320% increase in operational efficiency.",
  subtitle: 'Enterprise-Grade SaaS Platform Development'
};

export default saas;
