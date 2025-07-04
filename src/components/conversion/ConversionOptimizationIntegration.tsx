import React from 'react';
import { motion } from 'framer-motion';
import EnhancedCTAButton from '../ui/EnhancedCTAButton';
import OptimizedLeadCaptureForm from '../OptimizedLeadCaptureForm';
import LeadMagnet from '../LeadMagnet';
import { Calculator, BookOpen, Video, Lightbulb } from 'lucide-react';

/**
 * Conversion Optimization Integration Component
 * Demonstrates best practices for implementing conversion optimization features
 */
const ConversionOptimizationIntegration: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section with Enhanced CTAs */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Transform Your Business with Data-Driven Digital Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join 500+ businesses that increased their revenue by 40% in 6 months
            </p>
            
            {/* Multiple CTA variants for A/B testing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedCTAButton
                variant="urgent"
                size="large"
                to="/contact"
                urgencyText="Limited spots available this month"
                socialProof={{ count: 127, text: "businesses started this week" }}
                trustBadges={['secure', 'guarantee', 'rated']}
                testVariant="A"
              >
                Start Your Free Consultation
              </EnhancedCTAButton>
              
              <EnhancedCTAButton
                variant="value"
                size="large"
                href="#calculator"
                showArrow={false}
                className="bg-white/10 hover:bg-white/20"
              >
                Calculate Your ROI
              </EnhancedCTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Get Free Resources to Grow Your Business
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calculator Lead Magnet */}
              <LeadMagnet
                variant="inline"
                offer={{
                  id: 'roi-calculator',
                  icon: Calculator,
                  title: 'ROI Calculator & Growth Planner',
                  description: 'Instantly calculate your potential ROI and get a custom growth roadmap',
                  value: '$1,500',
                  format: 'Interactive Tool',
                  color: 'from-blue-500 to-cyan-500'
                }}
              />
              
              {/* Guide Lead Magnet */}
              <LeadMagnet
                variant="inline"
                offer={{
                  id: 'marketing-guide',
                  icon: BookOpen,
                  title: '2024 Digital Marketing Playbook',
                  description: '87-page guide with proven strategies from 500+ successful campaigns',
                  value: '$997',
                  format: 'PDF Download',
                  color: 'from-purple-500 to-pink-500'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof with CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 border border-red-500/20"
          >
            <h3 className="text-4xl font-bold text-white mb-6">
              Join 500+ Successful Businesses
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">40%</div>
                <div className="text-gray-400">Avg Revenue Growth</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">98%</div>
                <div className="text-gray-400">Client Retention</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400 mb-2">24hr</div>
                <div className="text-gray-400">Response Time</div>
              </div>
            </div>
            
            <EnhancedCTAButton
              variant="limited"
              size="large"
              to="/contact"
              limitedTime={{
                endTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
                text: "Special offer ends in"
              }}
              pulseAnimation={true}
              testVariant="B"
            >
              Claim Your Free Strategy Session ($500 Value)
            </EnhancedCTAButton>
          </motion.div>
        </div>
      </section>

      {/* Multi-Step Lead Capture Form */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Get Your Custom Growth Plan
            </h2>
            <p className="text-gray-300 text-center mb-10">
              Answer a few questions and receive a personalized strategy within 24 hours
            </p>
            
            <OptimizedLeadCaptureForm
              variant="multi-step"
              showTrustSignals={true}
              showValueProps={true}
              onSubmit={(data) => {
                console.log('Lead captured:', data);
                // Handle form submission
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Sidebar Lead Magnet Example */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-6">
                Learn From Our Success Stories
              </h2>
              <p className="text-gray-300 mb-8">
                Discover how we've helped businesses like yours achieve remarkable growth through strategic digital transformation...
              </p>
              {/* Content continues... */}
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadMagnet
                  variant="sidebar"
                  offer={{
                    id: 'video-masterclass',
                    icon: Video,
                    title: 'Free Video Masterclass',
                    description: '45-minute deep dive into conversion optimization',
                    value: '$297',
                    format: 'Video Course',
                    color: 'from-red-500 to-orange-500'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contextual CTAs Throughout Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="text-3xl font-bold text-white mb-6">
            5 Proven Strategies to Double Your Conversions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-white">1. Optimize Your Value Proposition</h3>
              <p className="text-gray-300">
                Your value proposition is the first thing visitors see...
              </p>
            </div>
            
            {/* Contextual CTA after valuable content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="my-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
            >
              <p className="text-white font-semibold mb-4">
                Want to implement these strategies in your business?
              </p>
              <EnhancedCTAButton
                variant="value"
                size="medium"
                to="/consultation"
                showArrow={true}
                testVariant="C"
              >
                Get Expert Help
              </EnhancedCTAButton>
            </motion.div>
            
            <div>
              <h3 className="text-2xl text-white">2. Leverage Social Proof</h3>
              <p className="text-gray-300">
                Studies show that 92% of consumers trust peer recommendations...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section with Strong CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't let your competitors get ahead. Start your growth journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <EnhancedCTAButton
                variant="urgent"
                size="large"
                to="/get-started"
                urgencyText="Only 5 spots left this month"
                socialProof={{ count: 23, text: "businesses joined this week" }}
                pulseAnimation={true}
              >
                Yes, I Want to Grow My Business
              </EnhancedCTAButton>
              
              <EnhancedCTAButton
                variant="trust"
                size="large"
                href="tel:+19545158586"
                external={true}
                trustBadges={['secure']}
              >
                Call Now: (954) 515-8586
              </EnhancedCTAButton>
            </div>
            
            <p className="text-sm text-gray-400">
              No credit card required • 100% free consultation • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConversionOptimizationIntegration;