import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const GDPR = () => {
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
              <Lock className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">GDPR Compliance</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-gradient mb-6">
              GDPR Policy
            </h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-400">
                This GDPR Policy outlines how we collect, process, and protect personal data in 
                accordance with the General Data Protection Regulation (GDPR). We are committed 
                to ensuring the privacy and security of your personal information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Data Protection Principles</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Under GDPR, we follow these data protection principles:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Lawfulness, fairness, and transparency</li>
                  <li>Purpose limitation</li>
                  <li>Data minimization</li>
                  <li>Accuracy</li>
                  <li>Storage limitation</li>
                  <li>Integrity and confidentiality</li>
                  <li>Accountability</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights Under GDPR</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Access</h3>
                  <p className="text-gray-400">
                    You have the right to request a copy of your personal data that we hold.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Rectification</h3>
                  <p className="text-gray-400">
                    You can request corrections to your personal data if it is inaccurate or incomplete.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Erasure</h3>
                  <p className="text-gray-400">
                    You can request the deletion of your personal data under certain circumstances.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Restrict Processing</h3>
                  <p className="text-gray-400">
                    You can request that we limit the processing of your personal data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Data Portability</h3>
                  <p className="text-gray-400">
                    You can request to receive your personal data in a structured, commonly used format.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Right to Object</h3>
                  <p className="text-gray-400">
                    You can object to the processing of your personal data under certain circumstances.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Data Processing</h2>
              <div className="space-y-4">
                <p className="text-gray-400">
                  We process personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-400">
                  <li>Providing our services</li>
                  <li>Marketing communications (with consent)</li>
                  <li>Analytics and improvement of our services</li>
                  <li>Legal obligations</li>
                  <li>Customer support</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-400">
                When we transfer personal data outside the EEA, we ensure appropriate safeguards 
                are in place through standard contractual clauses or other approved mechanisms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400">
                We implement appropriate technical and organizational measures to ensure the 
                security of your personal data, including encryption, access controls, and 
                regular security assessments.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Data Breaches</h2>
              <p className="text-gray-400">
                In the event of a personal data breach, we will notify relevant supervisory 
                authorities and affected individuals in accordance with GDPR requirements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">
                For any GDPR-related inquiries or to exercise your rights, please contact our 
                Data Protection Officer at:
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

export default GDPR;
