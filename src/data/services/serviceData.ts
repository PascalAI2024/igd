import { 
  Search,
  Target,
  Users,
  Globe,
  MessageSquare,
  Camera,
  Play,
  Megaphone,
  Zap,
  LucideIcon
} from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string }[];
  path: string;
  color: string;
}

export const services: Service[] = [
  {
    icon: Search,
    title: 'Digital Marketing',
    description: 'Dominate your market with data-driven digital marketing strategies.',
    features: [
      'Local SEO Optimization',
      'Google Business Profile',
      'Content Marketing',
      'Review Management',
      'Social Media Marketing',
      'Analytics & Reporting'
    ],
    metrics: [
      { value: '90%', label: 'Local Reach' },
      { value: '75%', label: 'Engagement' },
      { value: '3X', label: 'Visibility' }
    ],
    path: '/services/digital-marketing',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Generate high-quality leads with proven strategies and automation.',
    features: [
      'High Level Integration',
      'Bitrix24 Implementation',
      'Lead Capture Systems',
      'Landing Pages',
      'Marketing Automation',
      'Lead Nurturing'
    ],
    metrics: [
      { value: '2X', label: 'Lead Quality' },
      { value: '85%', label: 'Conversion' },
      { value: '24/7', label: 'Automation' }
    ],
    path: '/services/lead-generation',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'CRM Solutions',
    description: 'Streamline customer relationships and boost business growth.',
    features: [
      'High Level Setup',
      'Bitrix24 Platform',
      'Customer Management',
      'Pipeline Tracking',
      'Team Collaboration',
      'Analytics Dashboard'
    ],
    metrics: [
      { value: '100%', label: 'Visibility' },
      { value: '95%', label: 'Retention' },
      { value: '24/7', label: 'Support' }
    ],
    path: '/services/crm',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Create a powerful online presence that drives results.',
    features: [
      'Custom Websites',
      'Business-Focused Design',
      'E-commerce Solutions',
      'Mobile Optimization',
      'Speed Optimization',
      'SEO Integration'
    ],
    metrics: [
      { value: '90+', label: 'Performance' },
      { value: '100%', label: 'Mobile Ready' },
      { value: '99%', label: 'Uptime' }
    ],
    path: '/services/web-development',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photography to showcase your business at its best.',
    features: [
      'Product Photography',
      'Business Portraits',
      'Location Shoots',
      'Event Coverage',
      'Virtual Tours',
      'Image Optimization'
    ],
    metrics: [
      { value: '4K', label: 'Quality' },
      { value: '100%', label: 'Satisfaction' },
      { value: '2X', label: 'Engagement' }
    ],
    path: '/services/photography',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Play,
    title: 'Videography',
    description: 'Engaging video content to tell your business story.',
    features: [
      'Promotional Videos',
      'Product Demos',
      'Business Stories',
      'Social Media Content',
      'Drone Footage',
      'Video Marketing'
    ],
    metrics: [
      { value: '4K', label: 'Quality' },
      { value: '3X', label: 'Engagement' },
      { value: '90%', label: 'Retention' }
    ],
    path: '/services/videography',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Megaphone,
    title: 'Ad Management',
    description: 'Strategic ad campaigns that deliver measurable results.',
    features: [
      'Google Ads',
      'Social Media Ads',
      'Display Advertising',
      'Retargeting',
      'Performance Tracking',
      'Budget Optimization'
    ],
    metrics: [
      { value: 'ROAS', label: '3X' },
      { value: '85%', label: 'Target Reach' },
      { value: '2X', label: 'Conversion' }
    ],
    path: '/services/ad-management',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    description: 'Enhance customer engagement and service delivery.',
    features: [
      'Automated Messaging',
      'Customer Support',
      'Appointment Booking',
      'SMS Marketing',
      'Email Campaigns',
      'Voice Solutions'
    ],
    metrics: [
      { value: '95%', label: 'Response Rate' },
      { value: '85%', label: 'Satisfaction' },
      { value: '24/7', label: 'Availability' }
    ],
    path: '/services/communication',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Streamline operations and boost efficiency with smart automation.',
    features: [
      'Workflow Automation',
      'Document Processing',
      'Inventory Management',
      'Payment Systems',
      'Reporting Tools',
      'Integration Services'
    ],
    metrics: [
      { value: '80%', label: 'Time Saved' },
      { value: '95%', label: 'Accuracy' },
      { value: '3X', label: 'Efficiency' }
    ],
    path: '/services/business-automation',
    color: 'from-teal-500 to-cyan-500'
  }
];
