import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Terms = () => {
  return (
    <PageTransition>
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
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-400">
                By accessing or using our services, you agree to be bound by these Terms of Service. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Services</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Our services include but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Digital Marketing</li>
                  <li>Lead Generation</li>
                  <li>CRM Solutions</li>
                  <li>Web Development</li>
                  <li>Media Production</li>
                  <li>AI & Automation</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <p className="text-gray-400">
                The service and its original content, features, and functionality are and will remain 
                the exclusive property of Ingenious Digital. Our service is protected by copyright, 
                trademark, and other laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not use the service for any illegal purposes</li>
                  <li>Not violate any applicable laws or regulations</li>
                  <li>Not infringe on intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
              <p className="text-gray-400">
                Payment terms will be specified in individual service agreements. All fees are 
                non-refundable unless otherwise specified in writing. We reserve the right to 
                change our prices with notice to our clients.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-400">
                In no event shall Ingenious Digital be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-400">
                We reserve the right to modify or replace these terms at any time. We will provide 
                notice of any changes by posting the new Terms of Service on this page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 text-gray-400">
                <p>Email: pascal@ingeniousdigital.com</p>
                <p>Phone: (954) 515-8586</p>
                <p>Address: Fort Lauderdale, FL 33304</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
