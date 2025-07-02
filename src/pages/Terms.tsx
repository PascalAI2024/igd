import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ExpandableSection from '../components/ExpandableSection';
import ReadingProgress from '../components/ReadingProgress';

const Terms = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <ReadingProgress />
      <div className="min-h-screen bg-black py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
            >
              <FileText className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Terms of Service</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-gradient mb-6">
              Terms and Conditions
            </h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ExpandableSection title="Agreement to Terms" defaultOpen={true}>
              <p className="text-gray-400">
                By accessing or using our services, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Services">
              <div className="space-y-4">
                <p className="text-gray-400">
                  Our services include but are not limited to:
                </p>
                <motion.ul className="list-disc pl-6 text-gray-400">
                  {['Digital Marketing', 'Lead Generation', 'CRM Solutions', 'Web Development', 'Media Production', 'AI & Automation'].map((service, index) => (
                    <motion.li
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {service}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </ExpandableSection>

            <ExpandableSection title="Intellectual Property">
              <p className="text-gray-400">
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of Ingenious Digital. Our service is protected by copyright, 
                trademark, and other laws.
              </p>
            </ExpandableSection>

            <ExpandableSection title="User Responsibilities">
              <div className="space-y-4">
                <p className="text-gray-400">
                  You agree to:
                </p>
                <motion.ul className="list-disc pl-6 text-gray-400">
                  {[
                    'Provide accurate and complete information',
                    'Maintain the security of your account',
                    'Not use the service for any illegal purposes',
                    'Not violate any applicable laws or regulations',
                    'Not infringe on intellectual property rights'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </ExpandableSection>

            <ExpandableSection title="Payment Terms">
              <p className="text-gray-400">
                Payment terms will be specified in individual service agreements. All fees are 
                non-refundable unless otherwise specified in writing. We reserve the right to 
                change our prices with notice to our clients.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Limitation of Liability">
              <p className="text-gray-400">
                In no event shall Ingenious Digital be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Changes to Terms">
              <p className="text-gray-400">
                We reserve the right to modify or replace these terms at any time. We will provide 
                notice of any changes by posting the new Terms of Service on this page.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Contact Us" defaultOpen={true}>
              <p className="text-gray-400">
                If you have any questions about these Terms, please contact us at:
              </p>
              <motion.div 
                className="mt-4 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>Email: pascal@ingeniousdigital.com</p>
                <p>Phone: (954) 515-8586</p>
                <p>Address: Fort Lauderdale, FL 33304</p>
              </motion.div>
            </ExpandableSection>
          </div>
        </div>
        
        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors z-40"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </div>
    </PageTransition>
  );
};

export default Terms;
