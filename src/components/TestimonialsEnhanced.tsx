import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, MessageSquare, Award, TrendingUp, Building } from 'lucide-react';
import { testimonials, Testimonial } from '../data/testimonials';
import OptimizedImage from './OptimizedImage';

const TestimonialsEnhanced = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Filter testimonials by industry if selected
  const filteredTestimonials = selectedIndustry 
    ? testimonials.filter(t => t.industry === selectedIndustry)
    : testimonials;
    
  // Get unique industries
  const industries = Array.from(new Set(testimonials.map(t => t.industry)));

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay, filteredTestimonials.length]);

  const handlePrevious = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };
  
  const handleIndustrySelect = (industry: string | null) => {
    setSelectedIndustry(industry);
    setActiveIndex(0);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full px-4 py-2 mb-4 border border-red-500/10"
          >
            <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-semibold">Client Success Stories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            Local Success Stories
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            See how we've helped local businesses transform and grow
          </motion.p>
        </div>
        
        {/* Industry Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => handleIndustrySelect(null)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedIndustry === null 
                ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white border border-red-500/20' 
                : 'bg-black/60 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            All Industries
          </button>
          
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => handleIndustrySelect(industry === selectedIndustry ? null : industry)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedIndustry === industry 
                  ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white border border-red-500/20' 
                  : 'bg-black/60 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        <div className="relative" ref={testimonialsRef}>
          {/* Testimonial Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Testimonial Content */}
                      <div className="p-8">
                        <div className="flex items-start mb-6">
                          <div className="flex-shrink-0 mr-4 relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                              <OptimizedImage
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                              {testimonial.rating}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-400">{testimonial.role}</p>
                            <div className="flex items-center mt-1">
                              <Building className="w-3 h-3 text-gray-500 mr-1" />
                              <p className="text-gray-400 text-sm">{testimonial.company}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative mb-6">
                          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-red-500/20" />
                          <p className="text-gray-300 italic relative z-10 pl-6">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 border border-white/10">
                          <Award className="w-3 h-3 mr-1 text-red-500" />
                          {testimonial.industry}
                        </div>
                      </div>
                      
                      {/* Results Section */}
                      <div className="bg-gradient-to-br from-black/80 to-black/40 p-8 border-l border-white/10">
                        <div className="flex items-center mb-4">
                          <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
                          <h4 className="text-lg font-semibold text-white">Measurable Results</h4>
                        </div>
                        
                        <div className="space-y-6">
                          {testimonial.results?.map((result, i) => (
                            <div key={i} className="relative">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-400">{result.label}</span>
                                <span className="text-sm font-semibold text-white">{result.value}</span>
                              </div>
                              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${Math.min(parseInt(result.value) || 50, 100)}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.5 + (i * 0.2), duration: 1 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/10 hover:border-white/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex items-center space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setAutoplay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex
                      ? 'bg-red-500'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/10 hover:border-white/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and experience the difference our solutions can make for your business.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
          >
            Start Your Success Story
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsEnhanced;
