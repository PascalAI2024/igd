import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when contacting us or requesting services',
        'Technical information about your device and browsing behavior',
        'Communication records and project-related information',
        'Payment and billing information for our services'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'To provide and improve our digital services',
        'To communicate with you about projects and updates',
        'To process payments and manage billing',
        'To comply with legal obligations and protect our rights'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We do not sell or rent your personal information to third parties',
        'We may share information with trusted service providers who assist us',
        'We may disclose information when required by law or to protect our rights',
        'Business transfers may include customer information as part of assets'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'We implement industry-standard security measures to protect your data',
        'All sensitive information is encrypted during transmission and storage',
        'Access to personal information is restricted to authorized personnel only',
        'We regularly review and update our security practices'
      ]
    },
    {
      title: 'Your Rights',
      icon: Eye,
      content: [
        'You have the right to access, update, or delete your personal information',
        'You can opt out of marketing communications at any time',
        'You may request a copy of the personal information we hold about you',
        'You can file a complaint with relevant data protection authorities'
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/5 to-blue-500/10"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Privacy Policy</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="mt-6 text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-black/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 border border-red-500/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Questions About Your Privacy?</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please don't hesitate to contact us.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-400">privacy@ingeniousdigital.com</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Mailing Address</h3>
                  <p className="text-gray-400">
                    Ingenious Digital<br />
                    Privacy Department<br />
                    [Your Address]
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Cookies and Tracking</h3>
                  <p className="text-gray-300">
                    We use cookies and similar technologies to improve your browsing experience, 
                    analyze site traffic, and personalize content. You can control cookie settings 
                    through your browser preferences.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Data Retention</h3>
                  <p className="text-gray-300">
                    We retain your personal information only as long as necessary to provide our services 
                    and comply with legal obligations. When information is no longer needed, 
                    we securely delete or anonymize it.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Policy Updates</h3>
                  <p className="text-gray-300">
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    material changes by posting the new policy on our website and updating the 
                    "Last updated" date.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
