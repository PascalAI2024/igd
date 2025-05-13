import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to transform your digital presence? Let's discuss your project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
              >
                <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Direct Contact</span>
              </motion.div>

              <h2 className="text-3xl font-bold text-gradient mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Ready to transform your digital presence? Reach out directly via phone or email.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <motion.a
                href="tel:+19545158586"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group flex items-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300 card-premium"
              >
                <div className="p-4 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group flex items-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300 card-premium"
              >
                <div className="p-4 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-400 mb-1">Email Us</p>
                  <p className="text-xl font-semibold text-white group-hover:text-red-500 transition-colors">
                    pascal@ingeniousdigital.com
                  </p>
                  <p className="text-gray-400 mt-2">We typically respond within 24 hours</p>
                </div>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mt-16 max-w-2xl mx-auto"
            >
              <p className="text-gray-300 mb-6">
                We're based in Fort Lauderdale, FL and work with clients across the United States.
                Reach out today to discuss how we can help transform your digital presence.
              </p>
              <div className="inline-flex items-center justify-center px-6 py-3 bg-red-500/10 rounded-full">
                <span className="text-red-500 font-semibold">Fort Lauderdale, FL 33304</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;