import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Users, BarChart2,
  Monitor, Settings, Cloud
} from 'lucide-react';

const technologies = [
  {
    category: 'Search Platforms',
    icon: Search,
    items: [
      'Google Ads',
      'Bing Ads',
      'Shopping Campaigns',
      'Display Network',
      'Search Console',
      'Keyword Planner'
    ]
  },
  {
    category: 'Social Platforms',
    icon: Users,
    items: [
      'Facebook Ads Manager',
      'Instagram Ads',
      'LinkedIn Campaign Manager',
      'Twitter Ads',
      'TikTok Ads',
      'Pinterest Ads'
    ]
  },
  {
    category: 'Analytics Tools',
    icon: BarChart2,
    items: [
      'Google Analytics',
      'Facebook Pixel',
      'Conversion Tracking',
      'Heat Mapping',
      'A/B Testing Tools',
      'Attribution Models'
    ]
  },
  {
    category: 'Management Tools',
    icon: Settings,
    items: [
      'Campaign Management',
      'Bid Management',
      'Budget Control',
      'Automation Rules',
      'Scheduling Tools',
      'Alert Systems'
    ]
  },
  {
    category: 'Reporting Tools',
    icon: Monitor,
    items: [
      'Data Studio',
      'Custom Dashboards',
      'Performance Reports',
      'ROI Analysis',
      'Competitive Analysis',
      'Insight Generation'
    ]
  },
  {
    category: 'Integration Tools',
    icon: Cloud,
    items: [
      'CRM Integration',
      'API Connections',
      'Data Import/Export',
      'Cross-Platform Tracking',
      'Tag Management',
      'Marketing Stack'
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
