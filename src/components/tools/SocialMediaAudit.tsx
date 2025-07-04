import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown, ChevronUp, AlertCircle, TrendingUp, Users, Target, BarChart } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  tip: string;
  impact: 'high' | 'medium' | 'low';
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ChecklistItem[];
  description: string;
}

const categories: Category[] = [
  {
    id: 'profile-optimization',
    name: 'Profile Optimization',
    icon: Users,
    description: 'Ensure your profiles make a strong first impression',
    items: [
      {
        id: 'complete-bio',
        text: 'Complete bio/description with keywords',
        tip: 'Include relevant keywords naturally in your bio to improve discoverability',
        impact: 'high'
      },
      {
        id: 'profile-photo',
        text: 'Professional profile photo (high resolution)',
        tip: 'Use a consistent profile photo across all platforms for brand recognition',
        impact: 'high'
      },
      {
        id: 'cover-photo',
        text: 'Branded cover/header image',
        tip: 'Design covers that showcase your value proposition or current campaigns',
        impact: 'medium'
      },
      {
        id: 'contact-info',
        text: 'Complete contact information',
        tip: 'Make it easy for customers to reach you with multiple contact options',
        impact: 'high'
      },
      {
        id: 'website-link',
        text: 'Website link in bio',
        tip: 'Use link-in-bio tools to maximize this single link opportunity',
        impact: 'high'
      },
      {
        id: 'business-hours',
        text: 'Business hours listed (if applicable)',
        tip: 'Keep hours updated, especially during holidays or special events',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    icon: Target,
    description: 'Create engaging content that resonates with your audience',
    items: [
      {
        id: 'content-calendar',
        text: 'Content calendar in place',
        tip: 'Plan content at least 2-4 weeks in advance for consistency',
        impact: 'high'
      },
      {
        id: 'posting-consistency',
        text: 'Consistent posting schedule',
        tip: 'Post at optimal times when your audience is most active',
        impact: 'high'
      },
      {
        id: 'content-mix',
        text: 'Varied content types (images, videos, stories)',
        tip: 'Follow the 80/20 rule: 80% valuable content, 20% promotional',
        impact: 'high'
      },
      {
        id: 'brand-voice',
        text: 'Consistent brand voice and tone',
        tip: 'Document your brand voice guidelines for all content creators',
        impact: 'medium'
      },
      {
        id: 'hashtag-strategy',
        text: 'Strategic hashtag usage',
        tip: 'Mix popular, niche, and branded hashtags for maximum reach',
        impact: 'medium'
      },
      {
        id: 'user-generated',
        text: 'User-generated content strategy',
        tip: 'Encourage and showcase customer content to build trust',
        impact: 'high'
      },
      {
        id: 'trending-topics',
        text: 'Leverage trending topics appropriately',
        tip: 'Join conversations authentically without forcing your brand',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'engagement',
    name: 'Engagement & Community',
    icon: CheckCircle,
    description: 'Build meaningful relationships with your audience',
    items: [
      {
        id: 'response-time',
        text: 'Respond to comments within 24 hours',
        tip: 'Set up notifications to never miss engagement opportunities',
        impact: 'high'
      },
      {
        id: 'dm-management',
        text: 'Manage DMs and private messages',
        tip: 'Use saved replies for common questions to save time',
        impact: 'high'
      },
      {
        id: 'community-engagement',
        text: 'Engage with community posts',
        tip: 'Spend 15-30 minutes daily engaging with your target audience',
        impact: 'medium'
      },
      {
        id: 'influencer-relationships',
        text: 'Build relationships with influencers',
        tip: 'Start with micro-influencers in your niche for better ROI',
        impact: 'medium'
      },
      {
        id: 'contests-campaigns',
        text: 'Run interactive contests/campaigns',
        tip: 'Ensure contests comply with platform rules and local laws',
        impact: 'high'
      },
      {
        id: 'social-listening',
        text: 'Monitor brand mentions',
        tip: 'Use social listening tools to catch untagged mentions',
        impact: 'medium'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & Performance',
    icon: BarChart,
    description: 'Track metrics and optimize your strategy',
    items: [
      {
        id: 'analytics-setup',
        text: 'Analytics tools properly configured',
        tip: 'Use native analytics plus third-party tools for deeper insights',
        impact: 'high'
      },
      {
        id: 'kpi-tracking',
        text: 'Track relevant KPIs regularly',
        tip: 'Focus on engagement rate, reach, and conversions over vanity metrics',
        impact: 'high'
      },
      {
        id: 'competitor-analysis',
        text: 'Regular competitor analysis',
        tip: 'Analyze top 3-5 competitors monthly for trends and opportunities',
        impact: 'medium'
      },
      {
        id: 'ab-testing',
        text: 'A/B test content and posting times',
        tip: 'Test one variable at a time for clear insights',
        impact: 'medium'
      },
      {
        id: 'roi-measurement',
        text: 'Measure social media ROI',
        tip: 'Track both direct conversions and assisted conversions',
        impact: 'high'
      },
      {
        id: 'report-insights',
        text: 'Monthly performance reports',
        tip: 'Share insights with your team to align strategy',
        impact: 'medium'
      }
    ]
  }
];

const SocialMediaAudit: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map(c => c.id))
  );
  const [showResults, setShowResults] = useState(false);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const getCategoryScore = (category: Category) => {
    const checkedCount = category.items.filter(item => checkedItems.has(item.id)).length;
    return Math.round((checkedCount / category.items.length) * 100);
  };

  const getOverallScore = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    return Math.round((checkedItems.size / totalItems) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Excellent! Your social media presence is well-optimized.';
    if (score >= 60) return 'Good progress! Focus on the unchecked items to improve further.';
    if (score >= 40) return 'There\'s room for improvement. Prioritize high-impact items.';
    return 'Let\'s get started! Begin with profile optimization basics.';
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

  const getPriorityItems = () => {
    const uncheckedItems: { item: ChecklistItem; category: string }[] = [];
    
    categories.forEach(category => {
      category.items.forEach(item => {
        if (!checkedItems.has(item.id)) {
          uncheckedItems.push({ item, category: category.name });
        }
      });
    });
    
    return uncheckedItems
      .sort((a, b) => {
        const impactOrder = { high: 0, medium: 1, low: 2 };
        return impactOrder[a.item.impact] - impactOrder[b.item.impact];
      })
      .slice(0, 5);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Social Media Audit Checklist
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Evaluate your social media presence and identify areas for improvement
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Overall Progress
          </h3>
          <span className={`text-3xl font-bold ${getScoreColor(getOverallScore())}`}>
            {getOverallScore()}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${getOverallScore()}%` }}
            transition={{ duration: 0.5 }}
            className={`h-3 rounded-full ${
              getOverallScore() >= 80 ? 'bg-green-500' :
              getOverallScore() >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {getScoreMessage(getOverallScore())}
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6 mb-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <category.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-lg font-semibold ${getScoreColor(getCategoryScore(category))}`}>
                    {getCategoryScore(category)}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.items.filter(item => checkedItems.has(item.id)).length} / {category.items.length} items
                  </p>
                </div>
                {expandedCategories.has(category.id) ? 
                  <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                }
              </div>
            </button>

            <AnimatePresence>
              {expandedCategories.has(category.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 mt-0.5"
                          >
                            {checkedItems.has(item.id) ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`font-medium ${
                                checkedItems.has(item.id) 
                                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {item.text}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(item.impact)}`}>
                                {item.impact} impact
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-1">
                              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              {item.tip}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Show Results Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowResults(true)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          Get Recommendations
        </button>
      </div>

      {/* Results & Recommendations */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Personalized Action Plan
          </h3>
          
          {/* Category Scores */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {categories.map(category => (
              <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </span>
                  </div>
                  <span className={`font-semibold ${getScoreColor(getCategoryScore(category))}`}>
                    {getCategoryScore(category)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      getCategoryScore(category) >= 80 ? 'bg-green-500' :
                      getCategoryScore(category) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getCategoryScore(category)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Priority Items */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Top 5 Priority Items
            </h4>
            <div className="space-y-3">
              {getPriorityItems().map((item, index) => (
                <div key={item.item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {item.item.text}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Category: {item.category} • {item.item.tip}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(item.item.impact)}`}>
                      {item.item.impact} impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 p-4 bg-blue-600 dark:bg-blue-700 rounded-lg text-white">
            <p className="font-semibold mb-1">Ready to improve your social media presence?</p>
            <p className="text-sm text-blue-100">
              Start with the high-impact items above. Our team can help you implement these improvements and develop a comprehensive social media strategy.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SocialMediaAudit;