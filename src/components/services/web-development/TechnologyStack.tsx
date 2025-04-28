import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, TrendingUp, Users, Code, GitBranch, LucideIcon } from 'lucide-react';

interface Technology {
  name: string;
  icon: string;
  description: string;
  proficiency: number;
  details: {
    title: string;
    value: string;
    icon: LucideIcon;
  }[];
  features: string[];
  metrics: {
    label: string;
    value: string;
    trend: string;
  }[];
}

const technologies: Technology[] = [
  {
    name: 'React',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    description: 'Modern, interactive UIs',
    proficiency: 95,
    details: [
      { title: 'Version', value: '18.x', icon: Code },
      { title: 'Updates', value: 'Weekly', icon: GitBranch },
      { title: 'Community', value: '200K+', icon: Users }
    ],
    features: [
      'Component-Based Architecture',
      'Virtual DOM',
      'React Hooks',
      'Context API'
    ],
    metrics: [
      { label: 'Performance', value: '98/100', trend: '+5%' },
      { label: 'Bundle Size', value: '< 100KB', trend: '-20%' },
      { label: 'Build Time', value: '< 2s', trend: '-30%' }
    ]
  },
  {
    name: 'Next.js',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
    description: 'SEO-optimized applications',
    proficiency: 90,
    details: [
      { title: 'Version', value: '13.x', icon: Code },
      { title: 'Updates', value: 'Monthly', icon: GitBranch },
      { title: 'Community', value: '150K+', icon: Users }
    ],
    features: [
      'Server-Side Rendering',
      'Static Site Generation',
      'API Routes',
      'Image Optimization'
    ],
    metrics: [
      { label: 'SEO Score', value: '100/100', trend: '+10%' },
      { label: 'Load Time', value: '< 1s', trend: '-40%' },
      { label: 'TTFB', value: '< 100ms', trend: '-25%' }
    ]
  },
  {
    name: 'TypeScript',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    description: 'Type-safe development',
    proficiency: 92,
    details: [
      { title: 'Version', value: '5.x', icon: Code },
      { title: 'Updates', value: 'Monthly', icon: GitBranch },
      { title: 'Community', value: '180K+', icon: Users }
    ],
    features: [
      'Static Type Checking',
      'Interface Support',
      'Generics',
      'Decorators'
    ],
    metrics: [
      { label: 'Type Coverage', value: '98%', trend: '+8%' },
      { label: 'Bug Reduction', value: '-45%', trend: '+15%' },
      { label: 'Dev Speed', value: '+30%', trend: '+10%' }
    ]
  },
  {
    name: 'Node.js',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    description: 'Scalable backend solutions',
    proficiency: 88,
    details: [
      { title: 'Version', value: '18.x LTS', icon: Code },
      { title: 'Updates', value: 'Bi-Monthly', icon: GitBranch },
      { title: 'Community', value: '250K+', icon: Users }
    ],
    features: [
      'Event-Driven Architecture',
      'Non-Blocking I/O',
      'NPM Ecosystem',
      'Microservices Support'
    ],
    metrics: [
      { label: 'Response Time', value: '< 50ms', trend: '-35%' },
      { label: 'Throughput', value: '10K/s', trend: '+25%' },
      { label: 'Memory Usage', value: '< 512MB', trend: '-15%' }
    ]
  }
];

const TechnologyStack = () => {
  const [activeTech, setActiveTech] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredTech(index)}
          onHoverEnd={() => setHoveredTech(null)}
          onClick={() => setActiveTech(activeTech === index ? null : index)}
          className="group relative cursor-pointer"
        >
          <motion.div
            className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300
              ${activeTech === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
            whileHover={{ scale: 1.02 }}
            animate={activeTech === index ? { y: -10 } : { y: 0 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeTech === index || hoveredTech === index ? 1 : 0 }}
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <motion.img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-12 h-12 mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-gradient">
                      {tech.name}
                    </h4>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
                <ChevronRight 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeTech === index ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {/* Proficiency Bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600"
                />
              </div>
              <div className="text-right text-sm text-gray-400 mb-4">
                {tech.proficiency}% Proficiency
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {tech.details.map((detail) => (
                  <div
                    key={detail.title}
                    className="text-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <detail.icon className="w-4 h-4 text-red-500 mx-auto mb-1" />
                    <div className="text-sm font-bold text-red-500">{detail.value}</div>
                    <div className="text-xs text-gray-400">{detail.title}</div>
                  </div>
                ))}
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {activeTech === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 pt-4"
                  >
                    {/* Features */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-white mb-2">Key Features:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {tech.features.map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="flex items-center space-x-2 text-gray-400"
                          >
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      {tech.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center p-2 bg-white/5 rounded-lg"
                        >
                          <div className="text-sm font-bold text-red-500">{metric.value}</div>
                          <div className="text-xs text-gray-400">{metric.label}</div>
                          <div className="flex items-center justify-center text-xs mt-1">
                            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                            <span className="text-green-500">{metric.trend}</span>
                          </div>
                        </div>
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

export default TechnologyStack;
