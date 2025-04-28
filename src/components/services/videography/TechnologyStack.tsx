import React from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Film, Monitor,
  Mic, Cloud, Sliders
} from 'lucide-react';

const technologies = [
  {
    category: 'Camera Equipment',
    icon: Video,
    items: [
      'Professional Video Cameras',
      'Cinema Cameras',
      'DSLR Video',
      'Drone Cameras',
      'Action Cameras',
      'Stabilization Systems'
    ]
  },
  {
    category: 'Audio Equipment',
    icon: Mic,
    items: [
      'Professional Microphones',
      'Wireless Systems',
      'Audio Recorders',
      'Sound Mixers',
      'Boom Poles',
      'Audio Interfaces'
    ]
  },
  {
    category: 'Lighting Equipment',
    icon: Sliders,
    items: [
      'LED Panel Lights',
      'Studio Lighting',
      'Light Modifiers',
      'Color Filters',
      'Light Stands',
      'Mobile Lighting'
    ]
  },
  {
    category: 'Post-Production',
    icon: Monitor,
    items: [
      'Adobe Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Color Grading Tools',
      'Motion Graphics',
      'Sound Design'
    ]
  },
  {
    category: 'Production Tools',
    icon: Film,
    items: [
      'Camera Stabilizers',
      'Camera Sliders',
      'Drone Systems',
      'Monitor Recorders',
      'Production Audio',
      'Mobile Studio'
    ]
  },
  {
    category: 'Delivery Systems',
    icon: Cloud,
    items: [
      'Cloud Storage',
      'Video Hosting',
      'Content Delivery',
      'Format Conversion',
      'Streaming Setup',
      'Archive Systems'
    ]
  }
];

const TechnologyStack = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
        >
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
              <tech.icon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
              {tech.category}
            </h3>
          </div>

          <ul className="space-y-3">
            {tech.items.map((item) => (
              <li key={item} className="flex items-center text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default TechnologyStack;
