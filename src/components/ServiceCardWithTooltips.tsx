import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Info, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from './ui/Tooltip';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string; tooltip?: string }[];
  path: string;
  color: string;
  index: number;
  pricing?: {
    starting: string;
    note?: string;
  };
  timeframe?: string;
  popularFeatures?: string[];
}

const ServiceCardWithTooltips: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  metrics,
  path,
  color,
  index,
  pricing,
  timeframe,
  popularFeatures = []
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={path} className="block h-full">
        <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-red-500/30 transition-all duration-300 overflow-hidden">
          {/* Background gradient effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Popular badge */}
          {popularFeatures.includes(title) && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Popular
            </div>
          )}

          <div className="relative">
            {/* Icon */}
            <div className="mb-6">
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
              {title}
              <Tooltip 
                content={`Learn more about our ${title.toLowerCase()} services and how they can help your business grow`}
                variant="info"
              >
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </Tooltip>
            </h3>
            <p className="text-gray-400 mb-6">{description}</p>

            {/* Pricing and Timeframe */}
            {(pricing || timeframe) && (
              <div className="flex items-center gap-4 mb-6 text-sm">
                {pricing && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">
                      Starting at {pricing.starting}
                      {pricing.note && (
                        <Tooltip content={pricing.note} variant="help">
                          <span className="text-xs text-gray-500 ml-1 cursor-help">*</span>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                )}
                {timeframe && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-300">{timeframe}</span>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Features</h4>
              <ul className="space-y-2">
                {features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {feature}
                      {getFeatureTooltip(feature) && (
                        <Tooltip content={getFeatureTooltip(feature)} variant="help">
                          <Info className="inline-block w-3 h-3 text-gray-500 ml-1 cursor-help" />
                        </Tooltip>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <Tooltip 
                    content={metric.tooltip || `Our average ${metric.label.toLowerCase()} performance`}
                    variant="info"
                  >
                    <div className="cursor-help">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400">{metric.label}</div>
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center text-red-500 font-semibold group/cta"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              <span className="mr-2">Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform" />
            </motion.div>
          </div>

          {/* Hover effect border */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${color.includes('red') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 100%)`
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// Helper function to get tooltips for specific features
function getFeatureTooltip(feature: string): string {
  const tooltips: Record<string, string> = {
    'Local SEO Optimization': 'Improve your visibility in local search results and Google Maps',
    'Google Business Profile': 'Manage and optimize your Google Business listing for maximum exposure',
    'High Level Integration': 'All-in-one CRM and marketing automation platform',
    'Bitrix24 Implementation': 'Comprehensive business management suite with CRM, tasks, and communication',
    'Custom Websites': 'Tailored design and functionality specific to your business needs',
    'Marketing Automation': 'Set up automated email campaigns, follow-ups, and lead nurturing',
    'Performance Tracking': 'Real-time analytics to measure campaign effectiveness',
    'AI & Automation': 'Leverage artificial intelligence to streamline repetitive tasks',
  };

  return tooltips[feature] || '';
}

export default ServiceCardWithTooltips;