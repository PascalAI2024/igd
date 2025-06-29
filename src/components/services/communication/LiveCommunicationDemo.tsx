import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  User, 
  Bot, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Monitor,
  Headphones,
  Zap,
  Users,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';

interface Message {
  id: string;
  type: 'sms' | 'email' | 'chat' | 'call';
  sender: 'customer' | 'agent' | 'bot';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  channel: string;
}

interface CommunicationStats {
  totalMessages: number;
  responseTime: string;
  satisfactionRate: number;
  activeChannels: number;
}

const LiveCommunicationDemo: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'sms' | 'email' | 'chat' | 'call'>('chat');
  const [isLive, setIsLive] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'chat', sender: 'customer', content: 'Hi, I need help with my order', timestamp: new Date(Date.now() - 300000), status: 'read', channel: 'Website Chat' },
    { id: '2', type: 'chat', sender: 'bot', content: 'Hello! I\'d be happy to help you with your order. Can you provide your order number?', timestamp: new Date(Date.now() - 280000), status: 'read', channel: 'Website Chat' },
    { id: '3', type: 'chat', sender: 'customer', content: 'Sure, it\'s #12345', timestamp: new Date(Date.now() - 260000), status: 'read', channel: 'Website Chat' },
    { id: '4', type: 'chat', sender: 'agent', content: 'I found your order! It\'s currently being processed and will ship tomorrow. You\'ll receive tracking info via email.', timestamp: new Date(Date.now() - 240000), status: 'read', channel: 'Website Chat' }
  ]);

  const [stats, setStats] = useState<CommunicationStats>({
    totalMessages: 1247,
    responseTime: '2.3 min',
    satisfactionRate: 94.5,
    activeChannels: 4
  });

  // Simulate real-time message updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const messageTypes = ['Great! Thank you for the quick response.', 'When will my order arrive?', 'Can I change my delivery address?', 'Perfect, thanks for your help!'];
      const senders: ('customer' | 'agent' | 'bot')[] = ['customer', 'agent', 'bot'];
      
      if (Math.random() > 0.7) { // 30% chance of new message
        const newMsg: Message = {
          id: Date.now().toString(),
          type: activeChannel,
          sender: senders[Math.floor(Math.random() * senders.length)],
          content: messageTypes[Math.floor(Math.random() * messageTypes.length)],
          timestamp: new Date(),
          status: 'delivered',
          channel: activeChannel === 'chat' ? 'Website Chat' : activeChannel === 'sms' ? 'SMS' : activeChannel === 'email' ? 'Email' : 'Phone'
        };

        setMessages(prev => [...prev, newMsg]);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalMessages: prev.totalMessages + 1,
          responseTime: `${(Math.random() * 3 + 1).toFixed(1)} min`,
          satisfactionRate: Math.max(90, Math.min(98, prev.satisfactionRate + (Math.random() - 0.5) * 2))
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, activeChannel]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      type: activeChannel,
      sender: 'agent',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent',
      channel: activeChannel === 'chat' ? 'Website Chat' : activeChannel === 'sms' ? 'SMS' : activeChannel === 'email' ? 'Email' : 'Phone'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'customer': return <User className="w-4 h-4" />;
      case 'agent': return <Headphones className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'customer': return 'bg-blue-500';
      case 'agent': return 'bg-green-500';
      case 'bot': return 'bg-purple-500';
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
            <h3 className="text-2xl font-bold text-white mb-2">📱 Live Communication Platform Demo</h3>
            <p className="text-gray-400">Multi-channel communication hub - see real-time messaging across all platforms!</p>
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

        {/* Communication Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Messages', value: stats.totalMessages.toLocaleString(), icon: MessageSquare, color: 'text-blue-400' },
            { label: 'Avg Response Time', value: stats.responseTime, icon: Clock, color: 'text-green-400' },
            { label: 'Satisfaction Rate', value: `${stats.satisfactionRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-400' },
            { label: 'Active Channels', value: stats.activeChannels.toString(), icon: Zap, color: 'text-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-4 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Channel Selector */}
        <div className="lg:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Communication Channels</h4>
          <div className="space-y-2">
            {[
              { id: 'chat', name: 'Live Chat', icon: MessageSquare, count: 23 },
              { id: 'sms', name: 'SMS', icon: Smartphone, count: 12 },
              { id: 'email', name: 'Email', icon: Mail, count: 8 },
              { id: 'call', name: 'Phone', icon: Phone, count: 5 }
            ].map((channel) => (
              <motion.button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                  activeChannel === channel.id
                    ? 'bg-red-500/20 border border-red-500/40 text-white'
                    : 'bg-black/30 border border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${
                  activeChannel === channel.id ? 'bg-red-500' : 'bg-gray-600'
                }`}>
                  <channel.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{channel.name}</p>
                  <p className="text-xs text-gray-400">{channel.count} active</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Message Interface */}
        <div className="lg:col-span-3">
          <div className="bg-black/30 border border-white/10 rounded-lg h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {getChannelIcon(activeChannel)}
                <div>
                  <h5 className="text-white font-medium capitalize">{activeChannel} Communication</h5>
                  <p className="text-gray-400 text-sm">Customer Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <AnimatePresence>
                {messages
                  .filter(msg => msg.type === activeChannel)
                  .map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-start gap-3 ${
                        message.sender === 'agent' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 ${getSenderColor(message.sender)} rounded-full flex items-center justify-center`}>
                        {getSenderIcon(message.sender)}
                      </div>
                      <div className={`max-w-xs lg:max-w-md ${
                        message.sender === 'agent' ? 'text-right' : ''
                      }`}>
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'agent' 
                            ? 'bg-red-500 text-white' 
                            : message.sender === 'bot'
                            ? 'bg-purple-500/20 text-purple-100'
                            : 'bg-white/10 text-gray-100'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.sender === 'agent' && (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={`Type a ${activeChannel} message...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">📱 This is what we build:</strong> Unified communication platforms with 
          multi-channel messaging, real-time chat, automated responses, and comprehensive analytics. Try switching channels and sending messages!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveCommunicationDemo;
