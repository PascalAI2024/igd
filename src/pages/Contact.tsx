import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, MapPin, Clock, Zap, Globe, Award, Users, Briefcase } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InteractiveContactHub from '../components/contact/InteractiveContactHub';
import LiveResponseDemo from '../components/contact/LiveResponseDemo';

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Enhanced background with multiple gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,0,0,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,0,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,0,0.1),transparent_50%)]" />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-500"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.7, 0.1, 0.7],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-6"
              >
                <Zap className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Let's Create Something Amazing</span>
              </motion.div>

              <h1 className="text-6xl font-bold mb-6 text-gradient">
                Get in Touch
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Ready to transform your digital presence? Let's discuss how we can help your business grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                <div className="px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-white font-medium">AI & Machine Learning</span>
                </div>
                <div className="px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-white font-medium">Digital Marketing</span>
                </div>
                <div className="px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-white font-medium">Web Development</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Contact Hub */}
        <section className="py-16 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveContactHub />
          </div>
        </section>

        {/* Live Response Demo */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveResponseDemo />
          </div>
        </section>

        {/* Traditional Contact Information */}
        <section className="py-24 relative bg-black/50">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,0,0.05),transparent_70%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
              >
                <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Direct Contact</span>
              </motion.div>

              <h2 className="text-4xl font-bold text-gradient mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Ready to elevate your business with cutting-edge technology solutions?
                Reach out directly and let's start the conversation.
              </p>
            </div>

            {/* Main contact cards with enhanced styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <motion.a
                href="tel:+19545158586"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
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
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(255, 59, 48, 0.1)' }}
                className="group flex items-center p-8 bg-gradient-to-br from-black to-gray-900 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/30 transition-all duration-300 w-full"
              >
                <div className="p-5 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <Mail className="w-8 h-8 text-red-500" />
                </div>
                <div className="ml-6 overflow-hidden w-full">
                  <p className="text-sm text-gray-400 mb-1">Email Us</p>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                    pascal@ingeniousdigital.com
                  </p>
                  <p className="text-gray-400 mt-2">We typically respond within 24 hours</p>
                </div>
              </motion.a>
            </div>

            {/* Why work with us section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="bg-gradient-to-br from-red-500/5 to-purple-500/5 rounded-2xl p-10 backdrop-blur-sm border border-red-500/10 max-w-5xl mx-auto mb-16"
            >
              <h3 className="text-2xl font-bold text-gradient mb-8 text-center">
                Why Work With Us
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Expertise</h4>
                  <p className="text-gray-400">Cutting-edge solutions in AI, machine learning, and digital marketing</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Client-Focused</h4>
                  <p className="text-gray-400">Personalized approach tailored to your specific business needs</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <Briefcase className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Results-Driven</h4>
                  <p className="text-gray-400">Proven track record of delivering measurable business outcomes</p>
                </div>
              </div>
            </motion.div>

            {/* Location information with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">Our Location</h3>
              </div>

              <p className="text-gray-300 mb-6">
                We're based in Fort Lauderdale, FL and work with clients across the United States.
                Reach out today to discuss how we can help transform your digital presence.
              </p>

              <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full border border-red-500/20">
                <span className="text-red-400 font-semibold">Fort Lauderdale, FL 33304</span>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
                  <Clock className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-gray-300 text-sm">Fast Response Time</span>
                </div>

                <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
                  <Globe className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-gray-300 text-sm">Remote Collaboration</span>
                </div>

                <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
                  <Zap className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-gray-300 text-sm">Innovative Solutions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]"></div>

          {/* Animated lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  left: 0,
                  right: 0,
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-12 border border-white/5 shadow-xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gradient mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Let's collaborate to create innovative solutions that drive real results for your business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                <motion.a
                  href="tel:+19545158586"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg shadow-lg shadow-red-500/20 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </motion.a>

                <motion.a
                  href="mailto:pascal@ingeniousdigital.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 hover:border-red-500/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;