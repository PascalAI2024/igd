import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Code, Zap, Server, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';

// Define the web development process steps
const webDevSteps = [
  {
    icon: Layout,
    title: "Design",
    description: "Creating the visual blueprint of your website",
    timeline: "1-2 weeks",
    details: [
      "Wireframing & Prototyping",
      "UI/UX Design",
      "Design System Creation",
      "Responsive Layout Design"
    ],
    color: "#ef4444" // Red
  },
  {
    icon: Code,
    title: "Development",
    description: "Building the functional structure of your website",
    timeline: "2-4 weeks",
    details: [
      "Frontend Development",
      "Backend Implementation",
      "Database Architecture",
      "API Integration"
    ],
    color: "#3b82f6" // Blue
  },
  {
    icon: Zap,
    title: "Optimization",
    description: "Enhancing performance and user experience",
    timeline: "1-2 weeks",
    details: [
      "Performance Optimization",
      "SEO Implementation",
      "Accessibility Compliance",
      "Cross-browser Testing"
    ],
    color: "#f97316" // Orange
  },
  {
    icon: Server,
    title: "Deployment",
    description: "Launching your website to the world",
    timeline: "1 week",
    details: [
      "Server Configuration",
      "CI/CD Pipeline Setup",
      "Domain & SSL Setup",
      "Security Hardening"
    ],
    color: "#10b981" // Green
  },
  {
    icon: CheckCircle,
    title: "Launch & Support",
    description: "Your website goes live with ongoing maintenance",
    timeline: "Ongoing",
    details: [
      "Launch Monitoring",
      "Performance Tracking",
      "Regular Updates",
      "Continuous Improvement"
    ],
    color: "#8b5cf6" // Purple
  }
];

const OptimizedWebDevelopmentProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedView, setExpandedView] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 backdrop-blur-sm p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Web Development Process</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Our comprehensive approach to building high-performance websites
        </p>
      </motion.div>
      
      {/* Compact Process View */}
      {!expandedView && (
        <div className="relative w-full max-w-5xl mx-auto mb-8">
          {/* Connection line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-red-500/40 via-blue-500/40 to-purple-500/40" />
          
          {/* Process Steps */}
          <div className="relative flex justify-between">
            {webDevSteps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
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
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `radial-gradient(circle, ${step.color}20 0%, ${step.color}10 70%)`,
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
                        opacity: activeStep === index ? 0.8 : 0.3
                      }}
                    />
                    
                    {/* Icon */}
                    <div className="z-10">
                      <step.icon 
                        size={24} 
                        style={{ color: step.color }} 
                      />
                    </div>
                  </motion.div>
                  
                  {/* Step number */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ 
                      background: step.color,
                      boxShadow: `0 0 10px ${step.color}50`
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
                
                {/* Step title and timeline */}
                <motion.div 
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                >
                  <h4 className="font-semibold text-white text-sm md:text-base">{step.title}</h4>
                  <div className="text-xs text-gray-400 mt-1">{step.timeline}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* Expanded Process View */}
      {expandedView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {webDevSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300
                ${activeStep === index ? 'border-2' : 'border border-white/10 hover:border-white/20'}`}
              style={{ 
                borderColor: activeStep === index ? `${step.color}50` : '',
                background: `linear-gradient(135deg, ${step.color}10, transparent)` 
              }}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="flex items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4"
                  style={{ background: `${step.color}20` }}
                >
                  <step.icon size={24} color={step.color} />
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-bold text-white">{step.title}</h4>
                    <span className="ml-2 text-sm px-2 py-0.5 rounded-full" style={{ background: `${step.color}30`, color: step.color }}>{index + 1}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                  <div className="text-sm font-medium mt-2" style={{ color: step.color }}>{step.timeline}</div>
                </div>
              </div>
              
              <AnimatePresence>
                {activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <h5 className="text-sm font-semibold text-white mb-3">What happens in this phase:</h5>
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (detailIndex * 0.1) }}
                            className="flex items-start"
                          >
                            <div className="w-1.5 h-1.5 rounded-full mt-2 mr-2" style={{ background: step.color }}></div>
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Step details panel for compact view */}
      <AnimatePresence mode="wait">
        {activeStep !== null && !expandedView && (
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div 
              className="mt-8 p-6 rounded-lg border backdrop-blur-sm bg-white/5"
              style={{ borderColor: webDevSteps[activeStep].color + '30' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start">
                <div className="hidden sm:block flex-shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mr-6"
                    style={{ 
                      background: `radial-gradient(circle, ${webDevSteps[activeStep].color}30 0%, ${webDevSteps[activeStep].color}10 70%)`,
                    }}
                  >
                    {React.createElement(webDevSteps[activeStep].icon, {
                      size: 32,
                      color: webDevSteps[activeStep].color
                    })}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold" style={{ color: webDevSteps[activeStep].color }}>
                        Phase {activeStep + 1}: {webDevSteps[activeStep].title}
                      </h3>
                      <span className="ml-3 text-sm px-2 py-0.5 rounded-full" style={{ background: `${webDevSteps[activeStep].color}20`, color: webDevSteps[activeStep].color }}>
                        {webDevSteps[activeStep].timeline}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-2">
                      {webDevSteps[activeStep].description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {webDevSteps[activeStep].details.map((detail, index) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <CheckCircle 
                          className="flex-shrink-0 mr-2 mt-0.5" 
                          size={16} 
                          color={webDevSteps[activeStep].color}
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
                      style={{ color: webDevSteps[activeStep].color }}
                      onClick={() => {
                        if (activeStep < webDevSteps.length - 1) {
                          setActiveStep(activeStep + 1);
                        } else {
                          setActiveStep(null);
                        }
                      }}
                    >
                      {activeStep < webDevSteps.length - 1 ? (
                        <>
                          Next Phase
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
      
      {/* View toggle */}
      <div className="flex justify-center mt-8">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
          onClick={() => {
            setExpandedView(!expandedView);
            setActiveStep(null);
          }}
        >
          <span>{expandedView ? 'Switch to Timeline View' : 'Switch to Detailed View'}</span>
          <ChevronRight 
            className={`ml-1 w-4 h-4 transition-transform duration-300 ${expandedView ? 'rotate-180' : ''}`} 
          />
        </motion.button>
      </div>
      
      {/* Description */}
      {activeStep === null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg border border-white/10 text-center"
        >
          <h3 className="text-xl font-medium text-white mb-4">Our Web Development Timeline</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our proven development process typically takes 4-8 weeks from start to finish, 
            <strong> depending on project complexity</strong>. Each phase is carefully executed to ensure
            your website meets the highest standards of design, functionality, and performance.
            Click on each step above to learn more about our process.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedWebDevelopmentProcess;