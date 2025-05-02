import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../data/case-studies/types';

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Background glow effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-3 rounded-xl bg-gradient-to-br from-red-500/30 to-red-800/20 opacity-40 blur-2xl z-0"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10 bg-black/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all duration-300 h-full flex flex-col"
        animate={{
          y: isHovered ? -5 : 0,
          boxShadow: isHovered ? '0 25px 30px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(239, 68, 68, 0.15)' : '0 0 0 0 rgba(0, 0, 0, 0)'
        }}
      >
        {/* Project Image */}
        <div className="relative h-64 bg-gray-900 overflow-hidden">
          <motion.img
            src={project.image || project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-red-600 to-red-500 text-white rounded shadow-md">
              {project.industry}
            </span>

            {project.technologies.slice(0, 1).map((tech: string, techIndex: number) => (
              <span
                key={`${project.id}-featured-tech-${techIndex}`}
                className="px-4 py-1.5 text-xs bg-black/50 text-gray-200 rounded backdrop-blur-md shadow-md border border-white/10"
              >
                {tech}
              </span>
            ))}

            {project.technologies.length > 1 && (
              <span className="px-4 py-1.5 text-xs bg-black/50 text-gray-200 rounded backdrop-blur-md shadow-md border border-white/10">
                +{project.technologies.length - 1}
              </span>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8 flex-grow flex flex-col">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gradient transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            {project.description}
          </p>

          {/* Results Preview */}
          <div className="space-y-2 mb-4 flex-grow">
            {project.results.slice(0, isExpanded ? project.results.length : 2).map((result: string, resultIndex: number) => (
              <motion.div
                key={`${project.id}-result-${resultIndex}`}
                className="flex items-center text-base"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (resultIndex * 0.05) }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-3.5" />
                <span className="text-gray-100">{result}</span>
              </motion.div>
            ))}

            {project.results.length > 2 && (
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-sm text-gray-400 hover:text-red-400 mt-4 transition-colors"
                whileHover={{ x: 5 }}
              >
                <ChevronDown
                  className={`w-4 h-4 mr-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
                {isExpanded ? 'Show less' : `${project.results.length - 2} more results`}
              </motion.button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
            <Link
              to={`/case-studies/${project.id}`}
              className="inline-flex items-center font-medium text-lg text-red-500 hover:text-red-400 transition-colors group"
            >
              View Details
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>

            {project.videoDemo && (
              <a
                href={project.videoDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-base text-gray-400 hover:text-white transition-colors group"
              >
                Demo
                <ExternalLink className="w-4 h-4 ml-1.5 group-hover:translate-y-[-2px] transition-transform" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
