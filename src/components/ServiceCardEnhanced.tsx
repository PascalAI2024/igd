import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LucideIcon, ChevronDown } from 'lucide-react';
import NavigationButton from './NavigationButton';
import { trackServiceView, trackInteraction } from '../utils/analytics';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string }[];
  path: string;
  color: string;
  index?: number;
}

const ServiceCardEnhanced: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  metrics,
  path,
  color,
  index = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Track service card impression when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackServiceView(title, path.split('/').pop() || 'unknown');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title, path]);

  const handleFeatureClick = (feature: string) => {
    trackInteraction(
      'service-feature',
      `feature-${feature.toLowerCase().replace(/\s+/g, '-')}`,
      `view_${title.toLowerCase().replace(/\s+/g, '_')}`
    );
  };

  const handleMetricClick = (metric: { value: string; label: string }) => {
    trackInteraction(
      'service-metric',
      `metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`,
      `view_${title.toLowerCase().replace(/\s+/g, '_')}`
    );
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Extract the gradient colors from the color string
  const gradientClass = color.includes('from-') ? color : `from-${color.split(' ')[0]} to-${color.split(' ')[1]}`;

  return (
    <motion.div
      id={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Background glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`absolute -inset-2 rounded-xl z-0`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-20 blur-xl`} />
            <div className="absolute inset-0 bg-black opacity-40 rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="card-premium h-full flex flex-col"
        animate={{
          y: isHovered ? -5 : 0,
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 20px rgba(255, 0, 0, 0.1)'
            : '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Header */}
        <div className={`card-premium-header bg-gradient-to-r ${gradientClass}`}>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white ml-4">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="card-premium-content flex-grow flex flex-col">
          {/* Description */}
          <p className="text-gray-300 mb-6">{description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center cursor-pointer relative group/metric"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleMetricClick(metric)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (i * 0.1) }}
              >
                <div className={`text-xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{metric.value}</div>
                <div className="text-xs text-gray-400 mt-1">{metric.label}</div>

                {/* Enhanced highlight on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-white/0 group-hover/metric:border-white/10 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)',
                  }}
                  whileHover={{
                    boxShadow: '0 0 15px rgba(255, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                  }}
                  layoutId={`metric-highlight-${title}-${metric.label}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3 mb-6 flex-grow">
            {features.slice(0, isExpanded ? features.length : 3).map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center text-sm text-gray-300 cursor-pointer group/feature relative"
                whileHover={{ x: 5 }}
                onClick={() => handleFeatureClick(feature)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
              >
                <div className="absolute left-0 w-0 h-full border-l border-red-500/0 group-hover/feature:border-red-500/30 transition-all duration-300"></div>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientClass} mr-3 ml-2`} />
                <span className="group-hover/feature:text-white transition-colors">{feature}</span>
              </motion.div>
            ))}

            {features.length > 3 && (
              <motion.button
                onClick={toggleExpand}
                className="flex items-center text-sm text-gray-400 hover:text-white mt-3 transition-colors border border-white/5 rounded-md px-3 py-1.5 bg-black/20 hover:bg-black/40 hover:border-white/10"
                whileHover={{ x: 5 }}
              >
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
                {isExpanded ? 'Show less' : `${features.length - 3} more features`}
              </motion.button>
            )}
          </div>

          {/* CTA */}
          <NavigationButton
            to={path}
            className="btn-premium inline-flex items-center px-5 py-2.5 rounded-lg text-white mt-auto w-full justify-center"
          >
            <span className="text-premium">Learn More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </NavigationButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCardEnhanced;
