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
    'Successfully processed over $50M in transactions',
    'Achieved PCI DSS Level 1 compliance',
    'Reduced payment processing costs by 35% for clients',
    'Scaled to support 10,000+ small business users',
    '99.99% platform uptime',
    'Average onboarding time reduced to under 24 hours',
    'Fraud rate maintained below 0.1%',
    'Integration with 15+ accounting platforms'
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
    efficiency: '85%',
    satisfaction: '96%',
    reliability: '99.99%',
    roi: '350%'
  },
  image: '/case-studies/fintech-platform.webp',
  imageUrl: '/case-studies/fintech-platform.webp',
  icon: CreditCard,
  testimonial: {
    quote: "The payment platform has been transformative for our business. We've been able to streamline our payment processes, reduce costs, and provide a better experience for our customers. The security and reliability give us peace of mind, and the integrations with our existing systems made adoption seamless.",
    author: "Sarah Johnson",
    role: "CEO, PayLocal",
    image: "/team/pascal.jpg"
  },
  timeline: {
    planning: '8 weeks',
    development: '20 weeks',
    testing: '6 weeks',
    deployment: '4 weeks'
  }
};
