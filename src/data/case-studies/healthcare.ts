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
    '42% reduction in administrative processing time over 12 months',
    '35% increase in patient satisfaction scores after full implementation',
    'Appointment wait times reduced from 3 weeks to 7-10 days',
    'Telehealth adoption increased from 5% to 28% within first year',
    'Achieved HIPAA and HITRUST compliance after rigorous audit',
    'Patient no-show rates decreased from 35% to 22%',
    'Annual cost savings of $750K through operational improvements',
    'Phased rollout completed across 7 facilities over 18 months'
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
    efficiency: '42%',
    satisfaction: '35%',
    compliance: '100%',
    roi: '145%'
  },
  image: '/case-studies/healthcare-platform.webp',
  imageUrl: '/case-studies/healthcare-platform.webp',
  icon: Stethoscope,
  testimonial: {
    quote: "The implementation wasn't without challenges - we faced initial resistance from staff and some integration hurdles. However, with proper training and iterative improvements, we've achieved meaningful gains. Our clinicians are now spending less time on administration, though we continue to optimize the workflows.",
    author: "Dr. Elena Rodriguez",
    role: "Chief Executive Officer, St. Mary's Regional Health System",
  },
  timeline: {
    planning: '12 weeks',
    development: '36 weeks',
    testing: '16 weeks',
    deployment: '24 weeks'
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
