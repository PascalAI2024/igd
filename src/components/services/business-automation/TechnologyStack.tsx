import React from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, FileText, Database,
  Cloud, Bot, Settings
} from 'lucide-react';

const technologies = [
  {
    category: 'Workflow Tools',
    icon: Workflow,
    items: [
      'Process Automation',
      'Task Management',
      'Workflow Designer',
      'Business Rules Engine',
      'Process Monitoring',
      'Automation Scripts'
    ]
  },
  {
    category: 'Document Systems',
    icon: FileText,
    items: [
      'Document Processing',
      'OCR Technology',
      'Digital Forms',
      'Template Management',
      'Document Storage',
      'Version Control'
    ]
  },
  {
    category: 'Data Management',
    icon: Database,
    items: [
      'Data Integration',
      'ETL Tools',
      'Data Validation',
      'Database Systems',
      'Data Warehousing',
      'Analytics Tools'
    ]
  },
  {
    category: 'Cloud Services',
    icon: Cloud,
    items: [
      'Cloud Integration',
      'SaaS Solutions',
      'Cloud Storage',
      'API Services',
      'Serverless Functions',
      'Cloud Security'
    ]
  },
  {
    category: 'AI & ML Tools',
    icon: Bot,
    items: [
      'Machine Learning',
      'Natural Language Processing',
      'Predictive Analytics',
      'Pattern Recognition',
      'Decision Systems',
      'AI Automation'
    ]
  },
  {
    category: 'Integration Tools',
    icon: Settings,
    items: [
      'API Management',
      'System Integration',
      'Data Connectors',
      'Middleware',
      'Custom Adapters',
      'Integration Platform'
    ]
  }
];

const TechnologyStack = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
        >
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
              <tech.icon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
              {tech.category}
            </h3>
          </div>

          <ul className="space-y-3">
            {tech.items.map((item) => (
              <li key={item} className="flex items-center text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default TechnologyStack;
