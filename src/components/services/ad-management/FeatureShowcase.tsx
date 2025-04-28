import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Search, BarChart2, Users,
  DollarSign, LineChart
} from 'lucide-react';

const features = [
  {
    title: 'Search Advertising',
    description: 'Targeted Google Ads campaigns.',
    icon: Search,
    details: [
      'Keyword Research',
      'Ad Copy Optimization',
      'Landing Pages',
      'Quality Score Management'
    ]
  },
  {
    title: 'Social Media Ads',
    description: 'Engaging social platform campaigns.',
    icon: Users,
    details: [
      'Facebook Ads',
      'Instagram Campaigns',
      'LinkedIn Advertising',
      'Audience Targeting'
    ]
  },
  {
    title: 'Display Advertising',
    description: 'Visual ads across the web.',
    icon: Target,
    details: [
      'Banner Design',
      'Retargeting',
      'Placement Strategy',
      'Brand Awareness'
    ]
  },
  {
    title: 'Performance Tracking',
    description: 'Comprehensive analytics and reporting.',
    icon: BarChart2,
    details: [
      'Conversion Tracking',
      'ROI Analysis',
      'A/B Testing',
      'Performance Reports'
    ]
  },
  {
    title: 'Budget Management',
    description: 'Efficient ad spend optimization.',
    icon: DollarSign,
    details: [
      'Budget Allocation',
      'Bid Management',
      'Cost Optimization',
      'ROAS Tracking'
    ]
  },
  {
    title: 'Campaign Analytics',
    description: 'Data-driven campaign insights.',
    icon: LineChart,
    details: [
      'Performance Metrics',
      'Audience Insights',
      'Campaign Analysis',
      'Optimization Reports'
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
