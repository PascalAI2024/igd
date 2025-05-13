import { Home } from 'lucide-react';
import type { CaseStudy } from './types';

export const realestate: CaseStudy = {
  id: 'real-estate-digital-platform',
  title: 'Real Estate Digital Transformation',
  subtitle: 'Modernizing Property Management and Sales',
  description: 'How we helped a local real estate agency increase listings by 120% and improve client satisfaction through digital innovation.',
  client: 'Coastal Properties',
  industry: 'Real Estate',
  challenge: `
    Coastal Properties, a growing real estate agency, faced significant operational challenges:
    - Manual property listing management across multiple platforms
    - Inefficient client communication and follow-up processes
    - Limited virtual tour capabilities during pandemic restrictions
    - Poor lead tracking and conversion management
    - Outdated website with limited search functionality
    - Difficulty showcasing properties effectively online
    - Inconsistent branding across digital channels
  `,
  solution: `
    We implemented a comprehensive digital transformation strategy:
    - Centralized property management platform with multi-channel syndication
    - Virtual tour technology with 3D walkthroughs
    - Automated client communication and follow-up system
    - Advanced CRM with lead scoring and tracking
    - Modern, responsive website with advanced property search
    - Digital marketing automation for property promotion
    - Integrated analytics dashboard for performance tracking
  `,
  results: [
    '120% increase in property listings',
    '85% improvement in lead conversion rate',
    'Virtual tours reduced in-person showings by 40%',
    'Average days on market reduced by 35%',
    'Client satisfaction rating improved to 4.9/5',
    'Agent productivity increased by 65%',
    'Marketing cost per listing reduced by 45%',
    'Website traffic increased by 210%'
  ],
  technologies: [
    'React',
    'Node.js',
    'MongoDB',
    'AWS',
    'Matterport Integration',
    'HubSpot CRM',
    'MLS Integration',
    'Google Maps API',
    'Mailchimp',
    'Google Analytics'
  ],
  features: [
    'Property Listing Management',
    'Virtual 3D Tours',
    'Automated Client Communications',
    'Lead Management System',
    'Advanced Property Search',
    'Agent Performance Dashboard',
    'Marketing Automation',
    'Document Management'
  ],
  metrics: {
    efficiency: '65%',
    satisfaction: '98%',
    reliability: '99.7%',
    roi: '280%'
  },
  image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200',
  imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200',
  icon: Home,
  testimonial: {
    quote: "The digital platform transformed how we operate. We're now able to showcase properties more effectively, communicate with clients seamlessly, and track our performance in real-time. Our agents love the efficiency, and our clients appreciate the modern experience.",
    author: "Robert Chen",
    role: "Managing Broker, Coastal Properties",
    image: "/team/realestate-broker.webp"
  },
  timeline: {
    planning: '5 weeks',
    development: '14 weeks',
    testing: '4 weeks',
    deployment: '3 weeks'
  }
};
