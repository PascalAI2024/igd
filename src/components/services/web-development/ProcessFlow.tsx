import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Layout, Zap, Rocket, ChevronRight, CheckCircle, Clock, Users,
  Shield, Search, BarChart, Smartphone, Activity, LucideIcon
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
    icon: LucideIcon;
  }[];
}

const steps: Step[] = [
  {
    icon: Layout,
    title: 'Design',
    description: 'User-centric design process focusing on conversion and engagement',
    duration: '2-3 weeks',
    details: [
      { title: 'Wireframing', description: 'Layout planning and user flow mapping', icon: Layout },
      { title: 'UI Design', description: 'Visual design and branding integration', icon: Users },
      { title: 'UX Review', description: 'Usability testing and optimization', icon: CheckCircle }
    ],
    metrics: [
      { label: 'Conversion Rate', value: '+45%', icon: Zap },
      { label: 'User Engagement', value: '+60%', icon: Users },
      { label: 'Design Iterations', value: '3-4', icon: Clock }
    ]
  },
  {
    icon: Code2,
    title: 'Development',
    description: 'Clean, efficient code following best practices and modern standards',
    duration: '4-8 weeks',
    details: [
      { title: 'Frontend', description: 'Responsive and interactive UI implementation', icon: Layout },
      { title: 'Backend', description: 'Server-side logic and API development', icon: Code2 },
      { title: 'Integration', description: 'Third-party services and APIs', icon: Zap }
    ],
    metrics: [
      { label: 'Code Quality', value: '95%', icon: CheckCircle },
      { label: 'Test Coverage', value: '100%', icon: Shield },
      { label: 'Performance', value: '98/100', icon: Zap }
    ]
  },
  {
    icon: Zap,
    title: 'Optimization',
    description: 'Performance tuning for lightning-fast load times and smooth interactions',
    duration: '1-2 weeks',
    details: [
      { title: 'Speed', description: 'Load time and performance optimization', icon: Zap },
      { title: 'SEO', description: 'Search engine optimization setup', icon: Search },
      { title: 'Analytics', description: 'Tracking and reporting setup', icon: BarChart }
    ],
    metrics: [
      { label: 'Page Speed', value: '<3s', icon: Zap },
      { label: 'SEO Score', value: '95+', icon: Search },
      { label: 'Mobile Score', value: '98/100', icon: Smartphone }
    ]
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Thorough testing and seamless deployment to production',
    duration: '1 week',
    details: [
      { title: 'Testing', description: 'Quality assurance and bug fixing', icon: CheckCircle },
      { title: 'Deployment', description: 'Production environment setup', icon: Rocket },
      { title: 'Monitoring', description: 'Performance and uptime monitoring', icon: Activity }
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%', icon: Activity },
      { label: 'Bug Rate', value: '<0.1%', icon: Shield },
      { label: 'Response Time', value: '<100ms', icon: Clock }
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
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer
                ${activeStep === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
              whileHover={{ scale: 1.02 }}
              animate={activeStep === index ? { y: -10 } : { y: 0 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep === index || hoveredStep === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-purple-500/5"
                  animate={{
                    opacity: [0, 1, 0],
                    transition: { duration: 3, repeat: Infinity }
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-full h-full text-white" />
                  </motion.div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      activeStep === index ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-red-500" />
                  {step.duration}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {step.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="text-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <metric.icon className="w-4 h-4 text-red-500 mx-auto mb-1" />
                      <div className="text-sm font-bold text-red-500">{metric.value}</div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detail.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-start mb-3 last:mb-0"
                        >
                          <detail.icon className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-white">{detail.title}</div>
                            <div className="text-sm text-gray-400">{detail.description}</div>
                          </div>
                        </motion.div>
                      ))}
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
      </div>
    </div>
  );
};

export default ProcessFlow;
