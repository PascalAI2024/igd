import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, BarChart, TrendingUp, ChevronRight, ArrowRight, CheckCircle } from 'lucide-react';

// Define the digital marketing process steps
const marketingSteps = [
  {
    icon: Search,
    title: "Research & Discovery",
    description: "In-depth analysis of your local market and target audience",
    timeline: "1-2 weeks",
    details: [
      "Competitor analysis to identify opportunities",
      "Keyword research for local search terms",
      "Market trends analysis for your industry",
      "Audience insights and behavior patterns"
    ],
    color: "#ef4444" // Red
  },
  {
    icon: Target,
    title: "Strategy Development",
    description: "Custom strategy development focused on your service area",
    timeline: "2-3 weeks",
    details: [
      "Campaign planning with measurable goals",
      "Content strategy aligned with business objectives",
      "Channel selection based on audience behavior",
      "Budget allocation for maximum ROI"
    ],
    color: "#3b82f6" // Blue
  },
  {
    icon: BarChart,
    title: "Implementation",
    description: "Execution of targeted marketing campaigns with real-time monitoring",
    timeline: "2-4 weeks",
    details: [
      "Campaign launch across selected channels",
      "Performance tracking with advanced analytics",
      "A/B testing to optimize conversion rates",
      "Real-time adjustments based on performance data"
    ],
    color: "#f97316" // Orange
  },
  {
    icon: TrendingUp,
    title: "Optimization & Growth",
    description: "Continuous improvement based on performance data",
    timeline: "Ongoing",
    details: [
      "Data analysis to identify improvement areas",
      "Strategy refinement for better performance",
      "ROI optimization to maximize results",
      "Growth scaling to expand your market reach"
    ],
    color: "#10b981" // Green
  }
];

const OptimizedDigitalMarketingFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoverStep, setHoverStep] = useState<number | null>(null);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Strategic Digital Marketing Process</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our comprehensive approach ensures consistent results and growth for your business
        </p>
      </motion.div>
      
      {/* Main Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {marketingSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              activeStep === index ? 'border-2' : 'border border-white/10 hover:border-white/20'
            }`}
            style={{ 
              background: `linear-gradient(135deg, ${step.color}10, transparent)`,
              borderColor: activeStep === index ? `${step.color}50` : '',
            }}
            onClick={() => setActiveStep(activeStep === index ? null : index)}
            onMouseEnter={() => setHoverStep(index)}
            onMouseLeave={() => setHoverStep(null)}
          >
            {/* Step indicator with connection lines */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                {/* Connection Line Left */}
                {index > 0 && (
                  <div 
                    className="absolute top-1/2 -left-12 lg:-left-[calc(100%_+_1.5rem)] h-0.5 lg:w-full w-8" 
                    style={{ background: `linear-gradient(to right, ${marketingSteps[index-1].color}40, ${step.color}40)` }}
                  />
                )}
                
                {/* Connection Line Right */}
                {index < marketingSteps.length - 1 && (
                  <div 
                    className="absolute top-1/2 -right-12 lg:-right-[calc(100%_+_1.5rem)] h-0.5 lg:w-full w-8" 
                    style={{ background: `linear-gradient(to right, ${step.color}40, ${marketingSteps[index+1].color}40)` }}
                  />
                )}
                
                {/* Circle icon container */}
                <motion.div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    background: `radial-gradient(circle, ${step.color}20 0%, ${step.color}10 70%)`,
                    boxShadow: (activeStep === index || hoverStep === index) ? `0 0 20px ${step.color}50` : 'none'
                  }}
                  animate={{ 
                    scale: activeStep === index ? [1, 1.05, 1] : 1,
                    boxShadow: activeStep === index ? [
                      `0 0 10px ${step.color}40`,
                      `0 0 20px ${step.color}50`,
                      `0 0 10px ${step.color}40`
                    ] : (hoverStep === index ? `0 0 15px ${step.color}40` : `0 0 0px ${step.color}00`)
                  }}
                  transition={{ 
                    scale: { 
                      repeat: activeStep === index ? Infinity : 0, 
                      duration: 2,
                      ease: "easeInOut"
                    },
                    boxShadow: {
                      repeat: activeStep === index ? Infinity : 0,
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Circle border */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2"
                    style={{ 
                      borderColor: step.color,
                      opacity: (activeStep === index || hoverStep === index) ? 0.7 : 0.3
                    }}
                  />
                  
                  {/* Icon */}
                  <step.icon 
                    size={28} 
                    color={step.color}
                  />
                  
                  {/* Step number */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}90)`,
                      boxShadow: `0 0 10px ${step.color}50`
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* Step title and basic info */}
            <h4 className="text-lg font-bold text-center mb-2" style={{ color: step.color }}>
              {step.title}
            </h4>
            <p className="text-sm text-gray-300 text-center mb-2">
              {step.description}
            </p>
            <div className="text-xs text-center font-medium" style={{ color: step.color }}>
              {step.timeline}
            </div>
            
            {/* View details button */}
            <div className="text-center mt-4">
              <motion.button
                className="inline-flex items-center text-sm"
                style={{ color: step.color }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Details</span>
                <ChevronRight 
                  size={16} 
                  className={`ml-1 transition-transform duration-300 ${activeStep === index ? 'rotate-90' : ''}`} 
                />
              </motion.button>
            </div>
            
            {/* Expanded details */}
            <AnimatePresence>
              {activeStep === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-white/10"
                >
                  <h5 className="text-sm font-semibold text-white mb-3">Key Activities:</h5>
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (detailIndex * 0.1) }}
                        className="flex items-start"
                      >
                        <CheckCircle 
                          size={16} 
                          className="flex-shrink-0 mr-2 mt-0.5" 
                          color={step.color}
                        />
                        <span className="text-gray-300 text-sm">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Next button for mobile navigation */}
                  <div className="mt-4 flex justify-end lg:hidden">
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-sm font-medium group"
                      style={{ color: step.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index < marketingSteps.length - 1) {
                          setActiveStep(index + 1);
                        } else {
                          setActiveStep(null);
                        }
                      }}
                    >
                      {index < marketingSteps.length - 1 ? (
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      
      {/* Metrics - Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg backdrop-blur-sm border border-white/10 p-6 mt-8"
      >
        <h4 className="text-lg font-bold text-white mb-4 text-center">Expected Results</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">+145%</div>
            <div className="text-sm text-gray-400">Organic Traffic</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">+85%</div>
            <div className="text-sm text-gray-400">Conversion Rate</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">+58%</div>
            <div className="text-sm text-gray-400">Online Visibility</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">-32%</div>
            <div className="text-sm text-gray-400">Cost Per Lead</div>
          </div>
        </div>
        <p className="text-gray-400 text-sm text-center mt-4">
          Results vary by industry and market competition. These figures represent our average client improvements.
        </p>
      </motion.div>
    </div>
  );
};

export default OptimizedDigitalMarketingFlow;