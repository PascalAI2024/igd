import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ArrowRight, Database, Zap, Shield, MessageSquare, 
  Settings, BarChart2, Cloud, CreditCard, PieChart, DollarSign
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import FeatureShowcase from '../../components/services/crm/FeatureShowcase';
import OptimizedCRMProcessFlow from '../../components/services/crm/OptimizedCRMProcessFlow';
import OptimizedTechStack from '../../components/services/crm/OptimizedTechStack';
import LiveDataFlowVisualization from '../../components/services/crm/LiveDataFlowVisualization';
import LiveCRMDashboard from '../../components/services/crm/LiveCRMDashboard';
import NavigationButton from '../../components/NavigationButton';
import { lazy3D } from '../../utils/lazyLoad3D';

const stats = [
  { label: 'Customer Retention', value: '+27%', icon: Users, color: '#ef4444' },
  { label: 'Response Time', value: '-65%', icon: Zap, color: '#f97316' },
  { label: 'Data Accuracy', value: '99.9%', icon: Shield, color: '#3b82f6' },
  { label: 'ROI Increase', value: '+105%', icon: DollarSign, color: '#10b981' }
];

const features = [
  {
    title: 'Unified Contact Management',
    description: 'Centralize all customer data in one secure platform for streamlined relationship management.',
    icon: Database,
    color: '#ef4444'
  },
  {
    title: 'Smart Communication',
    description: 'Automated follow-ups and personalized messaging across email, SMS, and voice channels.',
    icon: MessageSquare,
    color: '#3b82f6'
  },
  {
    title: 'Advanced Automation',
    description: 'Streamline workflows and eliminate repetitive tasks with intelligent process automation.',
    icon: Settings,
    color: '#f97316'
  },
  {
    title: 'Actionable Analytics',
    description: 'Data-driven insights with customizable dashboards and real-time performance metrics.',
    icon: BarChart2,
    color: '#10b981'
  },
  {
    title: 'Cloud Integration',
    description: 'Seamless connections with your existing software ecosystem and third-party services.',
    icon: Cloud,
    color: '#8b5cf6'
  },
  {
    title: 'Sales & Payment Processing',
    description: 'Integrated e-commerce and payment solutions for frictionless transactions.',
    icon: CreditCard,
    color: '#ec4899'
  }
];

const clientBenefits = [
  {
    value: '38%',
    label: 'Increase in Sales',
    description: 'Average improvement in conversion rates through personalized customer journeys'
  },
  {
    value: '64%',
    label: 'Productivity Gain',
    description: 'Time saved through automated workflows and streamlined customer management'
  },
  {
    value: '93%',
    label: 'Customer Satisfaction',
    description: 'Higher satisfaction scores through consistent, personalized interactions'
  }
];

const CRM = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-gradient-to-r from-red-500/20 to-red-500/10 rounded-full px-4 py-2 mb-4 backdrop-blur-sm border border-red-500/20"
              >
                <Database className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-400 font-semibold">Enterprise-Grade CRM</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
              >
                Transform Customer <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400">Relationships</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
              >
                Streamline operations, increase sales, and deliver exceptional 
                customer experiences with our powerful CRM solutions
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <NavigationButton
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300"
                >
                  Request Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </NavigationButton>
                
                <NavigationButton
                  to="/services"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
                >
                  Explore Solutions
                </NavigationButton>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                        <stat.icon style={{ color: stat.color }} className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-black to-black/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                className="inline-block text-red-500 text-lg font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Comprehensive Solutions
              </motion.span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Enterprise-Grade <span className="text-gradient">Features</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything your business needs to build stronger relationships and drive growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-gradient-to-b hover:from-white/10 hover:to-white/5 hover:border-red-500/20 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-3 rounded-lg mr-4 group-hover:scale-110 transition-all duration-300" 
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <feature.icon style={{ color: feature.color }} className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 pl-16">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live CRM Dashboard Demo */}
        <section className="py-20 bg-gradient-to-b from-black/90 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveCRMDashboard />
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 bg-gradient-to-b from-black to-black/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                className="inline-block text-red-500 text-lg font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Powerful Capabilities
              </motion.span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Advanced <span className="text-gradient">Features</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Tools and capabilities designed for modern business growth
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Live Data Flow Visualization */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveDataFlowVisualization />
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-20 bg-gradient-to-b from-black/90 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                className="inline-block text-red-500 text-lg font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Seamless Deployment
              </motion.span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Implementation <span className="text-gradient">Process</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get up and running quickly with our streamlined onboarding process
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="shadow-2xl shadow-red-500/5"
            >
              <OptimizedCRMProcessFlow />
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-gradient-to-b from-black to-black/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.span 
                className="inline-block text-red-500 text-lg font-medium mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Enterprise Architecture
              </motion.span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Technology <span className="text-gradient">Stack</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Built with industry-leading technologies for reliability and performance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <OptimizedTechStack />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-black to-black border border-white/10 rounded-2xl p-12 backdrop-blur-sm shadow-2xl shadow-red-500/5 relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.3),transparent_70%)]" />

              <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Ready to <span className="text-gradient">Transform</span> Your Customer Relationships?
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Join thousands of businesses that have revolutionized their growth with our CRM solutions
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <NavigationButton
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300"
                  >
                    Schedule a Demo
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </NavigationButton>
                  <NavigationButton
                    to="/case-studies"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
                  >
                    View Success Stories
                  </NavigationButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default CRM;