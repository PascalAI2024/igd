import { CaseStudy } from './types';
import { Utensils, ShoppingBag, Calendar, Clock, Star } from 'lucide-react';

export const bakeryCaseStudy: CaseStudy = {
  id: 'bakery-digital-expansion',
  title: 'Artisan Bakery E-commerce Success',
  subtitle: 'How a Local Bakery Expanded Beyond its Physical Location',
  description: 'Strategic digital transformation for a local bakery that expanded their reach, streamlined operations, and established a thriving online ordering system.',
  industry: 'Food & Beverage',
  challenge: 'A popular local artisan bakery had reached capacity in their physical location with lines out the door on weekends. They were turning away potential business and couldn\'t expand their physical space. Their existing website was outdated and provided information only, with no online ordering capability.',
  solution: 'We built a comprehensive digital strategy including a new e-commerce website with online ordering, in-store pickup scheduling, delivery options for local customers, a loyalty program, and digital marketing campaigns targeting their local and expanded service area.',
  results: [
    '245% increase in overall revenue within 12 months',
    'Online sales now represent 60% of total business',
    'Expanded delivery radius from 0 to 15 miles',
    'Reduced in-store wait times by 65%',
    'Successfully launched nationwide shipping for signature products'
  ],
  imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop",
  technologies: [
    'Custom E-commerce Platform',
    'Order Management System',
    'Local Delivery Integration',
    'CRM Implementation',
    'Email Marketing Automation',
    'Loyalty Program Platform',
    'Social Media Management'
  ],
  testimonial: {
    quote: "Our bakery was literally bursting at the seams, and we couldn't expand our physical location. The digital transformation has allowed us to serve more customers without the constraints of our physical space. Our online ordering and local delivery services have been a game-changer, and we've been able to reach customers we never could have served before.",
    author: "Emily Rodriguez",
    role: "Owner, Sweet Bliss Bakery"
  },
  client: 'Sweet Bliss Bakery',
  features: [
    'Custom e-commerce website with product showcases',
    'Time-slotted pickup scheduling to manage flow',
    'Local delivery route optimization',
    'Subscription service for regular customers',
    'Seasonal product promotion automation',
    'Online catering request system'
  ],
  metrics: {
    'Daily Orders': 'From 85 to 210 average daily orders',
    'Average Order Value': '+28% through cross-selling',
    'Customer Retention': '76% of online customers become repeat buyers',
    'Subscription Revenue': 'New $15K monthly recurring revenue stream',
    'Production Efficiency': '+35% through demand forecasting'
  },
  icon: Utensils,
  services: [
    'Web Development',
    'E-commerce Implementation',
    'Digital Marketing',
    'Business Automation',
    'CRM & Analytics'
  ],
  nextSteps: [
    'Expand nationwide shipping product line',
    'Implement advanced inventory management',
    'Develop mobile app for loyal customers',
    'Launch digital gift card program'
  ]
};