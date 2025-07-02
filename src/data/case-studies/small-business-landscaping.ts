import { CaseStudy } from './types';
import { MapPin, Calendar, Zap, BarChart, Phone } from 'lucide-react';

export const landscapingCaseStudy: CaseStudy = {
  id: 'landscape-business-digital',
  title: 'Landscape Company Digital Transformation',
  subtitle: 'Modernizing a Traditional Landscaping Business Step by Step',
  description: 'Complete digital transformation for a local landscaping business, streamlining operations and boosting customer acquisition through targeted digital marketing.',
  industry: 'Landscaping & Lawn Care',
  challenge: 'A well-established local landscaping company was struggling with inefficient scheduling, paper-based billing, and relied entirely on word-of-mouth referrals for new business. Their manual processes were limiting growth and causing administrative bottlenecks during peak seasons.',
  solution: 'We implemented a comprehensive digital transformation including a new website optimized for lead generation, service area mapping, online scheduling and payment processing, CRM implementation, and targeted local digital marketing campaigns.',
  results: [
    '35% revenue growth over 18 months',
    'Office work reduced from 15 to 10 hours/week',
    'Added 2 crews to handle increased demand',
    'Customer retention improved to 78%',
    'No-shows dropped from 20% to 12%'
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
    quote: "Moving from paper to digital was harder than expected - my crew resisted at first and we had some bumpy weeks. But after 6 months, everyone saw the benefits. We're not drowning in paperwork anymore, and the automated reminders have really cut down on wasted trips. Growth has been steady, not explosive, but it's manageable.",
    author: "Michael Stevens",
    role: "Owner, Green Horizons Landscaping (15-year-old business, 12 employees)"
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
    'Monthly Leads': '8-10 to 15-18 qualified',
    'Office Time': '15 to 10 hours/week',
    'Google Reviews': '4.1 to 4.4 stars (28 reviews)',
    'Average Job Value': '$450 to $520',
    'Daily Jobs': '12-14 to 16-18 completed'
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