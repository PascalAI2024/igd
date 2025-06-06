import React from 'react';
import { motion } from 'framer-motion';
import { Send, Zap } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';
import { useForm } from '../hooks/useApi';
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

// Define our form data type
interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  projectType: string;
  budget: string;
}

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

const EnhancedContactForm: React.FC = () => {
  // Use our custom form hook
  const { 
    loading, 
    error, 
    success, 
    message, 
    reference,
    submitData, 
    reset 
  } = useForm<ContactFormData>('contact');

  // Handle form submission
  const handleSubmit = async (data: Record<string, string>) => {
    try {
      // Convert data to our expected format
      const formData: ContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        message: data.message,
        projectType: data.projectType || '',
        budget: data.budget || ''
      };

      // Get reCAPTCHA response if we're using it
      const recaptchaResponse = (window as any).grecaptcha?.getResponse() || undefined;
      
      // Submit the form through our secure proxy
      const result = await submitData(formData, recaptchaResponse);
      
      if (result) {
        // Track successful form submission
        trackFormSubmission('contact', 'contact-form', true);
        
        // Track lead generation
        trackLeadGeneration(
          'website',
          'contact-form',
          formData.projectType || 'general'
        );
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Track error details
      trackError(
        'Form submission error',
        'API_ERROR',
        error instanceof Error ? error.message : 'Unknown error'
      );
      
      // Re-throw the error to be handled by the form wrapper
      throw error;
    }
  };

  // Create a custom message that includes the reference number if available
  const getSuccessMessage = () => {
    let msg = 'Thank you! We\'ll get back to you soon.';
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
  };

  const getErrorMessage = () => {
    let msg = 'Something went wrong. Please try again later.';
    if (error) {
      msg = error;
    }
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
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
              maxLength={100}
            />

            <FormField
              type="email"
              name="email"
              label="Email"
              placeholder="your@email.com"
              required
              maxLength={150}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              type="tel"
              name="phone"
              label="Phone"
              placeholder="Your phone number"
              maxLength={20}
            />

            <FormField
              type="text"
              name="company"
              label="Company"
              placeholder="Your company"
              maxLength={100}
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
            maxLength={2000}
          />

          <SubmitButton 
            text="Send Message" 
            loadingText="Sending..." 
            icon={<Send className="w-5 h-5" />} 
            isLoading={loading}
          />

          <FormStatus 
            successMessage={getSuccessMessage()} 
            errorMessage={getErrorMessage()} 
            status={success ? 'success' : error ? 'error' : 'idle'}
          />
        </SecureFormWrapper>
      </div>
    </section>
  );
};

export default EnhancedContactForm;