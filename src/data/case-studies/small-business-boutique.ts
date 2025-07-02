import { CaseStudy } from './types';
import { ShoppingBag, TrendingUp, Globe, Users, Truck } from 'lucide-react';

export const boutiqueCaseStudy: CaseStudy = {
  id: 'boutique-omnichannel-expansion',
  title: 'Boutique Retailer\'s E-commerce Journey',
  subtitle: 'Growing a Local Clothing Boutique Through Gradual Digital Expansion',
  description: 'Strategic digital expansion for a local clothing boutique, transforming from a single storefront to a thriving omnichannel retailer with national reach.',
  industry: 'Retail',
  challenge: 'A popular local clothing boutique with a single location had built a loyal customer base but was limited by their physical space and local market. Despite strong in-store sales, they had no online presence beyond social media accounts, missing significant revenue opportunities and limiting growth potential.',
  solution: 'We created a comprehensive omnichannel strategy including a branded e-commerce website, inventory management system, social selling integration, content marketing focused on their unique style aesthetic, and targeted digital advertising to expand their customer base nationally.',
  results: [
    '65% revenue increase over 18 months',
    'Online sales grew from 0% to 35% of total',
    'Shipping orders to 12 states (from local only)',
    'Able to extend store hours virtually',
    'Instagram followers: 2,800 to 8,500'
  ],
  imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop",
  technologies: [
    'Custom E-commerce Platform',
    'Inventory Management System',
    'Social Commerce Integration',
    'Email Marketing Automation',
    'Customer Data Platform',
    'Visual Search Technology',
    'Influencer Campaign Management'
  ],
  testimonial: {
    quote: "Starting our online store was daunting - we had no technical experience and worried about losing our personal touch. The first few months were slow with just a handful of online orders. But gradually, local customers started buying online for convenience, and we began getting orders from neighboring states. After 18 months, online sales help us stay profitable during slow seasons. We're not Amazon, but we've found our niche.",
    author: "Sophia Chen",
    role: "Founder, Velvet & Vine Boutique (1 location, 4 employees)"
  },
  client: 'Velvet & Vine Boutique',
  features: [
    'Style-focused e-commerce site with curated collections',
    'Unified inventory system across online and in-store',
    'Personal stylist consultations via video chat',
    'Loyalty program integrating online and in-store purchases',
    'User-generated content integration from social platforms',
    'Style quiz for personalized recommendations'
  ],
  metrics: {
    'Average Order Value': '$78 to $92 online',
    'Customer Retention': '45% make second purchase',
    'Email List Growth': '350 to 2,100 subscribers',
    'Social Media Sales': '15% of online orders',
    'Inventory Accuracy': 'Improved from 85% to 95%'
  },
  icon: ShoppingBag,
  services: [
    'E-commerce Development',
    'Digital Marketing',
    'Inventory Management',
    'Content Strategy',
    'Social Media Marketing',
    'Business Process Optimization'
  ],
  nextSteps: [
    'Launch mobile app with AR try-on features',
    'Implement subscription style box service',
    'Develop exclusive online-only collections',
    'Expand international shipping capabilities'
  ]
};