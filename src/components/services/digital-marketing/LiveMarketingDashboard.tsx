import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  DollarSign, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface CampaignData {
  id: number;
  name: string;
  platform: 'google' | 'facebook' | 'instagram' | 'linkedin' | 'email';
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  roas: number;
  status: 'active' | 'paused' | 'completed';
}

interface MetricData {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const LiveMarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'analytics' | 'realtime'>('overview');
  const [isLive, setIsLive] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: 'Total Impressions', value: '2.4M', change: 12.5, icon: Eye, color: 'text-blue-400' },
    { label: 'Click-Through Rate', value: '3.2%', change: 8.3, icon: MousePointer, color: 'text-green-400' },
    { label: 'Conversions', value: '1,247', change: 15.7, icon: Target, color: 'text-purple-400' },
    { label: 'ROAS', value: '4.2x', change: 22.1, icon: DollarSign, color: 'text-yellow-400' }
  ]);

  const [campaigns, setCampaigns] = useState<CampaignData[]>([
    { id: 1, name: 'Holiday Sale Campaign', platform: 'google', impressions: 125000, clicks: 4200, conversions: 89, spend: 2500, ctr: 3.36, cpc: 0.60, roas: 4.2, status: 'active' },
    { id: 2, name: 'Brand Awareness Drive', platform: 'facebook', impressions: 89000, clicks: 2800, conversions: 45, spend: 1800, ctr: 3.15, cpc: 0.64, roas: 3.8, status: 'active' },
    { id: 3, name: 'Product Launch', platform: 'instagram', impressions: 67000, clicks: 2100, conversions: 67, spend: 1200, ctr: 3.13, cpc: 0.57, roas: 5.1, status: 'active' },
    { id: 4, name: 'B2B Lead Generation', platform: 'linkedin', impressions: 34000, clicks: 890, conversions: 23, spend: 1500, ctr: 2.62, cpc: 1.69, roas: 2.9, status: 'paused' }
  ]);

  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 1247,
    pageViews: 3456,
    bounceRate: 32.4,
    avgSessionDuration: '2:34'
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Update metrics
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        change: metric.change + (Math.random() - 0.5) * 2
      })));

      // Update realtime data
      setRealtimeData(prev => ({
        activeUsers: Math.max(800, prev.activeUsers + Math.floor((Math.random() - 0.5) * 50)),
        pageViews: prev.pageViews + Math.floor(Math.random() * 10),
        bounceRate: Math.max(20, Math.min(50, prev.bounceRate + (Math.random() - 0.5) * 2)),
        avgSessionDuration: prev.avgSessionDuration // Keep static for demo
      }));

      // Update campaign data
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        impressions: campaign.impressions + Math.floor(Math.random() * 100),
        clicks: campaign.clicks + Math.floor(Math.random() * 10),
        conversions: campaign.conversions + (Math.random() > 0.8 ? 1 : 0)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google': return 'bg-blue-500';
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-pink-500';
      case 'linkedin': return 'bg-blue-700';
      case 'email': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
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
            <h3 className="text-2xl font-bold text-white mb-2">📊 Live Marketing Analytics Dashboard</h3>
            <p className="text-gray-400">Real-time campaign performance and analytics - see our marketing automation in action!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-400">{isLive ? 'Live' : 'Paused'}</span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`p-2 rounded-lg transition-colors ${
                isLive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isLive ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex space-x-2">
          {(['24h', '7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                timeRange === range
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-white/10">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'campaigns', label: 'Campaigns', icon: Target },
          { id: 'analytics', label: 'Analytics', icon: PieChart },
          { id: 'realtime', label: 'Real-time', icon: Activity }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === id
                ? 'bg-red-500/20 text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(metric.change).toFixed(1)}%
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-black/30 p-6 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-4">Campaign Performance Trend</h4>
              <div className="h-64 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 rounded flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Interactive Chart Visualization</p>
                  <p className="text-gray-500 text-sm">Real-time performance tracking</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'campaigns' && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Campaign List */}
            <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
              <div className="grid grid-cols-8 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
                <div>Campaign</div>
                <div>Platform</div>
                <div>Impressions</div>
                <div>Clicks</div>
                <div>CTR</div>
                <div>CPC</div>
                <div>ROAS</div>
                <div>Status</div>
              </div>
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-8 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium">{campaign.name}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs text-white ${getPlatformColor(campaign.platform)}`}>
                      {campaign.platform}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-300">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">{campaign.ctr.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-300">${campaign.cpc.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium">{campaign.roas.toFixed(1)}x</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-4">Traffic Sources</h4>
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Interactive Pie Chart</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-4">Conversion Funnel</h4>
                <div className="h-48 bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Funnel Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'realtime' && (
          <motion.div
            key="realtime"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Active Users', value: realtimeData.activeUsers.toLocaleString(), icon: Users, color: 'text-green-400' },
                { label: 'Page Views', value: realtimeData.pageViews.toLocaleString(), icon: Eye, color: 'text-blue-400' },
                { label: 'Bounce Rate', value: `${realtimeData.bounceRate.toFixed(1)}%`, icon: Activity, color: 'text-orange-400' },
                { label: 'Avg Session', value: realtimeData.avgSessionDuration, icon: Clock, color: 'text-purple-400' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Activity Feed */}
            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Live Activity Feed
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[
                  'New conversion from Google Ads campaign',
                  'User from New York visited pricing page',
                  'Email campaign click-through detected',
                  'Social media engagement spike detected',
                  'New lead captured from contact form'
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-gray-300 text-sm">{activity}</p>
                    <span className="text-gray-500 text-xs ml-auto">Just now</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📊 This is what we build:</strong> Comprehensive marketing analytics platforms with 
          real-time data tracking, campaign management, conversion optimization, and automated reporting. Every metric updates live!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveMarketingDashboard;
