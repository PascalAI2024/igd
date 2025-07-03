import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Mail, Phone, HelpCircle, Star } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: number;
  notHelpful?: number;
}

const InteractiveFAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Map<string, 'yes' | 'no' | null>>(new Map());

  const faqData: FAQItem[] = [
    // Digital Marketing
    {
      id: '1',
      question: 'How long does it take to see results from SEO?',
      answer: 'SEO is a long-term strategy that typically shows initial results within 3-6 months. However, significant improvements in rankings and organic traffic usually become apparent after 6-12 months of consistent optimization. The timeline depends on factors like your website\'s current state, competition level, and the keywords you\'re targeting.',
      category: 'Digital Marketing',
      tags: ['seo', 'timeline', 'results'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'What\'s the difference between PPC and SEO?',
      answer: 'PPC (Pay-Per-Click) provides immediate visibility through paid ads, where you pay for each click. SEO (Search Engine Optimization) focuses on organic rankings through content and technical optimization. PPC offers instant results but requires ongoing budget, while SEO takes time but provides long-term, cost-effective traffic.',
      category: 'Digital Marketing',
      tags: ['ppc', 'seo', 'comparison', 'advertising'],
      helpful: 38,
      notHelpful: 1
    },
    {
      id: '3',
      question: 'How much should I budget for digital marketing?',
      answer: 'Most businesses allocate 7-10% of their revenue to marketing, with 50-60% going to digital channels. For startups or growth-focused companies, this can be higher (12-20%). The exact budget depends on your industry, goals, and growth stage. We recommend starting with a test budget and scaling based on ROI.',
      category: 'Digital Marketing',
      tags: ['budget', 'cost', 'investment'],
      helpful: 52,
      notHelpful: 3
    },

    // Web Development
    {
      id: '4',
      question: 'How long does it take to build a website?',
      answer: 'A basic website typically takes 4-6 weeks, while a custom, feature-rich website can take 8-12 weeks or more. The timeline depends on factors like design complexity, number of pages, custom functionality, content creation, and revision rounds. We provide detailed project timelines during our consultation.',
      category: 'Web Development',
      tags: ['timeline', 'website', 'development'],
      helpful: 41,
      notHelpful: 2
    },
    {
      id: '5',
      question: 'Do you provide website maintenance after launch?',
      answer: 'Yes! We offer comprehensive maintenance packages that include security updates, performance optimization, content updates, and technical support. Our maintenance plans range from basic monthly check-ups to full-service management with priority support and regular feature additions.',
      category: 'Web Development',
      tags: ['maintenance', 'support', 'updates'],
      helpful: 35,
      notHelpful: 0
    },
    {
      id: '6',
      question: 'Will my website be mobile-friendly?',
      answer: 'Absolutely! All our websites are built with a mobile-first approach, ensuring perfect functionality across all devices. We use responsive design techniques and test extensively on various screen sizes. With over 60% of web traffic coming from mobile devices, this is non-negotiable.',
      category: 'Web Development',
      tags: ['mobile', 'responsive', 'design'],
      helpful: 48,
      notHelpful: 0
    },

    // Business Automation
    {
      id: '7',
      question: 'What processes can be automated in my business?',
      answer: 'Common automation opportunities include email marketing, social media posting, lead nurturing, appointment scheduling, invoice processing, customer support (chatbots), data entry, inventory management, and reporting. We analyze your specific workflows to identify the highest-impact automation opportunities.',
      category: 'Business Automation',
      tags: ['automation', 'processes', 'efficiency'],
      helpful: 33,
      notHelpful: 1
    },
    {
      id: '8',
      question: 'How much time can automation save my business?',
      answer: 'Businesses typically save 10-20 hours per week through strategic automation. For example, automated email campaigns can save 5-8 hours weekly, while automated reporting can save 3-5 hours. The exact savings depend on your current processes and the extent of automation implemented.',
      category: 'Business Automation',
      tags: ['time savings', 'efficiency', 'roi'],
      helpful: 29,
      notHelpful: 2
    },

    // General
    {
      id: '9',
      question: 'How do I get started with your services?',
      answer: 'Getting started is easy! Schedule a free consultation through our website or call us directly. During this 30-minute session, we\'ll discuss your goals, challenges, and recommend the best solutions. There\'s no obligation, and you\'ll receive a custom proposal within 48 hours.',
      category: 'General',
      tags: ['getting started', 'consultation', 'process'],
      helpful: 44,
      notHelpful: 0
    },
    {
      id: '10',
      question: 'Do you work with small businesses?',
      answer: 'Yes! We love working with small businesses and startups. We offer scalable solutions and flexible packages designed specifically for smaller budgets. Many of our enterprise-level strategies can be adapted for small businesses, giving you access to powerful tools without breaking the bank.',
      category: 'General',
      tags: ['small business', 'startups', 'pricing'],
      helpful: 56,
      notHelpful: 1
    }
  ];

  const categories = ['all', ...new Set(faqData.map(item => item.category))];

  const filteredFAQs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleHelpfulVote = (id: string, vote: 'yes' | 'no') => {
    setHelpfulVotes(prev => new Map(prev).set(id, vote));
    // In a real app, this would send the vote to your analytics/backend
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark> : 
        part
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-6">Find answers to common questions about our services</p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {highlightText(item.question, searchQuery)}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{item.category}</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          {item.helpful || 0} found this helpful
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedItems.has(item.id) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-700 mb-4">
                          {highlightText(item.answer, searchQuery)}
                        </p>
                        
                        {/* Helpful Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Was this helpful?</span>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHelpfulVote(item.id, 'yes')}
                                className={`p-2 rounded-lg transition-colors ${
                                  helpfulVotes.get(item.id) === 'yes'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHelpfulVote(item.id, 'no')}
                                className={`p-2 rounded-lg transition-colors ${
                                  helpfulVotes.get(item.id) === 'no'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="hidden sm:flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No FAQs found matching your search.</p>
              <p className="text-sm text-gray-400 mt-2">Try different keywords or browse all categories.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
        <p className="text-gray-600 mb-6">Our team is here to help you find the answers you need</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Live Chat
          </motion.a>
          
          <motion.a
            href="mailto:support@ingeniousdigital.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:shadow-md transition-shadow"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Support
          </motion.a>
          
          <motion.a
            href="tel:+1234567890"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:shadow-md transition-shadow"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveFAQ;