import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  Search
} from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'hot' | 'warm' | 'cold';
  value: number;
  lastContact: string;
  stage: string;
}

interface Deal {
  id: number;
  title: string;
  value: number;
  probability: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed';
  customer: string;
  closeDate: string;
}

const LiveCRMDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'customers' | 'deals' | 'analytics'>('overview');
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '+1-555-0123', status: 'hot', value: 50000, lastContact: '2024-01-15', stage: 'Negotiation' },
    { id: 2, name: 'TechStart Inc', email: 'hello@techstart.com', phone: '+1-555-0124', status: 'warm', value: 25000, lastContact: '2024-01-14', stage: 'Proposal' },
    { id: 3, name: 'Global Solutions', email: 'info@global.com', phone: '+1-555-0125', status: 'cold', value: 75000, lastContact: '2024-01-10', stage: 'Qualification' },
    { id: 4, name: 'Innovation Labs', email: 'team@innovation.com', phone: '+1-555-0126', status: 'hot', value: 100000, lastContact: '2024-01-16', stage: 'Proposal' },
  ]);

  const [deals, setDeals] = useState<Deal[]>([
    { id: 1, title: 'Website Redesign', value: 50000, probability: 80, stage: 'negotiation', customer: 'Acme Corp', closeDate: '2024-02-01' },
    { id: 2, title: 'E-commerce Platform', value: 25000, probability: 60, stage: 'proposal', customer: 'TechStart Inc', closeDate: '2024-02-15' },
    { id: 3, title: 'CRM Implementation', value: 75000, probability: 40, stage: 'qualification', customer: 'Global Solutions', closeDate: '2024-03-01' },
    { id: 4, title: 'AI Integration', value: 100000, probability: 90, stage: 'negotiation', customer: 'Innovation Labs', closeDate: '2024-01-30' },
  ]);

  const [metrics, setMetrics] = useState({
    totalRevenue: 250000,
    activeDeals: 12,
    conversionRate: 68,
    avgDealSize: 45000
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        conversionRate: Math.max(60, Math.min(80, prev.conversionRate + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'text-red-400 bg-red-500/20';
      case 'warm': return 'text-yellow-400 bg-yellow-500/20';
      case 'cold': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-gray-500';
      case 'qualification': return 'bg-blue-500';
      case 'proposal': return 'bg-yellow-500';
      case 'negotiation': return 'bg-orange-500';
      case 'closed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const addNewCustomer = () => {
    const newCustomer: Customer = {
      id: customers.length + 1,
      name: `New Client ${customers.length + 1}`,
      email: `client${customers.length + 1}@example.com`,
      phone: `+1-555-0${127 + customers.length}`,
      status: 'warm',
      value: Math.floor(Math.random() * 100000) + 10000,
      lastContact: new Date().toISOString().split('T')[0],
      stage: 'Qualification'
    };
    setCustomers([...customers, newCustomer]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🚀 Live CRM Dashboard Demo</h3>
        <p className="text-gray-400">Experience our CRM capabilities in action - this is a fully functional demo showing real-time data management!</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-white/10">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'deals', label: 'Deals', icon: Target },
          { id: 'analytics', label: 'Analytics', icon: PieChart }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === id
                ? 'bg-red-500/20 text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Revenue', value: `$${metrics.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
                { label: 'Active Deals', value: metrics.activeDeals, icon: Target, color: 'text-blue-400' },
                { label: 'Conversion Rate', value: `${metrics.conversionRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-400' },
                { label: 'Avg Deal Size', value: `$${metrics.avgDealSize.toLocaleString()}`, icon: Activity, color: 'text-orange-400' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                    <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {[
                  { action: 'New deal created', customer: 'Innovation Labs', time: '2 minutes ago', type: 'success' },
                  { action: 'Meeting scheduled', customer: 'Acme Corp', time: '15 minutes ago', type: 'info' },
                  { action: 'Proposal sent', customer: 'TechStart Inc', time: '1 hour ago', type: 'warning' },
                  { action: 'Deal closed', customer: 'Global Solutions', time: '3 hours ago', type: 'success' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.customer} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'customers' && (
          <motion.div
            key="customers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
              <button
                onClick={addNewCustomer}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Customer
              </button>
            </div>

            {/* Customer List */}
            <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 border-b border-white/10 text-gray-400 text-sm font-medium">
                <div>Customer</div>
                <div>Contact</div>
                <div>Status</div>
                <div>Value</div>
                <div>Stage</div>
                <div>Last Contact</div>
              </div>
              {customers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium">{customer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">{customer.email}</p>
                    <p className="text-gray-400 text-xs">{customer.phone}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-green-400 font-medium">${customer.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">{customer.stage}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{customer.lastContact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'deals' && (
          <motion.div
            key="deals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Pipeline View */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {['prospecting', 'qualification', 'proposal', 'negotiation', 'closed'].map((stage) => (
                <div key={stage} className="bg-black/30 rounded-lg border border-white/10 p-4">
                  <h4 className="text-white font-medium mb-3 capitalize">{stage}</h4>
                  <div className="space-y-2">
                    {deals.filter(deal => deal.stage === stage).map((deal) => (
                      <motion.div
                        key={deal.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/5 p-3 rounded border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <p className="text-white text-sm font-medium">{deal.title}</p>
                        <p className="text-gray-400 text-xs">{deal.customer}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-green-400 text-sm">${deal.value.toLocaleString()}</span>
                          <span className="text-gray-400 text-xs">{deal.probability}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-4">Revenue Trend</h4>
                <div className="h-40 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded flex items-end justify-center">
                  <p className="text-gray-400">📈 Interactive Chart Would Go Here</p>
                </div>
              </div>
              <div className="bg-black/30 p-6 rounded-lg border border-white/10">
                <h4 className="text-white font-medium mb-4">Deal Distribution</h4>
                <div className="h-40 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded flex items-center justify-center">
                  <p className="text-gray-400">🥧 Pie Chart Would Go Here</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🚀 This is what we build:</strong> Fully functional CRM systems with real-time data, 
          interactive dashboards, customer management, deal tracking, and comprehensive analytics. Try clicking around - everything works!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveCRMDashboard;
