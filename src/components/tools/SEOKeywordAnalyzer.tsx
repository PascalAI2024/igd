import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, BarChart, AlertCircle, CheckCircle, X } from 'lucide-react';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  opportunity: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
}

interface RelatedKeyword {
  keyword: string;
  searchVolume: number;
  relevance: number;
}

const SEOKeywordAnalyzer: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    main: KeywordData;
    related: RelatedKeyword[];
    insights: string[];
  } | null>(null);

  // Mock data generator for demonstration
  const generateMockData = (keyword: string): {
    main: KeywordData;
    related: RelatedKeyword[];
    insights: string[];
  } => {
    const searchVolume = Math.floor(Math.random() * 50000) + 1000;
    const difficulty = Math.floor(Math.random() * 100);
    const opportunity = Math.max(10, 100 - difficulty + Math.floor(Math.random() * 20));
    
    return {
      main: {
        keyword,
        searchVolume,
        difficulty,
        opportunity,
        cpc: Number((Math.random() * 5 + 0.5).toFixed(2)),
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
      },
      related: [
        {
          keyword: `best ${keyword}`,
          searchVolume: Math.floor(searchVolume * 0.3),
          relevance: 95
        },
        {
          keyword: `${keyword} services`,
          searchVolume: Math.floor(searchVolume * 0.4),
          relevance: 90
        },
        {
          keyword: `${keyword} near me`,
          searchVolume: Math.floor(searchVolume * 0.6),
          relevance: 85
        },
        {
          keyword: `cheap ${keyword}`,
          searchVolume: Math.floor(searchVolume * 0.2),
          relevance: 80
        },
        {
          keyword: `${keyword} cost`,
          searchVolume: Math.floor(searchVolume * 0.25),
          relevance: 75
        }
      ],
      insights: [
        difficulty < 30 ? 'Low competition keyword - great opportunity for quick wins!' : '',
        difficulty > 70 ? 'High competition - consider long-tail variations' : '',
        searchVolume > 10000 ? 'High search volume indicates strong market interest' : '',
        opportunity > 70 ? 'Excellent opportunity score - prioritize this keyword' : '',
        'Consider creating comprehensive content around this topic',
        'Monitor competitor rankings for this keyword'
      ].filter(Boolean)
    };
  };

  const analyzeKeyword = () => {
    if (!keyword.trim()) return;
    
    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(generateMockData(keyword));
      setAnalyzing(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-600 bg-green-100';
    if (difficulty < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getOpportunityColor = (opportunity: number) => {
    if (opportunity > 70) return 'text-green-600 bg-green-100';
    if (opportunity > 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          SEO Keyword Analyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover keyword opportunities and analyze search metrics
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeKeyword()}
            placeholder="Enter a keyword to analyze..."
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={analyzeKeyword}
            disabled={analyzing || !keyword.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {analyzing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Keyword Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Search Volume
                </span>
                {results.main.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                {results.main.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {results.main.searchVolume.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Monthly searches
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Difficulty
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.main.difficulty}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(results.main.difficulty)}`}>
                  {results.main.difficulty < 30 ? 'Easy' : results.main.difficulty < 70 ? 'Medium' : 'Hard'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Competition level
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Opportunity
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {results.main.opportunity}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${getOpportunityColor(results.main.opportunity)}`}>
                  {results.main.opportunity > 70 ? 'High' : results.main.opportunity > 40 ? 'Medium' : 'Low'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Score out of 100
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Avg. CPC
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${results.main.cpc}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Cost per click
              </p>
            </div>
          </div>

          {/* Related Keywords */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Related Keywords
            </h3>
            <div className="space-y-3">
              {results.related.map((related, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {related.keyword}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {related.searchVolume.toLocaleString()} searches/mo
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {related.relevance}% relevance
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Actionable Insights
            </h3>
            <div className="space-y-3">
              {results.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-200">
                    {insight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clear Results */}
          <button
            onClick={() => {
              setResults(null);
              setKeyword('');
            }}
            className="mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear Results
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SEOKeywordAnalyzer;