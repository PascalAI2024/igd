import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    projectType: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
          budget: ''
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
    <section id="contact" className="py-20 bg-black scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Start Your Project
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tell us about your project and let's create something amazing together.
          </p>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                placeholder="Your company"
              />
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
              >
                <option value="" className="bg-gray-900">Select project type</option>
                <option value="custom-software" className="bg-gray-900">Custom Software</option>
                <option value="ai-ml" className="bg-gray-900">AI & Machine Learning</option>
                <option value="cloud" className="bg-gray-900">Cloud Services</option>
                <option value="mobile" className="bg-gray-900">Mobile Development</option>
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
              >
                <option value="" className="bg-gray-900">Select budget range</option>
                <option value="10k-25k" className="bg-gray-900">$10,000 - $25,000</option>
                <option value="25k-50k" className="bg-gray-900">$25,000 - $50,000</option>
                <option value="50k-100k" className="bg-gray-900">$50,000 - $100,000</option>
                <option value="100k+" className="bg-gray-900">$100,000+</option>
              </select>
            </div>
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400 resize-none"
              placeholder="Tell us about your project"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
          </motion.button>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-center"
            >
              Thank you! We'll get back to you soon.
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center"
            >
              Something went wrong. Please try again later.
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
