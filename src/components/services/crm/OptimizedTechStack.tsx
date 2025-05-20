import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Cloud, Smartphone, Globe, Server,
  ChevronRight, Zap, Check, ExternalLink
} from 'lucide-react';

// Technology data
const technologies = [
  {
    name: 'High Level CRM',
    description: 'All-in-one marketing and automation platform',
    icon: Database,
    color: '#ef4444',
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
    color: '#3b82f6',
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
    color: '#f97316',
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
    color: '#10b981',
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

const OptimizedTechStack = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  return (
    <div className="bg-black/30 rounded-xl backdrop-blur-sm border border-white/10 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border overflow-hidden cursor-pointer transition-all duration-300
                ${activeTech === tech.name ? `border-${tech.color.substring(1)}50` : 'border-white/10 hover:border-white/20'}`}
              onClick={() => setActiveTech(activeTech === tech.name ? null : tech.name)}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              whileHover={{ y: -5 }}
            >
              {/* Accent glow background */}
              <div 
                className="absolute inset-0 opacity-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at bottom right, ${tech.color}60, transparent 70%)`,
                  opacity: activeTech === tech.name || hoveredTech === tech.name ? 0.2 : 0.1
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <motion.div
                      className="w-12 h-12 rounded-lg relative overflow-hidden mr-4 flex items-center justify-center"
                      style={{ backgroundColor: `${tech.color}20` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <tech.icon style={{ color: tech.color }} className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                      <p className="text-sm text-gray-400">{tech.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={activeTech === tech.name ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {tech.metrics.map((metric, idx) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/5 rounded-lg p-3 text-center"
                    >
                      <div className="text-lg font-bold" style={{ color: tech.color }}>{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {activeTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 pt-4 mt-2">
                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Zap className="w-4 h-4 mr-2" style={{ color: tech.color }} />
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {tech.features.map((feature, idx) => (
                              <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15,
                                  delay: idx * 0.1
                                }}
                                className="flex items-center text-gray-300 text-sm"
                              >
                                <Check className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: tech.color }} />
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Integrations */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" style={{ color: tech.color }} />
                            Integrations
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {tech.integrations.map((integration, idx) => (
                              <motion.div
                                key={integration}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15,
                                  delay: 0.4 + (idx * 0.1)
                                }}
                                className="flex items-center text-gray-300 text-sm"
                              >
                                <Check className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: tech.color }} />
                                <span>{integration}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Additional Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-lg text-center"
      >
        <h3 className="text-lg font-medium text-white mb-3">Enterprise-Grade Technology</h3>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Our CRM solutions leverage industry-leading technologies to deliver exceptional 
          performance, reliability, and security for businesses of all sizes.
        </p>
      </motion.div>
    </div>
  );
};

export default OptimizedTechStack;