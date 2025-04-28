import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, LineChart, Zap } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'B2B Lead Generation',
    description: 'Strategic targeting of high-value business prospects',
    metrics: [
      { label: 'Lead Quality', value: '95%' },
      { label: 'Conversion', value: '+45%' },
      { label: 'Deal Size', value: '+80%' }
    ]
  },
  {
    icon: Users,
    title: 'Local Lead Gen',
    description: 'Targeted local market lead generation strategies',
    metrics: [
      { label: 'Local Reach', value: '90%' },
      { label: 'Response Rate', value: '+65%' },
      { label: 'Cost per Lead', value: '-40%' }
    ]
  },
  {
    icon: LineChart,
    title: 'Lead Nurturing',
    description: 'Automated systems to convert leads into customers',
    metrics: [
      { label: 'Engagement', value: '+75%' },
      { label: 'Follow-ups', value: '100%' },
      { label: 'Close Rate', value: '+55%' }
    ]
  },
  {
    icon: Zap,
    title: 'Marketing Automation',
    description: 'Streamlined processes for consistent lead generation',
    metrics: [
      { label: 'Efficiency', value: '+200%' },
      { label: 'Lead Flow', value: '24/7' },
      { label: 'Response Time', value: '-70%' }
    ]
  }
];

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
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
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gradient">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {feature.description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                {feature.metrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={activeFeature === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-xl font-bold text-red-500">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureShowcase;
