import { CaseStudy } from './types';
import { Thermometer, Calendar, Wrench, TrendingUp, MapPin } from 'lucide-react';

export const hvacCaseStudy: CaseStudy = {
  id: 'hvac-business-growth',
  title: 'HVAC Company Digital Revolution',
  subtitle: 'How a Local HVAC Business Tripled Their Customer Base with Digital Tools',
  description: 'Comprehensive digital transformation for a family-owned HVAC company that modernized operations, streamlined scheduling, and dramatically increased qualified leads.',
  industry: 'HVAC Services',
  challenge: 'A second-generation HVAC company was losing ground to newer competitors with modern digital presence and operational systems. They struggled with paper-based scheduling, manual dispatching, inconsistent customer communication, and depended almost entirely on word-of-mouth advertising that wasn\'t generating enough new business.',
  solution: 'We implemented a full-scale digital transformation including a new service-focused website, online scheduling system, field service management software, automated customer communications, and targeted local digital marketing campaigns focused on seasonal services.',
  results: [
    '215% increase in service calls within 14 months',
    'Expanded from 3 to 8 service technicians',
    'Reduced scheduling errors by 92%',
    '78% increase in preventative maintenance contracts',
    'Successfully launched new indoor air quality service line'
  ],
  imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
  technologies: [
    'Responsive Website Design',
    'Field Service Management Software',
    'CRM for Service Businesses',
    'Local SEO Optimization',
    'Google Business Profile Management',
    'Review Management System',
    'Scheduling Automation'
  ],
  testimonial: {
    quote: "We were falling behind newer companies with fancy websites and online booking. The digital transformation completely modernized our operations and dramatically increased our visibility to potential customers. Not only are we getting more service calls, but our technicians are more efficient, and our customers are much happier with the communication and service.",
    author: "Robert Johnson",
    role: "Owner, Johnson Heating & Cooling"
  },
  client: 'Johnson Heating & Cooling',
  features: [
    'Service-focused website with emergency request capability',
    'Online scheduling integrated with technician dispatching',
    'Digital quotes and invoicing with online payment',
    'Automated service reminders and follow-ups',
    'Seasonal maintenance campaign automation',
    'Technician mobile app with real-time scheduling'
  ],
  metrics: {
    'Lead Generation': 'From 22 to 85 new leads per month',
    'Dispatch Efficiency': '45% more service calls completed per day',
    'Customer Feedback': '4.8/5 average rating across platforms',
    'Maintenance Contract Renewals': 'Increased from 62% to 91%',
    'Average Invoice Value': 'Increased by 32% through upselling'
  },
  icon: Thermometer,
  services: [
    'Web Development',
    'Digital Marketing',
    'Business Automation',
    'CRM Implementation',
    'Local SEO',
    'Process Optimization'
  ],
  nextSteps: [
    'Implement inventory management system',
    'Develop customer loyalty program',
    'Launch targeted advertising for new service lines',
    'Create customer education video series'
  ]
};