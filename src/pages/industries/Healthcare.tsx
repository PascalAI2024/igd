import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Calendar, Users, TrendingUp, Target, MessageSquare, Activity, Clock, Shield } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

const Healthcare = () => {
  // Animated counter hooks - realistic healthcare metrics
  const patientSatisfaction = useAnimatedCounter({ end: 89, suffix: '%', duration: 2500 });
  const appointmentEfficiency = useAnimatedCounter({ end: 28, suffix: '%', duration: 2500 });
  const ratingIncrease = useAnimatedCounter({ end: 4.3, decimals: 1, duration: 2500 });
  const revenueCycleImprovement = useAnimatedCounter({ end: 22, suffix: '%', duration: 2500 });

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
                Digital tools to help local healthcare practices navigate industry challenges like patient 
                no-shows, administrative burden, and revenue cycle management
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
                <div ref={patientSatisfaction.ref} className="text-3xl font-bold text-white mb-1">
                  {patientSatisfaction.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Patient Satisfaction</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <Clock className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div ref={appointmentEfficiency.ref} className="text-3xl font-bold text-white mb-1">
                  {appointmentEfficiency.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Appointment Efficiency</p>
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
                <div ref={revenueCycleImprovement.ref} className="text-3xl font-bold text-white mb-1">
                  {revenueCycleImprovement.displayValue}
                </div>
                <p className="text-gray-400 text-sm">Revenue Cycle Improvement</p>
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
                Gradual implementation designed to work with your practice's schedule and patient flow patterns
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
    description: 'Reduce no-shows by 15-20% with smart scheduling.',
    benefits: [
      'Online scheduling with real-time availability',
      'Automated reminders reducing no-shows',
      'Waitlist management for cancellations',
      'Integration with existing EMR systems'
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
    description: 'Sustainable growth with industry benchmarks.',
    benefits: [
      'Track key metrics vs industry standards',
      'Revenue cycle optimization (15-25% improvement)',
      'Patient flow analysis and optimization',
      'Seasonal trend analysis and planning'
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
    title: 'Week 1-2: Digital Foundation',
    description: 'Setup online scheduling with automated reminders to reduce no-show rates by 15-20%.'
  },
  {
    title: 'Week 3-4: Patient Communication',
    description: 'Deploy secure patient portal meeting HIPAA compliance standards for better engagement.'
  },
  {
    title: 'Month 2: Revenue Cycle Enhancement',
    description: 'Streamline billing processes to reduce claim denials and improve collections by 10-15%.'
  },
  {
    title: 'Month 3+: Continuous Improvement',
    description: 'Monitor metrics, adjust for seasonal patient patterns, and optimize based on data.'
  }
];

export default Healthcare;
