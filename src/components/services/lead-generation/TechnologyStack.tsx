import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Database, MessageSquare, BarChart2 } from 'lucide-react';

const technologies = [
  {
    name: 'High Level',
    icon: Database,
    description: 'All-in-one marketing and CRM platform',
    features: [
      'Marketing Automation',
      'Lead Tracking',
      'SMS/Email Marketing',
      'Pipeline Management'
    ],
    proficiency: 95
  },
  {
    name: 'Bitrix24',
    icon: Users,
    description: 'Complete business management platform',
    features: [
      'CRM & Sales',
      'Project Management',
      'Communication Tools',
      'Marketing Automation'
    ],
    proficiency: 90
  },
  {
    name: 'HubSpot',
    icon: MessageSquare,
    description: 'Marketing automation & CRM',
    features: [
      'Lead Management',
      'Email Marketing',
      'Analytics',
      'Sales Pipeline'
    ],
    proficiency: 92
  },
  {
    name: 'Analytics Suite',
    icon: BarChart2,
    description: 'Advanced analytics and reporting',
    features: [
      'Performance Tracking',
      'ROI Analysis',
      'Custom Reports',
      'Data Visualization'
    ],
    proficiency: 88
  }
];

const TechnologyStack = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setActiveFeature(index)}
          onHoverEnd={() => setActiveFeature(null)}
          className="group relative"
        >
          <div className="relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 mb-6">
                <tech.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gradient">
                {tech.name}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {tech.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {tech.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={activeFeature === index ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Proficiency Bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600"
                />
              </div>
              <div className="mt-2 text-right text-sm text-gray-400">
                {tech.proficiency}% Proficiency
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechnologyStack;
