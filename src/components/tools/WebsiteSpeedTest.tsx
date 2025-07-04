import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Monitor, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface SpeedMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface CoreWebVital {
  name: string;
  acronym: string;
  value: number;
  unit: string;
  threshold: { good: number; poor: number };
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface SpeedResults {
  url: string;
  score: number;
  metrics: SpeedMetric[];
  coreWebVitals: CoreWebVital[];
  opportunities: {
    title: string;
    impact: 'high' | 'medium' | 'low';
    estimatedSavings: string;
    description: string;
  }[];
}

const WebsiteSpeedTest: React.FC = () => {
  const [url, setUrl] = useState('');
  const [testing, setTesting] = useState(false);
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [results, setResults] = useState<SpeedResults | null>(null);

  // Generate mock speed test data
  const generateMockResults = (url: string): SpeedResults => {
    const score = Math.floor(Math.random() * 40) + 60; // 60-100 score
    
    const generateMetricStatus = (value: number, goodThreshold: number, poorThreshold: number): 'good' | 'needs-improvement' | 'poor' => {
      if (value <= goodThreshold) return 'good';
      if (value <= poorThreshold) return 'needs-improvement';
      return 'poor';
    };

    const fcp = Number((Math.random() * 3 + 0.5).toFixed(1));
    const lcp = Number((Math.random() * 3 + 1).toFixed(1));
    const fid = Math.floor(Math.random() * 200) + 50;
    const cls = Number((Math.random() * 0.3).toFixed(3));

    return {
      url,
      score,
      metrics: [
        {
          name: 'Time to Interactive',
          value: Number((Math.random() * 3 + 2).toFixed(1)),
          unit: 's',
          status: generateMetricStatus(2.5, 3.8, 7.3),
          description: 'Time until page becomes fully interactive'
        },
        {
          name: 'Speed Index',
          value: Number((Math.random() * 2 + 1.5).toFixed(1)),
          unit: 's',
          status: generateMetricStatus(1.8, 3.4, 5.8),
          description: 'How quickly contents are visually displayed'
        },
        {
          name: 'Total Blocking Time',
          value: Math.floor(Math.random() * 300) + 100,
          unit: 'ms',
          status: generateMetricStatus(150, 300, 600),
          description: 'Time blocked by long tasks'
        },
        {
          name: 'Largest Contentful Paint',
          value: lcp,
          unit: 's',
          status: generateMetricStatus(lcp, 2.5, 4.0),
          description: 'When the main content is visible'
        }
      ],
      coreWebVitals: [
        {
          name: 'Largest Contentful Paint',
          acronym: 'LCP',
          value: lcp,
          unit: 's',
          threshold: { good: 2.5, poor: 4.0 },
          status: generateMetricStatus(lcp, 2.5, 4.0),
          description: 'Loading performance'
        },
        {
          name: 'First Input Delay',
          acronym: 'FID',
          value: fid,
          unit: 'ms',
          threshold: { good: 100, poor: 300 },
          status: generateMetricStatus(fid, 100, 300),
          description: 'Interactivity'
        },
        {
          name: 'Cumulative Layout Shift',
          acronym: 'CLS',
          value: cls,
          unit: '',
          threshold: { good: 0.1, poor: 0.25 },
          status: generateMetricStatus(cls, 0.1, 0.25),
          description: 'Visual stability'
        }
      ],
      opportunities: [
        {
          title: 'Optimize Images',
          impact: 'high',
          estimatedSavings: '2.3s',
          description: 'Serve images in next-gen formats (WebP, AVIF) and properly size them'
        },
        {
          title: 'Minify JavaScript',
          impact: 'medium',
          estimatedSavings: '0.8s',
          description: 'Remove unused code and minimize JavaScript bundles'
        },
        {
          title: 'Enable Caching',
          impact: 'high',
          estimatedSavings: '1.5s',
          description: 'Leverage browser caching for static assets'
        },
        {
          title: 'Reduce Server Response Time',
          impact: 'medium',
          estimatedSavings: '0.4s',
          description: 'Optimize server configuration and database queries'
        }
      ]
    };
  };

  const runSpeedTest = () => {
    if (!url.trim()) return;
    
    setTesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(generateMockResults(url));
      setTesting(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: 'good' | 'needs-improvement' | 'poor') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Website Speed Test
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Test your website performance and Core Web Vitals
        </p>
      </div>

      {/* URL Input */}
      <div className="mb-6">
        <div className="flex gap-4 max-w-3xl">
          <div className="flex-1 relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && runSpeedTest()}
              placeholder="Enter website URL (e.g., https://example.com)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={runSpeedTest}
            disabled={testing || !url.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {testing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Test Speed
              </>
            )}
          </button>
        </div>
      </div>

      {/* Device Toggle */}
      <div className="mb-8">
        <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setDevice('mobile')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 ${
              device === 'mobile'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
          <button
            onClick={() => setDevice('desktop')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 ${
              device === 'desktop'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Desktop
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
          {/* Overall Score */}
          <div className="mb-8 text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - results.score / 100)}`}
                  className={`${getScoreColor(results.score)} transition-all duration-1000`}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}
                </span>
                <span className="text-gray-600 dark:text-gray-400">Performance</span>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Core Web Vitals
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {results.coreWebVitals.map((vital, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {vital.acronym}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {vital.name}
                      </p>
                    </div>
                    {getStatusIcon(vital.status)}
                  </div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {vital.value}{vital.unit}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {vital.description}
                  </p>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Good: ≤{vital.threshold.good}{vital.unit} • Poor: ≥{vital.threshold.poor}{vital.unit}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-3">
              {results.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {metric.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {metric.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {metric.value}{metric.unit}
                    </span>
                    {getStatusIcon(metric.status)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optimization Opportunities */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Optimization Opportunities
            </h3>
            <div className="space-y-4">
              {results.opportunities.map((opportunity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {opportunity.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(opportunity.impact)}`}>
                        {opportunity.impact} impact
                      </span>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Save {opportunity.estimatedSavings}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {opportunity.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clear Results */}
          <button
            onClick={() => {
              setResults(null);
              setUrl('');
            }}
            className="mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Clear Results
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WebsiteSpeedTest;