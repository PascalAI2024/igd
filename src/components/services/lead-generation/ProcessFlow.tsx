import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, LineChart, Zap } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Targeting',
    description: 'Identify ideal customer profiles and market opportunities',
    duration: '1-2 weeks'
  },
  {
    icon: Users,
    title: 'Engagement',
    description: 'Multi-channel lead generation campaigns and outreach',
    duration: '2-4 weeks'
  },
  {
    icon: LineChart,
    title: 'Nurturing',
    description: 'Automated lead nurturing and qualification process',
    duration: 'Ongoing'
  },
  {
    icon: Zap,
    title: 'Conversion',
    description: 'Strategic conversion optimization and closing process',
    duration: 'Continuous'
  }
];

const ProcessFlow = () => {
  return (
    <div className="relative">
      {/* Connection Lines */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 transform -translate-y-1/2 hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300 h-full">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 mb-4">
                  <step.icon className="w-full h-full text-white" />
                </div>

                <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  {step.duration}
                </div>
              </div>
            </div>

            {/* Step Number */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
