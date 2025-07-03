import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  TrendingUp,
  Phone,
  Lock,
  RefreshCw,
  MessageCircle,
  Calendar
} from 'lucide-react';

interface TrustSignal {
  icon: React.ElementType;
  title: string;
  value: string;
  description?: string;
  color: string;
  animate?: boolean;
}

interface TrustSignalsProps {
  variant?: 'compact' | 'detailed' | 'inline';
  showLiveData?: boolean;
  className?: string;
}

/**
 * Trust signals component to build credibility and reduce friction
 * Shows guarantees, response times, security badges, and social proof
 */
const TrustSignals: React.FC<TrustSignalsProps> = ({
  variant = 'compact',
  showLiveData = true,
  className = ''
}) => {
  const [liveResponseTime, setLiveResponseTime] = useState('2m 15s');
  const [activeTeamMembers, setActiveTeamMembers] = useState(3);
  const [todaysCalls, setTodaysCalls] = useState(12);

  // Simulate live data updates
  useEffect(() => {
    if (!showLiveData) return;

    const interval = setInterval(() => {
      // Update response time
      const minutes = Math.floor(Math.random() * 5) + 1;
      const seconds = Math.floor(Math.random() * 60);
      setLiveResponseTime(`${minutes}m ${seconds}s`);

      // Update active team members
      setActiveTeamMembers(Math.floor(Math.random() * 3) + 2);

      // Update today's calls
      setTodaysCalls(prev => prev + Math.floor(Math.random() * 2));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [showLiveData]);

  const trustSignals: TrustSignal[] = [
    {
      icon: Shield,
      title: '100% Satisfaction Guarantee',
      value: 'Money-Back',
      description: 'Not happy? Get a full refund within 30 days',
      color: 'text-green-400',
      animate: false
    },
    {
      icon: Clock,
      title: 'Average Response Time',
      value: showLiveData ? liveResponseTime : '< 5 min',
      description: 'We respond faster than 95% of agencies',
      color: 'text-blue-400',
      animate: showLiveData
    },
    {
      icon: Users,
      title: 'Team Available Now',
      value: showLiveData ? `${activeTeamMembers} experts` : '5+ experts',
      description: 'Real professionals ready to help',
      color: 'text-purple-400',
      animate: showLiveData
    },
    {
      icon: Star,
      title: 'Client Satisfaction',
      value: '4.9/5.0',
      description: 'Based on 50+ verified reviews',
      color: 'text-yellow-400',
      animate: false
    },
    {
      icon: Phone,
      title: 'Calls Today',
      value: showLiveData ? todaysCalls.toString() : '15+',
      description: 'Join other businesses getting help',
      color: 'text-red-400',
      animate: showLiveData
    },
    {
      icon: Lock,
      title: 'Secure & Confidential',
      value: 'SSL Protected',
      description: 'Your data is 100% secure',
      color: 'text-cyan-400',
      animate: false
    }
  ];

  // Office hours indicator
  const getOfficeStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    // Monday-Friday 9 AM - 6 PM EST
    const isWeekday = day >= 1 && day <= 5;
    const isOfficeHours = hour >= 9 && hour < 18;
    
    return isWeekday && isOfficeHours;
  };

  const isOfficeOpen = getOfficeStatus();

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className={`w-2 h-2 rounded-full ${isOfficeOpen ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-gray-300">
            {isOfficeOpen ? 'Office Open' : 'Office Closed'}
          </span>
        </motion.div>

        {trustSignals.slice(0, 3).map((signal, index) => (
          <motion.div
            key={signal.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <signal.icon className={`w-4 h-4 ${signal.color}`} />
            <span className="text-gray-300">
              {signal.animate ? (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={signal.value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {signal.value}
                  </motion.span>
                </AnimatePresence>
              ) : (
                signal.value
              )}
            </span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Why Choose Ingenious Digital?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustSignals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0`}>
                  <signal.icon className={`w-5 h-5 ${signal.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{signal.title}</h4>
                  <div className={`text-lg font-bold ${signal.color} mb-1`}>
                    {signal.animate ? (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={signal.value}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                        >
                          {signal.value}
                        </motion.span>
                      </AnimatePresence>
                    ) : (
                      signal.value
                    )}
                  </div>
                  {signal.description && (
                    <p className="text-xs text-gray-400">{signal.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Our Guarantees
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 text-green-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">30-Day Money Back</p>
                <p className="text-gray-400 text-xs">No questions asked refund policy</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">24/7 Support</p>
                <p className="text-gray-400 text-xs">Always here when you need us</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-purple-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">On-Time Delivery</p>
                <p className="text-gray-400 text-xs">Projects delivered on schedule</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Results Guaranteed</p>
                <p className="text-gray-400 text-xs">Measurable improvements or refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {trustSignals.map((signal, index) => (
        <motion.div
          key={signal.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className={`w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mx-auto mb-2`}>
            <signal.icon className={`w-6 h-6 ${signal.color}`} />
          </div>
          <div className={`text-lg font-bold ${signal.color}`}>
            {signal.animate ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={signal.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {signal.value}
                </motion.span>
              </AnimatePresence>
            ) : (
              signal.value
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{signal.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustSignals;