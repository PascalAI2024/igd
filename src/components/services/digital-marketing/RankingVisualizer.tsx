import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, MapPin, Star } from 'lucide-react';

const rankings = [
  {
    keyword: 'Local Business Services',
    position: 1,
    change: '+5',
    volume: '2.5K',
    icon: Search
  },
  {
    keyword: 'Best Service Provider',
    position: 2,
    change: '+3',
    volume: '1.8K',
    icon: Star
  },
  {
    keyword: 'Service Near Me',
    position: 1,
    change: '+4',
    volume: '3.2K',
    icon: MapPin
  },
  {
    keyword: 'Professional Services',
    position: 3,
    change: '+2',
    volume: '2.1K',
    icon: Search
  }
];

const RankingVisualizer = () => {
  return (
    <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Ranking Progress</h3>
          <div className="relative h-64">
            {rankings.map((ranking, index) => (
              <motion.div
                key={ranking.keyword}
                initial={{ width: 0 }}
                whileInView={{ width: `${100 - (ranking.position * 20)}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="mb-4"
              >
                <div className="flex items-center mb-2">
                  <ranking.icon className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-sm text-gray-400">{ranking.keyword}</span>
                </div>
                <div className="relative h-8">
                  <div className="absolute inset-0 bg-white/5 rounded-full" />
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    style={{ width: `${100 - (ranking.position * 20)}%` }}
                  >
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-0.5 text-xs font-bold text-red-500">
                      #{ranking.position}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {rankings.map((ranking, index) => (
              <motion.div
                key={ranking.keyword}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <ranking.icon className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-white font-medium">{ranking.keyword}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-500 text-sm">{ranking.change}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Monthly Volume</span>
                  <span className="text-white font-medium">{ranking.volume}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingVisualizer;
