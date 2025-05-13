import { CaseStudy } from './types';
import { Shield } from 'lucide-react';

export const cybersecurity: CaseStudy = {
  id: 'cybersecurity-platform',
  title: 'Enterprise Cybersecurity Platform',
  client: 'SecureNet Solutions',
  industry: 'Cybersecurity',
  challenge: 'The client needed a comprehensive cybersecurity solution to protect their enterprise clients from increasingly sophisticated threats, with real-time monitoring and automated response capabilities.',
  solution: 'We developed an advanced cybersecurity platform with AI-powered threat detection, real-time monitoring, and automated incident response that integrated with existing security infrastructure.',
  results: [
    '99.8% accuracy in threat detection',
    '85% reduction in false positives',
    'Average threat response time reduced from hours to seconds',
    'Comprehensive protection across cloud and on-premise systems',
    'Compliance with ISO 27001, GDPR, and HIPAA standards'
  ],
  icon: Shield,
  testimonial: {
    quote: "This cybersecurity platform has transformed how we protect our clients. The AI-powered threat detection catches sophisticated attacks that would have previously gone unnoticed, and the automated response capabilities have dramatically reduced our incident resolution times.",
    author: "Alexandra Rivera",
    role: "CISO, SecureNet Solutions"
  },
  technologies: [
    'Python',
    'TensorFlow',
    'React',
    'Node.js',
    'Elasticsearch',
    'Kafka',
    'Docker',
    'Kubernetes',
    'AWS',
    'OpenAI API',
    'Blockchain'
  ],
  imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
  description: "How we built an advanced cybersecurity platform with AI-powered threat detection and automated incident response for enterprise clients.",
  subtitle: 'Enterprise-Grade Cybersecurity Platform'
};

export default cybersecurity;
