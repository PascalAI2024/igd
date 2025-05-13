import { CaseStudy } from './types';
import { BookOpen } from 'lucide-react';

export const elearning: CaseStudy = {
  id: 'elearning-platform',
  title: 'Interactive E-Learning Platform',
  client: 'EduTech Innovations',
  industry: 'Education',
  challenge: 'The client needed a scalable, interactive e-learning platform to deliver personalized educational content to students globally, with advanced analytics to track learning progress and outcomes.',
  solution: 'We built a comprehensive e-learning platform with adaptive learning algorithms, interactive content delivery, real-time collaboration tools, and detailed analytics dashboards for educators and administrators.',
  results: [
    '250% increase in student engagement',
    '40% improvement in learning outcomes',
    'Personalized learning paths for 50,000+ students',
    'Real-time collaboration across 30+ countries',
    'Detailed analytics providing actionable insights for educators'
  ],
  icon: BookOpen,
  testimonial: {
    quote: "The e-learning platform has completely transformed how we deliver education. The personalized learning paths and interactive content have dramatically improved student engagement and outcomes, while the analytics give our educators unprecedented insights into the learning process.",
    author: "Dr. Emily Rodriguez",
    role: "Chief Learning Officer, EduTech Innovations"
  },
  technologies: [
    'React',
    'Node.js',
    'TypeScript',
    'GraphQL',
    'MongoDB',
    'WebRTC',
    'Socket.io',
    'AWS',
    'TensorFlow',
    'Canvas API',
    'Firebase'
  ],
  imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  description: "How we created a comprehensive e-learning platform with adaptive learning algorithms and interactive content delivery for global education.",
  subtitle: 'Interactive E-Learning Platform Development'
};

export default elearning;
