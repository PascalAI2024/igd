import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackInteraction } from '../utils/analytics';

interface FloatingContactIconsProps {
  isMobileMenuOpen?: boolean;
}

const FloatingContactIcons: React.FC<FloatingContactIconsProps> = ({ isMobileMenuOpen = false }) => {
  const handlePhoneClick = () => {
    trackInteraction(
      'contact-button',
      'floating-phone',
      'phone_call'
    );
  };

  const handleEmailClick = () => {
    trackInteraction(
      'contact-button',
      'floating-email',
      'email_click'
    );
  };

  const handleDirectionsClick = () => {
    trackInteraction(
      'contact-button',
      'floating-directions',
      'get_directions'
    );
  };

  return (
    <AnimatePresence>
      {!isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 bottom-6 z-40 flex flex-col gap-4"
        >
          <motion.a
            href="tel:+19545158586"
            onClick={handlePhoneClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative bg-red-500 p-3 rounded-full shadow-lg hover:shadow-red-500/25 transition-shadow"
          >
            <Phone className="w-6 h-6 text-white" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              (954) 515-8586
            </span>
          </motion.a>

          <motion.a
            href="mailto:pascal@ingeniousdigital.com"
            onClick={handleEmailClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative bg-red-500 p-3 rounded-full shadow-lg hover:shadow-red-500/25 transition-shadow"
          >
            <Mail className="w-6 h-6 text-white" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Email Us
            </span>
          </motion.a>

          <motion.a
            href="https://www.google.com/maps/dir//Fort+Lauderdale,+FL+33304"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirectionsClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative bg-red-500 p-3 rounded-full shadow-lg hover:shadow-red-500/25 transition-shadow"
          >
            <MapPin className="w-6 h-6 text-white" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/90 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity md:block hidden">
              Get Directions
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContactIcons;
