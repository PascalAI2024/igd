import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { RequiredCaseStudy } from '../data/case-studies/types';
import { caseStudies } from '../data/case-studies';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = caseStudies.find(p => p.id === id) as RequiredCaseStudy;

  if (!project) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gradient mb-4">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-xl text-gray-400 mb-6">
                {project.subtitle}
              </p>
            )}

            {project.technologies && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={`${tech}-${index}`}
                    className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 rounded-xl overflow-hidden mb-8">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Challenge</h2>
                <p className="text-gray-400">{project.challenge}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
                <p className="text-gray-400">{project.solution}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
              <ul className="space-y-4">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.testimonial && (
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Client Testimonial</h2>
                <blockquote className="text-gray-400">
                  <p className="italic mb-4">"{project.testimonial.quote}"</p>
                  <footer>
                    <div className="font-semibold text-white">{project.testimonial.author}</div>
                    <div className="text-sm text-gray-500">{project.testimonial.role}</div>
                  </footer>
                </blockquote>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
