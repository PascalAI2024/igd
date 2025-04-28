import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, ChevronRight, Download, Search, Brain, Shield, Cloud, Code2, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const resources = {
  whitepapers: [
    {
      id: 'digital-transformation-guide',
      title: 'Digital Transformation Guide for Florida Businesses',
      description: 'A comprehensive guide to digital transformation strategies for South Florida companies.',
      category: 'Digital Transformation',
      downloadUrl: '#',
      readTime: '20 min read',
      icon: Lightbulb
    },
    {
      id: 'ai-business-impact',
      title: 'AI Impact on Business: South Florida Perspective',
      description: 'How artificial intelligence is transforming businesses in South Florida.',
      category: 'AI & Machine Learning',
      downloadUrl: '#',
      readTime: '15 min read',
      icon: Brain
    },
    {
      id: 'cloud-migration-florida',
      title: 'Cloud Migration Strategies for Florida Enterprises',
      description: 'Best practices for migrating to the cloud in the Sunshine State.',
      category: 'Cloud Computing',
      downloadUrl: '#',
      readTime: '18 min read',
      icon: Cloud
    }
  ],
  caseStudies: [
    {
      id: 'healthcare-transformation',
      title: 'Healthcare Digital Transformation',
      description: 'How we helped a Florida medical center modernize their operations.',
      category: 'Healthcare',
      link: '/case-studies/healthcare-platform',
      icon: Code2
    },
    {
      id: 'fintech-innovation',
      title: 'FinTech Innovation',
      description: 'Modernizing financial services for a South Florida bank.',
      category: 'Finance',
      link: '/case-studies/fintech-platform',
      icon: Code2
    }
  ],
  insights: [
    {
      id: 'tech-trends-2024',
      title: 'Tech Trends 2024: South Florida Edition',
      description: 'Key technology trends shaping South Florida businesses.',
      category: 'Industry Insights',
      link: '/blog/tech-trends-2024',
      icon: Lightbulb
    },
    {
      id: 'cybersecurity-florida',
      title: 'Cybersecurity for Florida Businesses',
      description: 'Essential security measures for local companies.',
      category: 'Security',
      link: '/blog/cybersecurity-florida',
      icon: Shield
    }
  ]
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Digital Transformation',
    'AI & Machine Learning',
    'Cloud Computing',
    'Security',
    'Industry Insights'
  ];

  const filterResources = (items: any[], category: string, query: string) => {
    return items.filter(item => 
      (category === 'All' || item.category === category) &&
      (item.title.toLowerCase().includes(query.toLowerCase()) ||
       item.description.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredWhitepapers = filterResources(resources.whitepapers, selectedCategory, searchQuery);
  const filteredCaseStudies = filterResources(resources.caseStudies, selectedCategory, searchQuery);
  const filteredInsights = filterResources(resources.insights, selectedCategory, searchQuery);

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
              <Book className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Resources & Insights
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Expert insights, industry research, and success stories to help your business thrive in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-red-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Whitepapers Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gradient mb-8">Industry Research & Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWhitepapers.map((paper) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <paper.icon className="w-6 h-6 text-red-500" />
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
                          {paper.title}
                        </h3>
                        <span className="text-sm text-gray-400">{paper.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{paper.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      {paper.category}
                    </span>
                    <a
                      href={paper.downloadUrl}
                      className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gradient mb-8">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCaseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <study.icon className="w-6 h-6 text-red-500" />
                      <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
                        {study.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      {study.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{study.description}</p>
                  
                  <Link
                    to={study.link}
                    className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                  >
                    Read Case Study
                    <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Insights Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gradient mb-8">Industry Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <insight.icon className="w-6 h-6 text-red-500" />
                      <h3 className="text-xl font-semibold text-white group-hover:text-gradient">
                        {insight.title}
                      </h3>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      {insight.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{insight.description}</p>
                  
                  <Link
                    to={insight.link}
                    className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                  >
                    Read Article
                    <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
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
                  Need Expert Guidance?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's discuss how we can help transform your business with innovative digital solutions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Contact Us
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Resources;