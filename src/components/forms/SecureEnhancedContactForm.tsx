import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Zap, MessageSquare, Calendar, Clock, ArrowRight, CheckCircle, AlertCircle, Mail, Phone, MapPin, Building, User } from 'lucide-react';
import { trackFormSubmission, trackLeadGeneration, trackError } from '../../utils/analytics';
import { useForm } from '../../hooks/useApi';
import SecureFormWrapper from './SecureFormWrapper';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import FormStatus from './FormStatus';
import {
  FORM_HEADINGS,
  FORM_DESCRIPTIONS,
  FORM_BUTTON_TEXT,
  FORM_SUCCESS_MESSAGES,
  FORM_ERROR_MESSAGES,
  PROJECT_TYPE_OPTIONS,
  BUDGET_OPTIONS,
  TIMEFRAME_OPTIONS,
  FIELD_LIMITS,
  CONTACT_INFO
} from './formConstants';

/**
 * Interface for the enhanced contact form data
 */
interface EnhancedContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  projectType: string;
  budget: string;
  timeframe: string;
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
  budget: '',
  timeframe: ''
};

/**
 * Required fields for validation
 */
const REQUIRED_FIELDS = ['name', 'email', 'message'];

// Using standardized dropdowns from formConstants

/**
 * A premium enhanced contact form with animations, secure submission, and consistent styling
 */
const SecureEnhancedContactForm: React.FC = () => {
  // Custom form hook for secure form handling
  const { 
    loading, 
    error, 
    success, 
    message, 
    reference,
    submitData, 
    reset 
  } = useForm<EnhancedContactFormData>('contact');

  // State for tab selection (form or schedule)
  const [activeTab, setActiveTab] = useState<'form' | 'schedule'>('form');

  // Handle form submission
  const handleSubmit = async (data: Record<string, string>) => {
    try {
      // Convert data to our expected format
      const formData: EnhancedContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        message: data.message,
        projectType: data.projectType || '',
        budget: data.budget || '',
        timeframe: data.timeframe || ''
      };

      // Get reCAPTCHA response if we're using it
      const recaptchaResponse = (window as any).grecaptcha?.getResponse() || undefined;
      
      // Submit the form through our secure proxy
      const result = await submitData(formData, recaptchaResponse);
      
      if (result) {
        // Track successful form submission
        trackFormSubmission('contact', 'enhanced-contact-form', true);
        
        // Track lead generation
        trackLeadGeneration(
          'website',
          'enhanced-contact-form',
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

  // Format success message with reference number
  const getSuccessMessage = () => {
    let msg = FORM_SUCCESS_MESSAGES.CONTACT;
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
  };

  // Format error message with reference number
  const getErrorMessage = () => {
    let msg = FORM_ERROR_MESSAGES.GENERAL;
    if (error) {
      msg = error;
    }
    if (reference) {
      msg += ` Reference: ${reference}`;
    }
    return msg;
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
            {FORM_HEADINGS.CONTACT}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {FORM_DESCRIPTIONS.CONTACT}
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
                    {CONTACT_INFO.EMAIL}
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
                    {CONTACT_INFO.PHONE}
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
                    {CONTACT_INFO.ADDRESS.CITY}<br />
                    {CONTACT_INFO.ADDRESS.STATE} {CONTACT_INFO.ADDRESS.ZIP}
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
                    {CONTACT_INFO.HOURS.DAYS}<br />
                    {CONTACT_INFO.HOURS.TIME}
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
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SecureFormWrapper
                    formId="contact-enhanced"
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
                        maxLength={FIELD_LIMITS.NAME}
                        icon={<User className="h-5 w-5 text-gray-500" />}
                        className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                      />

                      <FormField
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="your@email.com"
                        required
                        maxLength={FIELD_LIMITS.EMAIL}
                        icon={<Mail className="h-5 w-5 text-gray-500" />}
                        className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        type="tel"
                        name="phone"
                        label="Phone"
                        placeholder="Your phone number"
                        maxLength={FIELD_LIMITS.PHONE}
                        icon={<Phone className="h-5 w-5 text-gray-500" />}
                        className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                      />

                      <FormField
                        type="text"
                        name="company"
                        label="Company"
                        placeholder="Your company"
                        maxLength={FIELD_LIMITS.COMPANY}
                        icon={<Building className="h-5 w-5 text-gray-500" />}
                        className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        type="select"
                        name="projectType"
                        label="Project Type"
                        options={PROJECT_TYPE_OPTIONS}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                        optionClassName="bg-gray-900"
                      />

                      <FormField
                        type="select"
                        name="budget"
                        label="Budget Range"
                        options={BUDGET_OPTIONS}
                        className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                        labelClassName="block text-sm font-medium text-gray-300 mb-2"
                        optionClassName="bg-gray-900"
                      />
                    </div>

                    <FormField
                      type="select"
                      name="timeframe"
                      label="Timeframe"
                      options={TIMEFRAME_OPTIONS}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500"
                      labelClassName="block text-sm font-medium text-gray-300 mb-2"
                      optionClassName="bg-gray-900"
                    />

                    <FormField
                      type="textarea"
                      name="message"
                      label="Message"
                      placeholder="Tell us about your project"
                      required
                      rows={4}
                      maxLength={FIELD_LIMITS.MESSAGE}
                      className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-500 resize-none"
                      labelClassName="block text-sm font-medium text-gray-300 mb-2"
                    />

                    <SubmitButton 
                      text={FORM_BUTTON_TEXT.CONTACT} 
                      loadingText={FORM_BUTTON_TEXT.LOADING} 
                      icon={<Send className="w-5 h-5 ml-2" />} 
                      isLoading={loading}
                      className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-red-500/25"
                    />

                    <FormStatus 
                      successMessage={getSuccessMessage()} 
                      errorMessage={getErrorMessage()} 
                      status={success ? 'success' : error ? 'error' : 'idle'}
                      successClassName="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center text-green-500"
                      errorClassName="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-500"
                    />
                  </SecureFormWrapper>
                </motion.div>
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

                    <button
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 group cursor-not-allowed opacity-70"
                      disabled
                    >
                      <span>Booking Coming Soon</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
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

export default SecureEnhancedContactForm;