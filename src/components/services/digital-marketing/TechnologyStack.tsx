import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart, Target, Globe, Users, Mail, MessageSquare, LineChart } from 'lucide-react';

const tools = [
  {
    icon: Search,
    name: 'Google Business Profile',
    description: 'Local business presence optimization',
    category: 'Local SEO'
  },
  {
    icon: BarChart,
    name: 'Google Analytics',
    description: 'Performance tracking and insights',
    category: 'Analytics'
  },
  {
    icon: Target,
    name: 'Google Ads',
    description: 'Targeted local advertising',
    category: 'Advertising'
  },
  {
    icon: Globe,
    name: 'SEMrush',
    description: 'SEO and competitor analysis',
    category: 'SEO'
  },
  {
    icon: Users,
    name: 'Social Media Suite',
    description: 'Social media management',
    category: 'Social'
  },
  {
    icon: Mail,
    name: 'Email Marketing',
    description: 'Customer engagement automation',
    category: 'Marketing'
  },
  {
    icon: MessageSquare,
    name: 'Review Management',
    description: 'Online reputation monitoring',
    category: 'Reputation'
  },
  {
    icon: LineChart,
    name: 'Reporting Dashboard',
    description: 'Real-time performance metrics',
    category: 'Analytics'
  }
];

const TechnologyStack = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300">
              <tool.icon className="w-full h-full text-white" />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gradient">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-400">
                {tool.description}
              </p>
            </div>

            <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
              {tool.category}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TechnologyStack;
