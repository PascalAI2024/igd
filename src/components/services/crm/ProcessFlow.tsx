import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Database, Users, Zap, ChevronRight, 
  Settings, Shield, CheckCircle, LucideIcon,
  FileText, BookOpen, MessageSquare
} from 'lucide-react';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  details: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const steps: Step[] = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your business needs and processes',
    duration: '1-2 days',
    details: [
      { title: 'Requirements', description: 'Business process analysis', icon: FileText },
      { title: 'Data Review', description: 'Current system evaluation', icon: Database },
      { title: 'Goals', description: 'Success metrics definition', icon: CheckCircle }
    ],
    metrics: [
      { label: 'Processes Mapped', value: '100%' },
      { label: 'Data Points', value: '50+' },
      { label: 'Requirements', value: 'Clear' }
    ]
  },
  {
    icon: Settings,
    title: 'Setup & Configuration',
    description: 'Customizing your CRM system for optimal performance',
    duration: '2-3 days',
    details: [
      { title: 'System Setup', description: 'CRM platform configuration', icon: Settings },
      { title: 'Data Migration', description: 'Clean data transfer', icon: Database },
      { title: 'Integration', description: 'Third-party connections', icon: Zap }
    ],
    metrics: [
      { label: 'Accuracy', value: '100%' },
      { label: 'Integrations', value: '5+' },
      { label: 'Data Quality', value: '99.9%' }
    ]
  },
  {
    icon: BookOpen,
    title: 'Training',
    description: 'Comprehensive team training and documentation',
    duration: '1-2 days',
    details: [
      { title: 'User Training', description: 'Hands-on system training', icon: Users },
      { title: 'Documentation', description: 'Process guidelines', icon: FileText },
      { title: 'Support', description: '24/7 assistance setup', icon: MessageSquare }
    ],
    metrics: [
      { label: 'Team Trained', value: '100%' },
      { label: 'Resources', value: 'Complete' },
      { label: 'Support', value: '24/7' }
    ]
  },
  {
    icon: Zap,
    title: 'Launch & Optimization',
    description: 'System launch and continuous improvement',
    duration: 'Ongoing',
    details: [
      { title: 'Launch', description: 'System go-live', icon: Zap },
      { title: 'Monitoring', description: 'Performance tracking', icon: Shield },
      { title: 'Optimization', description: 'Continuous improvement', icon: Settings }
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '< 1hr' },
      { label: 'Satisfaction', value: '95%' }
    ]
  }
];

const ProcessFlow = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  // Animated connection line
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw base line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.lineWidth = 2;
      ctx.moveTo(0, canvas.offsetHeight / 2);
      ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight / 2);
      ctx.stroke();

      // Draw animated line
      if (hoveredStep !== null) {
        const startX = (canvas.offsetWidth / steps.length) * hoveredStep;
        const endX = (canvas.offsetWidth / steps.length) * (hoveredStep + 1);
        
        progress = Math.min(progress + 0.05, 1);
        
        const gradient = ctx.createLinearGradient(startX, 0, endX, 0);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.2)');
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(startX, canvas.offsetHeight / 2);
        ctx.lineTo(startX + (endX - startX) * progress, canvas.offsetHeight / 2);
        ctx.stroke();
      } else {
        progress = 0;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hoveredStep]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative">
      {/* Connection Lines */}
      <canvas
        ref={canvasRef}
        className="absolute top-1/2 left-0 w-full h-0.5 transform -translate-y-1/2 hidden md:block"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={stepVariants}
            className="relative"
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            onClick={() => setActiveStep(activeStep === index ? null : index)}
          >
            <motion.div
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border overflow-hidden cursor-pointer
                ${activeStep === index ? 'border-red-500/50' : 'border-white/10 hover:border-red-500/20'}`}
              whileHover={{ scale: 1.02 }}
              animate={activeStep === index ? { y: -10 } : { y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={
                  activeStep === index || hoveredStep === index
                    ? {
                        background: [
                          "radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
                          "radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)"
                        ],
                        transition: { duration: 4, repeat: Infinity }
                      }
                    : {}
                }
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-red-400/50 to-transparent"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <step.icon className="w-full h-full text-white relative z-10" />
                  </motion.div>
                  <motion.div
                    animate={activeStep === index ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>

                <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <motion.div
                  className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="w-2 h-2 bg-red-500 rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  {step.duration}
                </motion.div>

                {/* Expandable Content */}
                <AnimatePresence mode="wait">
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        height: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        },
                        opacity: { duration: 0.2 }
                      }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      {/* Details */}
                      <div className="space-y-3 mb-4">
                        {step.details.map((detail, detailIndex) => (
                          <motion.div
                            key={detail.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                              delay: detailIndex * 0.1
                            }}
                            className="flex items-start"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <detail.icon className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                            </motion.div>
                            <div>
                              <div className="text-sm font-semibold text-white">{detail.title}</div>
                              <div className="text-sm text-gray-400">{detail.description}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2">
                        {step.metrics.map((metric, metricIndex) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                              delay: 0.3 + (metricIndex * 0.1)
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <div className="relative p-2 bg-white/5 rounded-lg">
                              <div className="text-sm font-bold text-red-500">{metric.value}</div>
                              <div className="text-xs text-gray-400">{metric.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
      </motion.div>
    </div>
  );
};

export default ProcessFlow;
