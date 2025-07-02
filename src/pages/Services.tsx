import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { serviceRoutes } from '../data/routes';
import MetaTags from '../components/MetaTags';

const Services: React.FC = () => {
  return (
    <PageTransition>
      <MetaTags 
        title="Digital Services Fort Lauderdale | Ingenious Digital"
        description="Full-service digital agency in Fort Lauderdale offering web development, AI solutions, digital marketing, CRM, and business automation. Transform your business with our comprehensive services."
        keywords={["digital services Fort Lauderdale", "web development", "digital marketing", "CRM", "business automation", "AI solutions", "local digital agency", "small business solutions"]}
      />
      
      <div className="min-h-screen bg-black pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Digital <span className="text-red-500">Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive digital services designed to transform your small business
                and accelerate growth in today's digital landscape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="text-red-500">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From cutting-edge AI solutions to traditional digital marketing, 
                we offer everything your business needs to thrive online.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {serviceRoutes.items.map((service, index) => (
                <motion.div
                  key={service.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="group"
                >
                  <Link to={service.path} className="block">
                    <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 h-full hover:bg-gray-800/50 hover:border-red-500/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
                          {index % 3 === 0 && <Zap className="w-6 h-6 text-red-500" />}
                          {index % 3 === 1 && <Target className="w-6 h-6 text-red-500" />}
                          {index % 3 === 2 && <TrendingUp className="w-6 h-6 text-red-500" />}
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors duration-200">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-center text-red-400 group-hover:text-red-300 transition-colors duration-200">
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why Choose <span className="text-red-500">Ingenious Digital</span>?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
                  <p className="text-gray-300">
                    Quick turnaround times without compromising on quality. 
                    Get your projects delivered faster than industry standards.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Results-Focused</h3>
                  <p className="text-gray-300">
                    Every strategy is designed with measurable outcomes in mind. 
                    We track, optimize, and deliver real business results.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Growth-Oriented</h3>
                  <p className="text-gray-300">
                    Solutions that scale with your business. From startup to enterprise, 
                    we build for sustainable growth.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-12 border border-red-500/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Let's discuss how our digital solutions can help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Learn About Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Services;