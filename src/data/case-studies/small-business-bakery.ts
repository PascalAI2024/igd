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
    '42% revenue increase over 12 months',
    'Online pre-orders now 25% of daily sales',
    'Started local delivery within 5 miles',
    'Weekend wait times down from 20 to 12 minutes',
    'Ship specialty items to 3 neighboring states'
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
    quote: "Setting up online ordering was challenging - we had to train staff, adjust our baking schedule, and deal with some early mishaps. But after 4 months, pre-orders now help us plan better and reduce waste. The 5-mile delivery zone works well for us. We're not trying to be a national brand, just serving our community better.",
    author: "Emily Rodriguez",
    role: "Owner, Sweet Bliss Bakery (Family bakery, 8 employees)"
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
    'Daily Orders': 'From 85 to 140 average daily orders',
    'Average Order Value': '+18% through cross-selling',
    'Customer Retention': '65% of online customers become repeat buyers',
    'Subscription Revenue': 'New $8K monthly recurring revenue stream',
    'Production Efficiency': '+22% through demand forecasting'
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