import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  Video,
  Send,
  Star
} from 'lucide-react';

interface ContactMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  availability: string;
  responseTime: string;
  description: string;
  isLive: boolean;
  preferredFor: string[];
}

interface LiveStats {
  activeAgents: number;
  avgResponseTime: string;
  satisfactionRate: number;
  projectsInProgress: number;
}

const InteractiveContactHub: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('live-chat');
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeAgents: 3,
    avgResponseTime: '2.3 min',
    satisfactionRate: 98.5,
    projectsInProgress: 12
  });

  const contactMethods: ContactMethod[] = [
    {
      id: 'live-chat',
      name: 'Live Chat',
      icon: MessageSquare,
      color: 'bg-green-500',
      availability: 'Online Now',
      responseTime: '< 30 seconds',
      description: 'Get instant answers to your questions with our live chat support',
      isLive: true,
      preferredFor: ['Quick questions', 'Project inquiries', 'Technical support']
    },
    {
      id: 'phone-call',
      name: 'Phone Call',
      icon: Phone,
      color: 'bg-blue-500',
      availability: 'Available 9AM-6PM EST',
      responseTime: 'Immediate',
      description: 'Speak directly with our experts for detailed discussions',
      isLive: true,
      preferredFor: ['Complex projects', 'Urgent matters', 'Detailed consultations']
    },
    {
      id: 'video-call',
      name: 'Video Meeting',
      icon: Video,
      color: 'bg-purple-500',
      availability: 'Schedule Available',
      responseTime: 'Same day booking',
      description: 'Face-to-face meetings for comprehensive project planning',
      isLive: false,
      preferredFor: ['Project planning', 'Team introductions', 'Demos']
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-orange-500',
      availability: '24/7',
      responseTime: '< 2 hours',
      description: 'Send detailed project requirements and get comprehensive responses',
      isLive: false,
      preferredFor: ['Detailed requirements', 'File sharing', 'Formal proposals']
    },
    {
      id: 'calendar',
      name: 'Book Meeting',
      icon: Calendar,
      color: 'bg-red-500',
      availability: 'Multiple slots available',
      responseTime: 'Scheduled',
      description: 'Book a dedicated time slot for focused discussion',
      isLive: false,
      preferredFor: ['Strategy sessions', 'Project kickoffs', 'Regular check-ins']
    }
  ];

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeAgents: Math.max(1, Math.min(5, prev.activeAgents + (Math.random() > 0.5 ? 1 : -1))),
        avgResponseTime: `${(Math.random() * 2 + 1).toFixed(1)} min`,
        satisfactionRate: Math.max(95, Math.min(100, prev.satisfactionRate + (Math.random() - 0.5) * 2)),
        projectsInProgress: Math.max(8, Math.min(20, prev.projectsInProgress + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const selectedContactMethod = contactMethods.find(method => method.id === selectedMethod);

  const handleContactAction = (methodId: string) => {
    switch (methodId) {
      case 'live-chat':
        // In a real app, this would open a chat widget
        alert('Live chat would open here!');
        break;
      case 'phone-call':
        window.open('tel:+1234567890');
        break;
      case 'email':
        window.open('mailto:contact@ingeniousdigital.com');
        break;
      case 'video-call':
      case 'calendar':
        // In a real app, this would open a booking widget
        alert('Booking calendar would open here!');
        break;
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
        <h3 className="text-2xl font-bold text-white mb-2">📞 Interactive Contact Hub</h3>
        <p className="text-gray-400">Choose your preferred contact method - see live availability and response times!</p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Agents', value: liveStats.activeAgents.toString(), icon: Users, color: 'text-green-400' },
          { label: 'Avg Response', value: liveStats.avgResponseTime, icon: Clock, color: 'text-blue-400' },
          { label: 'Satisfaction', value: `${liveStats.satisfactionRate.toFixed(1)}%`, icon: Star, color: 'text-yellow-400' },
          { label: 'Active Projects', value: liveStats.projectsInProgress.toString(), icon: Zap, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 p-3 rounded-lg border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <div className="lg:col-span-2">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Methods</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMethod(method.id)}
                className={`text-left p-4 rounded-lg border transition-all duration-300 relative overflow-hidden ${
                  selectedMethod === method.id
                    ? 'bg-red-500/20 border-red-500/40 text-white'
                    : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold">{method.name}</h5>
                      <div className="flex items-center gap-2">
                        {method.isLive && (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        )}
                        <span className="text-xs text-gray-400">{method.availability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-400">⚡ {method.responseTime}</span>
                    {selectedMethod === method.id && (
                      <ArrowRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Method Details */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 h-full">
            <AnimatePresence mode="wait">
              {selectedContactMethod && (
                <motion.div
                  key={selectedContactMethod.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="text-center">
                    <div className={`w-16 h-16 ${selectedContactMethod.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <selectedContactMethod.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-bold text-lg">{selectedContactMethod.name}</h4>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {selectedContactMethod.isLive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                      <span className="text-gray-400 text-sm">{selectedContactMethod.availability}</span>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="bg-white/5 p-3 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">Response Time</span>
                    </div>
                    <p className="text-white text-lg font-bold">{selectedContactMethod.responseTime}</p>
                  </div>

                  {/* Best For */}
                  <div>
                    <h5 className="text-white font-semibold mb-2">Best For:</h5>
                    <div className="space-y-1">
                      {selectedContactMethod.preferredFor.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleContactAction(selectedContactMethod.id)}
                    className={`w-full ${selectedContactMethod.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <span>Start {selectedContactMethod.name}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quick Contact Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-green-400 font-bold">Quick Chat</p>
              <p className="text-gray-400 text-sm">Get instant answers now</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-blue-400 font-bold">Call Now</p>
              <p className="text-gray-400 text-sm">Speak with an expert</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-red-500/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-purple-400 font-bold">Book Meeting</p>
              <p className="text-gray-400 text-sm">Schedule a consultation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📞 Contact Hub:</strong> Choose your preferred contact method and see live 
          availability. Our team is ready to help with your project needs!
        </p>
      </div>
    </motion.div>
  );
};

export default InteractiveContactHub;
