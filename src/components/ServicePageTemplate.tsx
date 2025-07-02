import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, LucideIcon, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from './PageTransition';

interface Solution {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

interface Metric {
  value: string;
  label: string;
  trend?: string;
  icon?: LucideIcon;
}

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ServicePageTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  solutions: Solution[];
  benefits?: {
    title: string;
    description: string;
  }[];
  processSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  technologies?: string[];
  showcaseMetrics?: Metric[];
  additionalFeatures?: Feature[];
  ctaTitle?: string;
  ctaDescription?: string;
}

const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  title,
  description,
  icon: Icon,
  solutions,
  benefits,
  processSteps,
  technologies,
  showcaseMetrics,
  additionalFeatures,
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Let's discuss how our solutions can help transform your business."
}) => {
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
                <Icon className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">{title}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-6"
              >
                Transform Your Business
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                {description}
              </motion.p>

              {/* Stats */}
              {showcaseMetrics && (
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
                        {metric.icon ? (
                          <metric.icon className="w-6 h-6 text-red-500" />
                        ) : (
                          <Icon className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      {metric.trend && (
                        <div className="flex items-center justify-center text-sm mt-1">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-500">{metric.trend}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Key Benefits */}
              {benefits && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {benefits.slice(0, 3).map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                    >
                      <Icon className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Solutions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive solutions tailored to your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <solution.icon className="w-8 h-8 text-red-500 mr-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-semibold text-white group-hover:text-gradient">{solution.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{solution.description}</p>
                  
                  <ul className="space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mt-1 mr-3" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        {additionalFeatures && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gradient mb-4">Core Capabilities</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Advanced features that set us apart
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {additionalFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    <feature.icon className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gradient">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Steps */}
        {processSteps && (
          <section className="py-20 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gradient mb-4">Our Process</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  A systematic approach to delivering excellence
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {processSteps.map((phase, index) => (
                  <motion.div
                    key={phase.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
                      <span className="text-4xl font-bold text-red-500/20 group-hover:text-red-500/40 transition-colors">{phase.step}</span>
                      <h3 className="text-xl font-semibold text-white mt-4 mb-2 group-hover:text-gradient">{phase.title}</h3>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-red-500/20 to-transparent transform translate-x-1/2" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Technologies */}
        {technologies && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gradient mb-4">Technologies We Use</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Industry-leading tools and frameworks
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    className="group px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                  >
                    <span className="text-gray-300 group-hover:text-gradient">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

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
                  {ctaTitle}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {ctaDescription}
                </p>
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServicePageTemplate;
