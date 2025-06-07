import { Stethoscope } from 'lucide-react';
import type { CaseStudy } from './types';

export const healthcare: CaseStudy = {
  id: 'healthcare-platform',
  title: 'Transforming Patient Care: St. Mary\'s Regional Health System Digital Overhaul',
  subtitle: 'Revolutionizing Healthcare Delivery Through Digital Innovation',
  description: 'A comprehensive digital transformation project that modernized patient care delivery, improved operational efficiency, and enhanced patient outcomes at St. Mary\'s Regional Health System.',
  client: 'St. Mary\'s Regional Health System',
  industry: 'Healthcare',
  challenge: `
    St. Mary's Regional Health System, serving a diverse community of 250,000 patients, faced critical technological barriers:
    - Legacy Electronic Health Record (EHR) system dating back to 2005, causing critical data fragmentation
    - Manual scheduling process resulting in 3-week average wait times for specialist appointments
    - Disjointed telehealth infrastructure with less than 5% patient adoption
    - Compliance documentation consuming 40% of clinical staff's administrative time
    - High patient no-show rates averaging 35%, costing approximately $1.2M annually
    - Limited ability to provide personalized preventive care
  `,
  solution: `
    Our comprehensive digital transformation strategy delivered a patient-centric healthcare ecosystem:
    - Unified, HIPAA-compliant Electronic Health Record system with real-time data synchronization
    - AI-driven intelligent scheduling optimizing resource allocation
    - Seamless, user-friendly telehealth platform with multi-device support
    - Advanced patient engagement tools with personalized health insights
    - Automated compliance and reporting mechanisms
    - Predictive analytics for proactive patient care management
  `,
  results: [
    '65% reduction in administrative processing time',
    '80% increase in patient satisfaction scores',
    'Appointment wait times reduced from 3 weeks to 2 days',
    'Telehealth adoption increased from 5% to 45%',
    '100% HIPAA and HITRUST compliance maintained',
    'Patient no-show rates decreased to 12%',
    'Annual cost savings of $1.5M through operational efficiency',
    'Successful digital transformation across 7 regional healthcare facilities'
  ],
  technologies: [
    'React.js',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'AWS HIPAA-Compliant Cloud',
    'Twilio Video SDK',
    'Azure Active Directory',
    'GraphQL',
    'WebRTC',
    'TensorFlow',
    'Kubernetes',
    'Machine Learning'
  ],
  features: [
    'Comprehensive Unified Electronic Health Records',
    'Advanced Telehealth Integration',
    'AI-Powered Patient Scheduling',
    'Secure Patient Communication Portal',
    'Predictive Health Risk Assessment',
    'Real-time Lab Results Tracking',
    'Intelligent Prescription Management',
    'Personalized Preventive Care Recommendations'
  ],
  metrics: {
    efficiency: '65%',
    satisfaction: '80%',
    compliance: '100%',
    roi: '300%'
  },
  image: '/case-studies/healthcare-platform.webp',
  imageUrl: '/case-studies/healthcare-platform.webp',
  icon: Stethoscope,
  testimonial: {
    quote: "We were drowning in administrative complexity, struggling to provide quality patient care. Ingenious Digital didn't just upgrade our technology—they reimagined our entire healthcare delivery model. Our clinicians now spend more time with patients and less time fighting with systems.",
    author: "Dr. Elena Rodriguez",
    role: "Chief Executive Officer, St. Mary's Regional Health System",
  },
  timeline: {
    planning: '8 weeks',
    development: '24 weeks',
    testing: '10 weeks',
    deployment: '8 weeks'
  },
  nextSteps: [
    'Advanced AI Diagnostic Support System',
    'Comprehensive Wearable and IoT Device Integration',
    'Genomic Data-Driven Personalized Medicine',
    'Multi-Language Accessibility Enhancements',
    'Blockchain-Based Secure Health Record Management',
    'Mental Health Predictive Analytics Platform'
  ]
};
