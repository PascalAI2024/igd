import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Privacy = () => {
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
              <Shield className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Privacy Policy</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-gradient mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-400">
                At Ingenious Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  We collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Fill out forms on our website</li>
                  <li>Sign up for our services</li>
                  <li>Contact us via email or phone</li>
                  <li>Subscribe to our newsletter</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Provide and maintain our services</li>
                  <li>Improve our website and services</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you marketing and promotional materials</li>
                  <li>Respond to your inquiries and requests</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Information Security</h2>
              <p className="text-gray-400">
                We implement appropriate technical and organizational security measures to protect your 
                personal information. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
