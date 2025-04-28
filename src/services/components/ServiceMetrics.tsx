import React from 'react';
import { motion } from 'framer-motion';
import { Metric } from '../types';

interface ServiceMetricsProps {
  metrics: Metric[];
  isActive: boolean;
}

export const ServiceMetrics: React.FC<ServiceMetricsProps> = ({ metrics, isActive }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric, i) => (
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
  );
};