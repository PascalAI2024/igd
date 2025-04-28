import React from 'react';
import { motion } from 'framer-motion';

interface ServiceFeaturesProps {
  features: string[];
  isActive: boolean;
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features, isActive }) => {
  return (
    <div className="space-y-2">
      {features.map((feature, i) => (
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
  );
};