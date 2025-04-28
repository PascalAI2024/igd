import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Settings, Workflow,
  Database, Bot, CheckCircle
} from 'lucide-react';

const steps = [
  {
    title: 'Analysis',
    description: 'Understanding your business processes.',
    icon: Search,
    details: [
      'Process Mapping',
      'Efficiency Analysis',
      'Pain Point Identification',
      'Opportunity Assessment'
    ]
  },
  {
    title: 'Design',
    description: 'Creating automation solutions.',
    icon: Settings,
    details: [
      'Solution Architecture',
      'Workflow Design',
      'Integration Planning',
      'System Requirements'
    ]
  },
  {
    title: 'Development',
    description: 'Building automation systems.',
    icon: Workflow,
    details: [
      'Custom Development',
      'Integration Setup',
      'Workflow Creation',
      'Testing Environment'
    ]
  },
  {
    title: 'Data Migration',
    description: 'Transferring and organizing data.',
    icon: Database,
    details: [
      'Data Transfer',
      'Data Validation',
      'System Integration',
      'Quality Checks'
    ]
  },
  {
    title: 'Implementation',
    description: 'Deploying automation solutions.',
    icon: Bot,
    details: [
      'System Deployment',
      'User Training',
      'Process Testing',
      'Performance Monitoring'
    ]
  },
  {
    title: 'Optimization',
    description: 'Continuous improvement and support.',
    icon: CheckCircle,
    details: [
      'Performance Analysis',
      'System Updates',
      'Process Refinement',
      'Ongoing Support'
    ]
  }
];

const ProcessFlow = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">Step {index + 1}</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4">{step.description}</p>
            
            <ul className="space-y-2">
              {step.details.map((detail) => (
                <li key={detail} className="flex items-center text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-red-500/20 to-transparent transform translate-y-[-50%]" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessFlow;
