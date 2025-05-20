import { useState, useCallback } from 'react';
import { apiRequest, submitForm } from '../utils/apiProxy';

// Types for our hook state and returns
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  reference?: string;
}

interface UseApiReturn<T, P extends Record<string, unknown>> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  reference?: string;
  execute: (params?: P) => Promise<void>;
  reset: () => void;
}

interface UseFormReturn<T extends Record<string, unknown>> {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  reference?: string;
  submitData: (data: T, recaptchaResponse?: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Hook for making API requests through our secure proxy
 */
export function useApi<T, P extends Record<string, unknown> = Record<string, unknown>>(
  path: string,
  method: 'GET' | 'POST' = 'GET',
  initialData: T | null = null
): UseApiReturn<T, P> {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
    success: false
  });

  // Reset the state
  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      success: false
    });
  }, [initialData]);

  // Execute the API request
  const execute = useCallback(async (params?: P): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiRequest<T>(path, method, params);
      
      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null,
          success: true,
          reference: response.reference
        });
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || 'Something went wrong',
          success: false,
          reference: response.reference
        });
      }
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        success: false
      });
    }
  }, [path, method]);

  return {
    ...state,
    execute,
    reset
  };
}

/**
 * Hook for secure form submissions
 */
export function useForm<T extends Record<string, unknown>>(
  formType: 'contact' | 'lead' | 'feedback' | 'support'
): UseFormReturn<T> {
  const [state, setState] = useState({
    loading: false,
    error: null as string | null,
    success: false,
    message: null as string | null,
    reference: undefined as string | undefined
  });

  // Reset the form state
  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      success: false,
      message: null,
      reference: undefined
    });
  }, []);

  // Submit form data
  const submitData = useCallback(async (data: T, recaptchaResponse?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await submitForm(formType, data, recaptchaResponse);
      
      if (response.success) {
        setState({
          loading: false,
          error: null,
          success: true,
          message: response.message || 'Form submitted successfully',
          reference: response.reference
        });
        return true;
      } else {
        setState({
          loading: false,
          error: response.error || 'Failed to submit form',
          success: false,
          message: null,
          reference: response.reference
        });
        return false;
      }
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        success: false,
        message: null,
        reference: undefined
      });
      return false;
    }
  }, [formType]);

  return {
    ...state,
    submitData,
    reset
  };
}