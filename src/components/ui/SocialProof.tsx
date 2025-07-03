import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Star, TrendingUp, MessageSquare, Bell, CheckCircle, 
  Award, Zap, Heart, Globe, DollarSign, Calendar
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'signup' | 'review' | 'milestone' | 'activity';
  message: string;
  timestamp: string;
  icon: React.ElementType;
  color: string;
}

interface SocialProofNotificationProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  autoHide?: boolean;
  hideDelay?: number;
  className?: string;
}

// Live Activity Notifications
export const SocialProofNotification: React.FC<SocialProofNotificationProps> = ({
  position = 'bottom-left',
  autoHide = true,
  hideDelay = 5000,
  className = ''
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const notificationTemplates: Omit<Notification, 'id' | 'timestamp'>[] = [
    {
      type: 'signup',
      message: 'A restaurant in Coral Springs just started their digital transformation',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      type: 'review',
      message: 'Miami retail store: "Sales increased 45% after website redesign!"',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      type: 'milestone',
      message: 'Just helped our 50th client achieve their digital goals!',
      icon: Award,
      color: 'text-purple-500'
    },
    {
      type: 'activity',
      message: 'Healthcare clinic in Fort Lauderdale sees 3x more appointments',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      type: 'review',
      message: '5-star review: "Best decision for our business growth!"',
      icon: Heart,
      color: 'text-red-500'
    },
    {
      type: 'activity',
      message: 'Auto service center doubles online bookings in 2 months',
      icon: Zap,
      color: 'text-orange-500'
    }
  ];

  useEffect(() => {
    const showNotification = () => {
      const template = notificationTemplates[currentIndex % notificationTemplates.length];
      const newNotification: Notification = {
        ...template,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };

      setNotifications(prev => [...prev, newNotification]);
      setCurrentIndex(prev => prev + 1);

      if (autoHide) {
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, hideDelay);
      }
    };

    // Initial notification after 3 seconds
    const initialTimeout = setTimeout(showNotification, 3000);

    // Subsequent notifications every 15 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [currentIndex, autoHide, hideDelay]);

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-20 left-4',
    'top-right': 'top-20 right-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 25 }}
            className="mb-3 max-w-sm"
          >
            <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0`}>
                  <notification.icon className={`w-5 h-5 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{notification.message}</p>
                  <p className="text-gray-400 text-xs mt-1">Just now</p>
                </div>
                <Bell className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Success Metrics Counter
interface MetricCounterProps {
  metrics: {
    label: string;
    value: number;
    suffix: string;
    icon: React.ElementType;
    color: string;
  }[];
  animated?: boolean;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  metrics,
  animated = true,
  className = ''
}) => {
  const [counts, setCounts] = useState(metrics.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible || !animated) return;

    const intervals = metrics.map((metric, index) => {
      const increment = metric.value / 50; // 50 steps
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= metric.value) {
          current = metric.value;
          clearInterval(intervals[index]);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible, metrics, animated]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 mb-3`}>
            <metric.icon className={`w-8 h-8 ${metric.color}`} />
          </div>
          <div className="text-3xl font-bold text-white">
            {animated ? Math.floor(counts[index]) : metric.value}
            {metric.suffix}
          </div>
          <p className="text-gray-400 text-sm mt-1">{metric.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Client Logo Carousel
interface ClientLogoCarouselProps {
  logos: { name: string; logo: string }[];
  speed?: number;
  className?: string;
}

export const ClientLogoCarousel: React.FC<ClientLogoCarouselProps> = ({
  logos,
  speed = 30,
  className = ''
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative">
        <motion.div
          className="flex gap-8"
          animate={{ x: [0, -50 * logos.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: speed,
              ease: 'linear'
            }
          }}
        >
          {/* Duplicate logos for seamless loop */}
          {[...logos, ...logos].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-16 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:border-red-500/30 transition-all duration-300"
            >
              <span className="text-2xl">{client.logo}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Recent Activity Feed
interface ActivityItem {
  id: string;
  type: 'project' | 'review' | 'milestone';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ElementType;
  color: string;
}

export const RecentActivityFeed: React.FC<{ className?: string }> = ({ className = '' }) => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'New Website Launch',
      description: 'Launched e-commerce site for Miami boutique',
      timestamp: '2 hours ago',
      icon: Globe,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'review',
      title: '5-Star Review Received',
      description: '"Exceeded all expectations!" - Restaurant Owner',
      timestamp: '5 hours ago',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: '3',
      type: 'milestone',
      title: '1000+ Leads Generated',
      description: 'Client reached milestone in just 3 months',
      timestamp: '1 day ago',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      id: '4',
      type: 'project',
      title: 'SEO Campaign Success',
      description: 'Healthcare clinic now ranking #1 locally',
      timestamp: '2 days ago',
      icon: Award,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-red-500" />
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{activity.title}</h4>
              <p className="text-gray-400 text-sm">{activity.description}</p>
              <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ROI Success Indicator
export const ROIIndicator: React.FC<{ 
  percentage: number;
  label?: string;
  className?: string;
}> = ({ percentage, label = 'Average ROI', className = '' }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 ${className}`}
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-700"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-green-500"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 226' }}
            animate={{ strokeDasharray: `${(currentPercentage / 100) * 226} 226` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{currentPercentage}%</span>
        </div>
      </div>
      <div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-gray-400 text-sm">Client Success Rate</p>
      </div>
    </motion.div>
  );
};

export default SocialProofNotification;