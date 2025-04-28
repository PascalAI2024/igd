import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Aperture, Monitor,
  Laptop, Cloud, Sliders
} from 'lucide-react';

const technologies = [
  {
    category: 'Camera Equipment',
    icon: Camera,
    items: [
      'Professional DSLR Cameras',
      'Full-Frame Mirrorless',
      'Prime Lenses',
      'Zoom Lenses',
      'Macro Lenses',
      'Tilt-Shift Lenses'
    ]
  },
  {
    category: 'Lighting Equipment',
    icon: Aperture,
    items: [
      'Studio Strobe Lights',
      'LED Continuous Lighting',
      'Softboxes & Diffusers',
      'Light Modifiers',
      'Reflectors',
      'Color Gels'
    ]
  },
  {
    category: 'Studio Equipment',
    icon: Sliders,
    items: [
      'Professional Tripods',
      'Studio Backdrops',
      'Light Stands',
      'Camera Stabilizers',
      'Product Tables',
      'Shooting Tents'
    ]
  },
  {
    category: 'Post-Processing',
    icon: Monitor,
    items: [
      'Adobe Photoshop',
      'Adobe Lightroom',
      'Capture One Pro',
      'Color Calibration Tools',
      'Raw Processing',
      'Batch Automation'
    ]
  },
  {
    category: 'Digital Workflow',
    icon: Laptop,
    items: [
      'Tethered Shooting',
      'File Management',
      'Image Cataloging',
      'Metadata Management',
      'Version Control',
      'Backup Systems'
    ]
  },
  {
    category: 'Delivery Systems',
    icon: Cloud,
    items: [
      'Cloud Storage',
      'Client Galleries',
      'File Transfer',
      'Image Protection',
      'Print Services',
      'Archive Solutions'
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
