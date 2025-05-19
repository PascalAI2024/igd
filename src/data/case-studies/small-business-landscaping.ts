import { CaseStudy } from './types';
import { MapPin, Calendar, Zap, BarChart, Phone } from 'lucide-react';

export const landscapingCaseStudy: CaseStudy = {
  id: 'landscape-business-digital',
  title: 'Landscape Company Digital Transformation',
  subtitle: 'How Digital Tools Helped a Local Landscaper Grow by 175%',
  description: 'Complete digital transformation for a local landscaping business, streamlining operations and boosting customer acquisition through targeted digital marketing.',
  industry: 'Landscaping & Lawn Care',
  challenge: 'A well-established local landscaping company was struggling with inefficient scheduling, paper-based billing, and relied entirely on word-of-mouth referrals for new business. Their manual processes were limiting growth and causing administrative bottlenecks during peak seasons.',
  solution: 'We implemented a comprehensive digital transformation including a new website optimized for lead generation, service area mapping, online scheduling and payment processing, CRM implementation, and targeted local digital marketing campaigns.',
  results: [
    '175% increase in business within 18 months',
    '85% reduction in administrative work through automation',
    'Expanded from 4 to 11 service vehicles',
    'Improved customer retention from 67% to 93%',
    'Reduced no-shows by 78% through automated reminders'
  ],
  imageUrl: "https://images.unsplash.com/photo-1599629954294-14df9398ff0c?q=80&w=1200&auto=format&fit=crop",
  technologies: [
    'Responsive Website Design',
    'Local SEO Optimization',
    'Field Service Management Software',
    'CRM Implementation',
    'Google Business Profile Optimization',
    'Automated Marketing Workflows',
    'Route Optimization Tools'
  ],
  testimonial: {
    quote: "The digital transformation completely changed how we operate. We've grown faster than I ever thought possible while actually reducing my administrative workload. The systems put in place have allowed us to scale without the chaos that used to come with growth.",
    author: "Michael Stevens",
    role: "Owner, Green Horizons Landscaping"
  },
  client: 'Green Horizons Landscaping',
  features: [
    'Custom landscaping service website with quote request functionality',
    'Field service management software for scheduling and billing',
    'Customer portal for online payments and service history',
    'Local SEO targeting specific service areas',
    'Automated email/SMS workflows for appointments and follow-ups'
  ],
  metrics: {
    'Lead Generation': '+310% monthly qualified leads',
    'Administrative Hours': '-24 hours/week in paperwork',
    'Customer Satisfaction': '4.9/5 average rating (+0.8 increase)',
    'Average Contract Value': '+35% through upsell automation',
    'Employee Productivity': '+42% jobs completed per week'
  },
  icon: MapPin,
  services: [
    'Web Development',
    'Digital Marketing',
    'Business Automation',
    'CRM Implementation',
    'Local SEO'
  ],
  nextSteps: [
    'Implement crew management and real-time tracking',
    'Develop seasonal marketing campaigns',
    'Launch customer loyalty program',
    'Expand service offerings with online booking'
  ]
};