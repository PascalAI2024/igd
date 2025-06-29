import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Clock, Users, ArrowRight,
  Mail, Phone, TrendingUp, Zap, Bell, Settings
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import NavigationButton from '../../components/NavigationButton';
import { lazy3D } from '../../utils/lazyLoad3D';
import LiveCommunicationDemo from '../../components/services/communication/LiveCommunicationDemo';

const stats = [
  { label: 'Response Time', value: '-65%', icon: Clock, trend: 'Faster' },
  { label: 'Customer Reach', value: '+85%', icon: Users, trend: '+15%' },
  { label: 'Engagement', value: '+120%', icon: TrendingUp, trend: '+25%' }
];

const features = [
  {
    icon: MessageSquare,
    title: 'Automated Messaging',
    description: 'Set up automated responses and follow-ups to ensure timely communication.',
    metrics: [
      { label: 'Response Rate', value: '98%' },
      { label: 'Speed', value: '< 5min' },
      { label: 'Satisfaction', value: '95%' }
    ]
  },
  {
    icon: Mail,
    title: 'Email Integration',
    description: 'Seamless email integration with your existing systems.',
    metrics: [
      { label: 'Open Rate', value: '45%' },
      { label: 'Click Rate', value: '22%' },
      { label: 'Delivery', value: '99.9%' }
    ]
  },
  {
    icon: Phone,
    title: 'Voice & SMS',
    description: 'Integrated voice and SMS capabilities for direct communication.',
    metrics: [
      { label: 'Call Quality', value: 'HD' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Coverage', value: 'Global' }
    ]
  }
];

const Communication = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
              >
                <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Communication Solutions</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold text-gradient mb-6"
              >
                Enhance Your Customer Communication
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                Streamline customer interactions with automated messaging and efficient communication tools
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
                  <Zap className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Fast Response</h3>
                  <p className="text-gray-400 text-sm">
                    Automated instant responses
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Bell className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Smart Alerts</h3>
                  <p className="text-gray-400 text-sm">
                    Never miss an interaction
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Settings className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Automation</h3>
                  <p className="text-gray-400 text-sm">
                    Streamlined workflows
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Communication Demo */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveCommunicationDemo />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Communication Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need for efficient customer communication
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border transition-all duration-300 cursor-pointer
                    ${hoveredFeature === index ? 'border-red-500/50 bg-white/10' : 'border-white/10 hover:border-red-500/20'}`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                >
                  <feature.icon className={`w-8 h-8 text-red-500 mb-4 transition-transform duration-300 ${
                    hoveredFeature === index ? 'scale-110' : ''
                  }`} />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>

                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10"
                      >
                        {feature.metrics.map((metric) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                          >
                            <div className="text-lg font-bold text-red-500">{metric.value}</div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gradient mb-6 text-center">
                  Implementation Timeline
                </h3>
                <div className="space-y-6">
                  {[
                    { day: 'Day 1', desc: 'System setup, automation configuration, initial testing' },
                    { day: 'Day 2', desc: 'Team training, message template setup, workflow configuration' },
                    { day: 'Day 3', desc: 'Final testing, go-live, monitoring and adjustments' },
                    { day: 'Days 4+', desc: 'Ongoing optimization and support as needed' }
                  ].map((step, index) => (
                    <motion.div
                      key={step.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start group"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-4 flex-shrink-0"
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
                      <div>
                        <h4 className="text-white font-semibold mb-2">{step.day}</h4>
                        <p className="text-gray-400">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Enhance Your Communication?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a communication system that keeps you connected with your customers
                </p>
                <NavigationButton
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </NavigationButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Communication;
