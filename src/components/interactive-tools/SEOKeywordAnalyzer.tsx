import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, AlertCircle, CheckCircle, BarChart3, Target, Zap } from 'lucide-react';

interface KeywordAnalysis {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  opportunity: number;
  relatedKeywords: string[];
  competitorCount: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
}

const SEOKeywordAnalyzer: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<KeywordAnalysis | null>(null);
  const [error, setError] = useState('');

  const analyzeKeyword = useCallback(async () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);

    // Simulate API call with realistic data generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate mock analysis data
    const mockAnalysis: KeywordAnalysis = {
      keyword: keyword.trim(),
      searchVolume: Math.floor(Math.random() * 50000) + 1000,
      difficulty: Math.floor(Math.random() * 100),
      opportunity: Math.floor(Math.random() * 100),
      relatedKeywords: generateRelatedKeywords(keyword),
      competitorCount: Math.floor(Math.random() * 1000) + 100,
      cpc: parseFloat((Math.random() * 5 + 0.5).toFixed(2)),
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  }, [keyword]);

  const generateRelatedKeywords = (baseKeyword: string): string[] => {
    const prefixes = ['best', 'top', 'how to', 'cheap', 'professional'];
    const suffixes = ['services', 'near me', 'online', 'tips', 'guide'];
    const related: string[] = [];
    
    for (let i = 0; i < 5; i++) {
      const usePrefix = Math.random() > 0.5;
      const keyword = usePrefix 
        ? `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${baseKeyword}`
        : `${baseKeyword} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
      related.push(keyword);
    }
    
    return related;
  };

  const getDifficultyColor = (difficulty: number): string => {
    if (difficulty < 30) return 'text-green-500';
    if (difficulty < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getOpportunityColor = (opportunity: number): string => {
    if (opportunity > 70) return 'text-green-500';
    if (opportunity > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">SEO Keyword Analyzer</h2>
        <p className="text-gray-600">Discover high-value keywords for your business</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeKeyword()}
            placeholder="Enter a keyword (e.g., 'digital marketing agency')"
            className="w-full px-6 py-4 pr-32 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={analyzeKeyword}
            disabled={isAnalyzing}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Analyze
              </span>
            )}
          </motion.button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 mt-2 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-700 font-medium">Search Volume</h3>
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {analysis.searchVolume.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">monthly searches</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-700 font-medium">Difficulty</h3>
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <p className={`text-3xl font-bold ${getDifficultyColor(analysis.difficulty)}`}>
                  {analysis.difficulty}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.difficulty < 30 ? 'Easy to rank' : 
                   analysis.difficulty < 70 ? 'Moderate difficulty' : 'Hard to rank'}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-700 font-medium">Opportunity</h3>
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <p className={`text-3xl font-bold ${getOpportunityColor(analysis.opportunity)}`}>
                  {analysis.opportunity}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {analysis.opportunity > 70 ? 'High potential' : 
                   analysis.opportunity > 30 ? 'Good potential' : 'Low potential'}
                </p>
              </motion.div>
            </div>

            {/* Additional Metrics */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Competitor Sites:</span>
                  <span className="font-semibold text-gray-900">{analysis.competitorCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. CPC:</span>
                  <span className="font-semibold text-gray-900">${analysis.cpc}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trend:</span>
                  <span className={`font-semibold flex items-center ${
                    analysis.trend === 'up' ? 'text-green-600' : 
                    analysis.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      analysis.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {analysis.trend === 'up' ? 'Rising' : 
                     analysis.trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Keywords */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.relatedKeywords.map((relatedKeyword, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setKeyword(relatedKeyword);
                      analyzeKeyword();
                    }}
                    className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:shadow-md transition-all"
                  >
                    {relatedKeyword}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl text-center"
            >
              <h3 className="text-xl font-semibold mb-2">Ready to dominate these keywords?</h3>
              <p className="mb-4">Let our SEO experts create a custom strategy for your business</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Get Your Free SEO Audit
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SEOKeywordAnalyzer;