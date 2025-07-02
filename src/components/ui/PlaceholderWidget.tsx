import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Video, Loader } from 'lucide-react';

interface PlaceholderWidgetProps {
  type: 'calendar' | 'chat' | 'video';
  onClose: () => void;
}

const PlaceholderWidget: React.FC<PlaceholderWidgetProps> = ({ type, onClose }) => {
  const configs = {
    calendar: {
      icon: Calendar,
      title: 'Schedule a Meeting',
      subtitle: 'Choose a convenient time for your consultation',
      color: 'from-red-500 to-purple-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      placeholder: 'Calendar integration coming soon! For now, please email us at hello@ingeniousdigital.com to schedule a meeting.'
    },
    chat: {
      icon: MessageSquare,
      title: 'Live Chat',
      subtitle: 'Chat with our team in real-time',
      color: 'from-green-500 to-blue-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      placeholder: 'Live chat integration coming soon! Meanwhile, you can reach us at hello@ingeniousdigital.com or call us directly.'
    },
    video: {
      icon: Video,
      title: 'Video Meeting',
      subtitle: 'Start a face-to-face conversation',
      color: 'from-purple-500 to-blue-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      placeholder: 'Video meeting integration coming soon! Please email us at hello@ingeniousdigital.com to schedule a video call.'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className={`max-w-md w-full ${config.bgColor} ${config.borderColor} border backdrop-blur-lg rounded-2xl p-6 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{config.title}</h3>
              <p className="text-gray-400 text-sm">{config.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-8 text-center">
            <Loader className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Integration in Progress</p>
            <p className="text-gray-400 text-sm">{config.placeholder}</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href="mailto:hello@ingeniousdigital.com"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-center transition-all duration-300"
            >
              <p className="text-white font-semibold">Email Us</p>
              <p className="text-gray-400 text-xs">Quick response</p>
            </a>
            <a
              href="tel:+1234567890"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-center transition-all duration-300"
            >
              <p className="text-white font-semibold">Call Now</p>
              <p className="text-gray-400 text-xs">Direct line</p>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-xs text-center">
            We're working hard to bring you the best experience. Thank you for your patience!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlaceholderWidget;