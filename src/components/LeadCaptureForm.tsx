import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Phone, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import { validateField, commonValidationRules } from '../utils/formValidation';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredTime?: string;
}

interface FieldStatus {
  name?: 'valid' | 'invalid';
  email?: 'valid' | 'invalid';
  phone?: 'valid' | 'invalid';
  preferredTime?: 'valid' | 'invalid';
}

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldStatus, setFieldStatus] = useState<FieldStatus>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const newFieldStatus: FieldStatus = {};

    // Validate each field
    const nameError = validateField('name', formData.name, commonValidationRules.name);
    if (nameError) {
      newErrors.name = nameError;
      newFieldStatus.name = 'invalid';
    } else {
      newFieldStatus.name = 'valid';
    }

    const emailError = validateField('email', formData.email, commonValidationRules.email);
    if (emailError) {
      newErrors.email = emailError;
      newFieldStatus.email = 'invalid';
    } else {
      newFieldStatus.email = 'valid';
    }

    const phoneError = validateField('phone', formData.phone, commonValidationRules.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
      newFieldStatus.phone = 'invalid';
    } else {
      newFieldStatus.phone = 'valid';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time';
      newFieldStatus.preferredTime = 'invalid';
    } else {
      newFieldStatus.preferredTime = 'valid';
    }

    setErrors(newErrors);
    setFieldStatus(newFieldStatus);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      preferredTime: true
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with actual form data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send data to your backend here
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      
      // Clear form data after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredTime: ''
        });
        setErrors({});
        setTouched({});
        setFieldStatus({});
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // In a real app, you would show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Validate field on change if it has been touched
    if (touched[name]) {
      validateSingleField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateSingleField(name, value);
  };

  const validateSingleField = (name: string, value: string) => {
    let error: string | null = null;
    let status: 'valid' | 'invalid' = 'valid';

    switch (name) {
      case 'name':
        error = validateField('name', value, commonValidationRules.name);
        break;
      case 'email':
        error = validateField('email', value, commonValidationRules.email);
        break;
      case 'phone':
        error = validateField('phone', value, commonValidationRules.phone);
        break;
      case 'preferredTime':
        if (!value) {
          error = 'Please select a preferred time';
        }
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
      setFieldStatus(prev => ({ ...prev, [name]: 'invalid' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: undefined }));
      setFieldStatus(prev => ({ ...prev, [name]: 'valid' }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-3xl font-bold text-white mb-4">Success!</h3>
          <p className="text-gray-300 mb-6 text-lg">
            Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>!
          </p>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
            <p className="text-green-400 font-semibold mb-2">What happens next?</p>
            <ul className="text-gray-300 text-sm space-y-2 text-left">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>You'll receive a confirmation email within 5 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Our team will review your request and prepare for your call</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>We'll reach out within 24 hours to confirm your preferred time</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-400 text-sm">
            Need immediate assistance? Call us at{' '}
            <a href="tel:+1234567890" className="text-red-400 hover:text-red-300">
              (123) 456-7890
            </a>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white/5 border rounded-lg py-3 pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.name && touched.name
                  ? 'border-red-500/50 focus:border-red-500'
                  : fieldStatus.name === 'valid'
                  ? 'border-green-500/50 focus:border-green-500'
                  : 'border-white/10 focus:border-red-500/50'
              }`}
              placeholder="Your Name"
            />
            <AnimatePresence>
              {fieldStatus.name === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-red-400 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white/5 border rounded-lg py-3 pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.email && touched.email
                  ? 'border-red-500/50 focus:border-red-500'
                  : fieldStatus.email === 'valid'
                  ? 'border-green-500/50 focus:border-green-500'
                  : 'border-white/10 focus:border-red-500/50'
              }`}
              placeholder="your.email@company.com"
            />
            <AnimatePresence>
              {fieldStatus.email === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-red-400 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white/5 border rounded-lg py-3 pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.phone && touched.phone
                  ? 'border-red-500/50 focus:border-red-500'
                  : fieldStatus.phone === 'valid'
                  ? 'border-green-500/50 focus:border-green-500'
                  : 'border-white/10 focus:border-red-500/50'
              }`}
              placeholder="(123) 456-7890"
            />
            <AnimatePresence>
              {fieldStatus.phone === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.phone && touched.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-red-400 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Best Time to Call
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white/5 border rounded-lg py-3 pl-12 pr-10 text-white appearance-none focus:outline-none transition-colors ${
                errors.preferredTime && touched.preferredTime
                  ? 'border-red-500/50 focus:border-red-500'
                  : fieldStatus.preferredTime === 'valid'
                  ? 'border-green-500/50 focus:border-green-500'
                  : 'border-white/10 focus:border-red-500/50'
              }`}
            >
              <option value="" className="bg-gray-900">Select a time</option>
              <option value="morning" className="bg-gray-900">Morning (9AM - 12PM EST)</option>
              <option value="afternoon" className="bg-gray-900">Afternoon (12PM - 5PM EST)</option>
              <option value="evening" className="bg-gray-900">Evening (5PM - 8PM EST)</option>
            </select>
            <AnimatePresence>
              {fieldStatus.preferredTime === 'valid' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.preferredTime && touched.preferredTime && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1 text-red-400 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.preferredTime}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="ml-3">Processing your request...</span>
            </>
          ) : (
            <>
              Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>

        <p className="text-center text-gray-400 text-sm">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-red-500 hover:text-red-400">Privacy Policy</a>
        </p>
      </div>
    </motion.form>
  );
};

export default LeadCaptureForm;
