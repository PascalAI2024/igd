import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet, Maximize, Minimize } from 'lucide-react';
import OptimizedImage from '../../OptimizedImage';

interface WebsiteVisualizerProps {
  title: string;
  description: string;
  websiteScreenshots: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  features?: string[];
  animationDelay?: number;
}

const WebsiteVisualizer: React.FC<WebsiteVisualizerProps> = ({
  title,
  description,
  websiteScreenshots,
  features = [],
  animationDelay = 0.3
}) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -15 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isExpanded) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateX = 30 * ((y - rect.height / 2) / rect.height);
    const rotateY = -30 * ((x - rect.width / 2) / rect.width);
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!isExpanded) {
      setRotation({ x: 15, y: -15 });
    }
  };
  
  // Toggle expanded view
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setRotation({ x: 15, y: -15 });
    } else {
      setRotation({ x: 0, y: 0 });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        
        <button
          onClick={toggleExpand}
          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isExpanded ? "Minimize" : "Maximize"}
        >
          {isExpanded ? (
            <Minimize className="w-5 h-5 text-gray-400" />
          ) : (
            <Maximize className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {/* Device selector */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveDevice('desktop')}
          className={`flex items-center p-2 rounded-lg transition-colors ${
            activeDevice === 'desktop' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Monitor className="w-5 h-5 mr-2" />
          <span>Desktop</span>
        </button>
        
        <button
          onClick={() => setActiveDevice('tablet')}
          className={`flex items-center p-2 rounded-lg transition-colors ${
            activeDevice === 'tablet' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Tablet className="w-5 h-5 mr-2" />
          <span>Tablet</span>
        </button>
        
        <button
          onClick={() => setActiveDevice('mobile')}
          className={`flex items-center p-2 rounded-lg transition-colors ${
            activeDevice === 'mobile' ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Smartphone className="w-5 h-5 mr-2" />
          <span>Mobile</span>
        </button>
      </div>
      
      {/* 3D Website Visualizer */}
      <div 
        ref={containerRef}
        className={`relative ${isExpanded ? 'h-[600px]' : 'h-[400px]'} overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black mb-6`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${
            isExpanded ? 'scale-100' : 'scale-90'
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${isExpanded ? 0 : rotation.x}deg) rotateY(${isExpanded ? 0 : rotation.y}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Desktop */}
          <motion.div
            className={`absolute transition-all duration-500 ease-out ${
              activeDevice === 'desktop' 
                ? 'opacity-100 scale-100 z-30' 
                : 'opacity-0 scale-95 z-10'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)'
            }}
          >
            <div className="bg-gray-800 rounded-lg p-2 shadow-2xl" style={{ width: isExpanded ? '900px' : '600px' }}>
              <div className="flex items-center justify-between bg-gray-900 rounded-t-lg p-2 mb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-gray-700 rounded-full h-6 w-2/3">
                  <div className="h-full w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full"></div>
                </div>
              </div>
              <div className="relative rounded-b-lg overflow-hidden" style={{ height: isExpanded ? '500px' : '300px' }}>
                <OptimizedImage
                  src={websiteScreenshots.desktop}
                  alt="Desktop website view"
                  className="w-full h-full object-cover"
                  fallbackClassName="bg-gradient-to-br from-gray-800 to-gray-900 w-full h-full flex items-center justify-center"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Tablet */}
          <motion.div
            className={`absolute transition-all duration-500 ease-out ${
              activeDevice === 'tablet' 
                ? 'opacity-100 scale-100 z-30' 
                : 'opacity-0 scale-95 z-10'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)'
            }}
          >
            <div className="bg-gray-800 rounded-2xl p-3 shadow-2xl" style={{ width: isExpanded ? '500px' : '350px' }}>
              <div className="flex justify-center mb-2">
                <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
              </div>
              <div className="relative rounded-lg overflow-hidden" style={{ height: isExpanded ? '600px' : '400px' }}>
                <OptimizedImage
                  src={websiteScreenshots.tablet}
                  alt="Tablet website view"
                  className="w-full h-full object-cover"
                  fallbackClassName="bg-gradient-to-br from-gray-800 to-gray-900 w-full h-full flex items-center justify-center"
                />
              </div>
              <div className="flex justify-center mt-2">
                <div className="w-10 h-10 rounded-full border-2 border-gray-700"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Mobile */}
          <motion.div
            className={`absolute transition-all duration-500 ease-out ${
              activeDevice === 'mobile' 
                ? 'opacity-100 scale-100 z-30' 
                : 'opacity-0 scale-95 z-10'
            }`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)'
            }}
          >
            <div className="bg-gray-800 rounded-3xl p-3 shadow-2xl" style={{ width: isExpanded ? '300px' : '220px' }}>
              <div className="flex justify-center mb-2">
                <div className="w-20 h-5 bg-gray-900 rounded-b-xl"></div>
              </div>
              <div className="relative rounded-xl overflow-hidden" style={{ height: isExpanded ? '550px' : '400px' }}>
                <OptimizedImage
                  src={websiteScreenshots.mobile}
                  alt="Mobile website view"
                  className="w-full h-full object-cover"
                  fallbackClassName="bg-gradient-to-br from-gray-800 to-gray-900 w-full h-full flex items-center justify-center"
                />
              </div>
              <div className="flex justify-center mt-3">
                <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-sm border border-gray-700"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent"></div>
      </div>
      
      {/* Features */}
      {features.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
          <ul className="grid grid-cols-2 gap-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default WebsiteVisualizer;
