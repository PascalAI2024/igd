import React from 'react';
import { motion } from 'framer-motion';
import { Factory, BarChart, Users, TrendingUp, Target, Truck } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const Manufacturing = () => {
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
              <Factory className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Small Manufacturing Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Digital tools to help small manufacturers tackle challenges like supply chain volatility, 
                quality control, and cost pressures while improving efficiency by 15-25%
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
                Phased implementation that minimizes production disruption and delivers measurable ROI
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
                  Ready to Modernize Your Manufacturing Business?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a digital strategy that helps you compete and grow
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
    icon: BarChart,
    title: 'Production Management',
    description: 'Achieve 15-25% efficiency improvement with real-time tracking.',
    benefits: [
      'Real-time production monitoring and OEE tracking',
      'Predictive maintenance reduces downtime 20-30%',
      'Quality tracking reduces defects by 10-15%',
      'Cost per unit analysis and optimization'
    ]
  },
  {
    icon: Users,
    title: 'Customer Management',
    description: 'Build stronger relationships with your customers.',
    benefits: [
      'Customer database',
      'Order history',
      'Follow-up automation',
      'Customer feedback'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    description: 'Data-driven growth with 12-25% cost reduction potential.',
    benefits: [
      'Benchmark against industry KPIs',
      'Identify profit margin opportunities (12-20%)',
      'Lean manufacturing implementation',
      'Capacity planning and optimization'
    ]
  },
  {
    icon: Target,
    title: 'Local Marketing',
    description: 'Attract more local and regional customers.',
    benefits: [
      'Local SEO',
      'B2B marketing',
      'Industry networking',
      'Local advertising'
    ]
  },
  {
    icon: Truck,
    title: 'Supply Chain',
    description: 'Reduce lead times by 20-30% with better visibility.',
    benefits: [
      'Multi-tier supplier visibility',
      'Lead time reduction (20-30% typical)',
      'Safety stock optimization',
      'Supply chain risk monitoring'
    ]
  }
];

const timeline = [
  {
    title: 'Week 1-2: Production Tracking',
    description: 'Deploy real-time production monitoring for 15-20% efficiency gains.'
  },
  {
    title: 'Week 3-4: Quality Systems',
    description: 'Implement quality tracking to reduce defects by 10-15% and minimize rework.'
  },
  {
    title: 'Month 2: Supply Chain Integration',
    description: 'Connect supplier systems to reduce lead times by 20-30% and optimize inventory.'
  },
  {
    title: 'Month 3+: Continuous Improvement',
    description: 'Use data analytics to identify bottlenecks and achieve 12-25% cost reduction.'
  }
];

export default Manufacturing;
