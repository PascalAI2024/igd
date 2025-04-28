import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Image, Aperture,
  Users, Monitor, Cloud
} from 'lucide-react';

const features = [
  {
    title: 'Product Photography',
    description: 'High-quality product photos that drive sales.',
    icon: Image,
    details: [
      'White Background Photos',
      'Lifestyle Product Shots',
      'Detail Shots',
      '360° Views'
    ]
  },
  {
    title: 'Business Portraits',
    description: 'Professional headshots and team photos.',
    icon: Users,
    details: [
      'Individual Portraits',
      'Team Photos',
      'Corporate Events',
      'Professional Editing'
    ]
  },
  {
    title: 'Location Photography',
    description: 'Showcase your business location.',
    icon: Camera,
    details: [
      'Interior Photos',
      'Exterior Shots',
      'Aerial Photography',
      'Virtual Tours'
    ]
  },
  {
    title: 'Studio Sessions',
    description: 'Controlled environment for perfect shots.',
    icon: Aperture,
    details: [
      'Professional Lighting',
      'Multiple Backgrounds',
      'Product Setups',
      'Portrait Sessions'
    ]
  },
  {
    title: 'Post-Production',
    description: 'Professional editing and enhancement.',
    icon: Monitor,
    details: [
      'Color Correction',
      'Retouching',
      'Background Removal',
      'Format Optimization'
    ]
  },
  {
    title: 'Digital Delivery',
    description: 'Quick and convenient file delivery.',
    icon: Cloud,
    details: [
      'High-Resolution Files',
      'Web-Optimized Images',
      'Multiple Formats',
      'Cloud Storage'
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
