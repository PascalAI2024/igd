import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Cloud, Brain, Code2, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { caseStudies } from '../data/case-studies';

const CaseStudies = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const industries = ['All', ...new Set(caseStudies.map(study => study.industry))];
  
  const filteredStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

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

        {/* Industry Filter */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-6 py-3 rounded-full text-sm transition-all ${
                    selectedIndustry === industry
                      ? 'bg-red-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ pointerEvents: 'auto' }}>
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(study.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                      <div>
                        <span className="inline-block px-3 py-1 bg-red-500/90 text-white text-sm rounded-full mb-4">
                          {study.industry}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {study.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {study.client}
                        </p>
                      </div>

                      <div className={`transform transition-all duration-500 ${
                        hoveredId === study.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-red-500 mb-2">Challenge</h4>
                            <p className="text-gray-300 text-sm">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-red-500 mb-2">Solution</h4>
                            <p className="text-gray-300 text-sm">{study.solution}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-red-500 mb-2">Results</h4>
                            <ul className="grid grid-cols-2 gap-2">
                              {study.results.slice(0, 4).map((result, i) => (
                                <li key={i} className="flex items-center text-gray-300 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <Link
                          to={`/case-studies/${study.id}`}
                          className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors mt-6"
                        >
                          View Full Case Study
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
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

export default CaseStudies;