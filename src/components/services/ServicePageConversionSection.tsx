import React from 'react';
import { motion } from 'framer-motion';
import EnhancedCTAButton from '../ui/EnhancedCTAButton';
import LeadMagnet from '../LeadMagnet';
import { Calculator, Download, Users, TrendingUp } from 'lucide-react';

interface ServicePageConversionSectionProps {
  serviceName: string;
  stats?: {
    clientCount?: number;
    successRate?: number;
    avgROI?: string;
  };
}

/**
 * Conversion-optimized section for service pages
 * Combines multiple conversion elements strategically
 */
const ServicePageConversionSection: React.FC<ServicePageConversionSectionProps> = ({
  serviceName,
  stats = {
    clientCount: 127,
    successRate: 98,
    avgROI: '3.7x'
  }
}) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Success Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 mb-12 border border-red-500/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.clientCount}+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.successRate}%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Calculator className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats.avgROI}</div>
              <div className="text-gray-400">Average ROI</div>
            </div>
            <div className="flex items-center justify-center">
              <EnhancedCTAButton
                variant="urgent"
                size="medium"
                to="/consultation"
                urgencyText="Only 3 spots left"
                socialProof={{ count: 12, text: "consultations booked today" }}
                pulseAnimation={true}
                testVariant="A"
              >
                Get Started Now
              </EnhancedCTAButton>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Layout: Content + Lead Magnet */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your {serviceName}?
              </h2>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Join hundreds of businesses that have revolutionized their operations 
                  with our proven {serviceName} strategies.
                </p>
                
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    What You'll Get:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Personalized strategy tailored to your business goals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Dedicated team of experts with proven track record</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Transparent reporting and measurable results</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Ongoing optimization and support</span>
                    </li>
                  </ul>
                </div>

                {/* Testimonial */}
                <motion.blockquote
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-red-500 pl-6 py-4"
                >
                  <p className="text-lg italic mb-4">
                    "Working with Ingenious Digital transformed our {serviceName}. 
                    We saw a 312% increase in qualified leads within 90 days."
                  </p>
                  <footer className="text-sm">
                    <span className="text-white font-semibold">Sarah Johnson</span>
                    <span className="text-gray-400"> - CEO, TechStart Inc.</span>
                  </footer>
                </motion.blockquote>

                {/* Action Section */}
                <div className="pt-6">
                  <p className="text-white font-semibold mb-4">
                    Don't let your competitors get ahead. Take action today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <EnhancedCTAButton
                      variant="value"
                      size="large"
                      to="/contact"
                      showArrow={true}
                      testVariant="B"
                    >
                      Schedule Free Consultation
                    </EnhancedCTAButton>
                    
                    <EnhancedCTAButton
                      variant="trust"
                      size="large"
                      href="tel:+19545158586"
                      external={true}
                      className="bg-white/10 hover:bg-white/20"
                    >
                      Call (954) 515-8586
                    </EnhancedCTAButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar with Lead Magnet */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Primary Lead Magnet */}
              <LeadMagnet
                variant="sidebar"
                offer={{
                  id: `${serviceName.toLowerCase()}-guide`,
                  icon: Download,
                  title: `Free ${serviceName} Success Guide`,
                  description: 'Get our proven framework used by 500+ successful businesses',
                  value: '$497',
                  format: 'PDF Guide',
                  color: 'from-blue-500 to-purple-500'
                }}
              />

              {/* Secondary CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30"
              >
                <h4 className="text-lg font-semibold text-white mb-3">
                  Limited Time Offer
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Get 20% off your first month when you sign up this week.
                </p>
                <EnhancedCTAButton
                  variant="limited"
                  size="small"
                  to="/special-offer"
                  limitedTime={{
                    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                    text: "Offer expires in"
                  }}
                  className="w-full justify-center"
                >
                  Claim Discount
                </EnhancedCTAButton>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 border border-gray-800"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our {serviceName} experts are standing by to answer your questions 
            and help you create a custom growth strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedCTAButton
              variant="social"
              size="large"
              to="/faq"
              socialProof={{ count: 2847, text: "questions answered" }}
            >
              View FAQ
            </EnhancedCTAButton>
            
            <EnhancedCTAButton
              variant="urgent"
              size="large"
              to="/live-chat"
              urgencyText="Experts online now"
              pulseAnimation={true}
            >
              Start Live Chat
            </EnhancedCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePageConversionSection;