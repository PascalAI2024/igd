import React from 'react';
import { motion } from 'framer-motion';
import { ServicesGrid } from './ServicesGrid';
import ServiceCTA from './ServiceCTA';
import { SERVICES } from '../constants';
import { useServiceAnimation } from '../hooks/useServiceAnimation';

export const ServicesSection: React.FC = () => {
  const { activeService, handleHover } = useServiceAnimation();

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Our Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your digital presence with our comprehensive suite of services
            </p>
          </motion.div>
        </div>

        <ServicesGrid
          services={SERVICES}
          activeService={activeService}
          onHover={handleHover}
        />

        <ServiceCTA to="/contact" />
      </div>
    </section>
  );
};
