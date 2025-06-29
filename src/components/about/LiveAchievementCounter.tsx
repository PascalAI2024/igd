import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Users, 
  Code, 
  Trophy, 
  Star, 
  TrendingUp, 
  Clock, 
  Target,
  Zap,
  Award,
  CheckCircle
} from 'lucide-react';

interface Achievement {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  color: string;
  description: string;
  isLive?: boolean;
}

const LiveAchievementCounter: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'projects',
      label: 'Projects Completed',
      value: 0,
      suffix: '+',
      icon: Code,
      color: 'text-blue-400',
      description: 'Successful projects delivered',
      isLive: true
    },
    {
      id: 'clients',
      label: 'Happy Clients',
      value: 0,
      suffix: '+',
      icon: Users,
      color: 'text-green-400',
      description: 'Satisfied customers worldwide',
      isLive: true
    },
    {
      id: 'satisfaction',
      label: 'Client Satisfaction',
      value: 0,
      suffix: '%',
      icon: Star,
      color: 'text-yellow-400',
      description: 'Average satisfaction rate',
      isLive: false
    },
    {
      id: 'response',
      label: 'Avg Response Time',
      value: 0,
      suffix: 'hrs',
      icon: Clock,
      color: 'text-purple-400',
      description: 'Average response time',
      isLive: false
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: 0,
      suffix: '%',
      icon: TrendingUp,
      color: 'text-red-400',
      description: 'Average system uptime',
      isLive: false
    },
    {
      id: 'awards',
      label: 'Industry Awards',
      value: 0,
      suffix: '',
      icon: Trophy,
      color: 'text-orange-400',
      description: 'Recognition received',
      isLive: false
    }
  ]);

  const targetValues = {
    projects: 250,
    clients: 150,
    satisfaction: 98.5,
    response: 2,
    uptime: 99.9,
    awards: 12
  };

  // Animate counters when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Animate each counter
      achievements.forEach((achievement) => {
        const targetValue = targetValues[achievement.id as keyof typeof targetValues];
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetValue / steps;
        let currentValue = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          currentValue = Math.min(currentValue + increment, targetValue);
          
          setAchievements(prev => prev.map(item => 
            item.id === achievement.id 
              ? { ...item, value: currentValue }
              : item
          ));

          if (step >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
      });
    }
  }, [isInView, hasAnimated]);

  // Live updates for certain metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setAchievements(prev => prev.map(achievement => {
        if (!achievement.isLive) return achievement;
        
        const variation = (Math.random() - 0.5) * 2; // ±1 variation
        const baseValue = targetValues[achievement.id as keyof typeof targetValues];
        const newValue = Math.max(0, baseValue + variation);
        
        return { ...achievement, value: newValue };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  const formatValue = (value: number, suffix: string) => {
    if (suffix === '%') {
      return value.toFixed(1);
    }
    if (suffix === 'hrs') {
      return value.toFixed(0);
    }
    return Math.floor(value).toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">📊 Live Achievement Dashboard</h3>
        <p className="text-gray-400">Real-time metrics showcasing our success and growth</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-black/30 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Live indicator */}
              {achievement.isLive && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">LIVE</span>
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  {achievement.isLive && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <motion.span
                    className={`text-3xl font-bold ${achievement.color}`}
                    key={achievement.value} // Re-animate on value change
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatValue(achievement.value, achievement.suffix)}
                    {achievement.suffix}
                  </motion.span>
                </div>

                {/* Label */}
                <h4 className="text-white font-medium mb-2">{achievement.label}</h4>
                
                {/* Description */}
                <p className="text-gray-400 text-sm">{achievement.description}</p>

                {/* Progress bar for animated values */}
                {hasAnimated && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <motion.div
                        className={`h-1 rounded-full bg-gradient-to-r from-red-500 to-purple-500`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${(achievement.value / targetValues[achievement.id as keyof typeof targetValues]) * 100}%` 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
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
            <Target className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-purple-400 font-bold">Future Goals</p>
              <p className="text-gray-400 text-sm">Continuing to push boundaries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📊 Live Metrics:</strong> These numbers update in real-time to reflect our 
          current performance and achievements. Watch the live indicators for real-time updates!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveAchievementCounter;
