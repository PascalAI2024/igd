import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, BarChart, Rocket, ChevronRight, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Research',
    description: 'In-depth analysis of your local market and target audience',
    focus: 'Market Understanding',
    details: [
      'Competitor Analysis',
      'Keyword Research',
      'Market Trends',
      'Audience Insights'
    ]
  },
  {
    icon: Target,
    title: 'Strategy',
    description: 'Custom strategy development focused on your service area',
    focus: 'Local Impact',
    details: [
      'Campaign Planning',
      'Content Strategy',
      'Channel Selection',
      'Budget Allocation'
    ]
  },
  {
    icon: BarChart,
    title: 'Implementation',
    description: 'Execution of targeted marketing campaigns with real-time monitoring',
    focus: 'Active Growth',
    details: [
      'Campaign Launch',
      'Performance Tracking',
      'A/B Testing',
      'Real-time Adjustments'
    ]
  },
  {
    icon: Rocket,
    title: 'Optimization',
    description: 'Continuous improvement based on performance data',
    focus: 'Sustained Success',
    details: [
      'Data Analysis',
      'Strategy Refinement',
      'ROI Optimization',
      'Growth Scaling'
    ]
  }
];

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Connection Lines */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 transform -translate-y-1/2 hidden md:block">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-500"
          style={{
            width: '25%',
            transform: `translateX(${hoveredStep !== null ? hoveredStep * 100 : 0}%)`,
            transition: 'transform 0.3s ease-in-out',
            opacity: hoveredStep !== null ? 1 : 0
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            onClick={() => setActiveStep(activeStep === index ? null : index)}
          >
            <motion.div
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 h-full cursor-pointer
                ${hoveredStep === index ? 'border-red-500/40 bg-white/10' : 'hover:border-red-500/20'}
                ${activeStep === index ? 'ring-2 ring-red-500/50' : ''}`}
              whileHover={{ scale: 1.02 }}
              animate={activeStep === index ? { y: -10 } : { y: 0 }}
            >
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="w-full h-full text-white" />
                </motion.div>

                <h4 className="text-xl font-semibold text-white mb-2 flex items-center">
                  {step.title}
                  <ChevronRight 
                    className={`w-5 h-5 ml-2 transition-transform ${activeStep === index ? 'rotate-90' : ''}`}
                  />
                </h4>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                  {step.focus}
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detail}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.1 }}
                            className="flex items-center text-gray-400"
                          >
                            <ArrowRight className="w-4 h-4 mr-2 text-red-500" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated Background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"
                  style={{
                    opacity: hoveredStep === index ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
              </div>
            </motion.div>

            {/* Step Number */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              whileHover={{ scale: 1.1 }}
              animate={hoveredStep === index ? { scale: 1.1 } : { scale: 1 }}
            >
              {index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFlow;
