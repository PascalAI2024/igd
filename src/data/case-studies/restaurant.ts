import { Utensils } from 'lucide-react';
import type { CaseStudy } from './types';

export const restaurant: CaseStudy = {
  id: 'restaurant-digital-transformation',
  title: 'Local Restaurant Digital Transformation',
  subtitle: 'Boosting Revenue Through Digital Innovation',
  description: 'How we helped a local restaurant increase revenue by 75% through digital ordering, marketing, and customer engagement solutions.',
  client: 'Seaside Bistro',
  industry: 'Restaurants',
  challenge: `
    Seaside Bistro, a popular local restaurant, faced significant challenges in a competitive market:
    - Limited online presence with outdated website and no online ordering
    - Inefficient reservation and table management system
    - No customer relationship management or loyalty program
    - Declining foot traffic due to changing consumer habits
    - Difficulty competing with chain restaurants' marketing budgets
    - Inconsistent customer experience and feedback collection
  `,
  solution: `
    We implemented a comprehensive digital transformation strategy:
    - Modern, mobile-responsive website with integrated online ordering
    - Custom reservation system with automated confirmations
    - Digital menu with dynamic pricing capabilities
    - Customer loyalty program with personalized offers
    - Targeted local digital marketing campaigns
    - Streamlined kitchen operations with order management system
  `,
  results: [
    '75% increase in overall revenue',
    '120% growth in takeout and delivery orders',
    '35% improvement in table turnover rate',
    '45% increase in repeat customer visits',
    '28% reduction in food waste',
    'Expanded customer base by 40%',
    'Social media following growth of 300%',
    'Average review rating improved from 3.8 to 4.7 stars'
  ],
  technologies: [
    'React',
    'Node.js',
    'Square POS Integration',
    'Custom CRM',
    'Google Business Profile',
    'Local SEO',
    'Instagram/Facebook Ads',
    'Email Marketing'
  ],
  features: [
    'Online Ordering System',
    'Reservation Management',
    'Digital Menu Platform',
    'Customer Loyalty Program',
    'Review Management',
    'Kitchen Order Display',
    'Inventory Tracking',
    'Marketing Automation'
  ],
  metrics: {
    efficiency: '65%',
    satisfaction: '92%',
    reliability: '99.8%',
    roi: '250%'
  },
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
  imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
  icon: Utensils,
  testimonial: {
    quote: "The digital transformation completely revolutionized our business. We're not just surviving in a competitive market—we're thriving. The online ordering system alone paid for itself within the first month, and our customer loyalty program has created a community around our restaurant.",
    author: "Maria Sanchez",
    role: "Owner, Seaside Bistro",
    image: "/team/restaurant-owner.webp"
  },
  timeline: {
    planning: '4 weeks',
    development: '12 weeks',
    testing: '3 weeks',
    deployment: '2 weeks'
  }
};
