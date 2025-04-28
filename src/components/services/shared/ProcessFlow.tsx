import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
  details?: string[];
  color?: string;
}

interface ProcessFlowProps {
  title: string;
  description: string;
  steps: ProcessStep[];
  animationDelay?: number;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({
  title,
  description,
  steps,
  animationDelay = 0.3
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-red-500/50 via-red-500/30 to-purple-500/50 hidden md:block" />
        
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: animationDelay + (index * 0.1) }}
              className="relative"
            >
              <div 
                className="flex flex-col md:flex-row cursor-pointer"
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                {/* Step number/icon */}
                <div className="md:w-12 flex-shrink-0 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center border border-white/10"
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      scale: activeStep === index ? 1.1 : 1,
                      borderColor: activeStep === index ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {step.icon ? (
                      <div className="text-red-500">{step.icon}</div>
                    ) : (
                      <span className="text-lg font-bold text-red-500">{index + 1}</span>
                    )}
                  </motion.div>
                </div>
                
                {/* Step content */}
                <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
                  <div className="flex items-center">
                    <h4 
                      className="text-lg font-semibold transition-colors duration-300"
                      style={{ 
                        color: activeStep === index 
                          ? (step.color || '#ef4444') 
                          : 'white' 
                      }}
                    >
                      {step.title}
                    </h4>
                    <ChevronRight 
                      className="ml-2 w-5 h-5 transition-transform duration-300"
                      style={{ 
                        transform: activeStep === index ? 'rotate(90deg)' : 'rotate(0deg)',
                        color: activeStep === index ? (step.color || '#ef4444') : '#9ca3af'
                      }}
                    />
                  </div>
                  
                  <p className="text-gray-400 mt-1">{step.description}</p>
                  
                  {/* Expanded details */}
                  {activeStep === index && step.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-black/20 rounded-lg p-4 border border-white/5"
                    >
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span className="text-gray-300">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Animated pulse for active step */}
              {activeStep === index && (
                <motion.div
                  className="absolute left-6 top-6 w-0 h-0 rounded-full bg-red-500 -translate-x-1/2 -translate-y-1/2 hidden md:block"
                  animate={{
                    width: [0, 30, 0],
                    height: [0, 30, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessFlow;
