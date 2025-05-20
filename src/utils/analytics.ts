interface GtagArg {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag: (command: string, ...args: (string | GtagArg | Date)[]) => void;
    dataLayer: Array<(string | GtagArg | Date)[]>;
  }
}

// User consent tracking
let userHasConsented = false;

// Check for existing consent
export const checkExistingConsent = (): boolean => {
  try {
    // Check if user has a consent cookie or localStorage entry
    const storedConsent = localStorage.getItem('analytics-consent');
    const storedSessionConsent = sessionStorage.getItem('consent-shown-this-session');

    // Only show the consent banner once per session even if they haven't made a choice yet
    if (!storedConsent && !storedSessionConsent) {
      sessionStorage.setItem('consent-shown-this-session', 'true');
    }
    
    userHasConsented = storedConsent === 'true';
    return userHasConsented;
  } catch (e) {
    return false;
  }
};

// Set user consent
export const setUserConsent = (consent: boolean): void => {
  userHasConsented = consent;
  try {
    localStorage.setItem('analytics-consent', consent ? 'true' : 'false');
    if (consent) {
      initializeAnalytics();
    }
  } catch (e) {
    console.error('Error setting consent:', e);
  }
};

// Initialize dataLayer array if it doesn't exist
window.dataLayer = window.dataLayer || [];

// Track page views
export const trackPageView = (url: string) => {
  if (!window.gtag || !userHasConsented) return;
  
  // Remove potential sensitive data from URL
  const urlObj = new URL(url, window.location.origin);
  const cleanUrl = urlObj.pathname;
  
  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-VEDZ17M6MH', {
    page_path: cleanUrl
  });
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Track user interactions
export const trackInteraction = (
  elementId: string,
  elementClass: string,
  interactionType: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'user_interaction', {
    element_id: elementId,
    element_class: elementClass,
    interaction_type: interactionType
  });
};

// Track form submissions
export const trackFormSubmission = (
  formName: string,
  formId: string,
  success: boolean
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'form_submission', {
    form_name: formName,
    form_id: formId,
    success: success
  });
};

// Track service page views
export const trackServiceView = (
  serviceName: string,
  serviceCategory: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'service_view', {
    service_name: serviceName,
    service_category: serviceCategory
  });
};

// Track lead generation
export const trackLeadGeneration = (
  source: string,
  medium: string,
  campaign?: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'generate_lead', {
    source: source,
    medium: medium,
    campaign: campaign
  });
};

// Track error events
export const trackError = (
  errorMessage: string,
  errorCode?: string,
  errorContext?: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'error', {
    error_message: errorMessage,
    error_code: errorCode,
    error_context: errorContext
  });
};

// Track performance metrics
export const trackPerformance = (
  metricName: string,
  value: number,
  category: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'performance', {
    metric_name: metricName,
    value: value,
    category: category
  });
};

// Track user engagement
export const trackEngagement = (
  engagementType: string,
  duration: number,
  pageSection?: string
) => {
  if (!window.gtag || !userHasConsented) return;

  window.gtag('event', 'user_engagement', {
    engagement_type: engagementType,
    duration: duration,
    page_section: pageSection
  });
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Check consent before initializing
  if (!userHasConsented && !checkExistingConsent()) {
    return;
  }
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: (string | GtagArg | Date)[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-VEDZ17M6MH', {
    anonymize_ip: true, // Anonymize IP addresses
    allow_ad_personalization_signals: false // Disable ad personalization
  });
};