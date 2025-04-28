import React from 'react';
import { motion } from 'framer-motion';
import NavigationButton from './NavigationButton';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  return (
    <NavigationButton 
      to="/" 
      className={`block ${className}`} 
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-3"
      >
        {/* Logo Image */}
        <div className="relative w-8 h-8">
          <img 
            src="/iconlogo.png" 
            alt="Ingenious Digital"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Company Name */}
        <div>
          <div className="text-xl font-bold">
            <span className="text-[#ff3d3d]">Ingenious</span>
            <span className="text-white">Digital</span>
          </div>
        </div>
      </motion.div>
    </NavigationButton>
  );
};

export default Logo;
