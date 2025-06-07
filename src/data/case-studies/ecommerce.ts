import { ShoppingBag } from 'lucide-react';
import type { CaseStudy } from './types';

export const ecommerce: CaseStudy = {
  id: 'ecommerce-platform-optimization',
  title: 'E-commerce Platform Optimization',
  subtitle: 'Scaling Online Sales for Specialty Retailer',
  description: 'How we helped a specialty retailer increase online sales by 215% through platform optimization and digital marketing.',
  client: 'Artisan Goods Co.',
  industry: 'E-commerce',
  challenge: `
    Artisan Goods Co., a specialty retailer of handcrafted products, faced significant e-commerce challenges:
    - Slow, outdated e-commerce platform with poor mobile experience
    - High cart abandonment rate of 78%
    - Limited product discovery and recommendation capabilities
    - Inefficient inventory management across multiple channels
    - Poor conversion rates from social media traffic
    - Limited customer insights and analytics
    - Increasing customer acquisition costs
  `,
  solution: `
    We implemented a comprehensive e-commerce optimization strategy:
    - Complete platform rebuild with performance optimization
    - Mobile-first responsive design with intuitive navigation
    - Advanced product recommendation engine
    - Streamlined checkout process with multiple payment options
    - Integrated inventory management across all sales channels
    - Comprehensive analytics and customer journey tracking
    - Targeted digital marketing campaigns
  `,
  results: [
    '215% increase in online sales',
    'Cart abandonment rate reduced from 78% to 32%',
    'Mobile conversion rate improved by 145%',
    'Average order value increased by 35%',
    'Page load time reduced from 4.2s to 1.1s',
    'Organic traffic increased by 85%',
    'Customer acquisition cost reduced by 42%',
    'Return customer rate improved from 15% to 45%'
  ],
  technologies: [
    'React',
    'Next.js',
    'Node.js',
    'Shopify API',
    'Stripe',
    'Algolia Search',
    'Google Analytics 4',
    'AWS',
    'Redis',
    'Tailwind CSS'
  ],
  features: [
    'Personalized Product Recommendations',
    'Real-time Inventory Synchronization',
    'One-click Checkout',
    'Customer Account Dashboard',
    'Advanced Search Functionality',
    'Wishlist and Save for Later',
    'Automated Email Marketing',
    'Mobile App Integration'
  ],
  metrics: {
    efficiency: '75%',
    satisfaction: '94%',
    reliability: '99.9%',
    roi: '320%'
  },
  image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1200',
  imageUrl: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1200',
  icon: ShoppingBag,
  testimonial: {
    quote: "The e-commerce optimization project completely transformed our business. Our online store is now our primary revenue channel, and the improved user experience has resulted in significantly higher customer satisfaction and loyalty. The ROI has far exceeded our expectations.",
    author: "James Wilson",
    role: "CEO, Artisan Goods Co.",
  },
  timeline: {
    planning: '6 weeks',
    development: '16 weeks',
    testing: '4 weeks',
    deployment: '2 weeks'
  }
};
