import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layout, Palette, Zap, Server, CheckCircle, ChevronRight } from 'lucide-react';

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  tasks: {
    name: string;
    duration: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
}

interface InteractiveProcessProps {
  title: string;
  description: string;
  animationDelay?: number;
}

const InteractiveProcess: React.FC<InteractiveProcessProps> = ({
  title,
  description,
  animationDelay = 0.3
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const processSteps: ProcessStep[] = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Design",
      description: "Creating the visual blueprint of your website",
      color: "#3B82F6", // Blue
      tasks: [
        { name: "Wireframing", duration: "3 days", status: 'completed' },
        { name: "UI Design", duration: "5 days", status: 'completed' },
        { name: "Client Review", duration: "2 days", status: 'completed' },
        { name: "Design Revisions", duration: "3 days", status: 'completed' }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Development",
      description: "Building the functional structure of your website",
      color: "#10B981", // Green
      tasks: [
        { name: "Frontend Development", duration: "7 days", status: 'completed' },
        { name: "Backend Integration", duration: "5 days", status: 'completed' },
        { name: "Responsive Implementation", duration: "3 days", status: 'completed' },
        { name: "Content Integration", duration: "2 days", status: 'in-progress' }
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Optimization",
      description: "Enhancing performance and user experience",
      color: "#F59E0B", // Amber
      tasks: [
        { name: "Performance Audit", duration: "2 days", status: 'pending' },
        { name: "SEO Implementation", duration: "3 days", status: 'pending' },
        { name: "Speed Optimization", duration: "2 days", status: 'pending' },
        { name: "Cross-browser Testing", duration: "2 days", status: 'pending' }
      ]
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Deployment",
      description: "Launching your website to the world",
      color: "#EC4899", // Pink
      tasks: [
        { name: "Server Setup", duration: "1 day", status: 'pending' },
        { name: "Domain Configuration", duration: "1 day", status: 'pending' },
        { name: "SSL Implementation", duration: "1 day", status: 'pending' },
        { name: "Final Testing", duration: "2 days", status: 'pending' }
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Launch",
      description: "Your website goes live with ongoing support",
      color: "#8B5CF6", // Purple
      tasks: [
        { name: "Go Live", duration: "1 day", status: 'pending' },
        { name: "Post-launch Testing", duration: "2 days", status: 'pending' },
        { name: "Analytics Setup", duration: "1 day", status: 'pending' },
        { name: "Handover & Training", duration: "2 days", status: 'pending' }
      ]
    }
  ];
  
  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setActiveStep((prevStep) => (prevStep + 1) % processSteps.length);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, processSteps.length]);
  
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
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
      
      {/* Process Timeline */}
      <div className="relative mb-8">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-800 transform -translate-y-1/2 rounded-full"></div>
        
        <div className="relative flex justify-between">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: animationDelay + (index * 0.1) }}
              className="relative z-10"
            >
              <button
                onClick={() => handleStepClick(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index < activeStep 
                    ? 'bg-gray-700 text-white' 
                    : index === activeStep 
                      ? 'bg-gradient-to-br shadow-lg' 
                      : 'bg-gray-800 text-gray-500'
                }`}
                style={{
                  backgroundImage: index === activeStep ? `linear-gradient(to bottom right, ${processSteps[activeStep].color}, ${processSteps[activeStep].color}90)` : 'none',
                  boxShadow: index === activeStep ? `0 0 20px ${processSteps[activeStep].color}50` : 'none'
                }}
              >
                {index < activeStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  step.icon
                )}
              </button>
              
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max">
                <p className={`text-sm font-medium ${
                  index === activeStep ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Active Step Details */}
      <div className="bg-black/30 rounded-xl p-6 mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: `${processSteps[activeStep].color}20` }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: processSteps[activeStep].color }}
                >
                  {processSteps[activeStep].icon}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold" style={{ color: processSteps[activeStep].color }}>
                  {processSteps[activeStep].title}
                </h4>
                <p className="text-gray-400">{processSteps[activeStep].description}</p>
              </div>
              
              <button
                onClick={togglePlayPause}
                className="ml-auto p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-800 rounded-full mb-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: processSteps[activeStep].color }}
                animate={{ width: `${isPlaying ? progress : 0}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Tasks */}
            <div className="grid grid-cols-2 gap-4">
              {processSteps[activeStep].tasks.map((task, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-white">{task.name}</h5>
                    <span className="text-sm text-gray-400">{task.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className={`w-3 h-3 rounded-full mr-2 ${
                        task.status === 'completed' 
                          ? 'bg-green-500' 
                          : task.status === 'in-progress' 
                            ? 'bg-yellow-500' 
                            : 'bg-gray-500'
                      }`}
                    />
                    <span 
                      className={`text-sm ${
                        task.status === 'completed' 
                          ? 'text-green-500' 
                          : task.status === 'in-progress' 
                            ? 'text-yellow-500' 
                            : 'text-gray-500'
                      }`}
                    >
                      {task.status === 'completed' 
                        ? 'Completed' 
                        : task.status === 'in-progress' 
                          ? 'In Progress' 
                          : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => handleStepClick((activeStep - 1 + processSteps.length) % processSteps.length)}
          className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          disabled={activeStep === 0}
        >
          <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-180 mr-1" />
          <span className="text-gray-400">Previous</span>
        </button>
        
        <button
          onClick={() => handleStepClick((activeStep + 1) % processSteps.length)}
          className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          disabled={activeStep === processSteps.length - 1}
        >
          <span className="text-gray-400">Next</span>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default InteractiveProcess;
