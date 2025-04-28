import React from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, FileText, Settings,
  Database, Bot, Cloud
} from 'lucide-react';

const features = [
  {
    title: 'Workflow Automation',
    description: 'Streamline business processes.',
    icon: Workflow,
    details: [
      'Process Mapping',
      'Task Automation',
      'Approval Flows',
      'Status Tracking'
    ]
  },
  {
    title: 'Document Management',
    description: 'Automated document processing.',
    icon: FileText,
    details: [
      'Document Processing',
      'Data Extraction',
      'Version Control',
      'Digital Storage'
    ]
  },
  {
    title: 'System Integration',
    description: 'Connect business systems.',
    icon: Settings,
    details: [
      'API Integration',
      'Data Synchronization',
      'Custom Workflows',
      'Real-time Updates'
    ]
  },
  {
    title: 'Data Management',
    description: 'Efficient data handling.',
    icon: Database,
    details: [
      'Data Collection',
      'Processing Rules',
      'Data Validation',
      'Reporting Tools'
    ]
  },
  {
    title: 'Smart Automation',
    description: 'AI-powered automation.',
    icon: Bot,
    details: [
      'Machine Learning',
      'Pattern Recognition',
      'Predictive Analysis',
      'Smart Decisions'
    ]
  },
  {
    title: 'Cloud Integration',
    description: 'Cloud-based automation.',
    icon: Cloud,
    details: [
      'Cloud Services',
      'Remote Access',
      'Data Backup',
      'Scalable Solutions'
    ]
  }
];

const FeatureShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
        >
          <feature.icon className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient">{feature.title}</h3>
          <p className="text-gray-400 mb-4">{feature.description}</p>
          
          <ul className="space-y-2">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-center text-sm text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureShowcase;
