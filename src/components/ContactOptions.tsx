import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Zap } from 'lucide-react';
import { trackInteraction } from '../utils/analytics';

interface ContactOptionsProps {
  variant?: 'default' | 'compact' | 'minimal';
  showHeader?: boolean;
  className?: string;
}

const ContactOptions: React.FC<ContactOptionsProps> = ({ 
  variant = 'default', 
  showHeader = true,
  className = ''
}) => {
  const handlePhoneClick = () => {
    trackInteraction('contact-button', 'contact-options-phone', 'phone_call');
  };

  const handleEmailClick = () => {
    trackInteraction('contact-button', 'contact-options-email', 'email_click');
  };

  const baseClasses = `${className}`;

  if (variant === 'minimal') {
    return (
      <div className={`${baseClasses} flex flex-col sm:flex-row items-center justify-center gap-4`}>
        <motion.a
          href="tel:+19545158586"
          onClick={handlePhoneClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg shadow-red-500/20 flex items-center justify-center min-w-[150px]"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </motion.a>

        <motion.a
          href="mailto:pascal@ingeniousdigital.com"
          onClick={handleEmailClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-white/5 text-white border border-white/10 hover:border-red-500/30 rounded-lg flex items-center justify-center transition-colors min-w-[150px]"
        >
          <Mail className="w-5 h-5 mr-2" />
          Send Email
        </motion.a>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${baseClasses} space-y-4`}>
        {showHeader && (
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
            >
              <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Get in Touch</span>
            </motion.div>
            <h2 className="text-2xl font-bold text-gradient mb-4">
              Contact Us
            </h2>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="tel:+19545158586"
            onClick={handlePhoneClick}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 59, 48, 0.1)' }}
            className="group flex items-center p-6 bg-gradient-to-br from-black to-gray-900 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 flex-1"
          >
            <div className="p-4 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <Phone className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400 mb-1">Call Us</p>
              <p className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">
                (954) 515-8586
              </p>
            </div>
          </motion.a>

          <motion.a
            href="mailto:pascal@ingeniousdigital.com"
            onClick={handleEmailClick}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 59, 48, 0.1)' }}
            className="group flex items-center p-6 bg-gradient-to-br from-black to-gray-900 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 flex-1"
          >
            <div className="p-4 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <Mail className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400 mb-1">Email Us</p>
              <p className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">
                Send Message
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <section id="contact" className={`py-20 bg-black scroll-mt-20 ${baseClasses}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
            >
              <Zap className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500 font-semibold">Let's Work Together</span>
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Contact us directly to discuss your project and let's create something amazing together.
            </p>
          </div>
        )}

        {/* Main contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <motion.a
            href="tel:+19545158586"
            onClick={handlePhoneClick}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 59, 48, 0.1)' }}
            className="group flex items-center p-8 bg-gradient-to-br from-black to-gray-900 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300"
          >
            <div className="p-5 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <Phone className="w-8 h-8 text-red-500" />
            </div>
            <div className="ml-6">
              <p className="text-sm text-gray-400 mb-1">Call Us Directly</p>
              <p className="text-2xl font-semibold text-white group-hover:text-red-500 transition-colors">
                (954) 515-8586
              </p>
              <p className="text-gray-400 mt-2">Available Monday-Friday, 9am-6pm EST</p>
            </div>
          </motion.a>

          <motion.a
            href="mailto:pascal@ingeniousdigital.com"
            onClick={handleEmailClick}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 59, 48, 0.1)' }}
            className="group flex items-center p-8 bg-gradient-to-br from-black to-gray-900 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 w-full"
          >
            <div className="p-5 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <Mail className="w-8 h-8 text-red-500" />
            </div>
            <div className="ml-6 overflow-hidden w-full">
              <p className="text-sm text-gray-400 mb-1">Email Us</p>
              <p className="text-base md:text-lg font-semibold text-white group-hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                pascal@ingeniousdigital.com
              </p>
              <p className="text-gray-400 mt-2">We typically respond within 24 hours</p>
            </div>
          </motion.a>
        </div>

        {/* Why work with us section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl p-10 backdrop-blur-sm border border-red-500/10 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gradient mb-8 text-center">
            Why Work With Us
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-red-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Fast Response</h4>
              <p className="text-gray-400">Quick response times and efficient project delivery</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-7 h-7 text-red-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Direct Communication</h4>
              <p className="text-gray-400">Work directly with our team, no middlemen or sales calls</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-red-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Personal Touch</h4>
              <p className="text-gray-400">Personalized service tailored to your specific needs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactOptions;