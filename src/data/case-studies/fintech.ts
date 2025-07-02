import { CreditCard } from 'lucide-react';
import type { CaseStudy } from './types';

export const fintech: CaseStudy = {
  id: 'fintech-payment-platform',
  title: 'FinTech Payment Platform',
  subtitle: 'Revolutionizing Small Business Payments',
  description: 'How we built a secure, scalable payment platform that helped small businesses process over $50M in transactions.',
  client: 'PayLocal',
  industry: 'FinTech',
  challenge: `
    PayLocal, a startup focused on small business payment solutions, faced significant challenges:
    - Complex regulatory compliance requirements
    - Need for bank-grade security with limited resources
    - Integration with multiple payment processors and banks
    - User experience barriers for non-technical business owners
    - Scaling infrastructure to handle growing transaction volume
    - Building trust with risk-averse small business customers
    - Competing with established payment providers
  `,
  solution: `
    We designed and built a comprehensive payment platform:
    - Secure, compliant payment processing architecture
    - Intuitive dashboard for transaction management
    - Seamless integration with accounting software
    - Mobile app for on-the-go payment processing
    - Automated reconciliation and reporting
    - Custom fraud detection and prevention system
    - White-label solution for partner businesses
  `,
  results: [
    'Processed $12M in transactions in first 18 months',
    'Achieved PCI DSS Level 1 compliance after 6-month audit',
    'Reduced payment processing costs by 15-20% for most clients',
    'Scaled to support 2,500 small business users',
    '98.5% platform uptime with planned maintenance windows',
    'Average onboarding time reduced from 5 days to 48 hours',
    'Fraud rate maintained at 0.3% industry average',
    'Integration with 8 major accounting platforms'
  ],
  technologies: [
    'React',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Redis',
    'AWS',
    'Stripe API',
    'Plaid API',
    'Docker',
    'Kubernetes',
    'Terraform',
    'React Native'
  ],
  features: [
    'Multi-payment Method Processing',
    'Real-time Transaction Dashboard',
    'Automated Reconciliation',
    'Recurring Payment Management',
    'Custom Payment Pages',
    'Advanced Fraud Detection',
    'Detailed Analytics',
    'Multi-currency Support'
  ],
  metrics: {
    efficiency: '48%',
    satisfaction: '82%',
    reliability: '98.5%',
    roi: '125%'
  },
  image: '/case-studies/fintech-platform.webp',
  imageUrl: '/case-studies/fintech-platform.webp',
  icon: CreditCard,
  testimonial: {
    quote: "Building a fintech platform from scratch was more complex than anticipated - regulatory compliance alone took 6 months. We had some early stability issues and integration challenges. However, after a year of iterations, we've built a solid platform that's genuinely helping small businesses save on payment processing.",
    author: "Sarah Johnson",
    role: "CEO, PayLocal",
  },
  timeline: {
    planning: '12 weeks',
    development: '32 weeks',
    testing: '12 weeks',
    deployment: '8 weeks'
  }
};
