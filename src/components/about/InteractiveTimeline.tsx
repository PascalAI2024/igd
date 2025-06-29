import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Rocket, 
  Users, 
  Trophy, 
  Code, 
  Zap, 
  Target,
  Star,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  achievements: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

const InteractiveTimeline: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '2020',
      title: 'Foundation & Vision',
      description: 'Started with a vision to revolutionize digital solutions for businesses',
      icon: Rocket,
      color: 'bg-blue-500',
      achievements: [
        'Company founded with cutting-edge vision',
        'First client partnerships established',
        'Core team assembled'
      ],
      metrics: [
        { label: 'Team Size', value: '3' },
        { label: 'Projects', value: '5' }
      ]
    },
    {
      year: '2021',
      title: 'Rapid Growth',
      description: 'Expanded our capabilities and client base with innovative solutions',
      icon: TrendingUp,
      color: 'bg-green-500',
      achievements: [
        'AI/ML capabilities developed',
        'Advanced automation solutions launched',
        'Client base expanded 300%'
      ],
      metrics: [
        { label: 'Team Size', value: '8' },
        { label: 'Projects', value: '25' },
        { label: 'Client Growth', value: '300%' }
      ]
    },
    {
      year: '2022',
      title: 'Innovation Leadership',
      description: 'Became industry leaders in digital transformation and automation',
      icon: Trophy,
      color: 'bg-yellow-500',
      achievements: [
        'Industry recognition received',
        'Advanced CRM solutions launched',
        'Enterprise partnerships formed'
      ],
      metrics: [
        { label: 'Team Size', value: '15' },
        { label: 'Projects', value: '75' },
        { label: 'Success Rate', value: '98%' }
      ]
    },
    {
      year: '2023',
      title: 'Market Excellence',
      description: 'Established as the go-to partner for digital excellence and innovation',
      icon: Star,
      color: 'bg-purple-500',
      achievements: [
        'Market leadership achieved',
        'Advanced AI solutions deployed',
        'International expansion begun'
      ],
      metrics: [
        { label: 'Team Size', value: '25' },
        { label: 'Projects', value: '150' },
        { label: 'Client Satisfaction', value: '99%' }
      ]
    },
    {
      year: '2024',
      title: 'Digital Excellence',
      description: 'Continuing to push boundaries and deliver exceptional results',
      icon: Award,
      color: 'bg-red-500',
      achievements: [
        'Next-gen solutions launched',
        'Industry partnerships expanded',
        'Innovation awards received'
      ],
      metrics: [
        { label: 'Team Size', value: '35+' },
        { label: 'Projects', value: '250+' },
        { label: 'ROI Delivered', value: '400%+' }
      ]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveEvent(prev => (prev + 1) % timelineEvents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, timelineEvents.length]);

  const nextEvent = () => {
    setActiveEvent(prev => (prev + 1) % timelineEvents.length);
    setIsAutoPlaying(false);
  };

  const prevEvent = () => {
    setActiveEvent(prev => (prev - 1 + timelineEvents.length) % timelineEvents.length);
    setIsAutoPlaying(false);
  };

  const currentEvent = timelineEvents[activeEvent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🚀 Our Journey to Digital Excellence</h3>
        <p className="text-gray-400">Interactive timeline showcasing our growth and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Navigation */}
        <div className="lg:col-span-1">
          <div className="space-y-3">
            {timelineEvents.map((event, index) => (
              <motion.button
                key={event.year}
                onClick={() => {
                  setActiveEvent(index);
                  setIsAutoPlaying(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                  activeEvent === index
                    ? 'bg-red-500/20 border border-red-500/40 text-white'
                    : 'bg-black/30 border border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 ${event.color} rounded-full flex items-center justify-center relative`}>
                  <event.icon className="w-5 h-5 text-white" />
                  {activeEvent === index && (
                    <motion.div
                      className="absolute inset-0 border-2 border-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <div>
                  <p className="font-bold text-lg">{event.year}</p>
                  <p className="text-sm opacity-80">{event.title}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevEvent}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isAutoPlaying ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'
              }`}
            >
              {isAutoPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={nextEvent}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Event Header */}
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${currentEvent.color} rounded-full flex items-center justify-center`}>
                  <currentEvent.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">{currentEvent.year}</h4>
                  <h5 className="text-xl text-gray-300">{currentEvent.title}</h5>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-lg">{currentEvent.description}</p>

              {/* Achievements */}
              <div>
                <h6 className="text-white font-semibold mb-3">Key Achievements</h6>
                <div className="space-y-2">
                  {currentEvent.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              {currentEvent.metrics && (
                <div>
                  <h6 className="text-white font-semibold mb-3">Key Metrics</h6>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentEvent.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/30 p-3 rounded-lg border border-white/10 text-center"
                      >
                        <p className="text-2xl font-bold text-red-400">{metric.value}</p>
                        <p className="text-gray-400 text-sm">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Timeline Progress</span>
          <span className="text-gray-400 text-sm">{activeEvent + 1} of {timelineEvents.length}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-red-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((activeEvent + 1) / timelineEvents.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🚀 Our Story:</strong> From a small startup to industry leaders, 
          we've consistently delivered digital excellence. Click through our timeline to see our journey!
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveTimeline;
