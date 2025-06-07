import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import NavigationButton from './NavigationButton';
import { trackServiceView, trackInteraction } from '../utils/analytics';
import { InteractiveWrapper, RevealOnScroll } from './AnimationWrappers';
import animationSystem from '../styles/animation-system';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string }[];
  path: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  metrics,
  path,
  color
}) => {
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

  return (
    <RevealOnScroll>
      <InteractiveWrapper
        hoverType="lift"
        tapType="press"
        className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 transition-shadow duration-300 will-change-transform"
      >
        <div
          id={`service-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
      {/* Header */}
      <div className={`bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-center">
          <Icon className="w-8 h-8 text-white" />
          <h3 className="text-xl font-bold text-white ml-3">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <InteractiveWrapper
                hoverType="scale"
                tapType="scale"
                className="text-center cursor-pointer"
              >
                <div onClick={() => handleMetricClick(metric)}>
                  <div className="text-xl font-bold text-white">{metric.value}</div>
                  <div className="text-xs text-gray-400">{metric.label}</div>
                </div>
              </InteractiveWrapper>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.slice(0, 4).map((feature) => (
            <motion.div
              key={feature}
              className="flex items-center text-sm text-gray-300 cursor-pointer transition-transform duration-200"
              whileHover={{ x: 5 }}
              onClick={() => handleFeatureClick(feature)}
              style={{ willChange: 'transform' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              {feature}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <NavigationButton
          to={path}
          className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors duration-200"
        >
          Learn More
          <ArrowRight className="w-4 h-4 ml-1" />
        </NavigationButton>
        </div>
        </div>
      </InteractiveWrapper>
    </RevealOnScroll>
  );
};

export default ServiceCard;
