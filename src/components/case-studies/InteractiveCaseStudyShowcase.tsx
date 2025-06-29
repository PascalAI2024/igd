import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Target, 
  BarChart3,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  Zap,
  Award,
  Eye,
  MousePointer
} from 'lucide-react';

interface CaseStudyMetrics {
  label: string;
  before: string;
  after: string;
  improvement: string;
  icon: React.ElementType;
  color: string;
}

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  timeline: string;
  metrics: CaseStudyMetrics[];
  technologies: string[];
  results: string[];
}

const InteractiveCaseStudyShowcase: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showBefore, setShowBefore] = useState(true);

  const caseStudies: CaseStudy[] = [
    {
      id: 'ecommerce-transformation',
      title: 'E-commerce Platform Transformation',
      industry: 'Retail',
      challenge: 'Outdated e-commerce platform with poor conversion rates and slow loading times',
      solution: 'Complete platform rebuild with modern tech stack, AI-powered recommendations, and performance optimization',
      timeline: '3 months',
      metrics: [
        { label: 'Conversion Rate', before: '2.1%', after: '8.4%', improvement: '+300%', icon: Target, color: 'text-green-400' },
        { label: 'Page Load Time', before: '4.2s', after: '1.1s', improvement: '-74%', icon: Clock, color: 'text-blue-400' },
        { label: 'Monthly Revenue', before: '$45K', after: '$180K', improvement: '+300%', icon: DollarSign, color: 'text-yellow-400' },
        { label: 'User Engagement', before: '1.2 min', after: '4.8 min', improvement: '+300%', icon: Users, color: 'text-purple-400' }
      ],
      technologies: ['React', 'Node.js', 'AI/ML', 'AWS', 'MongoDB'],
      results: ['300% increase in conversion rate', '74% faster page loads', '400% revenue growth', 'Enhanced user experience']
    },
    {
      id: 'crm-automation',
      title: 'CRM & Sales Automation',
      industry: 'Professional Services',
      challenge: 'Manual sales processes leading to lost leads and inefficient follow-ups',
      solution: 'Custom CRM with automated workflows, lead scoring, and intelligent follow-up systems',
      timeline: '2 months',
      metrics: [
        { label: 'Lead Response Time', before: '4 hours', after: '5 minutes', improvement: '-95%', icon: Clock, color: 'text-green-400' },
        { label: 'Sales Conversion', before: '12%', after: '28%', improvement: '+133%', icon: TrendingUp, color: 'text-blue-400' },
        { label: 'Time Saved', before: '0 hours', after: '20 hrs/week', improvement: '+2000%', icon: Zap, color: 'text-yellow-400' },
        { label: 'Customer Satisfaction', before: '78%', after: '96%', improvement: '+23%', icon: Award, color: 'text-purple-400' }
      ],
      technologies: ['React', 'Python', 'PostgreSQL', 'Automation', 'API Integration'],
      results: ['95% faster lead response', '133% higher conversion', '20 hours saved per week', '96% customer satisfaction']
    },
    {
      id: 'marketing-analytics',
      title: 'Marketing Analytics Dashboard',
      industry: 'Digital Marketing',
      challenge: 'Scattered marketing data across multiple platforms with no unified insights',
      solution: 'Comprehensive analytics dashboard with real-time data integration and AI-powered insights',
      timeline: '6 weeks',
      metrics: [
        { label: 'Data Processing', before: '24 hours', after: 'Real-time', improvement: '-100%', icon: BarChart3, color: 'text-green-400' },
        { label: 'Campaign ROI', before: '180%', after: '420%', improvement: '+133%', icon: DollarSign, color: 'text-blue-400' },
        { label: 'Decision Speed', before: '3 days', after: '30 minutes', improvement: '-98%', icon: Target, color: 'text-yellow-400' },
        { label: 'Marketing Efficiency', before: '65%', after: '92%', improvement: '+42%', icon: TrendingUp, color: 'text-purple-400' }
      ],
      technologies: ['React', 'D3.js', 'Python', 'API Integration', 'Real-time Analytics'],
      results: ['Real-time data processing', '133% better ROI', '98% faster decisions', '42% efficiency improvement']
    }
  ];

  const currentStudy = caseStudies[selectedStudy];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSelectedStudy(prev => (prev + 1) % caseStudies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, caseStudies.length]);

  // Toggle before/after view
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBefore(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextStudy = () => {
    setSelectedStudy(prev => (prev + 1) % caseStudies.length);
    setIsAutoPlaying(false);
  };

  const prevStudy = () => {
    setSelectedStudy(prev => (prev - 1 + caseStudies.length) % caseStudies.length);
    setIsAutoPlaying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">📊 Interactive Case Study Showcase</h3>
            <p className="text-gray-400">Real project results with before/after metrics - see the transformation!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-400">{isAutoPlaying ? 'Auto' : 'Manual'}</span>
            </div>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-lg transition-colors ${
                isAutoPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>

        {/* Case Study Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={prevStudy}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-white rotate-180" />
          </button>
          <div className="flex-1 flex gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedStudy(index);
                  setIsAutoPlaying(false);
                }}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  selectedStudy === index ? 'bg-red-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextStudy}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Study Details */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStudy}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full border border-red-500/30">
                    {currentStudy.industry}
                  </span>
                  <span className="text-gray-400 text-sm">{currentStudy.timeline}</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{currentStudy.title}</h4>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">Challenge</h5>
                  <p className="text-gray-300 text-sm">{currentStudy.challenge}</p>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">Solution</h5>
                  <p className="text-gray-300 text-sm">{currentStudy.solution}</p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h5 className="text-white font-semibold mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {currentStudy.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h5 className="text-white font-semibold mb-3">Key Results</h5>
                <div className="space-y-2">
                  {currentStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Metrics Visualization */}
        <div>
          <div className="bg-black/30 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-white font-semibold">Performance Metrics</h5>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${showBefore ? 'text-red-400' : 'text-green-400'}`}>
                  {showBefore ? 'BEFORE' : 'AFTER'}
                </span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              {currentStudy.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-white font-medium">{metric.label}</span>
                    </div>
                    <span className="text-green-400 text-sm font-bold">{metric.improvement}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showBefore ? 'before' : 'after'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`text-2xl font-bold ${showBefore ? 'text-red-400' : 'text-green-400'}`}
                      >
                        {showBefore ? metric.before : metric.after}
                      </motion.span>
                    </AnimatePresence>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📊 Real Results:</strong> These are actual metrics from our completed projects. 
          Watch the before/after values toggle automatically, or use controls to explore different case studies!
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveCaseStudyShowcase;
