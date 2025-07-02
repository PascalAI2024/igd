import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Users, TrendingUp, Target, MessageSquare } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const LocalServices = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Briefcase className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Local Service Business Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Digital tools to help service businesses overcome common challenges like scheduling conflicts, 
                no-shows, and seasonal demand fluctuations while improving utilization by 20-35%
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
                >
                  <feature.icon className="w-8 h-8 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <ul className="mt-4 space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Implementation Timeline
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Gradual implementation that works with your service schedule and busy seasons
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-red-500/20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                  <p className="text-gray-400">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Modernize Your Service Business?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a digital strategy that brings more clients to your business
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Get Started Today
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

const features = [
  {
    icon: Calendar,
    title: 'Appointment Booking',
    description: 'Reduce no-shows by 15-25% with smart scheduling.',
    benefits: [
      '24/7 online booking increases appointments 30%',
      'SMS reminders reduce no-shows 15-25%',
      'Route optimization saves 2-3 hours daily',
      'Real-time schedule updates'
    ]
  },
  {
    icon: Users,
    title: 'Client Management',
    description: 'Increase lifetime value by 25-40% with better retention.',
    benefits: [
      'Complete service history per client',
      'Automated maintenance reminders',
      'Win-back campaigns (20% success rate)',
      'Net Promoter Score tracking'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Data-driven insights for 20-35% revenue improvement.',
    benefits: [
      'Service profitability analysis',
      'Technician utilization tracking (target 75-85%)',
      'Seasonal demand forecasting',
      'Average job value optimization'
    ]
  },
  {
    icon: Target,
    title: 'Local Marketing',
    description: 'Attract more local clients to your business.',
    benefits: [
      'Local SEO',
      'Social media management',
      'Review management',
      'Local advertising'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    description: 'Stay connected with your clients.',
    benefits: [
      'Automated messaging',
      'Email marketing',
      'SMS notifications',
      'Client updates'
    ]
  }
];

const timeline = [
  {
    title: 'Week 1-2: Smart Scheduling',
    description: 'Deploy online booking to reduce no-shows by 15-25% and improve utilization.'
  },
  {
    title: 'Week 3-4: Client Communication',
    description: 'Automated reminders and follow-ups increase repeat business by 20-30%.'
  },
  {
    title: 'Month 2: Revenue Optimization',
    description: 'Service bundling and upselling strategies increase average job value by 15-25%.'
  },
  {
    title: 'Month 3+: Seasonal Planning',
    description: 'Use data to plan for seasonal demand and optimize resource allocation.'
  }
];

export default LocalServices;
