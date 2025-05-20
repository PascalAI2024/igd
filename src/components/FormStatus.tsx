import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FormContext } from './SecureFormWrapper';

interface FormStatusProps {
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  successClassName?: string;
  errorClassName?: string;
  // Optional status prop for direct control
  status?: 'idle' | 'success' | 'error' | 'validation-error';
}

/**
 * A component that displays form submission status
 * Can be controlled by either FormContext or directly via props
 */
const FormStatus: React.FC<FormStatusProps> = ({
  successMessage = 'Thank you! We\'ll get back to you soon.',
  errorMessage = 'Something went wrong. Please try again later.',
  className = '',
  successClassName = '',
  errorClassName = '',
  status
}) => {
  const formContext = useContext(FormContext);
  
  // Determine which status to use (prop takes precedence)
  const submitStatus = status || (formContext ? formContext.submitStatus : 'idle');
  
  // If no status is provided and there's no form context, throw an error
  if (!status && !formContext) {
    throw new Error('FormStatus must be used within a SecureFormWrapper component or with a status prop');
  }
  
  // Don't render anything if the form is idle
  if (submitStatus === 'idle') {
    return null;
  }

  // Default classes
  const defaultSuccessClass = "text-green-500 text-center py-3";
  const defaultErrorClass = "text-red-500 text-center py-3";
  
  // Final classes
  const finalSuccessClass = `${className} ${successClassName || defaultSuccessClass}`;
  const finalErrorClass = `${className} ${errorClassName || defaultErrorClass}`;
  
  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={finalSuccessClass}
        role="status"
        aria-live="polite"
      >
        {successMessage}
      </motion.div>
    );
  }
  
  if (submitStatus === 'error' || submitStatus === 'validation-error') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={finalErrorClass}
        role="alert"
        aria-live="assertive"
      >
        {errorMessage}
      </motion.div>
    );
  }
  
  return null;
};

export default FormStatus;