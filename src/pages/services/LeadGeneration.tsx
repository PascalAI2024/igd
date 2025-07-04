import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, Clock, Users, LineChart, ChevronRight, 
  TrendingUp, Star, Zap, ArrowRight 
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import NavigationButton from '../../components/NavigationButton';
import FeatureShowcase from '../../components/services/lead-generation/FeatureShowcase';
import LiveFunnelBuilder from '../../components/services/lead-generation/LiveFunnelBuilder';
import TechnologyStack from '../../components/services/lead-generation/TechnologyStack';
import { lazy3D } from '../../utils/lazyLoad3D';

const stats = [
  { label: 'Lead Growth', value: '35-65%', icon: TrendingUp },
  { label: 'Client Satisfaction', value: '89%', icon: Star },
  { label: 'Avg Response', value: '4-6hrs', icon: Clock }
];

const timelineSteps = [
  {
    title: 'Days 1-5',
    description: 'Discovery, planning, and initial system setup',
    details: [
      'Lead capture forms setup',
      'CRM integration',
      'Automation workflows',
      'Campaign configuration'
    ]
  },
  {
    title: 'Days 6-14',
    description: 'Campaign setup, tracking implementation, and testing',
    details: [
      'Campaign activation',
      'Analytics setup',
      'Lead tracking',
      'Initial optimization'
    ]
  },
  {
    title: 'Days 15-30',
    description: 'Campaign launch and initial lead generation',
    details: [
      'Lead qualification',
      'Score refinement',
      'Process optimization',
      'Performance analysis'
    ]
  },
  {
    title: 'Days 30-60',
    description: 'Data analysis and campaign optimization',
    details: [
      'Targeting improvement',
      'Conversion optimization',
      'Funnel refinement',
      'ROI analysis'
    ]
  },
  {
    title: 'Days 60-90',
    description: 'Scaling and advanced optimization based on results',
    details: [
      'Campaign scaling',
      'Advanced automation',
      'Performance optimization',
      'Growth strategies'
    ]
  }
];

const LeadGeneration = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

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
                <Target className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Lead Generation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-6"
              >
                Build Your Lead Generation System
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
              >
                Create a systematic approach to generating and nurturing leads. Most businesses see initial results within 30-60 days with proper implementation.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-8 mb-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Timeline Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Clock className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Quick Setup</h3>
                  <p className="text-gray-400 text-sm">
                    Initial system setup within 3-5 business days
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Users className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">First Leads</h3>
                  <p className="text-gray-400 text-sm">
                    First qualified leads typically within 2-4 weeks
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <LineChart className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Optimization</h3>
                  <p className="text-gray-400 text-sm">
                    Optimization and scaling based on 60-90 days of data
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Lead Generation Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to capture and nurture quality leads.
              </p>
            </motion.div>
            <FeatureShowcase />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Our Lead Generation Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A systematic approach to generating and nurturing leads.
              </p>
            </motion.div>
            <lazy3D.LeadGenerationProcessFlow3D />
          </div>
        </section>

        {/* Live Funnel Builder Demo */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveFunnelBuilder />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Our Technology Stack
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Powered by industry-leading tools and platforms.
              </p>
            </motion.div>
            <TechnologyStack />
          </div>
        </section>

        {/* Timeline Expectations */}
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
                  What to Expect
                </h3>
                <div className="space-y-6">
                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start group cursor-pointer transition-colors duration-300 ${
                        hoveredStep === index ? 'bg-white/5 rounded-lg p-4 -mx-4' : ''
                      }`}
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                      onClick={() => setActiveStep(activeStep === index ? null : index)}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-4 flex-shrink-0 transition-all duration-300 ${
                        hoveredStep === index ? 'scale-150' : ''
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                          <ChevronRight 
                            className={`w-4 h-4 ml-2 text-red-500 transition-transform duration-300 ${
                              activeStep === index ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                        <p className="text-gray-400 mb-2">{step.description}</p>
                        
                        <AnimatePresence>
                          {activeStep === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-2 gap-2 mt-2"
                            >
                              {step.details.map((detail, detailIndex) => (
                                <motion.div
                                  key={detail}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: detailIndex * 0.1 }}
                                  className="flex items-center space-x-2 text-gray-400"
                                >
                                  <Zap className="w-4 h-4 text-red-500" />
                                  <span className="text-sm">{detail}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                  Ready to Generate More Leads?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a lead generation system that brings more customers to your business
                </p>
                <NavigationButton
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </NavigationButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LeadGeneration;
