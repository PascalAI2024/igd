import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Download, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Youtube,
  AlertCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  importance: 'high' | 'medium' | 'low';
  checked: boolean;
  tip: string;
}

interface AuditScore {
  overall: number;
  byCategory: {
    [key: string]: {
      score: number;
      total: number;
    };
  };
}

const SocialMediaAudit: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Profile Optimization
    {
      id: '1',
      category: 'Profile Optimization',
      task: 'Profile picture is high-quality and on-brand',
      importance: 'high',
      checked: false,
      tip: 'Use the same profile picture across all platforms for brand consistency'
    },
    {
      id: '2',
      category: 'Profile Optimization',
      task: 'Bio/description includes keywords and clear value proposition',
      importance: 'high',
      checked: false,
      tip: 'Include your main keywords and a clear CTA in your bio'
    },
    {
      id: '3',
      category: 'Profile Optimization',
      task: 'Contact information is complete and accurate',
      importance: 'high',
      checked: false,
      tip: 'Make it easy for customers to reach you'
    },
    {
      id: '4',
      category: 'Profile Optimization',
      task: 'Website link is included and working',
      importance: 'high',
      checked: false,
      tip: 'Use link tracking to measure social media traffic'
    },
    {
      id: '5',
      category: 'Profile Optimization',
      task: 'Business hours are listed (where applicable)',
      importance: 'medium',
      checked: false,
      tip: 'Keep hours updated, especially during holidays'
    },

    // Content Strategy
    {
      id: '6',
      category: 'Content Strategy',
      task: 'Posting consistently (at least 3x per week)',
      importance: 'high',
      checked: false,
      tip: 'Use a content calendar to maintain consistency'
    },
    {
      id: '7',
      category: 'Content Strategy',
      task: 'Content mix includes variety (educational, promotional, entertaining)',
      importance: 'high',
      checked: false,
      tip: 'Follow the 80/20 rule: 80% value, 20% promotion'
    },
    {
      id: '8',
      category: 'Content Strategy',
      task: 'Using relevant hashtags strategically',
      importance: 'medium',
      checked: false,
      tip: 'Research trending hashtags in your industry'
    },
    {
      id: '9',
      category: 'Content Strategy',
      task: 'Visual content is high-quality and branded',
      importance: 'high',
      checked: false,
      tip: 'Use consistent filters and brand colors'
    },
    {
      id: '10',
      category: 'Content Strategy',
      task: 'Captions are engaging and include CTAs',
      importance: 'medium',
      checked: false,
      tip: 'Ask questions to encourage engagement'
    },

    // Engagement
    {
      id: '11',
      category: 'Engagement',
      task: 'Responding to comments within 24 hours',
      importance: 'high',
      checked: false,
      tip: 'Set up notifications to respond quickly'
    },
    {
      id: '12',
      category: 'Engagement',
      task: 'Engaging with followers\' content',
      importance: 'medium',
      checked: false,
      tip: 'Spend 15 minutes daily engaging with your community'
    },
    {
      id: '13',
      category: 'Engagement',
      task: 'Running interactive content (polls, Q&As, contests)',
      importance: 'medium',
      checked: false,
      tip: 'Interactive content boosts algorithm performance'
    },
    {
      id: '14',
      category: 'Engagement',
      task: 'Monitoring and responding to mentions',
      importance: 'high',
      checked: false,
      tip: 'Use social listening tools to track brand mentions'
    },

    // Analytics & Performance
    {
      id: '15',
      category: 'Analytics & Performance',
      task: 'Tracking follower growth monthly',
      importance: 'high',
      checked: false,
      tip: 'Look for patterns in what content drives growth'
    },
    {
      id: '16',
      category: 'Analytics & Performance',
      task: 'Monitoring engagement rates',
      importance: 'high',
      checked: false,
      tip: 'Aim for engagement rates above industry average'
    },
    {
      id: '17',
      category: 'Analytics & Performance',
      task: 'Analyzing best-performing content',
      importance: 'medium',
      checked: false,
      tip: 'Replicate successful content themes'
    },
    {
      id: '18',
      category: 'Analytics & Performance',
      task: 'Tracking website traffic from social media',
      importance: 'high',
      checked: false,
      tip: 'Use UTM parameters for accurate tracking'
    },

    // Platform-Specific
    {
      id: '19',
      category: 'Platform-Specific',
      task: 'Using platform-specific features (Stories, Reels, etc.)',
      importance: 'medium',
      checked: false,
      tip: 'New features often get priority in algorithms'
    },
    {
      id: '20',
      category: 'Platform-Specific',
      task: 'Optimizing for each platform\'s best practices',
      importance: 'medium',
      checked: false,
      tip: 'What works on Instagram may not work on LinkedIn'
    }
  ]);

  const [score, setScore] = useState<AuditScore>({
    overall: 0,
    byCategory: {}
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    calculateScore();
  }, [checklist]);

  const calculateScore = () => {
    const categories = [...new Set(checklist.map(item => item.category))];
    const byCategory: AuditScore['byCategory'] = {};
    
    categories.forEach(category => {
      const categoryItems = checklist.filter(item => item.category === category);
      const checkedItems = categoryItems.filter(item => item.checked);
      byCategory[category] = {
        score: checkedItems.length,
        total: categoryItems.length
      };
    });

    const totalChecked = checklist.filter(item => item.checked).length;
    const overallScore = Math.round((totalChecked / checklist.length) * 100);

    setScore({
      overall: overallScore,
      byCategory
    });
  };

  const toggleItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImportanceColor = (importance: string): string => {
    switch (importance) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categories = ['all', ...new Set(checklist.map(item => item.category))];
  const filteredChecklist = selectedCategory === 'all' 
    ? checklist 
    : checklist.filter(item => item.category === selectedCategory);

  const downloadReport = () => {
    const report = `
Social Media Audit Report
========================

Overall Score: ${score.overall}%

Category Breakdown:
${Object.entries(score.byCategory).map(([category, data]) => 
  `- ${category}: ${data.score}/${data.total} (${Math.round((data.score / data.total) * 100)}%)`
).join('\n')}

Completed Tasks:
${checklist.filter(item => item.checked).map(item => `✓ ${item.task}`).join('\n')}

Pending Tasks:
${checklist.filter(item => !item.checked).map(item => `○ ${item.task} (${item.importance} priority)`).join('\n')}

Next Steps:
1. Focus on high-priority unchecked items
2. Set up a content calendar for consistency
3. Implement social media management tools
4. Schedule monthly audits to track progress
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social-media-audit-report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Social Media Audit Checklist</h2>
        <p className="text-gray-600">Evaluate and improve your social media presence</p>
      </div>

      {/* Score Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 mb-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Overall Audit Score</h3>
          <div className="flex items-center justify-center">
            <span className={`text-6xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}%
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            {score.overall >= 80 ? 'Excellent! Your social media is well-optimized' :
             score.overall >= 60 ? 'Good progress, but room for improvement' :
             'Your social media needs attention'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(score.byCategory).map(([category, data]) => (
            <div key={category} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{category}</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.score}/{data.total}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
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

      {/* Checklist */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {filteredChecklist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gray-50 rounded-lg p-4 ${
                item.checked ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {item.checked ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`font-medium ${
                        item.checked ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {item.task}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getImportanceColor(item.importance)}`}>
                          {item.importance} priority
                        </span>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  {!item.checked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 flex items-start space-x-2"
                    >
                      <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">{item.tip}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowReport(!showReport)}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          {showReport ? 'Hide' : 'Show'} Detailed Report
        </motion.button>

        <AnimatePresence>
          {showReport && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-lg p-6 space-y-4"
            >
              <h3 className="font-semibold text-gray-900">Key Recommendations</h3>
              <ul className="space-y-2">
                {checklist
                  .filter(item => !item.checked && item.importance === 'high')
                  .slice(0, 3)
                  .map(item => (
                    <li key={item.id} className="flex items-start space-x-2">
                      <Target className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item.task}</span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadReport}
            className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </motion.button>
          
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-shadow flex items-center justify-center"
          >
            Get Professional Social Media Management
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAudit;