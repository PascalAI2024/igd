import { GraduationCap } from 'lucide-react';
import type { CaseStudy } from './types';

export const education: CaseStudy = {
  id: 'education-learning-platform',
  title: 'Digital Learning Platform',
  subtitle: 'Transforming Education Through Technology',
  description: 'How we helped a local educational institution increase student engagement by 85% with a comprehensive digital learning platform.',
  client: 'Horizon Academy',
  industry: 'Education',
  challenge: `
    Horizon Academy, a growing educational institution, faced significant challenges in the digital age:
    - Limited remote learning capabilities during pandemic restrictions
    - Inconsistent student engagement across different subjects
    - Difficulty tracking student progress and identifying intervention needs
    - Inefficient administrative processes consuming teacher time
    - Limited parent visibility into student activities and performance
    - Outdated content delivery methods not meeting modern learning styles
    - Difficulty competing with larger institutions' digital offerings
  `,
  solution: `
    We implemented a comprehensive digital learning ecosystem:
    - Interactive learning management system with personalized learning paths
    - Real-time progress tracking and analytics dashboard
    - Virtual classroom environment with collaborative tools
    - Mobile app for anytime, anywhere learning
    - Parent portal for progress monitoring and communication
    - Automated administrative processes and reporting
    - Content creation tools for teachers to develop custom materials
  `,
  results: [
    '85% increase in student engagement',
    '32% improvement in average test scores',
    '75% reduction in administrative workload for teachers',
    '90% parent adoption rate of the platform',
    'Student retention rate improved by 25%',
    'Successful transition to hybrid learning model',
    'Curriculum development time reduced by 40%',
    'Expanded enrollment by 35% through digital offerings'
  ],
  technologies: [
    'React',
    'Node.js',
    'MongoDB',
    'AWS',
    'WebRTC',
    'Socket.io',
    'Canvas API',
    'Firebase',
    'React Native',
    'TensorFlow',
    'Google Classroom Integration'
  ],
  features: [
    'Interactive Learning Modules',
    'Virtual Classroom Environment',
    'Progress Tracking Dashboard',
    'Automated Assessment Tools',
    'Parent Communication Portal',
    'Content Management System',
    'Attendance Tracking',
    'Learning Analytics'
  ],
  metrics: {
    efficiency: '75%',
    satisfaction: '92%',
    reliability: '99.8%',
    roi: '240%'
  },
  image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200',
  imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200',
  icon: GraduationCap,
  testimonial: {
    quote: "The digital learning platform has revolutionized how we teach and how our students learn. We've seen remarkable improvements in engagement, performance, and satisfaction from students, parents, and teachers alike. The platform has enabled us to provide a truly modern educational experience.",
    author: "Dr. Michelle Taylor",
    role: "Principal, Horizon Academy",
  },
  timeline: {
    planning: '6 weeks',
    development: '18 weeks',
    testing: '5 weeks',
    deployment: '3 weeks'
  }
};
