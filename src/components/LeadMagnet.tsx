import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Calculator,
  Video,
  Lightbulb,
  TrendingUp,
  Mail,
  Lock
} from 'lucide-react';
import { validateField, commonValidationRules } from '../utils/formValidation';

interface LeadMagnetOffer {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  format: string;
  color: string;
}

interface LeadMagnetProps {
  variant?: 'modal' | 'inline' | 'sidebar';
  offer?: LeadMagnetOffer;
  onClose?: () => void;
}

/**
 * Lead magnet component to capture leads with valuable offers
 * Includes guides, calculators, templates, and more
 */
const LeadMagnet: React.FC<LeadMagnetProps> = ({
  variant = 'inline',
  offer,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  // Default lead magnet offers
  const defaultOffers: LeadMagnetOffer[] = [
    {
      id: 'website-cost-calculator',
      icon: Calculator,
      title: 'Website Cost Calculator',
      description: 'Get instant pricing for your web project',
      value: '$2,500',
      format: 'Interactive Tool',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'digital-marketing-guide',
      icon: BookOpen,
      title: '2024 Digital Marketing Guide',
      description: '50-page guide to grow your business online',
      value: '$497',
      format: 'PDF Download',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ai-readiness-assessment',
      icon: Lightbulb,
      title: 'AI Readiness Assessment',
      description: 'Discover AI opportunities for your business',
      value: '$1,000',
      format: 'Custom Report',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'conversion-optimization-video',
      icon: Video,
      title: 'Conversion Masterclass',
      description: '45-min video on doubling your conversions',
      value: '$297',
      format: 'Video Course',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const selectedOffer = offer || defaultOffers[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    const emailError = validateField('email', email, commonValidationRules.email);
    const nameError = name.trim() ? null : 'Name is required';
    
    if (emailError || nameError) {
      setErrors({
        email: emailError || undefined,
        name: nameError || undefined
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, send data to your backend
      console.log('Lead captured:', { name, email, offer: selectedOffer.id });
      
      setIsSuccess(true);
      
      // Clear form after success
      setTimeout(() => {
        setEmail('');
        setName('');
        if (onClose) {
          onClose();
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <AnimatePresence mode="wait">
      {!isSuccess ? (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Offer preview */}
          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${selectedOffer.color} flex items-center justify-center flex-shrink-0`}>
              <selectedOffer.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold">{selectedOffer.title}</h4>
              <p className="text-gray-400 text-sm">{selectedOffer.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 line-through">Value: {selectedOffer.value}</span>
                <span className="text-sm font-bold text-green-400">FREE</span>
                <span className="text-xs text-gray-400">• {selectedOffer.format}</span>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              className={`w-full bg-white/5 border rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-red-500/50'
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={`w-full bg-white/5 border rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-red-500/50'
              }`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Get Free {selectedOffer.format}</span>
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>No Spam</span>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          <h4 className="text-xl font-bold text-white mb-2">Success!</h4>
          <p className="text-gray-300 mb-4">
            Check your email for your free {selectedOffer.format.toLowerCase()}.
          </p>
          <p className="text-sm text-gray-400">
            You should receive it within 2 minutes.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (variant === 'modal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Get Your Free {selectedOffer.format}
          </h3>
          <p className="text-gray-400 mb-6">
            Join 500+ businesses already using our resources to grow.
          </p>
          {formContent}
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold text-white">Free Resource</h3>
        </div>
        {formContent}
      </motion.div>
    );
  }

  // Inline variant (default)
  return (
    <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl p-6 border border-red-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Free: {selectedOffer.title}
          </h3>
          <p className="text-gray-300 mb-4">
            {selectedOffer.description}
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-400">Format</p>
              <p className="text-white font-semibold">{selectedOffer.format}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Value</p>
              <p className="text-white font-semibold">{selectedOffer.value}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-green-400 font-bold text-xl">FREE</p>
            </div>
          </div>
        </div>
        <div>
          {formContent}
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;