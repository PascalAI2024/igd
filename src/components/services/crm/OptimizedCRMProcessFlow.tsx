import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Settings, BookOpen, Zap, ArrowRight, CheckCircle } from 'lucide-react';

// Define the CRM implementation process steps
const steps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your business needs and processes',
    timeline: '1-2 days',
    details: [
      'Business process analysis',
      'Current system evaluation',
      'Success metrics definition',
      'Requirements gathering'
    ],
    color: '#ef4444'
  },
  {
    icon: Settings,
    title: 'Setup & Configuration',
    description: 'Customizing your CRM system for optimal performance',
    timeline: '2-3 days',
    details: [
      'CRM platform configuration',
      'Clean data migration',
      'Third-party integrations',
      'Workflow automation setup'
    ],
    color: '#f97316'
  },
  {
    icon: BookOpen,
    title: 'Training',
    description: 'Comprehensive team training and documentation',
    timeline: '1-2 days',
    details: [
      'Hands-on system training',
      'Process documentation',
      '24/7 support setup',
      'Knowledge transfer'
    ],
    color: '#3b82f6'
  },
  {
    icon: Zap,
    title: 'Launch & Optimization',
    description: 'System launch and continuous improvement',
    timeline: 'Ongoing',
    details: [
      'System go-live',
      'Performance monitoring',
      'Continuous improvement',
      'Regular updates'
    ],
    color: '#10b981'
  }
];

const OptimizedCRMProcessFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm p-8">
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-4xl">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-white/10 to-blue-500/20" />
          
          {/* Process Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center"
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                {/* Step indicator */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                >
                  {/* Background circle */}
                  <motion.div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `radial-gradient(circle, ${step.color}30 0%, ${step.color}10 70%)`,
                      boxShadow: activeStep === index ? `0 0 20px ${step.color}50` : 'none'
                    }}
                    animate={{ 
                      scale: activeStep === index ? [1, 1.05, 1] : 1,
                      boxShadow: activeStep === index ? [
                        `0 0 10px ${step.color}40`,
                        `0 0 20px ${step.color}50`,
                        `0 0 10px ${step.color}40`
                      ] : `0 0 0px ${step.color}00`
                    }}
                    transition={{ 
                      scale: { 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      },
                      boxShadow: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Circular border */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2"
                      style={{ 
                        borderColor: step.color,
                        opacity: activeStep === index ? 0.7 : 0.3
                      }}
                      animate={{ 
                        scale: activeStep === index ? [1, 1.1, 1] : 1,
                        opacity: activeStep === index ? [0.5, 0.8, 0.5] : 0.3
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Icon */}
                    <div className="z-10">
                      <step.icon 
                        size={24} 
                        style={{ color: step.color }} 
                        strokeWidth={activeStep === index ? 2.5 : 2}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Step number badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}90)`,
                    }}
                    animate={{ 
                      scale: activeStep === index ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      repeat: activeStep === index ? Infinity : 0, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
                
                {/* Step title and timeline */}
                <div className="mt-4 text-center">
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  <div className="text-xs text-gray-400 mt-1">{step.timeline}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Step details panel */}
      <AnimatePresence mode="wait">
        {activeStep !== null && (
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div 
              className="mt-8 p-6 rounded-lg border bg-white/5"
              style={{ borderColor: steps[activeStep].color + '30' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start">
                <div className="hidden sm:block">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mr-6"
                    style={{ 
                      background: `radial-gradient(circle, ${steps[activeStep].color}30 0%, ${steps[activeStep].color}10 70%)`,
                    }}
                  >
                    {React.createElement(steps[activeStep].icon, {
                      size: 32,
                      style: { color: steps[activeStep].color }
                    })}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2" style={{ color: steps[activeStep].color }}>
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-gray-300">
                      {steps[activeStep].description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[activeStep].details.map((detail, index) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <CheckCircle 
                          className="flex-shrink-0 mr-2 mt-1" 
                          size={16} 
                          style={{ color: steps[activeStep].color }} 
                        />
                        <span className="text-gray-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-sm font-medium group"
                      style={{ color: steps[activeStep].color }}
                      onClick={() => setActiveStep(
                        activeStep < steps.length - 1 ? activeStep + 1 : null
                      )}
                    >
                      {activeStep < steps.length - 1 ? (
                        <>
                          Next Step
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : (
                        <>
                          Close
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Timeline Description */}
      {activeStep === null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 text-center"
        >
          <h3 className="text-xl font-medium text-white mb-4">Our Implementation Timeline</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our streamlined CRM implementation process is designed to get your business up and running quickly
            with minimal disruption. Most implementations are completed in 5-7 business days, depending on complexity
            and customization requirements. Click on each step above to learn more about our process.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedCRMProcessFlow;