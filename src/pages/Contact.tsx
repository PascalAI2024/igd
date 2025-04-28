import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ContactForm from '../components/ContactForm';

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
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.a
                href="tel:+19545158586"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-lg text-white group-hover:text-red-500 transition-colors">
                    (954) 515-8586
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:pascal@ingeniousdigital.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg text-white group-hover:text-red-500 transition-colors">
                    pascal@ingeniousdigital.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.google.com/maps/dir//Fort+Lauderdale,+FL+33304"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg text-white group-hover:text-red-500 transition-colors">
                    Fort Lauderdale, FL 33304
                  </p>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <ContactForm />
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative h-full min-h-[400px] rounded-xl overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28695.82074266934!2d-80.13660944999999!3d26.1224344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d900cae9a14a61%3A0x156e44999c7a8f49!2sFort%20Lauderdale%2C%20FL%2033304!5e0!3m2!1sen!2sus!4v1647886157000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-80"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;