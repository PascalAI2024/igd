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
    '32% increase in overall revenue after 8 months',
    '65% growth in takeout and delivery orders',
    '18% improvement in table turnover rate',
    '24% increase in repeat customer visits',
    '15% reduction in food waste through better forecasting',
    'Expanded customer base by 22%',
    'Social media following doubled over 6 months',
    'Average review rating improved from 3.8 to 4.3 stars'
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
    efficiency: '38%',
    satisfaction: '84%',
    reliability: '97.5%',
    roi: '75%'
  },
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
  imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200',
  icon: Utensils,
  testimonial: {
    quote: "Implementation had its challenges - staff needed extensive training and we had to refine the ordering process several times. But after 6 months, we're seeing consistent growth. The online ordering has become essential to our business, though it took about 3 months to really gain traction.",
    author: "Maria Sanchez",
    role: "Owner, Seaside Bistro",
  },
  timeline: {
    planning: '6 weeks',
    development: '16 weeks',
    testing: '4 weeks',
    deployment: '4 weeks'
  }
};
