import DOMPurify from 'dompurify';

/**
 * Configuration for DOMPurify
 */
export const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [], // Allow no HTML tags
  ALLOWED_ATTR: [], // Allow no HTML attributes
  FORBID_CONTENTS: ['style', 'script'], // Explicitly forbid style/script content
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false,
};

/**
 * Maximum length constraints for different input fields
 */
export const MAX_LENGTHS = {
  name: 100,
  email: 100,
  phone: 20,
  company: 100,
  message: 2000,
  subject: 150,
  budget: 50,
  projectType: 50,
  default: 1000,
};

/**
 * Sanitizes all input fields in a data object
 */
export const sanitizeInput = <T extends Record<string, string>>(data: T): T => {
  const sanitizedData = { ...data };
  
  for (const key in sanitizedData) {
    if (typeof sanitizedData[key] === 'string') {
      sanitizedData[key] = DOMPurify.sanitize(sanitizedData[key], DOMPURIFY_CONFIG) as T[Extract<keyof T, string>];
    }
  }
  
  return sanitizedData;
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number format (supports international formats)
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  
  // Improved regex with better international support
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,6})$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Checks if a string exceeds its maximum allowed length
 */
export const isValidLength = (value: string, field: string): boolean => {
  if (!value) return true;
  
  const maxLength = MAX_LENGTHS[field as keyof typeof MAX_LENGTHS] || MAX_LENGTHS.default;
  return value.trim().length <= maxLength;
};

/**
 * Generates a cryptographically secure CSRF token
 */
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
};

/**
 * Validate form data with configurable required fields
 */
export const validateFormData = (
  data: Record<string, string>,
  requiredFields: string[] = []
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Check required fields
  for (const field of requiredFields) {
    if (!data[field]?.trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  }
  
  // Validate email if present
  if (data.email) {
    if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  // Validate phone if present
  if (data.phone) {
    if (!isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  
  // Check length constraints
  for (const [key, value] of Object.entries(data)) {
    if (value && !isValidLength(value, key)) {
      const maxLength = MAX_LENGTHS[key as keyof typeof MAX_LENGTHS] || MAX_LENGTHS.default;
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is too long (maximum ${maxLength} characters)`;
    }
  }
  
  return errors;
};

/**
 * Verify CSRF token against stored value
 */
export const verifyCSRFToken = (token: string, formId: string): boolean => {
  const storedToken = sessionStorage.getItem(`csrf-token-${formId}`);
  return token === storedToken;
};

/**
 * Set CSRF token in session storage
 */
export const setCSRFToken = (token: string, formId: string): void => {
  sessionStorage.setItem(`csrf-token-${formId}`, token);
};

/**
 * Token with expiration data type
 */
export interface TokenData {
  value: string;
  expires: number;
}

/**
 * Generate token with expiration
 */
export const generateTokenWithExpiry = (expiryMinutes: number = 30): TokenData => {
  return {
    value: generateSecureToken(),
    expires: Date.now() + (expiryMinutes * 60 * 1000),
  };
};

/**
 * Check if token is valid and not expired
 */
export const isTokenValid = (token: string, formId: string): boolean => {
  try {
    const storedData = sessionStorage.getItem(`csrf-token-${formId}`);
    if (!storedData) return false;
    
    const tokenData = JSON.parse(storedData) as TokenData;
    return tokenData.value === token && Date.now() < tokenData.expires;
  } catch (e) {
    return false;
  }
};

/**
 * Enhanced validation rules for form fields
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const commonValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^[\d\s()+-]+$/,
    minLength: 10,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};

export const validateField = (
  name: string,
  value: any,
  rules: ValidationRule
): string | null => {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return 'This field is required';
  }

  if (rules.minLength && value && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    switch (name) {
      case 'email':
        return 'Please enter a valid email address';
      case 'phone':
        return 'Please enter a valid phone number';
      case 'name':
        return 'Please enter a valid name (letters only)';
      default:
        return 'Invalid format';
    }
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (
  formData: Record<string, any>,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName], rules[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};