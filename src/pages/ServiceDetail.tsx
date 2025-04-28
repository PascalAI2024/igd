import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { services } from '../data/services/serviceData';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  // Find service by matching the path
  const service = services.find(s => s.path === `/services/${id}`);

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center text-red-500 hover:text-red-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {service.metrics.map((metric, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/5 rounded-full text-gray-300 text-sm"
                    >
                      {metric.label}: {metric.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className={`aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${service.color} p-8 backdrop-blur-sm border border-white/10`}>
                  <service.icon className="w-full h-full text-white animate-float" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-gradient">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white">{feature}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's discuss how our {service.title.toLowerCase()} services can help you achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Get Started
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 border border-red-500/20 hover:bg-red-500/10 text-white rounded-lg transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;
