import React, { useContext } from 'react';
import { FormContext } from './SecureFormWrapper';

/**
 * Props interface for the FormField component
 */
interface FormFieldProps {
  /** Field type (text, email, tel, textarea, select) */
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  /** Field name (must be unique within the form) */
  name: string;
  /** Field label text */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Options for select fields */
  options?: { value: string; label: string }[];
  /** Custom class for the container div */
  className?: string;
  /** Custom class for the label */
  labelClassName?: string;
  /** Custom class for the input/textarea/select */
  inputClassName?: string;
  /** Custom class for error messages */
  errorClassName?: string;
  /** Custom class for select options */
  optionClassName?: string;
  /** Number of rows for textarea */
  rows?: number;
  /** Maximum length for input */
  maxLength?: number;
  /** Icon to display in the input (usually positioned with absolute) */
  icon?: React.ReactNode;
  /** Min value for number inputs */
  min?: number;
  /** Max value for number inputs */
  max?: number;
  /** Pattern for input validation */
  pattern?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional event handlers */
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

/**
 * A reusable form field component that handles:
 * - Label rendering
 * - Input/textarea/select rendering with consistent styling
 * - Icon support
 * - Error message display
 * - Accessibility attributes
 * 
 * Must be used within a SecureFormWrapper component to access form context.
 * 
 * @example
 * <FormField
 *   type="email"
 *   name="email"
 *   label="Email Address"
 *   placeholder="your@email.com"
 *   required
 *   icon={<Mail className="w-5 h-5 text-gray-400" />}
 * />
 */
const FormField: React.FC<FormFieldProps> = ({ 
  type, 
  name, 
  label, 
  placeholder = '', 
  required = false,
  options = [],
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  optionClassName = '',
  rows = 4,
  maxLength,
  icon,
  min,
  max,
  pattern,
  disabled = false,
  onBlur,
  onFocus
}) => {
  const formContext = useContext(FormContext);
  
  if (!formContext) {
    throw new Error('FormField must be used within a SecureFormWrapper component');
  }
  
  const { formData, errors, handleChange } = formContext;
  const hasError = !!errors[name];
  
  // Default class names with improved focus states
  const defaultLabelClass = "block text-sm font-medium text-gray-300 mb-2";
  const defaultInputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-gray-400 transition-colors duration-200";
  const errorInputClass = "w-full px-4 py-3 bg-white/5 border border-red-500 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-500/30 text-white placeholder-gray-400 transition-colors duration-200";
  const defaultErrorClass = "mt-1 text-sm text-red-500";
  const defaultOptionClass = "bg-gray-900";
  
  // Final class names
  const finalLabelClass = labelClassName || defaultLabelClass;
  const finalInputClass = hasError 
    ? (inputClassName || errorInputClass)
    : (inputClassName || defaultInputClass);
  const finalErrorClass = errorClassName || defaultErrorClass;
  const finalOptionClass = optionClassName || defaultOptionClass;
  
  // Calculate input classes for icon support
  const inputWithIconClass = icon ? (finalInputClass.includes('pl-') ? finalInputClass : `${finalInputClass} pl-10`) : finalInputClass;
  
  // Render the appropriate input based on type
  const renderInput = () => {
    // Common props for all input types
    const commonProps = {
      id: name,
      name,
      value: formData[name] || '',
      onChange: handleChange,
      required,
      disabled,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${name}-error` : undefined,
      onBlur,
      onFocus,
      ...(maxLength ? { maxLength } : {}),
      ...(min !== undefined ? { min } : {}),
      ...(max !== undefined ? { max } : {}),
      ...(pattern ? { pattern } : {})
    };

    switch(type) {
      case 'textarea':
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-3 pointer-events-none transition-colors duration-200">
                {icon}
              </div>
            )}
            <textarea
              {...commonProps}
              placeholder={placeholder}
              rows={rows}
              className={inputWithIconClass}
            />
          </div>
        );
        
      case 'select':
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-200">
                {icon}
              </div>
            )}
            <select
              {...commonProps}
              className={inputWithIconClass}
            >
              <option value="" className={finalOptionClass}>{placeholder || `Select ${label.toLowerCase()}`}</option>
              {options.map(option => (
                <option key={option.value} value={option.value} className={finalOptionClass}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
        
      default:
        return (
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-200">
                {icon}
              </div>
            )}
            <input
              type={type}
              {...commonProps}
              placeholder={placeholder}
              className={inputWithIconClass}
            />
          </div>
        );
    }
  };
  
  return (
    <div className={className}>
      <label htmlFor={name} className={finalLabelClass}>
        {label} {required && '*'}
      </label>
      
      {renderInput()}
      
      {hasError && (
        <p id={`${name}-error`} className={finalErrorClass} role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );
};

export default FormField;