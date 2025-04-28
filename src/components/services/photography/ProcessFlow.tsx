import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Image, Settings, 
  Monitor, Cloud, CheckCircle 
} from 'lucide-react';

const steps = [
  {
    title: 'Consultation',
    description: 'Understanding your needs and planning the shoot.',
    icon: Settings,
    details: [
      'Project Requirements',
      'Shot List Creation',
      'Location Planning',
      'Timeline Setup'
    ]
  },
  {
    title: 'Photography',
    description: 'Professional shooting with attention to detail.',
    icon: Camera,
    details: [
      'Professional Equipment',
      'Lighting Setup',
      'Multiple Angles',
      'Technical Excellence'
    ]
  },
  {
    title: 'Selection',
    description: 'Choosing the best shots from the session.',
    icon: Image,
    details: [
      'Image Review',
      'Best Shot Selection',
      'Client Feedback',
      'Revision Notes'
    ]
  },
  {
    title: 'Post-Production',
    description: 'Professional editing and enhancement.',
    icon: Monitor,
    details: [
      'Color Correction',
      'Retouching',
      'Format Optimization',
      'Quality Control'
    ]
  },
  {
    title: 'Delivery',
    description: 'Providing final images in required formats.',
    icon: Cloud,
    details: [
      'Multiple Formats',
      'High Resolution',
      'Web Optimization',
      'Secure Delivery'
    ]
  },
  {
    title: 'Follow-Up',
    description: 'Ensuring complete satisfaction with results.',
    icon: CheckCircle,
    details: [
      'Quality Check',
      'Client Feedback',
      'Additional Edits',
      'Archive Setup'
    ]
  }
];

const ProcessFlow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">Step {index + 1}</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4">{step.description}</p>
            
            <ul className="space-y-2">
              {step.details.map((detail) => (
                <li key={detail} className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-500/20 to-transparent transform translate-y-[-50%]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessFlow;
