import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import OptimizedImage from '../../OptimizedImage';

interface UseCase {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  technologies: string[];
  link?: string;
}

interface UseCaseShowcaseProps {
  title: string;
  description: string;
  useCases: UseCase[];
  animationDelay?: number;
}

const UseCaseShowcase: React.FC<UseCaseShowcaseProps> = ({
  title,
  description,
  useCases,
  animationDelay = 0.3
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextCase = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % useCases.length);
  };
  
  const prevCase = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };
  
  const activeCase = useCases[activeIndex];
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };
  
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
      
      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevCase}
            className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
            aria-label="Previous case study"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCase}
            className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
            aria-label="Next case study"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Case study content */}
        <div className="overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 h-64 md:h-auto">
                <OptimizedImage
                  src={activeCase.image}
                  alt={activeCase.title}
                  className="w-full h-full object-cover"
                  fallbackClassName="bg-gradient-to-br from-red-900/20 to-purple-900/20 w-full h-full flex items-center justify-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {activeCase.technologies.map((tech, i) => (
                      <span key={i} className="text-xs bg-black/50 text-white px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white">{activeCase.title}</h4>
                <p className="text-gray-300">{activeCase.description}</p>
                
                <div>
                  <h5 className="text-sm uppercase text-gray-400 mb-1">The Challenge</h5>
                  <p className="text-gray-300">{activeCase.challenge}</p>
                </div>
                
                <div>
                  <h5 className="text-sm uppercase text-gray-400 mb-1">Our Solution</h5>
                  <p className="text-gray-300">{activeCase.solution}</p>
                </div>
                
                <div>
                  <h5 className="text-sm uppercase text-gray-400 mb-1">Results</h5>
                  <ul className="space-y-2">
                    {activeCase.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span className="text-gray-300">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {activeCase.link && (
                  <motion.a
                    href={activeCase.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center mt-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-md text-red-500 text-sm hover:bg-red-500/20 transition-colors duration-300"
                  >
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {useCases.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-red-500' : 'bg-white/20'
              }`}
              aria-label={`Go to case study ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UseCaseShowcase;
