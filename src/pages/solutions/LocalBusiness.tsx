import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Users, TrendingUp, Target, Star } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import BusinessSolutionBuilder from '../../components/solutions/local-business/BusinessSolutionBuilder';
import LocalBusinessSuccessCalculator from '../../components/solutions/local-business/LocalBusinessSuccessCalculator';

const LocalBusiness: React.FC = () => {
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
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient">Local Business</span> Digital Solutions
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                  Transform your local business with our comprehensive digital solutions.
                  From professional websites to customer management systems - everything you need to grow.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {[
                  { icon: MapPin, text: 'Local SEO Optimization' },
                  { icon: Users, text: 'Customer Management' },
                  { icon: TrendingUp, text: 'Growth Analytics' },
                  { icon: Target, text: 'Digital Marketing' }
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

        {/* Interactive Solution Builder */}
        <section className="py-16 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BusinessSolutionBuilder />
          </div>
        </section>

        {/* Success Calculator */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LocalBusinessSuccessCalculator />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gradient mb-4">Why Local Businesses Choose Us</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We understand the unique challenges of local businesses and provide tailored solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: 'Local Market Focus',
                  description: 'We understand your local market and help you dominate it with targeted digital strategies.'
                },
                {
                  icon: Users,
                  title: 'Customer-Centric Approach',
                  description: 'Build stronger relationships with your customers through better digital experiences.'
                },
                {
                  icon: TrendingUp,
                  title: 'Measurable Growth',
                  description: 'Track your success with real metrics and see tangible results from day one.'
                },
                {
                  icon: Target,
                  title: 'Targeted Marketing',
                  description: 'Reach the right customers at the right time with precision digital marketing.'
                },
                {
                  icon: Star,
                  title: 'Reputation Management',
                  description: 'Build and maintain a stellar online reputation that drives more customers.'
                },
                {
                  icon: Building,
                  title: 'Complete Solutions',
                  description: 'Everything you need in one place - from websites to customer management.'
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
                  <p className="text-gray-400">{benefit.description}</p>
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
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Local Business?</h2>
              <p className="text-gray-400 mb-8">
                Join hundreds of local businesses that have grown with our digital solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Get Started Today
                </button>
                <button className="border border-white/20 hover:border-white/40 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LocalBusiness;