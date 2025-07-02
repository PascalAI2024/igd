import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, BarChart3, Target, Settings, TrendingUp } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import ProcessAutomationBuilder from '../../components/solutions/automation/ProcessAutomationBuilder';
import LiveWorkflowDemo from '../../components/solutions/automation/LiveWorkflowDemo';

const Automation: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/5 to-blue-500/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,0,0.1),transparent_70%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient">Business Process</span> Automation
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                  Reduce repetitive tasks and improve your operations with intelligent automation solutions.
                  Save valuable time, minimize errors, and focus on strategic priorities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {[
                  { icon: Clock, text: 'Save 10-15 Hours/Week' },
                  { icon: BarChart3, text: 'Reduce Errors by 85%' },
                  { icon: Target, text: 'Improve Efficiency' },
                  { icon: TrendingUp, text: 'Scale Operations' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <feature.icon className="w-4 h-4 text-red-400" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Process Automation Builder */}
        <section className="py-16 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProcessAutomationBuilder />
          </div>
        </section>

        {/* Live Workflow Demo */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveWorkflowDemo />
          </div>
        </section>

        {/* Automation Benefits */}
        <section className="py-16 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">Why Choose Our Automation Solutions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Transform your business operations with proven automation strategies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: 'Time Savings',
                  description: 'Automate repetitive tasks and free up your team to focus on high-value activities.',
                  metric: '20+ hours/week saved'
                },
                {
                  icon: Target,
                  title: 'Error Reduction',
                  description: 'Significantly reduce human errors with consistent automated processes.',
                  metric: '85% fewer errors'
                },
                {
                  icon: TrendingUp,
                  title: 'Scalability',
                  description: 'Scale your operations efficiently without proportionally increasing workforce.',
                  metric: '50% capacity increase'
                },
                {
                  icon: BarChart3,
                  title: 'Cost Efficiency',
                  description: 'Reduce operational costs while improving output quality and speed.',
                  metric: '40% cost reduction'
                },
                {
                  icon: Settings,
                  title: 'Integration',
                  description: 'Seamlessly connect all your business tools and systems.',
                  metric: '100+ integrations'
                },
                {
                  icon: Zap,
                  title: 'Real-time Processing',
                  description: 'Process data and execute actions instantly, 24/7 without interruption.',
                  metric: 'Instant execution'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <benefit.icon className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 mb-3">{benefit.description}</p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                    <span className="text-red-400 font-semibold text-sm">{benefit.metric}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 border border-red-500/20"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate Your Business?</h2>
              <p className="text-gray-400 mb-8">
                Start saving time and reducing errors with our proven automation solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Start Automation Assessment
                </button>
                <button className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  View Case Studies
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Automation;