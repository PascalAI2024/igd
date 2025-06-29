import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      title: 'Service Agreement',
      icon: FileText,
      content: [
        'These terms govern your use of our digital services and solutions',
        'By engaging our services, you agree to be bound by these terms',
        'We reserve the right to modify these terms with reasonable notice',
        'Continued use of our services constitutes acceptance of updated terms'
      ]
    },
    {
      title: 'Our Services',
      icon: CheckCircle,
      content: [
        'Web development, design, and digital marketing solutions',
        'Custom software development and business automation',
        'Consulting services for digital transformation projects',
        'Ongoing support and maintenance for delivered solutions'
      ]
    },
    {
      title: 'Client Responsibilities',
      icon: Shield,
      content: [
        'Provide accurate and complete information for project requirements',
        'Respond to requests for feedback and approvals in a timely manner',
        'Ensure you have rights to any content or materials provided to us',
        'Make payments according to agreed terms and schedules'
      ]
    },
    {
      title: 'Intellectual Property',
      icon: Scale,
      content: [
        'You retain ownership of your original content and business information',
        'We retain rights to our methodologies, tools, and general knowledge',
        'Custom code and designs become your property upon final payment',
        'We may showcase completed work in our portfolio with your permission'
      ]
    },
    {
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: [
        'Our liability is limited to the amount paid for the specific service',
        'We are not liable for indirect, consequential, or punitive damages',
        'You agree to indemnify us against claims arising from your use of our services',
        'These limitations apply to the fullest extent permitted by law'
      ]
    },
    {
      title: 'Termination',
      icon: XCircle,
      content: [
        'Either party may terminate services with written notice',
        'You remain responsible for payment of services rendered before termination',
        'We will provide reasonable assistance in transitioning ongoing projects',
        'Confidentiality obligations survive termination of the agreement'
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
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Terms of Service</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                These terms outline the agreement between you and Ingenious Digital for our services.
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

        {/* Payment Terms */}
        <section className="py-16 bg-black/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Payment Terms</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Schedule</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">50% deposit required to begin work</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">Progress payments at agreed milestones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">Final payment due upon project completion</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">Bank transfer (preferred)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">Credit card payments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span className="text-gray-300">PayPal for smaller projects</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 border border-red-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Questions About These Terms?</h2>
              
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service or need clarification on any points, 
                please contact us before engaging our services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Legal Inquiries</h3>
                  <p className="text-gray-400">legal@ingeniousdigital.com</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">General Contact</h3>
                  <p className="text-gray-400">contact@ingeniousdigital.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default TermsOfService;
