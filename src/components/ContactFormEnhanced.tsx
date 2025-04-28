import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, MessageSquare, Calendar, Clock, ArrowRight, CheckCircle, AlertCircle, Mail, Phone, MapPin, Building, User } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';

const ContactFormEnhanced = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    projectType: '',
    budget: '',
    timeframe: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'form' | 'schedule'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Track successful form submission
        trackFormSubmission('contact', 'contact-form', true);
        // Track lead generation
        trackLeadGeneration(
          'website',
          'contact-form',
          formData.projectType || 'general'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          projectType: '',
          budget: '',
          timeframe: ''
        });
      } else {
        setSubmitStatus('error');
        // Track failed form submission
        trackFormSubmission('contact', 'contact-form', false);
        // Track error details
        trackError(
          'Form submission failed',
          response.status.toString(),
          'HTTP error response'
        );
      }
    } catch (error) {
      setSubmitStatus('error');
      // Track failed form submission
      trackFormSubmission('contact', 'contact-form', false);
      // Track error details
      trackError(
        'Form submission error',
        'FETCH_ERROR',
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-black scroll-mt-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full px-4 py-2 mb-4 border border-red-500/10"
          >
            <MessageSquare className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-semibold">Let's Work Together</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            Start Your Project
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Tell us about your project and let's create something amazing together
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-black/60 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Email</h4>
                  <a href="mailto:pascal@ingeniousdigital.com" className="text-white hover:text-red-500 transition-colors">
                    pascal@ingeniousdigital.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Phone</h4>
                  <a href="tel:+19545158586" className="text-white hover:text-red-500 transition-colors">
                    (954) 515-8586
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Location</h4>
                  <p className="text-white">
                    Fort Lauderdale<br />
                    FL 33304
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-1">Business Hours</h4>
                  <p className="text-white">
                    Monday - Friday<br />
                    9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-black/60 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 lg:col-span-2"
          >
            {/* Tabs */}
            <div className="flex mb-8 border-b border-white/10">
              <button
                onClick={() => setActiveTab('form')}
                className={`pb-3 px-4 font-medium transition-colors relative ${
                  activeTab === 'form' ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Contact Form
                {activeTab === 'form' && (
                  <motion.div
                    layoutId="activeContactTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`pb-3 px-4 font-medium transition-colors relative ${
                  activeTab === 'schedule' ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Schedule a Call
                {activeTab === 'schedule' && (
                  <motion.div
                    layoutId="activeContactTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                          placeholder="Your company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                      >
                        <option value="" className="bg-gray-900">Select project type</option>
                        <option value="web-development" className="bg-gray-900">Web Development</option>
                        <option value="digital-marketing" className="bg-gray-900">Digital Marketing</option>
                        <option value="ai-ml" className="bg-gray-900">AI & Machine Learning</option>
                        <option value="business-automation" className="bg-gray-900">Business Automation</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                      >
                        <option value="" className="bg-gray-900">Select budget range</option>
                        <option value="under-5k" className="bg-gray-900">Under $5,000</option>
                        <option value="5k-10k" className="bg-gray-900">$5,000 - $10,000</option>
                        <option value="10k-25k" className="bg-gray-900">$10,000 - $25,000</option>
                        <option value="25k-50k" className="bg-gray-900">$25,000 - $50,000</option>
                        <option value="50k+" className="bg-gray-900">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300 mb-2">
                      Timeframe
                    </label>
                    <select
                      id="timeframe"
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                    >
                      <option value="" className="bg-gray-900">Select timeframe</option>
                      <option value="asap" className="bg-gray-900">As soon as possible</option>
                      <option value="1-month" className="bg-gray-900">Within 1 month</option>
                      <option value="3-months" className="bg-gray-900">Within 3 months</option>
                      <option value="6-months" className="bg-gray-900">Within 6 months</option>
                      <option value="flexible" className="bg-gray-900">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500 resize-none"
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-red-500/25'
                    }`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className={`w-5 h-5 ml-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center text-green-500"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Thank you! We'll get back to you soon.</span>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-500"
                      >
                        <AlertCircle className="w-5 h-5 mr-2" />
                        <span>Something went wrong. Please try again later.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              ) : (
                <motion.div
                  key="schedule-call"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-black/40 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-6 h-6 text-red-500 mr-3" />
                      <h3 className="text-lg font-semibold text-white">Schedule a Consultation</h3>
                    </div>

                    <p className="text-gray-400 mb-6">
                      Book a free 30-minute consultation with one of our experts to discuss your project in detail.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
                        <h4 className="font-medium text-white mb-2">Discovery Call</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          Initial discussion to understand your needs and explore potential solutions.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>30 minutes</span>
                        </div>
                      </div>

                      <div className="bg-black/60 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300">
                        <h4 className="font-medium text-white mb-2">Technical Consultation</h4>
                        <p className="text-sm text-gray-400 mb-3">
                          Detailed technical discussion with our development team.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>45 minutes</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://calendly.com/ingeniousdigital/consultation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 group"
                    >
                      <span>Book a Time Slot</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  <div className="bg-black/40 rounded-lg p-6 border border-white/10">
                    <h4 className="font-medium text-white mb-4">What to Expect</h4>

                    <div className="space-y-4">
                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-red-500 text-sm font-bold">1</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Select a convenient time slot from our calendar
                        </p>
                      </div>

                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-red-500 text-sm font-bold">2</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Receive a confirmation email with meeting details
                        </p>
                      </div>

                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-red-500 text-sm font-bold">3</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Join the video call at the scheduled time
                        </p>
                      </div>

                      <div className="flex">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-red-500 text-sm font-bold">4</span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Discuss your project and receive a follow-up proposal
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-lg p-5 border border-white/10">
              <h4 className="font-medium text-white mb-2">What is your typical process?</h4>
              <p className="text-sm text-gray-400">
                Our process typically includes discovery, planning, design, development, testing, and launch phases, with ongoing support available.
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-5 border border-white/10">
              <h4 className="font-medium text-white mb-2">How long does a project take?</h4>
              <p className="text-sm text-gray-400">
                Project timelines vary based on complexity. Simple websites may take 2-4 weeks, while complex applications can take 3-6 months.
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-5 border border-white/10">
              <h4 className="font-medium text-white mb-2">Do you offer ongoing support?</h4>
              <p className="text-sm text-gray-400">
                Yes, we offer various maintenance and support packages to ensure your project continues to run smoothly after launch.
              </p>
            </div>

            <div className="bg-black/40 rounded-lg p-5 border border-white/10">
              <h4 className="font-medium text-white mb-2">What payment terms do you offer?</h4>
              <p className="text-sm text-gray-400">
                We typically require a 50% deposit to begin work, with the remaining balance due upon project completion or in milestone payments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormEnhanced;
