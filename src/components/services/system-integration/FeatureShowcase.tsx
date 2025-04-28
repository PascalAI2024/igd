import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, Database, Cloud, ChevronRight, TrendingUp,
  Server, Shield, Lock, Zap, Users, BarChart2, Globe, LucideIcon
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  metrics: {
    label: string;
    value: string;
    trend: string;
    icon: LucideIcon;
  }[];
  details: string[];
}

const features: Feature[] = [
  {
    title: 'API Integration',
    description: 'Connect your systems with robust API integrations',
    icon: Link2,
    metrics: [
      { label: 'Uptime', value: '99.9%', trend: '+0.5%', icon: Server },
      { label: 'Response', value: '<100ms', trend: '-25%', icon: Zap },
      { label: 'Success', value: '99.9%', trend: '+2%', icon: TrendingUp }
    ],
    details: [
      'RESTful API support',
      'GraphQL integration',
      'Real-time webhooks',
      'Custom endpoints'
    ]
  },
  {
    title: 'Data Synchronization',
    description: 'Keep your data in sync across all platforms',
    icon: Database,
    metrics: [
      { label: 'Sync Speed', value: '<1s', trend: '-40%', icon: Zap },
      { label: 'Accuracy', value: '100%', trend: '+5%', icon: Shield },
      { label: 'Volume', value: '1M+/hr', trend: '+200%', icon: BarChart2 }
    ],
    details: [
      'Real-time sync',
      'Conflict resolution',
      'Data validation',
      'Error handling'
    ]
  },
  {
    title: 'Cloud Services',
    description: 'Leverage cloud infrastructure for scalability',
    icon: Cloud,
    metrics: [
      { label: 'Availability', value: '99.99%', trend: '+0.9%', icon: Server },
      { label: 'Scaling', value: 'Auto', trend: '+∞', icon: TrendingUp },
      { label: 'Regions', value: '10+', trend: '+3', icon: Globe }
    ],
    details: [
      'Multi-cloud support',
      'Auto-scaling',
      'Load balancing',
      'Disaster recovery'
    ]
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security for your integrations',
    icon: Lock,
    metrics: [
      { label: 'Encryption', value: '256-bit', trend: 'AES', icon: Shield },
      { label: 'Compliance', value: 'SOC2', trend: '+PCI', icon: Lock },
      { label: 'Monitoring', value: '24/7', trend: 'Live', icon: Users }
    ],
    details: [
      'End-to-end encryption',
      'Access control',
      'Audit logging',
      'Compliance reporting'
    ]
  }
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredFeature(index)}
          onHoverEnd={() => setHoveredFeature(null)}
          onClick={() => setActiveFeature(activeFeature === index ? null : index)}
          className="group relative cursor-pointer"
        >
          <motion.div
            className={`relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 transition-all duration-300
              ${activeFeature === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
            whileHover={{ scale: 1.02 }}
            animate={activeFeature === index ? { y: -10 } : { y: 0 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeFeature === index || hoveredFeature === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-purple-500/5"
                animate={{
                  opacity: [0, 1, 0],
                  transition: { duration: 3, repeat: Infinity }
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-full h-full text-white" />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeFeature === index ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {feature.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <metric.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-red-500">{metric.value}</div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                    <div className="flex items-center justify-center text-xs mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-500">{metric.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {activeFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 pt-4"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {feature.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-center space-x-2 text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <span className="text-sm">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureShowcase;
