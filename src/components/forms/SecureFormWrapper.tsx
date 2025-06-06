import React, { useState, useEffect } from 'react';
import { 
  sanitizeInput, 
  validateFormData, 
  generateSecureToken, 
  setCSRFToken, 
  verifyCSRFToken 
} from '../../utils/formValidation';

// Rate limiting constants
const SUBMISSION_COOLDOWN = 10000; // 10 seconds between submissions

interface SecureFormProps {
  formId: string;
  initialData: Record<string, string>;
  requiredFields: string[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

// Form context to be shared with child components
export interface FormContextType {
  formData: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error' | 'validation-error';
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const FormContext = React.createContext<FormContextType | null>(null);

/**
 * A secure form wrapper component that handles:
 * - CSRF protection
 * - Input validation
 * - Input sanitization
 * - Rate limiting
 * - Form state management
 */
const SecureFormWrapper: React.FC<SecureFormProps> = ({ 
  formId, 
  initialData, 
  requiredFields,
  onSubmit,
  children,
  className = ''
}) => {
  // Form state
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'validation-error'>('idle');
  const [csrfToken, setCsrfToken] = useState('');
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = generateSecureToken();
    setCsrfToken(token);
    setCSRFToken(token, formId);
  }, [formId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any existing error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Implement rate limiting
    const now = Date.now();
    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
      setErrors({
        form: 'Please wait a moment before submitting again'
      });
      setSubmitStatus('error');
      return;
    }
    
    // Validate form data
    const validationErrors = validateFormData(formData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('validation-error');
      return;
    }
    
    // Verify CSRF token
    if (!verifyCSRFToken(csrfToken, formId)) {
      setErrors({
        form: 'Security validation failed. Please refresh the page and try again.'
      });
      setSubmitStatus('error');
      return;
    }
    
    // Start submission
    setIsSubmitting(true);
    setLastSubmissionTime(now);
    
    try {
      // Sanitize all inputs
      const sanitizedData = sanitizeInput(formData);
      
      // Add CSRF token to the data
      sanitizedData['csrf-token'] = csrfToken;
      
      // Check if we should use Netlify Forms or the API proxy
      const useNetlifyForms = true; // Set to true to use Netlify Forms
      
      if (useNetlifyForms) {
        // Create a standard form submission using Netlify Forms
        const formElement = document.getElementById(formId) as HTMLFormElement;
        if (formElement) {
          // Netlify Forms requires a proper form submission
          // Add form data to hidden inputs or use FormData
          const formData = new FormData(formElement);
          
          // Add all values from sanitizedData to formData
          Object.entries(sanitizedData).forEach(([key, value]) => {
            formData.append(key, value as string);
          });
          
          // Submit via fetch to ensure email is sent through Netlify Forms
          const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
          });
          
          if (!response.ok) {
            throw new Error(`Form submission failed: ${response.status}`);
          }
        } else {
          throw new Error('Form element not found');
        }
      } else {
        // Use the custom API proxy for form submission
        await onSubmit(sanitizedData);
      }
      
      // Success handling
      setSubmitStatus('success');
      setFormData(initialData);
      
      // Generate new CSRF token for next submission
      const newToken = generateSecureToken();
      setCsrfToken(newToken);
      setCSRFToken(newToken, formId);
    } catch (error) {
      // Error handling
      setSubmitStatus('error');
      setErrors({
        form: error instanceof Error ? error.message : 'An error occurred during submission. Please try again.'
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Provide form context to children
  const formContext: FormContextType = {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleChange
  };

  return (
    <FormContext.Provider value={formContext}>
      <form 
        id={formId}
        name={formId}
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className={className}
      >
        <input type="hidden" name="form-name" value={formId} />
        <input type="hidden" name="csrf-token" value={csrfToken} />
        
        {errors.form && (
          <div className="text-red-500 text-sm bg-red-100/10 p-3 rounded-lg mb-4">
            {errors.form}
          </div>
        )}
        
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default SecureFormWrapper;