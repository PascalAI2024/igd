import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import PageTransition from '../components/PageTransition';
import TestimonialIcon from '../components/TestimonialIcon';

// Import case studies from the same data source as SimpleCaseStudies
import { allCaseStudies } from '../data/case-studies/all-case-studies';

const SimpleCaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigateWithTransition = useNavigateWithTransition();
  const study = allCaseStudies.find(s => s.id === id);

  if (!study) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Case Study Not Found</h1>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/case-studies');
              }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Case Studies
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/case-studies');
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full mb-4">
              {study.industry}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              {study.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-6 max-w-3xl mx-auto">
              {study.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {study.technologies.map((tech: string, index: number) => (
                <span
                  key={`${tech}-${index}`}
                  className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/5 rounded-xl overflow-hidden aspect-[21/9] max-h-[500px]">
            <img
              src={study.imageUrl}
              alt={study.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Try local image if remote fails
                const target = e.target as HTMLImageElement;
                const localPath = `/case-studies/${study.id}.webp`;
                
                // First try to load the local version
                fetch(localPath)
                  .then(response => {
                    if (response.ok) {
                      target.src = localPath;
                    } else {
                      // If local also fails, use a generic fallback
                      target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
                    }
                  })
                  .catch(() => {
                    // If fetch fails, use the generic fallback
                    target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop";
                  });
              }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">1</span>
                </span>
                Challenge
              </h2>
              <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">2</span>
                </span>
                Solution
              </h2>
              <p className="text-gray-300 leading-relaxed">{study.solution}</p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">3</span>
                </span>
                Results
              </h2>
              <ul className="space-y-4">
                {study.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {study.testimonial && (
              <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-xl p-8 border border-red-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Client Testimonial</h2>
                <blockquote>
                  <p className="text-gray-300 italic mb-4">"{study.testimonial.quote}"</p>
                  <footer className="flex items-center">
                    <TestimonialIcon 
                      name={study.testimonial.author} 
                      industry={study.industry}
                      size="sm"
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold text-white">{study.testimonial.author}</div>
                      <div className="text-sm text-gray-400">{study.testimonial.role || study.testimonial.position}</div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/contact');
            }}
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SimpleCaseStudyDetail;
