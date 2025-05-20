import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, ArrowRight, Zap, Link2, BarChart2, ChevronRight,
  Database, Server, Cloud, TrendingUp, Settings, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import FeatureShowcase from '../../components/services/system-integration/FeatureShowcase';
import SystemIntegrationProcessFlow3D from '../../components/services/system-integration/SystemIntegrationProcessFlow3D';
import SystemNetwork3D from '../../components/services/system-integration/SystemNetwork3D';

const stats = [
  { label: 'Integration Speed', value: '-60%', icon: Zap, trend: 'Faster' },
  { label: 'System Uptime', value: '99.9%', icon: Server, trend: '+0.5%' },
  { label: 'Data Accuracy', value: '99.99%', icon: Database, trend: '+2%' }
];

const features = [
  {
    title: 'API Integration',
    description: 'Seamless connection between all your systems',
    icon: Link2,
    metrics: [
      { label: 'API Uptime', value: '99.9%' },
      { label: 'Response Time', value: '< 100ms' },
      { label: 'Success Rate', value: '99.9%' }
    ]
  },
  {
    title: 'Data Synchronization',
    description: 'Real-time data flow across platforms',
    icon: Database,
    metrics: [
      { label: 'Sync Speed', value: '< 1s' },
      { label: 'Data Integrity', value: '100%' },
      { label: 'Recovery Time', value: '< 5m' }
    ]
  },
  {
    title: 'Security & Compliance',
    description: 'Enterprise-grade security standards',
    icon: Lock,
    metrics: [
      { label: 'Encryption', value: '256-bit' },
      { label: 'Compliance', value: 'SOC2' },
      { label: 'Monitoring', value: '24/7' }
    ]
  },
  {
    title: 'Performance Monitoring',
    description: 'Real-time system performance tracking',
    icon: BarChart2,
    metrics: [
      { label: 'Metrics', value: '100+' },
      { label: 'Alerts', value: 'Real-time' },
      { label: 'Reports', value: 'Custom' }
    ]
  }
];

const SystemIntegration = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative inline-block"
              >
                <Network className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-6 text-gradient"
              >
                System Integration
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                Connect and optimize your business systems for seamless data flow and enhanced efficiency
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="flex items-center justify-center text-sm mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Link2 className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Seamless Integration</h3>
                  <p className="text-gray-400 text-sm">
                    Connect all your systems effortlessly
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Settings className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Automation</h3>
                  <p className="text-gray-400 text-sm">
                    Streamline your workflows
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Cloud className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Cloud-Ready</h3>
                  <p className="text-gray-400 text-sm">
                    Built for modern infrastructure
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* System Network Visualization */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                System Network Overview
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Visualize your integrated systems and data flow
              </p>
            </motion.div>

            <SystemNetwork3D />
          </div>
        </section>

        {/* Feature Showcase */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Integration Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need for seamless system integration
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Integration Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our proven approach to system integration
              </p>
            </motion.div>

            <SystemIntegrationProcessFlow3D />
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gradient mb-6 text-center">
                  Integration Features
                </h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                    >
                      <div className={`flex items-start transition-colors duration-300 rounded-lg p-4 -mx-4 ${
                        hoveredFeature === index ? 'bg-white/5' : ''
                      }`}>
                        <feature.icon className={`w-8 h-8 text-red-500 mr-4 transition-transform duration-300 ${
                          hoveredFeature === index ? 'scale-110' : ''
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                            <ChevronRight 
                              className={`w-5 h-5 ml-2 text-red-500 transition-transform duration-300 ${
                                activeFeature === index ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                          <p className="text-gray-400">{feature.description}</p>

                          <AnimatePresence>
                            {activeFeature === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-3 gap-4 mt-4"
                              >
                                {feature.metrics.map((metric) => (
                                  <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center p-3 bg-white/5 rounded-lg"
                                  >
                                    <div className="text-lg font-bold text-red-500">{metric.value}</div>
                                    <div className="text-sm text-gray-400">{metric.label}</div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Connect Your Systems?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's integrate your business systems for maximum efficiency
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Start Integration
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default SystemIntegration;
