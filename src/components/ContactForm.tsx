import React from 'react';
import { motion } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';
import SecureFormWrapper from './SecureFormWrapper';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import FormStatus from './FormStatus';

// Project type options
const PROJECT_TYPE_OPTIONS = [
  { value: '', label: 'Select project type' },
  { value: 'custom-software', label: 'Custom Software' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'cloud', label: 'Cloud Services' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'other', label: 'Other' }
];

// Budget range options
const BUDGET_OPTIONS = [
  { value: '', label: 'Select budget range' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000+' }
];

// Initial form data
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  projectType: '',
  budget: ''
};

// Required fields
const REQUIRED_FIELDS = ['name', 'email', 'message'];

const ContactForm = () => {
  // Handle form submission
  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...data
        }).toString()
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      // Track successful form submission
      trackFormSubmission('contact', 'contact-form', true);
      
      // Track lead generation
      trackLeadGeneration(
        'website',
        'contact-form',
        data.projectType || 'general'
      );
    } catch (error) {
      // Track error details
      trackError(
        'Form submission error',
        'FETCH_ERROR',
        error instanceof Error ? error.message : 'Unknown error'
      );
      
      // Re-throw the error to be handled by the form wrapper
      throw error;
    }
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

        <SecureFormWrapper
          formId="contact"
          initialData={INITIAL_FORM_DATA}
          requiredFields={REQUIRED_FIELDS}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="text"
              name="name"
              label="Name"
              placeholder="Your name"
              required
            />

            <FormField
              type="email"
              name="email"
              label="Email"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="tel"
              name="phone"
              label="Phone"
              placeholder="Your phone number"
            />

            <FormField
              type="text"
              name="company"
              label="Company"
              placeholder="Your company"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="select"
              name="projectType"
              label="Project Type"
              options={PROJECT_TYPE_OPTIONS}
            />

            <FormField
              type="select"
              name="budget"
              label="Budget Range"
              options={BUDGET_OPTIONS}
            />
          </div>

          <FormField
            type="textarea"
            name="message"
            label="Message"
            placeholder="Tell us about your project"
            required
            rows={4}
          />

          <SubmitButton 
            text="Send Message" 
            loadingText="Sending..." 
            icon={<Send className="w-5 h-5" />} 
          />

          <FormStatus 
            successMessage="Thank you! We'll get back to you soon." 
            errorMessage="Something went wrong. Please try again later." 
          />
        </SecureFormWrapper>
      </div>
    </section>
  );
};

export default ContactForm;