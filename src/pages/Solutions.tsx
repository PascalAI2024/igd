import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cloud, Shield, Database, Globe } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const solutions = [
  {
    icon: Code2,
    title: 'Enterprise Solutions',
    description: 'Custom software solutions designed for large-scale operations.',
    features: [
      'Scalable Architecture',
      'Integration Capabilities',
      'Custom Workflows',
      'Advanced Analytics'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions that automate and optimize processes.',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Deep Learning'
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Secure and scalable cloud infrastructure services.',
    features: [
      'Cloud Migration',
      'Hybrid Cloud',
      'Cloud Security',
      'Performance Optimization'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80'
  }
];

const industries = [
  {
    name: 'Healthcare',
    description: 'HIPAA-compliant solutions for healthcare providers.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80'
  },
  {
    name: 'Finance',
    description: 'Secure solutions for financial institutions.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80'
  },
  {
    name: 'Retail',
    description: 'Digital transformation solutions for retail businesses.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80'
  }
];

const Solutions = () => {
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
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Enterprise Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transformative digital solutions tailored to your industry needs
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                  </div>
                  
                  <div className="relative p-8">
                    <solution.icon className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-4">{solution.title}</h3>
                    <p className="text-gray-300 mb-6">{solution.description}</p>
                    
                    <ul className="space-y-2">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-300">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Industries We Serve</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Specialized solutions for various industry sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-semibold text-white mb-2">{industry.name}</h3>
                    <p className="text-gray-300">{industry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Solutions;