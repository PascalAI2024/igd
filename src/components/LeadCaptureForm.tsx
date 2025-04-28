import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, Mail, User } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setIsSubmitted(true);
      // You might want to trigger analytics event here
    } catch (error) {
      console.error('Error submitting form:', error);
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
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-4">Thank You!</h3>
          <p className="text-gray-300 mb-6">
            We'll be in touch shortly to schedule your free strategy call.
          </p>
          <p className="text-gray-400 text-sm">
            Check your email for confirmation and next steps.
          </p>
        </div>
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
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              placeholder="John Smith"
            />
          </div>
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
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              placeholder="john@example.com"
            />
          </div>
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
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Best Time to Call
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-red-500/50"
            >
              <option value="" className="bg-gray-900">Select a time</option>
              <option value="morning" className="bg-gray-900">Morning (9AM - 12PM)</option>
              <option value="afternoon" className="bg-gray-900">Afternoon (12PM - 5PM)</option>
              <option value="evening" className="bg-gray-900">Evening (5PM - 8PM)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Book Your Free Strategy Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-red-500 hover:text-red-400">Privacy Policy</a>
        </p>
      </div>
    </motion.form>
  );
};

export default LeadCaptureForm;
