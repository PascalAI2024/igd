import { GraduationCap } from 'lucide-react';
import type { CaseStudy } from './types';

export const education: CaseStudy = {
  id: 'education-learning-platform',
  title: 'Digital Learning Platform',
  subtitle: 'Transforming Education Through Technology',
  description: 'How we helped a local educational institution modernize their learning environment through phased digital transformation.',
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
    'Student participation increased from 65% to 78%',
    'Test scores improved by 12% on average',
    'Teachers save 5-8 hours/week on admin tasks',
    '72% of parents actively use the portal',
    'Retention improved from 82% to 88%',
    'Successfully offering 30% of classes hybrid',
    'Course prep time reduced by 3-4 hours/week',
    'Enrollment up 18% after 2 years'
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
    quote: "Rolling out new technology in education is never easy. We faced teacher resistance, technical hiccups, and parent concerns. But after a year of gradual implementation and extensive training, we're seeing real benefits. Students are more engaged, teachers spend less time on paperwork, and parents appreciate the transparency. It's been a journey, but we're heading in the right direction.",
    author: "Dr. Michelle Taylor",
    role: "Principal, Horizon Academy (450 students, K-8)",
  },
  timeline: {
    planning: '6 weeks',
    development: '18 weeks',
    testing: '5 weeks',
    deployment: '3 weeks'
  }
};
