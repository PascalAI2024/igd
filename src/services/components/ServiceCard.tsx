import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServiceBase } from '../types';
import { ServiceFeatures } from './ServiceFeatures';
import { ServiceMetrics } from './ServiceMetrics';

interface ServiceCardProps {
  service: ServiceBase;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  index, 
  isActive, 
  onHover 
}) => {
  const Icon = service.icon;

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
        {/* Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Icon className="w-12 h-12 text-red-500 mb-6 transform group-hover:scale-110 transition-transform duration-300" />
          
          <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gradient">
            {service.title}
          </h3>

          <p className="text-gray-400 mb-6">{service.description}</p>

          <div className="space-y-6">
            <ServiceFeatures features={service.features} isActive={isActive} />
            <ServiceMetrics metrics={service.metrics} isActive={isActive} />

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