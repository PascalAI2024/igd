import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Video, Film,
  Monitor, Cloud, Camera
} from 'lucide-react';

const features = [
  {
    title: 'Promotional Videos',
    description: 'Engaging videos that showcase your business.',
    icon: Video,
    details: [
      'Company Overview',
      'Service Demonstrations',
      'Customer Testimonials',
      'Brand Stories'
    ]
  },
  {
    title: 'Product Videos',
    description: 'High-quality product demonstrations and features.',
    icon: Film,
    details: [
      'Product Demonstrations',
      'Feature Highlights',
      'Usage Tutorials',
      '360° Product Views'
    ]
  },
  {
    title: 'Event Coverage',
    description: 'Professional coverage of business events.',
    icon: Camera,
    details: [
      'Live Events',
      'Corporate Functions',
      'Training Sessions',
      'Conferences'
    ]
  },
  {
    title: 'Social Media Content',
    description: 'Engaging content for all platforms.',
    icon: Play,
    details: [
      'Short-Form Videos',
      'Platform Optimization',
      'Story Content',
      'Social Ads'
    ]
  },
  {
    title: 'Post-Production',
    description: 'Professional editing and enhancement.',
    icon: Monitor,
    details: [
      'Video Editing',
      'Color Grading',
      'Motion Graphics',
      'Sound Design'
    ]
  },
  {
    title: 'Multi-Platform Delivery',
    description: 'Optimized for every platform.',
    icon: Cloud,
    details: [
      'Web Optimization',
      'Social Media Formats',
      'High-Resolution Files',
      'Streaming Quality'
    ]
  }
];

const FeatureShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
        >
          <feature.icon className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient">{feature.title}</h3>
          <p className="text-gray-400 mb-4">{feature.description}</p>
          
          <ul className="space-y-2">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-center text-sm text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureShowcase;
