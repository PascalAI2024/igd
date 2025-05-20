import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, User, Building, MessageSquare } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';

const LightContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    projectType: '',
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
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="Your name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="Your phone number"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
            placeholder="Your company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
        >
          <option value="">How can we help your business?</option>
          <option value="web-development">Create or improve website</option>
          <option value="digital-marketing">Increase online visibility</option>
          <option value="seo">Improve search rankings</option>
          <option value="social-media">Build social media presence</option>
          <option value="local-marketing">Local marketing strategy</option>
          <option value="analytics">Business analytics & reporting</option>
          <option value="consultation">General business consultation</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          How can we help? *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 resize-none"
            placeholder="Tell us about your business needs and goals"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <span>{isSubmitting ? 'Sending...' : 'Request Information'}</span>
        <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
      </button>

      {submitStatus === 'success' && (
        <div className="text-green-600 text-center bg-green-50 p-3 rounded-lg border border-green-200">
          Thank you! One of our local specialists will contact you within 1 business day.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200">
          We're having technical difficulties. Please try again or call us directly.
        </div>
      )}
    </form>
  );
};

export default LightContactForm;