import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Search, ArrowRight, FileText, Code2, Terminal, Database, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    {
      title: 'Getting Started',
      icon: FileText,
      docs: [
        'Quick Start Guide',
        'Installation',
        'Configuration',
        'Basic Usage'
      ]
    },
    {
      title: 'API Reference',
      icon: Code2,
      docs: [
        'Authentication',
        'Endpoints',
        'Response Formats',
        'Error Handling'
      ]
    },
    {
      title: 'Integration Guides',
      icon: Terminal,
      docs: [
        'REST API Integration',
        'WebSocket Integration',
        'SDK Usage',
        'Webhooks'
      ]
    },
    {
      title: 'Database',
      icon: Database,
      docs: [
        'Schema Design',
        'Migrations',
        'Optimization',
        'Backup & Recovery'
      ]
    },
    {
      title: 'Configuration',
      icon: Settings,
      docs: [
        'Environment Setup',
        'Security Settings',
        'Performance Tuning',
        'Logging'
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.docs.length > 0);

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
                Documentation
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Comprehensive guides and documentation for our solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <category.icon className="w-8 h-8 text-red-500 mr-3" />
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {category.docs.map((doc) => (
                      <li key={doc} className="flex items-center text-gray-300 hover:text-red-500 transition-colors">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                        <Link to={`/docs/${category.title.toLowerCase()}/${doc.toLowerCase().replace(/\s+/g, '-')}`}>
                          {doc}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/docs/${category.title.toLowerCase()}`}
                    className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
                  >
                    View All
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
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
                  Need Help?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Our support team is here to assist you with any questions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Contact Support
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

export default Documentation;