import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Cloud, Smartphone, Globe, LucideIcon,
  ChevronRight, Zap
} from 'lucide-react';

interface Technology {
  name: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  integrations: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const technologies: Technology[] = [
  {
    name: 'High Level CRM',
    description: 'All-in-one marketing and automation platform',
    icon: Database,
    features: [
      'Lead capture forms',
      'Email marketing',
      'SMS campaigns',
      'Appointment scheduling'
    ],
    integrations: [
      'Gmail',
      'Outlook',
      'Zapier',
      'Stripe'
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '< 100ms' },
      { label: 'Users', value: '10K+' }
    ]
  },
  {
    name: 'Bitrix24',
    description: 'Complete business management solution',
    icon: Globe,
    features: [
      'Project management',
      'Document handling',
      'Time tracking',
      'Team collaboration'
    ],
    integrations: [
      'Google Drive',
      'OneDrive',
      'Slack',
      'QuickBooks'
    ],
    metrics: [
      { label: 'Storage', value: 'Unlimited' },
      { label: 'Security', value: 'Enterprise' },
      { label: 'Clients', value: '5M+' }
    ]
  },
  {
    name: 'Mobile Apps',
    description: 'Native mobile applications for iOS and Android',
    icon: Smartphone,
    features: [
      'Offline access',
      'Push notifications',
      'Contact management',
      'Quick actions'
    ],
    integrations: [
      'iOS Calendar',
      'Android Contacts',
      'Maps',
      'Camera'
    ],
    metrics: [
      { label: 'Rating', value: '4.8/5' },
      { label: 'Downloads', value: '100K+' },
      { label: 'Platform', value: 'Cross' }
    ]
  },
  {
    name: 'Cloud Infrastructure',
    description: 'Secure and scalable cloud hosting',
    icon: Cloud,
    features: [
      'Auto-scaling',
      'Data backup',
      'Load balancing',
      'CDN delivery'
    ],
    integrations: [
      'AWS',
      'Azure',
      'CloudFlare',
      'Docker'
    ],
    metrics: [
      { label: 'Speed', value: '< 50ms' },
      { label: 'Backup', value: 'Real-time' },
      { label: 'Scale', value: 'Global' }
    ]
  }
];

const TechnologyStack = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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

  const techVariants = {
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
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          variants={techVariants}
          className="relative"
        >
          <motion.div
            className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border overflow-hidden cursor-pointer
              ${activeTech === tech.name ? 'border-red-500/50' : 'border-white/10 hover:border-red-500/20'}`}
            onClick={() => setActiveTech(activeTech === tech.name ? null : tech.name)}
            onHoverStart={() => setHoveredTech(tech.name)}
            onHoverEnd={() => setHoveredTech(null)}
            whileHover={{ scale: 1.02 }}
            animate={activeTech === tech.name ? { y: -10 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                activeTech === tech.name || hoveredTech === tech.name
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
              <div className="flex items-center justify-between mb-4">
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
                    <tech.icon className="w-full h-full text-white relative z-10" />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={activeTech === tech.name ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {tech.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
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
                      <div className="text-lg font-bold text-red-500">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Expandable Content */}
              <AnimatePresence mode="wait">
                {activeTech === tech.name && (
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
                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <Zap className="w-4 h-4 text-red-500 mr-2" />
                          Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tech.features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: index * 0.1
                              }}
                              whileHover={{ x: 5 }}
                              className="flex items-center space-x-2 group"
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
                                  delay: index * 0.2
                                }}
                              />
                              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Integrations */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                          <Cloud className="w-4 h-4 text-purple-500 mr-2" />
                          Integrations
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tech.integrations.map((integration, index) => (
                            <motion.div
                              key={integration}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.4 + (index * 0.1)
                              }}
                              whileHover={{ x: 5 }}
                              className="flex items-center space-x-2 group"
                            >
                              <motion.div
                                className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.7, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.2
                                }}
                              />
                              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                {integration}
                              </span>
                            </motion.div>
                          ))}
                        </div>
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

export default TechnologyStack;
