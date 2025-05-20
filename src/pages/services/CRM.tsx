import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Database, Zap, Shield, MessageSquare, Settings } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import FeatureShowcase from '../../components/services/crm/FeatureShowcase';
import CRMProcessFlow3D from '../../components/services/crm/CRMProcessFlow3D';
import CRMDashboard3D from '../../components/services/crm/CRMDashboard3D';
import TechnologyStack from '../../components/services/crm/TechnologyStack';
import NavigationButton from '../../components/NavigationButton';

const stats = [
  { label: 'Customer Growth', value: '150%', icon: Users },
  { label: 'Response Time', value: '-65%', icon: Zap },
  { label: 'Data Accuracy', value: '99.9%', icon: Shield }
];

const CRM = () => {
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
                <Database className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">CRM Solutions</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-6"
              >
                Transform Customer Relationships
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
              >
                Streamline your customer management with our powerful CRM solutions designed for local businesses
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

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Database className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Centralized Data</h3>
                  <p className="text-gray-400 text-sm">
                    All your customer data in one secure place
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <MessageSquare className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Smart Communication</h3>
                  <p className="text-gray-400 text-sm">
                    Automated messaging and follow-ups
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
                  <h3 className="text-white font-semibold mb-2">Workflow Automation</h3>
                  <p className="text-gray-400 text-sm">
                    Streamlined processes and tasks
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Dashboard */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gradient mb-4">
                Unified CRM Platform
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to manage customer relationships in one place
              </p>
            </motion.div>

            <CRMDashboard3D />
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gradient mb-4">
                Powerful Features
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tools and capabilities designed for business growth
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gradient mb-4">
                Simple Implementation
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get up and running quickly with our streamlined process
              </p>
            </motion.div>

            <CRMProcessFlow3D />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gradient mb-4">
                Technology Stack
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Built with industry-leading technologies for reliability and performance
              </p>
            </motion.div>

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
                <h2 className="text-4xl font-bold text-gradient mb-6">
                  Ready to Transform Your Customer Relationships?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get started with our CRM solutions today
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

export default CRM;
