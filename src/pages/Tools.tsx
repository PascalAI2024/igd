import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Calculator, CheckCircle, Download, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import MetaTags from '../components/MetaTags';

// Tool Components
import SEOKeywordAnalyzer from '../components/tools/SEOKeywordAnalyzer';
import WebsiteSpeedTest from '../components/tools/WebsiteSpeedTest';
import ROICalculator from '../components/tools/ROICalculator';
import SocialMediaAudit from '../components/tools/SocialMediaAudit';

const Tools: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const tools = [
    {
      id: 'seo-analyzer',
      title: 'SEO Keyword Analyzer',
      description: 'Analyze keyword opportunities and discover high-impact search terms for your business',
      icon: Search,
      color: 'from-blue-500 to-purple-600',
      component: SEOKeywordAnalyzer
    },
    {
      id: 'speed-test',
      title: 'Website Speed Test',
      description: 'Check your website performance, Core Web Vitals, and get optimization recommendations',
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      component: WebsiteSpeedTest
    },
    {
      id: 'roi-calculator',
      title: 'ROI Comparison Calculator',
      description: 'Calculate potential returns on digital marketing investments with industry comparisons',
      icon: Calculator,
      color: 'from-purple-500 to-pink-600',
      component: ROICalculator
    },
    {
      id: 'social-audit',
      title: 'Social Media Audit Checklist',
      description: 'Evaluate your social media presence with our comprehensive interactive checklist',
      icon: CheckCircle,
      color: 'from-orange-500 to-red-600',
      component: SocialMediaAudit
    }
  ];

  const activeTool = tools.find(tool => tool.id === activeToolId);

  return (
    <>
      <MetaTags
        title="Free Digital Marketing Tools - SEO, Speed Test, ROI Calculator | Ingenious Digital"
        description="Access powerful free digital marketing tools: SEO Keyword Analyzer, Website Speed Test, ROI Calculator, and Social Media Audit Checklist to boost your online presence."
        keywords={['digital marketing tools', 'SEO analyzer', 'website speed test', 'ROI calculator', 'social media audit', 'free marketing tools']}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-24">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Free Digital Marketing Tools
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              Powerful, easy-to-use tools to analyze, optimize, and grow your online presence
            </motion.p>
          </div>
        </section>

        {/* Tools Grid */}
        {!activeToolId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveToolId(tool.id)}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <div className="relative p-8">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white mb-4`}>
                        <tool.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        Use Tool
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Tool Section */}
        {activeToolId && activeTool && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setActiveToolId(null)}
                className="mb-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center"
              >
                ← Back to All Tools
              </button>
              <activeTool.component />
            </div>
          </motion.div>
        )}

        {/* Benefits Section */}
        {!activeToolId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Use Our Tools?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Get actionable insights and data-driven recommendations to improve your digital presence
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Data-Driven Insights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Make informed decisions based on real metrics and industry benchmarks
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Instant Results
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get immediate feedback and recommendations without waiting
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                    <Download className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Actionable Reports
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Download detailed reports with specific recommendations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        {!activeToolId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Need More Advanced Analysis?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Our team can provide comprehensive audits and custom strategies for your business
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Professional Help
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Tools;