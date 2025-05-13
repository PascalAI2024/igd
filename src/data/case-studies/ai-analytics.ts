import { CaseStudy } from './types';
import { Brain } from 'lucide-react';

export const aiAnalytics: CaseStudy = {
  id: 'ai-analytics',
  title: 'AI-Powered Analytics Platform',
  client: 'Global Data Insights',
  industry: 'Data Analytics',
  challenge: 'The client needed to process and analyze massive datasets from multiple sources to provide actionable insights for their enterprise customers, with existing solutions taking too long to generate meaningful results.',
  solution: 'We built a custom AI-powered analytics platform using machine learning algorithms to process data in real-time, identify patterns, and generate predictive insights with interactive visualization dashboards.',
  results: [
    '95% reduction in data processing time',
    '78% improvement in prediction accuracy',
    'Real-time processing of 500TB+ of data',
    'Custom visualization tools for complex data sets',
    'Automated anomaly detection saving 120+ hours per month'
  ],
  icon: Brain,
  testimonial: {
    quote: "The AI analytics platform has revolutionized how we deliver insights to our clients. What used to take weeks of analysis can now be visualized in seconds, with predictive capabilities that have transformed our value proposition in the market.",
    author: "Michael Chen",
    role: "Director of Analytics, Global Data Insights"
  },
  technologies: [
    'Python',
    'TensorFlow',
    'PyTorch',
    'React',
    'Node.js',
    'D3.js',
    'Apache Spark',
    'AWS SageMaker',
    'Kafka',
    'Elasticsearch',
    'Docker',
    'Kubernetes'
  ],
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  description: "How we developed an AI-powered analytics platform that processes massive datasets in real-time, providing actionable insights and predictive capabilities.",
  subtitle: 'Advanced AI Analytics for Enterprise Data'
};

export default aiAnalytics;
