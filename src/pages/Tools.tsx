import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Calculator, 
  Users, 
  Download,
  MessageSquare,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import {
  SEOKeywordAnalyzer,
  WebsiteSpeedTest,
  ROICalculator,
  SocialMediaAudit,
  InteractiveFAQ,
  ResourceLibrary
} from '../components/interactive-tools';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('seo');

  const tools = [
    {
      id: 'seo',
      name: 'SEO Keyword Analyzer',
      description: 'Discover high-value keywords for your business',
      icon: <Search className="w-6 h-6" />,
      component: <SEOKeywordAnalyzer />
    },
    {
      id: 'speed',
      name: 'Website Speed Test',
      description: 'Test your website performance and get insights',
      icon: <Zap className="w-6 h-6" />,
      component: <WebsiteSpeedTest />
    },
    {
      id: 'roi',
      name: 'ROI Calculator',
      description: 'Calculate your digital marketing ROI',
      icon: <Calculator className="w-6 h-6" />,
      component: <ROICalculator />
    },
    {
      id: 'social',
      name: 'Social Media Audit',
      description: 'Evaluate your social media presence',
      icon: <Users className="w-6 h-6" />,
      component: <SocialMediaAudit />
    },
    {
      id: 'resources',
      name: 'Resource Library',
      description: 'Download free marketing resources',
      icon: <Download className="w-6 h-6" />,
      component: <ResourceLibrary />
    },
    {
      id: 'faq',
      name: 'FAQ Center',
      description: 'Find answers to common questions',
      icon: <HelpCircle className="w-6 h-6" />,
      component: <InteractiveFAQ />
    }
  ];

  const activeTool = tools.find(tool => tool.id === activeTab);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Free Marketing Tools
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Powerful tools to analyze, optimize, and grow your digital presence. 
                Get instant insights and actionable recommendations.
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">100% Free • No Credit Card Required</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tool Navigation */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tool.id)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      activeTab === tool.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={activeTab === tool.id ? 'text-white' : 'text-blue-600'}>
                        {tool.icon}
                      </div>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Active Tool */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTool && (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      {activeTool.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {activeTool.description}
                    </p>
                  </div>
                  {activeTool.component}
                </>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Tools;