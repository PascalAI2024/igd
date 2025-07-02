import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronRight, BarChart2, Target, Layers, Code, Cpu } from 'lucide-react';
import ServiceCardEnhanced from './ServiceCardEnhanced';
import { services } from '../data/services/serviceData';
import { RevealOnScroll, StaggerContainer, SlideIn } from './AnimationWrappers';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('marketing');

  const categories = [
    {
      id: 'marketing',
      name: 'Marketing & Growth',
      icon: <BarChart2 className="w-5 h-5" />,
      description: 'Boost your online presence and drive more leads with our data-driven marketing solutions',
      services: services.filter(service =>
        ['Digital Marketing', 'Lead Generation', 'Ad Management'].includes(service.title)
      )
    },
    {
      id: 'media',
      name: 'Media Production',
      icon: <Layers className="w-5 h-5" />,
      description: 'Capture your brand\'s essence with professional photography and videography services',
      services: services.filter(service =>
        ['Photography', 'Videography'].includes(service.title)
      )
    },
    {
      id: 'tech',
      name: 'Technology Solutions',
      icon: <Code className="w-5 h-5" />,
      description: 'Leverage cutting-edge technology to streamline operations and enhance customer experiences',
      services: services.filter(service =>
        ['Web Development', 'AI & Automation', 'Business Automation'].includes(service.title)
      )
    },
    {
      id: 'business',
      name: 'Business Operations',
      icon: <Target className="w-5 h-5" />,
      description: 'Optimize your business processes with integrated solutions that drive efficiency',
      services: services.filter(service =>
        ['CRM Solutions', 'Communication'].includes(service.title)
      )
    }
  ];

  const activeServices = categories.find(cat => cat.id === activeCategory)?.services || [];
  const activeInfo = categories.find(cat => cat.id === activeCategory);

  return (
    <section id="services" className="py-20 bg-black scroll-mt-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <div className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full px-4 py-2 mb-4 border border-red-500/10">
              <Zap className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Trusted by 50+ Local Businesses</span>
            </div>
          </RevealOnScroll>

          <SlideIn direction="up" delay={0.1}>
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Transform Your Digital Presence
            </h2>
          </SlideIn>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Proven digital solutions based on successful implementations across 50+ clients, with transparent reporting and measurable outcomes.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className={`relative flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`mr-2 ${activeCategory === category.id ? 'text-red-500' : ''}`}>
                  {category.icon}
                </div>
                <span>{category.name}</span>

                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 border border-red-500/20 rounded-lg"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5 mb-4 border border-red-500/10">
              <div className="text-red-500">
                {activeInfo?.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{activeInfo?.name}</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">{activeInfo?.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {activeServices.map((service, index) => (
              <ServiceCardEnhanced
                key={`${activeCategory}-${service.title}`}
                {...service}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Implementation Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-black to-black/80 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-purple-500/10 blur-xl opacity-50 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <Cpu className="w-8 h-8 text-red-500" />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  Our Approach
                </h3>
                <p className="text-gray-300">
                  We believe in a systematic approach that prioritizes your business objectives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-red-500">1</div>
                  Strategic Planning
                </h4>
                <p className="text-gray-400 text-sm">
                  We start by understanding your business goals and creating a strategic roadmap aligned with your objectives.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-red-500">2</div>
                  Custom Implementation
                </h4>
                <p className="text-gray-400 text-sm">
                  Each solution is carefully crafted and implemented based on your specific needs and industry requirements.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-red-500">3</div>
                  Progress Tracking
                </h4>
                <p className="text-gray-400 text-sm">
                  We provide regular updates and performance tracking to ensure transparency and accountability throughout the process.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-red-500">4</div>
                  Continuous Optimization
                </h4>
                <p className="text-gray-400 text-sm">
                  We continuously refine and optimize our solutions to ensure maximum results and return on investment.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
