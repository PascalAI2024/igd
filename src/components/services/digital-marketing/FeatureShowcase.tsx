import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Target, BarChart, ChevronRight, TrendingUp, Users, Star } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Local SEO',
    description: 'Get found by customers in your service area',
    metrics: [
      { label: 'Local Visibility', value: '+200%', icon: TrendingUp },
      { label: 'Map Rankings', value: 'Top 3', icon: MapPin },
      { label: 'Reviews', value: '+85%', icon: Star }
    ],
    details: [
      'Local keyword optimization',
      'Location-based content',
      'Local backlink building',
      'Citation management'
    ]
  },
  {
    icon: MapPin,
    title: 'Google Business',
    description: 'Optimize your Google Business Profile for maximum impact',
    metrics: [
      { label: 'Profile Views', value: '+150%', icon: Users },
      { label: 'Directions', value: '+120%', icon: MapPin },
      { label: 'Calls', value: '+90%', icon: TrendingUp }
    ],
    details: [
      'Profile optimization',
      'Photo management',
      'Review management',
      'Post scheduling'
    ]
  },
  {
    icon: Target,
    title: 'Local Ads',
    description: 'Targeted advertising to reach your ideal customers',
    metrics: [
      { label: 'Local Reach', value: '95%', icon: Users },
      { label: 'Click Rate', value: '+60%', icon: TrendingUp },
      { label: 'Leads', value: '+85%', icon: Target }
    ],
    details: [
      'Geographic targeting',
      'Audience segmentation',
      'Ad creative optimization',
      'Budget management'
    ]
  },
  {
    icon: BarChart,
    title: 'Performance',
    description: 'Track and measure your marketing success',
    metrics: [
      { label: 'ROI', value: '300%', icon: TrendingUp },
      { label: 'Growth', value: '+75%', icon: BarChart },
      { label: 'Retention', value: '90%', icon: Users }
    ],
    details: [
      'Real-time analytics',
      'Custom reporting',
      'KPI tracking',
      'Performance insights'
    ]
  }
];

const FeatureShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleFeatureClick = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

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
          onClick={() => handleFeatureClick(index)}
          className="group relative"
        >
          <motion.div
            className={`relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer
              ${expandedFeature === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
            whileHover={{ scale: 1.02 }}
            animate={expandedFeature === index ? { y: -10 } : { y: 0 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: expandedFeature === index || activeFeature === index ? 1 : 0 }}
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
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedFeature === index ? 'rotate-90' : ''}`}
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
                    animate={activeFeature === index || expandedFeature === index ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <metric.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-red-500">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 pt-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {feature.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-center space-x-2 text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <span>{detail}</span>
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
