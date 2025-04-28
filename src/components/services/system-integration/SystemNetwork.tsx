import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Laptop, Cloud, ArrowRight } from 'lucide-react';

const SystemNetwork: React.FC = () => {
  return (
    <div className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            System Integration Network
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Seamlessly connect your business systems for improved efficiency and data flow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Legacy Systems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Legacy Systems</h3>
            </div>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Database Integration
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Data Migration
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                System Modernization
              </li>
            </ul>
          </motion.div>

          {/* Modern Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-4">
              <Laptop className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Modern Applications</h3>
            </div>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                API Development
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Microservices
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Real-time Integration
              </li>
            </ul>
          </motion.div>

          {/* Cloud Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-4">
              <Cloud className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Cloud Services</h3>
            </div>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Cloud Migration
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Hybrid Solutions
              </li>
              <li className="flex items-center">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2" />
                Scalable Architecture
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Integration Flow */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-4">
              <Server className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-semibold text-white">Integration Flow</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Data Collection', 'Processing', 'Transformation', 'Distribution'].map((step, index) => (
                <div key={step} className="text-center">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white font-semibold">{step}</p>
                    <p className="text-gray-400 text-sm mt-2">Step {index + 1}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute transform translate-x-full -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-red-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SystemNetwork;
