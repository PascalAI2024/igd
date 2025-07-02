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
    '91% accuracy in threat detection after ML model training',
    '62% reduction in false positives over 6 months',
    'Average threat response time reduced from hours to minutes',
    'Protection coverage for 90% of attack vectors',
    'Achieved compliance certifications after 8-month audit process'
  ],
  icon: Shield,
  testimonial: {
    quote: "Implementing the platform required careful tuning to reduce false positives, which initially overwhelmed our team. After 6 months of refinement and model training, we've achieved a good balance between detection accuracy and operational efficiency. It's an ongoing process of improvement.",
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
