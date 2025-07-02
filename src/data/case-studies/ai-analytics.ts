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
    '68% reduction in data processing time after optimization',
    '45% improvement in prediction accuracy over baseline',
    'Near real-time processing of 100TB+ of data daily',
    'Custom visualization tools adopted by 85% of users',
    'Automated anomaly detection saving 40+ hours per month'
  ],
  icon: Brain,
  testimonial: {
    quote: "Building the platform required significant effort and iteration. Early models had accuracy issues that took months to resolve. However, after refinement, we've achieved meaningful improvements in processing speed and prediction quality. The journey was challenging but worthwhile.",
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
  imageUrl: "/case-studies/ai-analytics.webp",
  image: "/case-studies/ai-analytics.webp",
  description: "How we developed an AI-powered analytics platform that processes massive datasets in real-time, providing actionable insights and predictive capabilities.",
  subtitle: 'Advanced AI Analytics for Enterprise Data'
};

export default aiAnalytics;
