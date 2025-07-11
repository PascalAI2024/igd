import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';

// Import case studies from the main data source to avoid duplication
import { allCaseStudies } from '../data/case-studies/all-case-studies';

// Use the complete case studies from the main data source
export const caseStudies = allCaseStudies.map(study => ({
  id: study.id,
  title: study.title,
  subtitle: study.subtitle || study.description,
  description: study.description,
  industry: study.industry,
  imageUrl: study.imageUrl,
  technologies: study.technologies
}));

const SimpleCaseStudies = () => {
  const navigateWithTransition = useNavigateWithTransition();
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Code2 className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Case Studies
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Explore how we've helped businesses transform through innovative technology solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.id}
                  to={`/case-studies/${study.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition(`/case-studies/${study.id}`);
                  }}
                  className="group block rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/5 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-red-500/90 text-white text-sm rounded-full">
                          {study.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {study.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded">
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded">
                            +{study.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* View Case Study Button */}
                      <div className="flex items-center text-red-500 group-hover:text-red-400 transition-colors mt-2 text-sm font-medium">
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's discuss how we can help transform your business with innovative solutions.
                </p>
                <Link
                  to="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition('/contact');
                  }}
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default SimpleCaseStudies;
