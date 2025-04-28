import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import OptimizedImage from '../../OptimizedImage';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  image?: string;
  industry?: string;
  results?: string;
}

interface TestimonialShowcaseProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  animationDelay?: number;
}

const TestimonialShowcase: React.FC<TestimonialShowcaseProps> = ({
  title,
  description,
  testimonials,
  animationDelay = 0.3
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
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
        {testimonials.length > 1 && (
          <>
            <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </>
        )}
        
        {/* Testimonial content */}
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
              className="bg-black/30 rounded-xl p-6 border border-white/10"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Author image */}
                {testimonials[activeIndex].image && (
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-2 border-red-500/30">
                      <OptimizedImage
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].author}
                        className="w-full h-full object-cover"
                        fallbackClassName="bg-gradient-to-br from-red-900/20 to-purple-900/20 w-full h-full flex items-center justify-center"
                      />
                    </div>
                  </div>
                )}
                
                {/* Quote */}
                <div className={testimonials[activeIndex].image ? "md:w-3/4" : "w-full"}>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-red-500/30" />
                    <p className="text-gray-300 italic text-lg pl-6 mb-4">
                      "{testimonials[activeIndex].quote}"
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-white font-semibold">{testimonials[activeIndex].author}</p>
                    <p className="text-gray-400">{testimonials[activeIndex].company}</p>
                    
                    {testimonials[activeIndex].industry && (
                      <p className="text-gray-500 text-sm mt-1">Industry: {testimonials[activeIndex].industry}</p>
                    )}
                    
                    {testimonials[activeIndex].results && (
                      <div className="mt-4 bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                        <p className="text-red-400 text-sm">Results: {testimonials[activeIndex].results}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Pagination dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-red-500' : 'bg-white/20'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialShowcase;
