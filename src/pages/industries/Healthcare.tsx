import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Users, TrendingUp, Target, MessageSquare, Activity, Clock, Shield } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const Healthcare = () => {
  // Animated counter hooks
  const patientGrowth = useAnimatedCounter({ end: 87, suffix: '%', duration: 2500 });
  const timeReduction = useAnimatedCounter({ end: 65, suffix: '%', duration: 2500 });
  const ratingIncrease = useAnimatedCounter({ end: 4.8, decimals: 1, duration: 2500 });
  const revenueBoost = useAnimatedCounter({ end: 42, suffix: '%', duration: 2500 });

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
              <Stethoscope className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Small Healthcare Practice Solutions
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Digital tools to help local healthcare practices attract patients and improve care delivery
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Activity className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div ref={patientGrowth.ref} className="text-3xl font-bold text-white mb-1">
                  {patientGrowth.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Patient Growth</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div ref={timeReduction.ref} className="text-3xl font-bold text-white mb-1">
                  {timeReduction.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Time Saved</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Users className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div ref={ratingIncrease.ref} className="text-3xl font-bold text-white mb-1">
                  {ratingIncrease.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Patient Rating</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div ref={revenueBoost.ref} className="text-3xl font-bold text-white mb-1">
                  {revenueBoost.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Revenue Increase</p>
              </motion.div>
            </div>
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
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(239, 68, 68, 0.3)'
                  }}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/[0.07] group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-red-500 mb-4 group-hover:text-red-400 transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient transition-all">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  <ul className="mt-4 space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" 
                        />
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
                Get your healthcare practice digitally equipped in weeks, not months
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
                  whileHover={{ x: 10 }}
                  className="relative pl-8 pb-8 last:pb-0 cursor-pointer group"
                >
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-red-500/20">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 group-hover:bg-red-400 transition-colors" 
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient transition-all">{phase.title}</h3>
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
                  Ready to Modernize Your Healthcare Practice?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a digital strategy that helps you provide better care
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
    title: 'Patient Scheduling',
    description: 'Make it easy for patients to book appointments.',
    benefits: [
      'Online scheduling',
      'Appointment reminders',
      'Calendar management',
      'Patient portal'
    ]
  },
  {
    icon: Users,
    title: 'Patient Management',
    description: 'Build stronger relationships with your patients.',
    benefits: [
      'Patient database',
      'Visit history',
      'Follow-up automation',
      'Patient feedback'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Practice Growth',
    description: 'Tools to help your healthcare practice grow.',
    benefits: [
      'Performance tracking',
      'Revenue analytics',
      'Care optimization',
      'Team management'
    ]
  },
  {
    icon: Target,
    title: 'Local Marketing',
    description: 'Attract more local patients to your practice.',
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
    description: 'Stay connected with your patients.',
    benefits: [
      'Appointment reminders',
      'Care instructions',
      'SMS notifications',
      'Email updates'
    ]
  }
];

const timeline = [
  {
    title: 'Week 1: Digital Foundation',
    description: 'Setup your online presence and scheduling system.'
  },
  {
    title: 'Week 2: Patient Systems',
    description: 'Implement patient management and communication tools.'
  },
  {
    title: 'Week 3: Marketing Launch',
    description: 'Begin local marketing campaigns and patient outreach.'
  },
  {
    title: 'Week 4: Optimization',
    description: 'Fine-tune systems and scale successful strategies.'
  }
];

export default Healthcare;
