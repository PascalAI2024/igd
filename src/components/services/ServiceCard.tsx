import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
}

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
    metrics: Metric[];
    path: string;
    color: string;
  };
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isActive, onHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      className="group relative"
    >
      <div className="relative bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 h-full overflow-hidden transition-all duration-300 hover:border-red-500/20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <service.icon className={`w-12 h-12 text-red-500 transition-transform duration-300 group-hover:scale-110`} />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gradient">
            {service.title}
          </h3>

          <p className="text-gray-400 mb-6">
            {service.description}
          </p>

          <div className="space-y-6">
            {/* Features */}
            <div className="space-y-2">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isActive ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center text-gray-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {service.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-red-500">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                to={service.path}
                className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
              >
                Learn More
                <motion.span
                  className="ml-2"
                  animate={{ x: isActive ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;