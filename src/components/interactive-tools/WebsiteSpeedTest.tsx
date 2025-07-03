import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Globe, Smartphone, Monitor, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface SpeedMetrics {
  url: string;
  loadTime: number;
  performanceScore: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  recommendations: string[];
  mobileScore: number;
  desktopScore: number;
  pageSizeKB: number;
  requests: number;
}

const WebsiteSpeedTest: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [metrics, setMetrics] = useState<SpeedMetrics | null>(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isTesting) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 20, 95));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTesting]);

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const testSpeed = useCallback(async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a website URL');
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsTesting(true);
    setError('');
    setMetrics(null);
    setProgress(0);

    // Simulate API call with realistic data generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock metrics
    const mockMetrics: SpeedMetrics = {
      url: trimmedUrl,
      loadTime: parseFloat((Math.random() * 4 + 1).toFixed(2)),
      performanceScore: Math.floor(Math.random() * 40 + 60),
      firstContentfulPaint: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
      largestContentfulPaint: parseFloat((Math.random() * 3 + 1).toFixed(2)),
      totalBlockingTime: Math.floor(Math.random() * 500),
      cumulativeLayoutShift: parseFloat((Math.random() * 0.3).toFixed(3)),
      timeToInteractive: parseFloat((Math.random() * 3 + 1.5).toFixed(2)),
      recommendations: generateRecommendations(),
      mobileScore: Math.floor(Math.random() * 40 + 50),
      desktopScore: Math.floor(Math.random() * 30 + 70),
      pageSizeKB: Math.floor(Math.random() * 3000 + 500),
      requests: Math.floor(Math.random() * 100 + 20)
    };

    setMetrics(mockMetrics);
    setProgress(100);
    setIsTesting(false);
  }, [url]);

  const generateRecommendations = (): string[] => {
    const allRecommendations = [
      'Optimize and compress images',
      'Enable browser caching',
      'Minify JavaScript and CSS files',
      'Use a Content Delivery Network (CDN)',
      'Reduce server response time',
      'Eliminate render-blocking resources',
      'Enable Gzip compression',
      'Optimize web fonts loading',
      'Reduce redirects',
      'Implement lazy loading for images'
    ];
    
    // Return 3-5 random recommendations
    const count = Math.floor(Math.random() * 3) + 3;
    return allRecommendations.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (score >= 50) return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
    return <XCircle className="w-6 h-6 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Website Speed Test</h2>
        <p className="text-gray-600">Test your website's performance and get actionable insights</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && testSpeed()}
            placeholder="Enter website URL (e.g., example.com)"
            className="w-full px-12 py-4 pr-32 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={testSpeed}
            disabled={isTesting}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:bg-gray-400"
          >
            {isTesting ? (
              <span className="flex items-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Testing...
              </span>
            ) : (
              <span className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Test Speed
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
            <AlertTriangle className="w-4 h-4 mr-1" />
            {error}
          </motion.p>
        )}
      </div>

      {/* Progress Bar */}
      <AnimatePresence>
        {isTesting && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">Analyzing website performance...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Overall Performance Score */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Performance Score</h3>
              <div className="flex items-center justify-center mb-4">
                {getScoreIcon(metrics.performanceScore)}
                <span className={`text-6xl font-bold ml-4 ${getScoreColor(metrics.performanceScore)}`}>
                  {metrics.performanceScore}
                </span>
                <span className="text-2xl text-gray-600 ml-2">/100</span>
              </div>
              <p className="text-gray-600">
                {metrics.performanceScore >= 90 ? 'Excellent performance!' :
                 metrics.performanceScore >= 50 ? 'Good, but room for improvement' :
                 'Performance needs attention'}
              </p>
            </div>

            {/* Device Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Desktop Score</h4>
                  <Monitor className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center">
                  {getScoreIcon(metrics.desktopScore)}
                  <span className={`text-3xl font-bold ml-2 ${getScoreColor(metrics.desktopScore)}`}>
                    {metrics.desktopScore}
                  </span>
                  <span className="text-gray-600 ml-1">/100</span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Mobile Score</h4>
                  <Smartphone className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center">
                  {getScoreIcon(metrics.mobileScore)}
                  <span className={`text-3xl font-bold ml-2 ${getScoreColor(metrics.mobileScore)}`}>
                    {metrics.mobileScore}
                  </span>
                  <span className="text-gray-600 ml-1">/100</span>
                </div>
              </motion.div>
            </div>

            {/* Core Web Vitals */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Load Time</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.loadTime}s</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">First Paint</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.firstContentfulPaint}s</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Interactive</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.timeToInteractive}s</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Page Size</p>
                  <p className="text-2xl font-bold text-gray-900">{(metrics.pageSizeKB / 1024).toFixed(1)}MB</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
              <ul className="space-y-3">
                {metrics.recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{recommendation}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl text-center"
            >
              <h3 className="text-xl font-semibold mb-2">Want to improve your website speed?</h3>
              <p className="mb-4">Our experts can optimize your site for maximum performance</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Get Free Performance Audit
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteSpeedTest;