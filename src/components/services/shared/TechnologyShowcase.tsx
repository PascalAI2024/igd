import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../../OptimizedImage';

interface Technology {
  name: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  features?: string[];
  color?: string;
}

interface TechnologyShowcaseProps {
  title: string;
  description: string;
  technologies: Technology[];
  columns?: 2 | 3 | 4;
  animationDelay?: number;
}

const TechnologyShowcase: React.FC<TechnologyShowcaseProps> = ({
  title,
  description,
  technologies,
  columns = 3,
  animationDelay = 0.3
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: animationDelay + (index * 0.1) }}
            whileHover={{ y: -5 }}
            className="bg-black/30 rounded-lg overflow-hidden border border-white/5 group"
          >
            {/* Image if provided */}
            {tech.image && (
              <div className="h-40 overflow-hidden">
                <OptimizedImage
                  src={tech.image}
                  alt={tech.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  fallbackClassName="bg-gradient-to-br from-red-900/20 to-purple-900/20 w-full h-full flex items-center justify-center"
                />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center mb-2">
                {tech.icon && (
                  <div className="mr-2 text-red-500">{tech.icon}</div>
                )}
                <h4 className="text-lg font-semibold" style={{ color: tech.color || 'white' }}>
                  {tech.name}
                </h4>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{tech.description}</p>
              
              {tech.features && tech.features.length > 0 && (
                <ul className="space-y-1">
                  {tech.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 rounded-lg transition-colors duration-300" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechnologyShowcase;
