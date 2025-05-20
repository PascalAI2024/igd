import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FormContext } from './SecureFormWrapper';

interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  icon?: React.ReactNode;
  className?: string;
  // Optional prop for direct control of loading state
  isLoading?: boolean;
}

/**
 * A reusable submit button component that handles:
 * - Loading state (either from context or props)
 * - Animation
 * - Accessibility attributes
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  loadingText = 'Sending...',
  icon,
  className = '',
  isLoading
}) => {
  const formContext = useContext(FormContext);
  
  // If isLoading prop is provided, use that; otherwise use context
  const loading = isLoading !== undefined 
    ? isLoading 
    : (formContext ? formContext.isSubmitting : false);
  
  // If neither isLoading prop nor formContext is provided, log a warning
  if (isLoading === undefined && !formContext) {
    console.warn('SubmitButton: No loading state provided. Use within SecureFormWrapper or provide isLoading prop.');
  }
  
  // Default button class
  const defaultClass = "w-full px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2";
  const disabledClass = "opacity-50 cursor-not-allowed";
  
  // Final class
  const finalClass = `${className || defaultClass} ${loading ? disabledClass : ''}`;
  
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className={finalClass}
      aria-busy={loading}
    >
      <span>{loading ? loadingText : text}</span>
      {icon && (
        <span className={loading ? 'animate-pulse' : ''}>
          {icon}
        </span>
      )}
    </motion.button>
  );
};

export default SubmitButton;