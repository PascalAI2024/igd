import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, DollarSign } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import FeatureShowcase from '../../components/services/ad-management/FeatureShowcase';
import ProcessFlow from '../../components/services/ad-management/ProcessFlow';
import TechnologyStack from '../../components/services/ad-management/TechnologyStack';

const AdManagement = () => {
  const showcaseMetrics = [
    { 
      value: '3X',
      label: 'ROAS',
      trend: 'Average',
      icon: DollarSign
    },
    { 
      value: '85%',
      label: 'Target Reach',
      trend: 'Precision',
      icon: Target
    },
    { 
      value: '2X',
      label: 'Conversion',
      trend: 'Improvement',
      icon: Megaphone
    }
  ];

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
                <Megaphone className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Ad Management</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold text-gradient mb-6"
              >
                Transform Your Business
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                Strategic advertising campaigns that deliver measurable results and maximize your return on investment.
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-16">
                {showcaseMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <metric.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                    {metric.trend && (
                      <div className="flex items-center justify-center text-sm mt-1">
                        <span className="text-green-500">{metric.trend}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive advertising solutions tailored to your needs
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A systematic approach to delivering excellence
              </p>
            </div>

            <ProcessFlow />
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Tools</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Industry-leading platforms and technologies
              </p>
            </div>

            <TechnologyStack />
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
                  Ready to Maximize Your Ad Performance?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create strategic ad campaigns that deliver measurable results for your business.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AdManagement;
