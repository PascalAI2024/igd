import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface EnhancedFormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

/**
 * Enhanced form field with sophisticated animations:
 * - Floating label animation
 * - Focus glow effect
 * - Smooth error/success transitions
 * - Icon animations
 * - Progress indicator for validation
 */
const EnhancedFormField: React.FC<EnhancedFormFieldProps> = ({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  success,
  icon,
  onBlur,
  onFocus,
  className = '',
  rows = 4,
  options = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);
  
  const handleFocus = () => {
    setIsFocused(true);
    setHasBeenFocused(true);
    onFocus?.();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };
  
  const hasValue = value && value.length > 0;
  const showFloatingLabel = isFocused || hasValue;
  
  // Status colors
  const borderColor = error 
    ? 'border-red-500' 
    : success 
    ? 'border-green-500' 
    : isFocused 
    ? 'border-red-500' 
    : 'border-white/20';
    
  const focusRingColor = error 
    ? 'ring-red-500/30' 
    : success 
    ? 'ring-green-500/30' 
    : 'ring-red-500/20';
  
  const renderInput = () => {
    const baseClasses = `
      w-full px-4 py-3 
      bg-white/5 backdrop-blur-sm
      border ${borderColor}
      rounded-lg 
      text-white placeholder-gray-500
      transition-all duration-300
      focus:outline-none focus:ring-2 ${focusRingColor}
      ${icon ? 'pl-11' : ''}
      ${showFloatingLabel ? 'pt-6 pb-2' : ''}
    `;
    
    const commonProps = {
      ref: inputRef as any,
      id: name,
      name,
      value,
      onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      required,
      className: baseClasses,
      placeholder: showFloatingLabel ? '' : placeholder,
    };
    
    switch (type) {
      case 'textarea':
        return <textarea {...commonProps} rows={rows} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return <input {...commonProps} type={type} />;
    }
  };
  
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Floating label */}
      <AnimatePresence>
        <motion.label
          htmlFor={name}
          className={`
            absolute left-4 z-10 pointer-events-none
            transition-all duration-300 ease-out
            ${showFloatingLabel 
              ? 'top-2 text-xs text-gray-400' 
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
            }
            ${icon && !showFloatingLabel ? 'left-11' : ''}
          `}
          animate={{
            top: showFloatingLabel ? 8 : '50%',
            fontSize: showFloatingLabel ? '0.75rem' : '0.875rem',
            color: isFocused ? '#ef4444' : '#9ca3af',
          }}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>
      </AnimatePresence>
      
      {/* Icon */}
      {icon && (
        <motion.div
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10"
          animate={{
            color: isFocused ? '#ef4444' : '#9ca3af',
            scale: isFocused ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      )}
      
      {/* Input field */}
      <div className="relative">
        {renderInput()}
        
        {/* Focus glow effect */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                boxShadow: error 
                  ? '0 0 20px rgba(239, 68, 68, 0.2)' 
                  : success 
                  ? '0 0 20px rgba(34, 197, 94, 0.2)' 
                  : '0 0 20px rgba(239, 68, 68, 0.1)',
              }}
            />
          )}
        </AnimatePresence>
      </div>
      
      {/* Status icon */}
      <AnimatePresence>
        {(error || success) && hasBeenFocused && (
          <motion.div
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              error ? 'text-red-500' : 'text-green-500'
            }`}
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error/Success message */}
      <AnimatePresence mode="wait">
        {error && hasBeenFocused && (
          <motion.p
            key="error"
            className="mt-2 text-sm text-red-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {success && !error && hasBeenFocused && (
          <motion.p
            key="success"
            className="mt-2 text-sm text-green-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            ✓ Valid
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedFormField;