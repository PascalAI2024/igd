import React from 'react';
import { Send, Phone, Mail, User, Building, MessageSquare } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../utils/analytics';
import { useForm } from '../hooks/useApi';
import SecureFormWrapper from './SecureFormWrapper';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import FormStatus from './FormStatus';

/**
 * Interface for the form data structure
 */
interface LightContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  projectType: string;
}

/**
 * Initial form data
 */
const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  projectType: '',
};

/**
 * Required fields for validation
 */
const REQUIRED_FIELDS = ['name', 'email', 'message'];

/**
 * Project type options for dropdown
 */
const PROJECT_TYPE_OPTIONS = [
  { value: '', label: 'How can we help your business?' },
  { value: 'web-development', label: 'Create or improve website' },
  { value: 'digital-marketing', label: 'Increase online visibility' },
  { value: 'seo', label: 'Improve search rankings' },
  { value: 'social-media', label: 'Build social media presence' },
  { value: 'local-marketing', label: 'Local marketing strategy' },
  { value: 'analytics', label: 'Business analytics & reporting' },
  { value: 'consultation', label: 'General business consultation' },
];

/**
 * A lightweight contact form component with consistent styling and secure implementation
 */
const SecureLightContactForm: React.FC = () => {
  // Use our custom form hook for secure submission handling
  const { 
    loading, 
    error, 
    success, 
    message, 
    reference,
    submitData, 
    reset 
  } = useForm<LightContactFormData>('contact');

  // Handle form submission
  const handleSubmit = async (data: Record<string, string>) => {
    try {
      // Convert data to our expected format
      const formData: LightContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        message: data.message,
        projectType: data.projectType || '',
      };

      // Get reCAPTCHA response if we're using it
      const recaptchaResponse = (window as any).grecaptcha?.getResponse() || undefined;
      
      // Submit the form through our secure proxy
      const result = await submitData(formData, recaptchaResponse);
      
      if (result) {
        // Track successful form submission
        trackFormSubmission('contact', 'light-contact-form', true);
        
        // Track lead generation
        trackLeadGeneration(
          'website',
          'light-contact-form',
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

  // Format success message
  const getSuccessMessage = () => {
    let msg = 'Thank you! One of our local specialists will contact you within 1 business day.';
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
  };

  // Format error message 
  const getErrorMessage = () => {
    let msg = 'We\'re having technical difficulties. Please try again or call us directly.';
    if (error) {
      msg = error;
    }
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
  };

  return (
    <SecureFormWrapper
      formId="contact-light"
      initialData={INITIAL_FORM_DATA}
      requiredFields={REQUIRED_FIELDS}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <FormField
          type="text"
          name="name"
          label="Name"
          placeholder="Your name"
          required
          maxLength={100}
          icon={<User className="w-5 h-5 text-gray-400" />}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <div>
        <FormField
          type="email"
          name="email"
          label="Email"
          placeholder="your@email.com"
          required
          maxLength={150}
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <div>
        <FormField
          type="tel"
          name="phone"
          label="Phone"
          placeholder="Your phone number"
          maxLength={20}
          icon={<Phone className="w-5 h-5 text-gray-400" />}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <div>
        <FormField
          type="text"
          name="company"
          label="Company"
          placeholder="Your company"
          maxLength={100}
          icon={<Building className="w-5 h-5 text-gray-400" />}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <div>
        <FormField
          type="select"
          name="projectType"
          label="Project Type"
          options={PROJECT_TYPE_OPTIONS}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <div>
        <FormField
          type="textarea"
          name="message"
          label="How can we help?"
          placeholder="Tell us about your business needs and goals"
          required
          rows={4}
          maxLength={2000}
          icon={<MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 placeholder-gray-400 resize-none"
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />
      </div>

      <SubmitButton 
        text="Request Information" 
        loadingText="Sending..." 
        icon={<Send className="w-5 h-5" />} 
        isLoading={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
      />

      <FormStatus 
        successMessage={getSuccessMessage()} 
        errorMessage={getErrorMessage()} 
        status={success ? 'success' : error ? 'error' : 'idle'}
        successClassName="text-green-600 text-center bg-green-50 p-3 rounded-lg border border-green-200"
        errorClassName="text-red-600 text-center bg-red-50 p-3 rounded-lg border border-red-200"
      />
    </SecureFormWrapper>
  );
};

export default SecureLightContactForm;