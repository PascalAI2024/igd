import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Filter, CheckCircle2, Briefcase, Building, Code, Database, Globe, Layout, Lightbulb, Megaphone, ShoppingCart, Smartphone, Users, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../data/case-studies/types';
import { caseStudies } from '../data/case-studies';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
  projects?: CaseStudy[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = caseStudies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  if (!projects?.length) {
    return (
      <section id="projects" className="py-20 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">No case studies available at the moment.</p>
        </div>
      </section>
    );
  }

  // Type guard to ensure we have all required properties
  const isValidCaseStudy = (project: unknown): project is CaseStudy => {
    if (!project || typeof project !== 'object') return false;

    const p = project as Partial<CaseStudy>;
    return !!(
      p.id &&
      p.title &&
      p.subtitle &&
      p.description &&
      p.industry &&
      p.challenge &&
      p.solution &&
      p.results &&
      Array.isArray(p.results) &&
      p.technologies &&
      Array.isArray(p.technologies) &&
      (p.image || p.imageUrl)
    );
  };

  const validProjects = projects.filter(isValidCaseStudy);

  if (!validProjects.length) {
    return (
      <section id="projects" className="py-20 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">No valid case studies available at the moment.</p>
        </div>
      </section>
    );
  }

  // Get unique industries
  const industries = Array.from(new Set(validProjects.map(project => project.industry)));
  
  const industryToIcon: Record<string, React.ComponentType<{ className?: string }>> = {
    'Healthcare': Stethoscope,
    'E-commerce': ShoppingCart,
    'Technology': Code,
    'Finance': Database,
    'Marketing': Megaphone,
    'Education': Lightbulb,
    'Real Estate': Building,
    'Travel': Globe,
    'Design': Layout,
    'Social Media': Users,
    'Mobile': Smartphone,
    'Consulting': Briefcase
  };

  // Filter projects based on search and industry
  const filteredProjects = validProjects.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === null || project.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <section id="projects" className="py-24 bg-black scroll-mt-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full px-4 py-2 mb-4 border border-red-500/10"
          >
            <CheckCircle2 className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-semibold">Real Results for Local Businesses</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            Success Stories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            See how we've helped local businesses grow and succeed in the digital age
          </motion.p>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedIndustry(null)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  selectedIndustry === null
                    ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white border border-red-500/20'
                    : 'bg-black/60 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Industries
              </button>

              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry === selectedIndustry ? null : industry)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    selectedIndustry === industry
                      ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white border border-red-500/20'
                      : 'bg-black/60 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {React.createElement(industryToIcon[industry as keyof typeof industryToIcon] || Briefcase, { className: "w-4 h-4 mr-2" })}
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">No case studies match your search criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 group"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
