import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, Search, Smartphone, Shield, Gauge, ChevronRight, TrendingUp, Star, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    trend?: string;
    icon: LucideIcon;
  }[];
  details: string[];
}

const features: Feature[] = [
  {
    icon: Gauge,
    title: 'Lightning Fast',
    description: 'Optimized for maximum performance with sub-3-second load times',
    metrics: [
      { label: 'Page Load', value: '<3s', trend: '-40%', icon: Zap },
      { label: 'First Paint', value: '<1s', trend: '-30%', icon: TrendingUp },
      { label: 'TTI', value: '<5s', trend: '-25%', icon: Star }
    ],
    details: [
      'Advanced caching',
      'Image optimization',
      'Code minification',
      'CDN delivery'
    ]
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built for maximum search engine visibility and ranking',
    metrics: [
      { label: 'SEO Score', value: '95+', trend: '+15%', icon: TrendingUp },
      { label: 'Core Web Vitals', value: 'Pass', trend: '+100%', icon: Star },
      { label: 'Mobile Score', value: '90+', trend: '+20%', icon: Smartphone }
    ],
    details: [
      'Schema markup',
      'Meta optimization',
      'XML sitemaps',
      'Semantic HTML'
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Responsive design that works perfectly on all devices',
    metrics: [
      { label: 'Mobile Traffic', value: '60%', trend: '+40%', icon: TrendingUp },
      { label: 'Conversion Rate', value: '+40%', trend: '+25%', icon: Star },
      { label: 'Engagement', value: '+55%', trend: '+35%', icon: Globe }
    ],
    details: [
      'Responsive layouts',
      'Touch optimization',
      'Mobile navigation',
      'Fast loading'
    ]
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee',
    metrics: [
      { label: 'Uptime', value: '99.9%', trend: '+0.5%', icon: TrendingUp },
      { label: 'SSL/TLS', value: 'A+', trend: '+Grade', icon: Shield },
      { label: 'Security Score', value: '95+', trend: '+10%', icon: Star }
    ],
    details: [
      'SSL encryption',
      'DDoS protection',
      'Regular backups',
      'Security monitoring'
    ]
  }
];

const FeatureShowcase: React.FC = () => {
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

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeFeature === index ? 'rotate-90' : ''
                  }`}
                />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gradient">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {feature.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {feature.metrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={activeFeature === index || hoveredFeature === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <metric.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-red-500">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                    {metric.trend && (
                      <div className="flex items-center justify-center text-xs mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-green-500">{metric.trend}</span>
                      </div>
                    )}
                  </motion.div>
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
