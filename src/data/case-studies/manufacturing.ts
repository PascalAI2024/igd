import { Factory } from 'lucide-react';
import type { CaseStudy } from './types';

export const manufacturing: CaseStudy = {
  id: 'smart-manufacturing',
  title: 'Industry 4.0 Transformation: Smart Factory Revolution',
  subtitle: 'Revolutionizing Manufacturing Through Digital Innovation',
  description: 'A comprehensive Industry 4.0 transformation project that modernized manufacturing operations, improved efficiency, and reduced costs through IoT, AI, and automation technologies.',
  client: 'Industrial Innovations Corp',
  industry: 'Manufacturing',
  challenge: `
    Industrial Innovations Corp, a leading manufacturer with 5 production facilities, faced significant operational hurdles:
    - Manual production tracking suffered from 40% data inaccuracy rate
    - Quality control defects were costing $3M annually
    - Equipment downtime was averaging 120 hours monthly
    - Resource allocation inefficiencies were causing 25% waste
    - Limited visibility into real-time production metrics
    - Rising energy costs and sustainability concerns
  `,
  solution: `
    Our comprehensive Industry 4.0 transformation delivered a state-of-the-art smart factory ecosystem:
    - IoT-enabled real-time production monitoring
    - AI-powered predictive maintenance system
    - Computer vision quality control automation
    - Machine learning resource optimization
    - Digital twin technology for process simulation
    - Advanced analytics for operational intelligence
  `,
  results: [
    '35% increase in overall productivity',
    '60% reduction in unplanned downtime',
    '45% improvement in product quality',
    '25% reduction in energy consumption',
    'ROI achieved in 8 months',
    '20% decrease in material waste',
    'Real-time visibility across all facilities',
    'Predictive maintenance saving $2M annually'
  ],
  technologies: [
    'Python',
    'Node.js',
    'TypeScript',
    'InfluxDB',
    'Azure IoT Hub',
    'TensorFlow',
    'Docker',
    'Kubernetes',
    'OpenCV',
    'GraphQL',
    'MQTT',
    'Time Series Analytics'
  ],
  features: [
    'IoT Sensor Integration',
    'Real-time Production Monitoring',
    'AI-Powered Quality Control',
    'Predictive Maintenance Analytics',
    'Digital Twin Simulation',
    'Resource Optimization Engine',
    'Energy Management System',
    'Performance Analytics Dashboard'
  ],
  metrics: {
    efficiency: '60%',
    satisfaction: '85%',
    reliability: '99.9%',
    roi: '180%'
  },
  image: '/case-studies/healthcare-platform.webp',
  imageUrl: '/case-studies/healthcare-platform.webp',
  icon: Factory,
  testimonial: {
    quote: "The transformation to a smart factory has revolutionized our operations. We've moved from reactive to predictive operations, achieving unprecedented levels of efficiency and quality. The real-time insights have empowered our team to make data-driven decisions that directly impact our bottom line.",
    author: "David Chang",
    role: "VP of Operations, Industrial Innovations Corp",
  },
  timeline: {
    planning: '8 weeks',
    development: '24 weeks',
    testing: '8 weeks',
    deployment: '6 weeks'
  },
  nextSteps: [
    'Advanced AI Quality Inspection System',
    'Comprehensive Digital Twin Integration',
    'Supply Chain Optimization Platform',
    'Carbon Footprint Tracking System',
    'Autonomous Production Line Implementation',
    'Extended Reality (XR) Operator Training'
  ],
  videoDemo: 'https://example.com/industrial-innovations-transformation',
  additionalResources: [
    {
      type: 'whitepaper',
      title: 'Industry 4.0: The Future of Smart Manufacturing',
      url: 'https://example.com/smart-manufacturing-whitepaper'
    },
    {
      type: 'webinar',
      title: 'Digital Transformation in Manufacturing',
      url: 'https://example.com/manufacturing-innovation-webinar'
    }
  ]
};
