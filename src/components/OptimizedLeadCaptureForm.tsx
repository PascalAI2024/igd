import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  Building,
  MessageSquare,
  Shield,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { validateField, commonValidationRules } from '../utils/formValidation';

interface FormStep {
  id: number;
  title: string;
  fields: string[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface OptimizedLeadCaptureFormProps {
  variant?: 'simple' | 'multi-step' | 'conversational';
  showTrustSignals?: boolean;
  showValueProps?: boolean;
  onSubmit?: (data: FormData) => void;
}

const OptimizedLeadCaptureForm: React.FC<OptimizedLeadCaptureFormProps> = ({
  variant = 'multi-step',
  showTrustSignals = true,
  showValueProps = true,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form steps configuration
  const steps: FormStep[] = [
    {
      id: 1,
      title: "Let's start with the basics",
      fields: ['name', 'email', 'phone']
    },
    {
      id: 2,
      title: "Tell us about your project",
      fields: ['company', 'projectType', 'budget']
    },
    {
      id: 3,
      title: "Almost there!",
      fields: ['timeline', 'message']
    }
  ];

  const totalSteps = variant === 'multi-step' ? steps.length : 1;

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('leadFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('leadFormData', JSON.stringify(formData));
  }, [formData]);

  // Smart defaults based on time
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    // Set default timeline based on time of day
    if (!formData.timeline) {
      if (hour < 12) {
        setFormData(prev => ({ ...prev, timeline: 'asap' }));
      } else if (hour < 17) {
        setFormData(prev => ({ ...prev, timeline: '1-2weeks' }));
      } else {
        setFormData(prev => ({ ...prev, timeline: '2-4weeks' }));
      }
    }
  }, []);

  const validateStep = (stepNumber: number): boolean => {
    const step = steps.find(s => s.id === stepNumber);
    if (!step) return true;

    const stepErrors: Partial<FormData> = {};
    let isValid = true;

    step.fields.forEach(field => {
      let error: string | null = null;

      switch (field) {
        case 'name':
          error = validateField('name', formData.name, commonValidationRules.name);
          break;
        case 'email':
          error = validateField('email', formData.email, commonValidationRules.email);
          break;
        case 'phone':
          error = validateField('phone', formData.phone, commonValidationRules.phone);
          break;
        case 'company':
          if (!formData.company) error = 'Company name is required';
          break;
        case 'projectType':
          if (!formData.projectType) error = 'Please select a project type';
          break;
        case 'budget':
          if (!formData.budget) error = 'Please select your budget range';
          break;
        case 'timeline':
          if (!formData.timeline) error = 'Please select your timeline';
          break;
      }

      if (error) {
        stepErrors[field as keyof FormData] = error;
        isValid = false;
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all steps
    let isValid = true;
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        isValid = false;
        setCurrentStep(i);
        break;
      }
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSubmitted(true);
      
      // Clear saved data
      localStorage.removeItem('leadFormData');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Success screen
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 text-center"
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
          Thank you for your submission. We'll be in touch within 2 hours!
        </p>
        {showTrustSignals && (
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>Avg response: 30min</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>100% Secure</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // Progress bar
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm border border-white/10"
    >
      {/* Progress indicator for multi-step */}
      {variant === 'multi-step' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-green-400">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Trust signals header */}
      {showTrustSignals && currentStep === 1 && (
        <div className="flex items-center justify-center gap-4 mb-6 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>50+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>98% Success Rate</span>
          </div>
        </div>
      )}

      {/* Form title */}
      <AnimatePresence mode="wait">
        <motion.h3
          key={currentStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="text-2xl font-bold text-white mb-6"
        >
          {steps[currentStep - 1]?.title || "Get Started"}
        </motion.h3>
      </AnimatePresence>

      {/* Form fields */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>
            </>
          )}

          {/* Step 2: Project Info */}
          {currentStep === 2 && (
            <>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
                    placeholder="Your Company"
                  />
                </div>
                {errors.company && (
                  <p className="mt-1 text-red-400 text-sm">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select project type</option>
                  <option value="web-development" className="bg-gray-900">Web Development</option>
                  <option value="digital-marketing" className="bg-gray-900">Digital Marketing</option>
                  <option value="ai-ml" className="bg-gray-900">AI & Machine Learning</option>
                  <option value="automation" className="bg-gray-900">Business Automation</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-red-400 text-sm">{errors.projectType}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select budget range</option>
                  <option value="5k-10k" className="bg-gray-900">$5,000 - $10,000</option>
                  <option value="10k-25k" className="bg-gray-900">$10,000 - $25,000</option>
                  <option value="25k-50k" className="bg-gray-900">$25,000 - $50,000</option>
                  <option value="50k+" className="bg-gray-900">$50,000+</option>
                </select>
                {errors.budget && (
                  <p className="mt-1 text-red-400 text-sm">{errors.budget}</p>
                )}
              </div>
            </>
          )}

          {/* Step 3: Final Details */}
          {currentStep === 3 && (
            <>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:border-red-500/50 transition-colors"
                >
                  <option value="" className="bg-gray-900">Select timeline</option>
                  <option value="asap" className="bg-gray-900">ASAP</option>
                  <option value="1-2weeks" className="bg-gray-900">1-2 weeks</option>
                  <option value="2-4weeks" className="bg-gray-900">2-4 weeks</option>
                  <option value="1month+" className="bg-gray-900">1 month+</option>
                </select>
                {errors.timeline && (
                  <p className="mt-1 text-red-400 text-sm">{errors.timeline}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Project Details
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                    placeholder="Tell us more about your project goals..."
                  />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-8">
        {currentStep > 1 && (
          <motion.button
            type="button"
            onClick={handlePrevious}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
          >
            Previous
          </motion.button>
        )}
        
        {currentStep < totalSteps ? (
          <motion.button
            type="button"
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                Get Started
                <CheckCircle className="w-5 h-5" />
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Value props */}
      {showValueProps && currentStep === 1 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Clock className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">2hr Response</p>
            </div>
            <div>
              <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">100% Secure</p>
            </div>
            <div>
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">No Obligation</p>
            </div>
          </div>
        </div>
      )}
    </motion.form>
  );
};

export default OptimizedLeadCaptureForm;