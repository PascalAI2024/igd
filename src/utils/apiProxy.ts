/**
 * API Proxy Utility
 * 
 * Provides secure methods for interacting with our API through Netlify functions
 * Handles CSRF protection, error handling, and request formatting
 */

import { sanitize } from 'dompurify';

// Request timeouts (in milliseconds)
const DEFAULT_TIMEOUT = 15000; // 15 seconds

// URL for our Netlify serverless functions
const API_PROXY_URL = '/.netlify/functions/api-proxy';
const FORM_HANDLER_URL = '/.netlify/functions/form-handler';

// Interface for API response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  reference?: string;
}

// Interface for form submission response
interface FormResponse {
  success: boolean;
  message?: string;
  error?: string;
  reference?: string;
}

// Generate a CSRF token for form submissions
export const generateCSRFToken = (): { token: string; timestamp: number } => {
  const timestamp = Date.now();
  // In a real implementation, this would call an API endpoint to generate the token
  // For now, we'll use the browser's crypto API as a fallback
  
  // Generate a random token - in production, this would be validated server-side
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const token = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  
  // Store in sessionStorage for CSRF protection
  sessionStorage.setItem('csrfToken', token);
  sessionStorage.setItem('csrfTimestamp', timestamp.toString());
  
  return { token, timestamp };
};

// Check if we have a valid CSRF token
export const hasValidCSRFToken = (): boolean => {
  const token = sessionStorage.getItem('csrfToken');
  const timestamp = parseInt(sessionStorage.getItem('csrfTimestamp') || '0', 10);
  const now = Date.now();
  
  // Token is valid for 1 hour
  return !!token && (now - timestamp) < 60 * 60 * 1000;
};

// Get stored CSRF token
export const getCSRFToken = (): { token: string; timestamp: number } | null => {
  const token = sessionStorage.getItem('csrfToken');
  const timestamp = parseInt(sessionStorage.getItem('csrfTimestamp') || '0', 10);
  
  if (!token || isNaN(timestamp)) {
    return null;
  }
  
  return { token, timestamp };
};

// Create a fetch request with timeout
const fetchWithTimeout = async (url: string, options: RequestInit, timeout = DEFAULT_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

/**
 * Make an API request through our proxy
 */
export const apiRequest = async <T>(
  path: string,
  method: 'GET' | 'POST' = 'GET',
  data?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  try {
    const url = new URL(API_PROXY_URL, window.location.origin);
    url.searchParams.append('path', path);
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (method === 'POST' && data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetchWithTimeout(url.toString(), options);
    const responseData = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || 'An error occurred while processing your request',
        reference: responseData.reference
      };
    }
    
    return {
      success: true,
      data: responseData as T
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

/**
 * Submit a form securely through our form handler
 */
export const submitForm = async (
  formType: 'contact' | 'lead' | 'feedback' | 'support',
  formData: Record<string, unknown>,
  recaptchaResponse?: string
): Promise<FormResponse> => {
  try {
    // Get or generate CSRF token
    let csrfData = getCSRFToken();
    if (!csrfData) {
      csrfData = generateCSRFToken();
    }
    
    // Sanitize form data
    const sanitizedData: Record<string, unknown> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        sanitizedData[key] = sanitize(value.trim());
      } else {
        sanitizedData[key] = value;
      }
    });
    
    // Prepare request payload
    const payload = {
      ...sanitizedData,
      formType,
      timestamp: csrfData.timestamp,
      recaptchaResponse
    };
    
    // Make the form submission request
    const response = await fetchWithTimeout(
      FORM_HANDLER_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfData.token
        },
        body: JSON.stringify(payload)
      }
    );
    
    const responseData = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || 'An error occurred while submitting the form',
        reference: responseData.reference
      };
    }
    
    return {
      success: true,
      message: responseData.message || 'Form submitted successfully',
      reference: responseData.reference
    };
  } catch (error) {
    console.error('Form submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};