import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Eye, 
  MousePointer, 
  Target, 
  TrendingUp, 
  ArrowDown, 
  ArrowRight,
  Plus,
  Settings,
  BarChart3,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  color: string;
  icon: React.ElementType;
}

interface FunnelMetrics {
  totalVisitors: number;
  totalConversions: number;
  overallConversionRate: number;
  revenue: number;
}

const LiveFunnelBuilder: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  
  const [funnelStages, setFunnelStages] = useState<FunnelStage[]>([
    { id: 'awareness', name: 'Awareness', visitors: 10000, conversions: 3000, conversionRate: 30, color: 'bg-blue-500', icon: Eye },
    { id: 'interest', name: 'Interest', visitors: 3000, conversions: 1200, conversionRate: 40, color: 'bg-green-500', icon: MousePointer },
    { id: 'consideration', name: 'Consideration', visitors: 1200, conversions: 480, conversionRate: 40, color: 'bg-yellow-500', icon: Target },
    { id: 'intent', name: 'Purchase Intent', visitors: 480, conversions: 192, conversionRate: 40, color: 'bg-orange-500', icon: TrendingUp },
    { id: 'purchase', name: 'Purchase', visitors: 192, conversions: 96, conversionRate: 50, color: 'bg-red-500', icon: CheckCircle }
  ]);

  const [metrics, setMetrics] = useState<FunnelMetrics>({
    totalVisitors: 10000,
    totalConversions: 96,
    overallConversionRate: 0.96,
    revenue: 48000
  });

  // Simulate real-time funnel updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setFunnelStages(prev => prev.map((stage, index) => {
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const newConversionRate = Math.max(20, Math.min(60, stage.conversionRate + variation));
        const newConversions = Math.floor(stage.visitors * (newConversionRate / 100));
        
        return {
          ...stage,
          conversionRate: newConversionRate,
          conversions: newConversions
        };
      }));

      // Update overall metrics
      setMetrics(prev => ({
        ...prev,
        totalVisitors: prev.totalVisitors + Math.floor(Math.random() * 10),
        revenue: prev.revenue + Math.floor(Math.random() * 100)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Calculate funnel flow
  useEffect(() => {
    setFunnelStages(prev => {
      const updated = [...prev];
      for (let i = 1; i < updated.length; i++) {
        updated[i].visitors = updated[i - 1].conversions;
        updated[i].conversions = Math.floor(updated[i].visitors * (updated[i].conversionRate / 100));
      }
      return updated;
    });

    const totalConversions = funnelStages[funnelStages.length - 1]?.conversions || 0;
    const overallRate = (totalConversions / metrics.totalVisitors) * 100;
    
    setMetrics(prev => ({
      ...prev,
      totalConversions,
      overallConversionRate: overallRate
    }));
  }, [funnelStages]);

  const optimizeFunnel = () => {
    setFunnelStages(prev => prev.map(stage => ({
      ...stage,
      conversionRate: Math.min(stage.conversionRate * 1.1, 60) // 10% improvement, max 60%
    })));
  };

  const resetFunnel = () => {
    setFunnelStages([
      { id: 'awareness', name: 'Awareness', visitors: 10000, conversions: 3000, conversionRate: 30, color: 'bg-blue-500', icon: Eye },
      { id: 'interest', name: 'Interest', visitors: 3000, conversions: 1200, conversionRate: 40, color: 'bg-green-500', icon: MousePointer },
      { id: 'consideration', name: 'Consideration', visitors: 1200, conversions: 480, conversionRate: 40, color: 'bg-yellow-500', icon: Target },
      { id: 'intent', name: 'Purchase Intent', visitors: 480, conversions: 192, conversionRate: 40, color: 'bg-orange-500', icon: TrendingUp },
      { id: 'purchase', name: 'Purchase', visitors: 192, conversions: 96, conversionRate: 50, color: 'bg-red-500', icon: CheckCircle }
    ]);
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
            <h3 className="text-2xl font-bold text-white mb-2">🎯 Live Lead Generation Funnel Builder</h3>
            <p className="text-gray-400">Interactive funnel optimization - watch conversion rates update in real-time!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-400">{isRunning ? 'Live' : 'Paused'}</span>
            </div>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-2 rounded-lg transition-colors ${
                isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={optimizeFunnel}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Zap className="w-4 h-4" />
              Optimize
            </button>
            <button
              onClick={resetFunnel}
              className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Visitors', value: metrics.totalVisitors.toLocaleString(), icon: Users, color: 'text-blue-400' },
            { label: 'Conversions', value: metrics.totalConversions.toLocaleString(), icon: Target, color: 'text-green-400' },
            { label: 'Conversion Rate', value: `${metrics.overallConversionRate.toFixed(2)}%`, icon: TrendingUp, color: 'text-purple-400' },
            { label: 'Revenue', value: `$${metrics.revenue.toLocaleString()}`, icon: BarChart3, color: 'text-yellow-400' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-4 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                  <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h4>
        
        <div className="relative">
          {funnelStages.map((stage, index) => {
            const width = (stage.visitors / funnelStages[0].visitors) * 100;
            const isSelected = selectedStage === stage.id;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-4"
              >
                {/* Funnel Stage */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-red-500' : ''
                  }`}
                  style={{ width: `${width}%`, minWidth: '200px' }}
                >
                  <div className={`${stage.color} p-4 rounded-lg border border-white/10 relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stage.icon className="w-6 h-6 text-white" />
                        <div>
                          <h5 className="text-white font-medium">{stage.name}</h5>
                          <p className="text-white/80 text-sm">
                            {stage.visitors.toLocaleString()} visitors
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {stage.conversionRate.toFixed(1)}%
                        </p>
                        <p className="text-white/80 text-sm">
                          {stage.conversions.toLocaleString()} converted
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow between stages */}
                {index < funnelStages.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ArrowDown className="w-6 h-6 text-gray-400" />
                  </div>
                )}

                {/* Stage Details */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 bg-black/30 border border-white/10 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-white font-medium mb-2">Stage Performance</h6>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Drop-off Rate:</span>
                              <span className="text-red-400 text-sm">
                                {(100 - stage.conversionRate).toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm">Lost Visitors:</span>
                              <span className="text-gray-300 text-sm">
                                {(stage.visitors - stage.conversions).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2">Optimization Tips</h6>
                          <div className="space-y-1">
                            <p className="text-gray-400 text-sm">• Improve page load speed</p>
                            <p className="text-gray-400 text-sm">• A/B test call-to-action</p>
                            <p className="text-gray-400 text-sm">• Reduce form fields</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Funnel Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Biggest Drop-off
            </h5>
            {(() => {
              const biggestDropoff = funnelStages.reduce((prev, current) => 
                (100 - current.conversionRate) > (100 - prev.conversionRate) ? current : prev
              );
              return (
                <div>
                  <p className="text-gray-300">{biggestDropoff.name}</p>
                  <p className="text-red-400 text-sm">
                    {(100 - biggestDropoff.conversionRate).toFixed(1)}% drop-off rate
                  </p>
                </div>
              );
            })()}
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <h5 className="text-white font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Best Performer
            </h5>
            {(() => {
              const bestPerformer = funnelStages.reduce((prev, current) => 
                current.conversionRate > prev.conversionRate ? current : prev
              );
              return (
                <div>
                  <p className="text-gray-300">{bestPerformer.name}</p>
                  <p className="text-green-400 text-sm">
                    {bestPerformer.conversionRate.toFixed(1)}% conversion rate
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🎯 This is what we build:</strong> Interactive lead generation funnels with 
          real-time conversion tracking, optimization tools, and comprehensive analytics. Click on stages to see detailed insights!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveFunnelBuilder;
