import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 text-center"
    >
      <div className="inline-block">
        <Link
          to="/contact"
          className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-medium overflow-hidden shadow-lg hover:shadow-red-500/25 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center">
            Start Your Project
            <motion.span
              className="ml-2"
              animate={{ x: 5 }}
              transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCTA;