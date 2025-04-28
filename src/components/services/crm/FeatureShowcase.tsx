import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Database, Settings, ChevronRight, TrendingUp,
  MessageSquare, Mail, Phone, BarChart2, Clock,
  UserCheck, Target, Zap, LucideIcon
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
    title: 'Contact Management',
    description: 'Centralized customer database with advanced segmentation',
    icon: Users,
    metrics: [
      { label: 'Organization', value: '+85%', trend: '+15%', icon: Database },
      { label: 'Response Time', value: '-65%', trend: 'Faster', icon: Clock },
      { label: 'Data Accuracy', value: '99.9%', trend: '+10%', icon: UserCheck }
    ],
    details: [
      'Smart contact organization',
      'Custom fields and tags',
      'Automated data enrichment',
      'Activity tracking'
    ]
  },
  {
    title: 'Communication Hub',
    description: 'Multi-channel communication management in one place',
    icon: MessageSquare,
    metrics: [
      { label: 'Engagement', value: '+75%', trend: '+25%', icon: TrendingUp },
      { label: 'Follow-ups', value: '100%', trend: 'Automated', icon: Mail },
      { label: 'Channels', value: '5+', trend: 'Integrated', icon: Phone }
    ],
    details: [
      'Email integration',
      'SMS messaging',
      'Voice calls',
      'Chat support'
    ]
  },
  {
    title: 'Automation & Workflows',
    description: 'Streamline repetitive tasks and business processes',
    icon: Settings,
    metrics: [
      { label: 'Time Saved', value: '40hrs/mo', trend: '+60%', icon: Clock },
      { label: 'Tasks', value: '95%', trend: 'Automated', icon: Zap },
      { label: 'Efficiency', value: '+80%', trend: '+30%', icon: TrendingUp }
    ],
    details: [
      'Task automation',
      'Email sequences',
      'Follow-up reminders',
      'Lead nurturing'
    ]
  },
  {
    title: 'Analytics & Reporting',
    description: 'Data-driven insights for better decision making',
    icon: BarChart2,
    metrics: [
      { label: 'Conversion', value: '+45%', trend: '+20%', icon: Target },
      { label: 'ROI Tracking', value: '100%', trend: 'Real-time', icon: TrendingUp },
      { label: 'Reports', value: '25+', trend: 'Custom', icon: BarChart2 }
    ],
    details: [
      'Performance dashboards',
      'Custom reports',
      'Goal tracking',
      'ROI analysis'
    ]
  }
];

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          variants={featureVariants}
          onHoverStart={() => setHoveredFeature(index)}
          onHoverEnd={() => setHoveredFeature(null)}
          onClick={() => setActiveFeature(activeFeature === index ? null : index)}
          className="group relative cursor-pointer"
        >
          <motion.div
            className={`relative bg-white/5 rounded-xl p-8 backdrop-blur-sm border overflow-hidden
              ${activeFeature === index ? 'border-red-500/50' : 'border-white/10 hover:border-red-500/20'}`}
            whileHover={{ scale: 1.02 }}
            animate={activeFeature === index ? { y: -10 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                activeFeature === index || hoveredFeature === index
                  ? {
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
                      ],
                      transition: { duration: 4, repeat: Infinity }
                    }
                  : {}
              }
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-red-400/50 to-transparent"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <feature.icon className="w-full h-full text-white relative z-10" />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={activeFeature === index ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {feature.metrics.map((metric, metricIndex) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: metricIndex * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative p-3 bg-white/5 rounded-lg">
                      <metric.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-red-500">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                      <div className="flex items-center justify-center text-xs mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-green-500">{metric.trend}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Expandable Details */}
              <AnimatePresence mode="wait">
                {activeFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      height: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="border-t border-white/10 pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {feature.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                              delay: detailIndex * 0.1
                            }}
                            className="flex items-center space-x-2 text-gray-400"
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-red-500 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: detailIndex * 0.2
                              }}
                            />
                            <span className="text-sm">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureShowcase;
