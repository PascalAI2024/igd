import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NavigationButton from '../../components/NavigationButton';

interface ServiceCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  to: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = "Ready to Get Started?",
  description = "Let's discuss how we can help transform your business.",
  buttonText = "Contact Us",
  to
}) => {
  return (
    <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gradient mb-4">
          {title}
        </h3>
        <p className="text-gray-300 mb-6">
          {description}
        </p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavigationButton
            to={to}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium overflow-hidden shadow-lg hover:shadow-red-500/25 transition-all duration-300"
          >
            <span className="flex items-center">
              {buttonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </span>
          </NavigationButton>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceCTA;
