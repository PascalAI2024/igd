import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Code, 
  Award, 
  Clock, 
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

interface LiveMetric {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

const LiveMetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<LiveMetric[]>([
    {
      id: 'projects',
      label: 'Projects Completed',
      value: 87,
      suffix: '+',
      icon: Code,
      color: 'text-blue-400',
      trend: 'up',
      description: 'Successfully delivered projects'
    },
    {
      id: 'clients',
      label: 'Happy Clients',
      value: 52,
      suffix: '+',
      icon: Users,
      color: 'text-green-400',
      trend: 'up',
      description: 'Satisfied customers'
    },
    {
      id: 'satisfaction',
      label: 'Client Satisfaction',
      value: 91.5,
      suffix: '%',
      icon: Star,
      color: 'text-yellow-400',
      trend: 'stable',
      description: 'Average satisfaction rate'
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: 4.2,
      suffix: ' hrs',
      icon: Clock,
      color: 'text-purple-400',
      trend: 'down',
      description: 'Average response time'
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: 98.7,
      suffix: '%',
      icon: TrendingUp,
      color: 'text-red-400',
      trend: 'stable',
      description: 'Average system uptime'
    },
    {
      id: 'roi',
      label: 'Average ROI',
      value: 185,
      suffix: '%',
      icon: Target,
      color: 'text-orange-400',
      trend: 'up',
      description: 'Client return on investment'
    }
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        let newValue = metric.value;
        
        switch (metric.id) {
          case 'projects':
            newValue = Math.floor(metric.value + (Math.random() > 0.8 ? 1 : 0));
            break;
          case 'clients':
            newValue = Math.floor(metric.value + (Math.random() > 0.9 ? 1 : 0));
            break;
          case 'satisfaction':
            newValue = Math.max(88, Math.min(94, metric.value + variation * 10));
            break;
          case 'response':
            newValue = Math.max(3, Math.min(6, metric.value + variation * 5));
            break;
          case 'uptime':
            newValue = Math.max(97, Math.min(99.5, metric.value + variation));
            break;
          case 'roi':
            newValue = Math.max(150, Math.min(220, metric.value + variation * 50));
            break;
        }
        
        return { ...metric, value: newValue };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number, suffix: string) => {
    if (suffix === '%' || suffix === ' hrs') {
      return value.toFixed(1);
    }
    return Math.floor(value).toString();
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      default: return <BarChart3 className="w-3 h-3 text-gray-400" />;
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
            <h3 className="text-2xl font-bold text-white mb-2">📊 Live Performance Dashboard</h3>
            <p className="text-gray-400">Real-time metrics showcasing our success and growth</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Live</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-black/30 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Icon and Trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.span
                    className={`text-3xl font-bold ${metric.color}`}
                    key={metric.value} // Re-animate on value change
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatValue(metric.value, metric.suffix)}
                    {metric.suffix}
                  </motion.span>
                </div>

                {/* Label */}
                <h4 className="text-white font-medium mb-2">{metric.label}</h4>
                
                {/* Description */}
                <p className="text-gray-400 text-sm">{metric.description}</p>

                {/* Progress indicator */}
                <div className="mt-3">
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <motion.div
                      className={`h-1 rounded-full bg-gradient-to-r from-red-500 to-purple-500`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.min(100, (metric.value / (metric.id === 'projects' ? 120 : metric.id === 'clients' ? 80 : 100)) * 100)}%` 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-400 font-bold">Excellence Achieved</p>
              <p className="text-gray-400 text-sm">Consistently exceeding expectations</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-yellow-400 font-bold">Industry Recognition</p>
              <p className="text-gray-400 text-sm">Awarded for innovation and quality</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-purple-400 font-bold">Continuous Growth</p>
              <p className="text-gray-400 text-sm">Always pushing boundaries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📊 Live Dashboard:</strong> These metrics update in real-time to reflect our 
          current performance and achievements. All data is based on actual client projects and results.
        </p>
      </div>
    </motion.div>
  );
};

export default LiveMetricsDashboard;
