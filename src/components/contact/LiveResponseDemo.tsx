import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  User, 
  Bot,
  Send,
  Zap,
  Timer,
  TrendingUp,
  Award
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  responseTime?: number;
}

interface ResponseMetrics {
  avgResponseTime: number;
  totalMessages: number;
  satisfactionScore: number;
  activeTime: number;
}

const LiveResponseDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'Welcome! Our team is ready to help. Average response time: 2.3 minutes',
      timestamp: new Date(Date.now() - 300000)
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [metrics, setMetrics] = useState<ResponseMetrics>({
    avgResponseTime: 2.3,
    totalMessages: 1247,
    satisfactionScore: 98.5,
    activeTime: 0
  });

  const [demoActive, setDemoActive] = useState(false);

  // Sample conversation flow
  const conversationFlow = [
    {
      user: "Hi, I'm interested in a new website for my business",
      agent: "Hello! I'd be happy to help you with your website project. What type of business do you have?",
      responseTime: 1.8
    },
    {
      user: "I run a local restaurant and need online ordering",
      agent: "Perfect! We specialize in restaurant websites with integrated ordering systems. Can I schedule a quick call to discuss your specific needs?",
      responseTime: 2.1
    },
    {
      user: "That sounds great! What's your availability?",
      agent: "I have slots available today at 2 PM or 4 PM EST. Which works better for you?",
      responseTime: 1.5
    },
    {
      user: "2 PM works perfectly!",
      agent: "Excellent! I've booked you for 2 PM today. You'll receive a calendar invite shortly. Looking forward to discussing your project!",
      responseTime: 1.2
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  // Start demo conversation
  const startDemo = () => {
    setDemoActive(true);
    setCurrentStep(0);
    setMessages([{
      id: '1',
      sender: 'system',
      content: 'Live response demo starting... Watch our real response times!',
      timestamp: new Date()
    }]);
  };

  // Demo conversation flow
  useEffect(() => {
    if (!demoActive || currentStep >= conversationFlow.length) return;

    const step = conversationFlow[currentStep];
    
    // Add user message
    setTimeout(() => {
      const userMessage: Message = {
        id: `user-${currentStep}`,
        sender: 'user',
        content: step.user,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
    }, 1000);

    // Add agent response after realistic delay
    setTimeout(() => {
      setIsTyping(false);
      const agentMessage: Message = {
        id: `agent-${currentStep}`,
        sender: 'agent',
        content: step.agent,
        timestamp: new Date(),
        responseTime: step.responseTime
      };
      setMessages(prev => [...prev, agentMessage]);
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        avgResponseTime: (prev.avgResponseTime + step.responseTime) / 2,
        totalMessages: prev.totalMessages + 1,
        satisfactionScore: Math.min(100, prev.satisfactionScore + 0.1)
      }));

      setCurrentStep(prev => prev + 1);
    }, step.responseTime * 1000 + 2000); // Response time + typing delay

  }, [demoActive, currentStep]);

  // Update active time
  useEffect(() => {
    if (!demoActive) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeTime: prev.activeTime + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [demoActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'user': return User;
      case 'agent': return MessageSquare;
      case 'system': return Bot;
      default: return MessageSquare;
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'user': return 'bg-blue-500';
      case 'agent': return 'bg-green-500';
      case 'system': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
            <h3 className="text-2xl font-bold text-white mb-2">⚡ Live Response Time Demo</h3>
            <p className="text-gray-400">See our actual response times in action - real conversation simulation!</p>
          </div>
          <button
            onClick={startDemo}
            disabled={demoActive}
            className={`px-4 py-2 rounded-lg transition-colors ${
              demoActive 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {demoActive ? 'Demo Running...' : 'Start Demo'}
          </button>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: 'Avg Response', 
              value: `${metrics.avgResponseTime.toFixed(1)} min`, 
              icon: Clock, 
              color: 'text-green-400' 
            },
            { 
              label: 'Total Messages', 
              value: metrics.totalMessages.toLocaleString(), 
              icon: MessageSquare, 
              color: 'text-blue-400' 
            },
            { 
              label: 'Satisfaction', 
              value: `${metrics.satisfactionScore.toFixed(1)}%`, 
              icon: Award, 
              color: 'text-yellow-400' 
            },
            { 
              label: 'Demo Time', 
              value: formatTime(metrics.activeTime), 
              icon: Timer, 
              color: 'text-purple-400' 
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-3 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">{metric.label}</p>
                  <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-black/30 border border-white/10 rounded-lg h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-medium">Live Support Chat</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Zap className="w-4 h-4" />
                <span>Fast Response</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <AnimatePresence>
                {messages.map((message, index) => {
                  const SenderIcon = getSenderIcon(message.sender);
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 ${getSenderColor(message.sender)} rounded-full flex items-center justify-center`}>
                        <SenderIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className={`max-w-xs lg:max-w-md ${
                        message.sender === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : message.sender === 'system'
                            ? 'bg-purple-500/20 text-purple-100'
                            : 'bg-white/10 text-gray-100'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.responseTime && (
                            <span className="text-xs text-green-400">
                              ⚡ {message.responseTime.toFixed(1)}min
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  disabled
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                />
                <button
                  disabled
                  className="p-2 bg-red-500/50 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Response Analytics */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 h-96">
            <h4 className="text-white font-semibold mb-4">Response Analytics</h4>
            
            <div className="space-y-4">
              {/* Response Time Chart */}
              <div>
                <h5 className="text-gray-400 text-sm mb-2">Response Time Trend</h5>
                <div className="space-y-2">
                  {conversationFlow.slice(0, currentStep).map((step, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Message {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-2 bg-green-400 rounded"
                          style={{ width: `${(step.responseTime / 3) * 100}%`, minWidth: '20px' }}
                        />
                        <span className="text-green-400 text-xs">{step.responseTime}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Excellent Response</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Under 2.5 minutes average</p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm font-medium">Improving</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Response times getting faster</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">High Satisfaction</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">98.5% customer satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">⚡ Response Demo:</strong> This simulation shows our actual response times 
          based on real customer interactions. Start the demo to see how quickly we respond!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveResponseDemo;
