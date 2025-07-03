import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import { 
  TOUCH_TARGET,
  isKeyboardVisible,
  getViewportDimensions,
  triggerHapticFeedback 
} from '../../utils/mobileOptimizations';
import MobileTouchButton from '../ui/MobileTouchButton';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface MobileOptimizedFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
  variant?: 'minimal' | 'full';
}

const MobileOptimizedForm: React.FC<MobileOptimizedFormProps> = ({
  onSubmit,
  className,
  variant = 'full'
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Adjust viewport when keyboard is visible
  useEffect(() => {
    const handleResize = () => {
      getViewportDimensions();
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  // Validate field
  const validateField = (name: keyof FormData, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name is required' : null;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Valid email is required' : null;
      case 'phone':
        if (variant === 'minimal') return null;
        const phoneRegex = /^\d{10,}$/;
        const cleaned = value.replace(/\D/g, '');
        return cleaned.length > 0 && !phoneRegex.test(cleaned) 
          ? 'Valid phone number is required' 
          : null;
      case 'message':
        if (variant === 'minimal') return null;
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : null;
      default:
        return null;
    }
  };

  // Handle input change
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle field blur
  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
      triggerHapticFeedback('light');
    }
    setFocusedField(null);
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Partial<FormData> = {};
    const fieldsToValidate: Array<keyof FormData> = 
      variant === 'minimal' ? ['name', 'email'] : ['name', 'email', 'phone', 'message'];

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerHapticFeedback('medium');
      return;
    }

    setIsSubmitting(true);
    triggerHapticFeedback('light');

    try {
      await onSubmit(formData);
      setIsSuccess(true);
      triggerHapticFeedback('heavy');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      triggerHapticFeedback('medium');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) => cn(
    'w-full px-4 py-3 rounded-lg',
    `min-h-[${TOUCH_TARGET.RECOMMENDED_SIZE}px]`,
    'bg-white/5 border border-white/10',
    'text-white placeholder-gray-400',
    'focus:outline-none focus:border-red-500 focus:bg-white/10',
    'transition-all duration-200',
    'text-base', // Prevent zoom on iOS
    errors[fieldName as keyof FormData] && 'border-red-500',
    focusedField === fieldName && 'border-red-400 bg-white/10'
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('space-y-4', className)}
      noValidate
    >
      {/* Name Field */}
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => handleBlur('name')}
            placeholder="Your Name"
            className={inputClasses('name')}
            autoComplete="name"
            disabled={isSubmitting || isSuccess}
          />
          <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email Field */}
      <div className="relative">
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => handleBlur('email')}
            placeholder="Your Email"
            className={inputClasses('email')}
            autoComplete="email"
            inputMode="email"
            disabled={isSubmitting || isSuccess}
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Field (Full variant only) */}
      {variant === 'full' && (
        <div className="relative">
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formatPhoneNumber(formData.phone)}
              onChange={(e) => handleChange('phone', e.target.value)}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => handleBlur('phone')}
              placeholder="Your Phone (optional)"
              className={inputClasses('phone')}
              autoComplete="tel"
              inputMode="tel"
              disabled={isSubmitting || isSuccess}
            />
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Message Field (Full variant only) */}
      {variant === 'full' && (
        <div className="relative">
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => handleBlur('message')}
              placeholder="Tell us about your project..."
              rows={4}
              className={cn(inputClasses('message'), 'resize-none')}
              disabled={isSubmitting || isSuccess}
            />
            <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <MobileTouchButton
          onClick={() => formRef.current?.requestSubmit()}
          variant="primary"
          size="large"
          className="w-full"
          disabled={isSubmitting || isSuccess}
          hapticFeedback
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Success!
              </motion.span>
            ) : isSubmitting ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {variant === 'minimal' ? 'Get Started' : 'Send Message'}
              </motion.span>
            )}
          </AnimatePresence>
        </MobileTouchButton>
      </div>

      {/* Trust Indicators */}
      {variant === 'full' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-gray-400 pt-2"
        >
          <p>🔒 Your information is secure and never shared</p>
        </motion.div>
      )}
    </form>
  );
};

export default MobileOptimizedForm;