interface GtagArg {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (command: string, ...args: (string | GtagArg | Date)[]) => void;
    dataLayer?: Array<(string | GtagArg | Date)[]>;
  }
}

// User consent tracking - default to true for opt-out approach
let userHasConsented = true;

// Check for existing consent - opt-out approach
export const checkExistingConsent = (): boolean => {
  try {
    // Check if user has explicitly opted out
    const storedConsent = localStorage.getItem('analytics-consent');
    const storedSessionConsent = sessionStorage.getItem('consent-shown-this-session');

    // Only show the consent banner once per session
    if (!storedConsent && !storedSessionConsent) {
      sessionStorage.setItem('consent-shown-this-session', 'true');
    }
    
    // Default to true unless user explicitly opted out
    userHasConsented = storedConsent !== 'false';
    return userHasConsented;
  } catch (e) {
    // Default to tracking if localStorage is not available
    return true;
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

// Track page views with enhanced data
export const trackPageView = (url: string) => {
  if (!window.gtag || !userHasConsented) return;
  
  // Remove potential sensitive data from URL
  const urlObj = new URL(url, window.location.origin);
  const cleanUrl = urlObj.pathname;
  
  // Determine page type from URL structure
  let pageType = 'other';
  if (cleanUrl === '/' || cleanUrl === '/home') {
    pageType = 'home';
  } else if (cleanUrl.startsWith('/services/')) {
    pageType = 'service';
  } else if (cleanUrl.startsWith('/blog/')) {
    pageType = 'blog_post';
  } else if (cleanUrl === '/blog') {
    pageType = 'blog_index';
  } else if (cleanUrl.startsWith('/locations/')) {
    pageType = 'location';
  } else if (cleanUrl === '/locations') {
    pageType = 'locations_index';
  } else if (cleanUrl.startsWith('/case-studies/')) {
    pageType = 'case_study';
  } else if (cleanUrl === '/case-studies') {
    pageType = 'case_studies_index';
  } else if (cleanUrl === '/contact') {
    pageType = 'contact';
  } else if (cleanUrl === '/about') {
    pageType = 'about';
  }
  
  // Get page title
  const pageTitle = document.title || 'Untitled Page';
  
  // Track performance data if available
  let pageLoadTime = 0;
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    pageLoadTime = timing.loadEventEnd - timing.navigationStart;
  }
  
  // Send the pageview with enhanced data
  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-VEDZ17M6MH', {
    page_path: cleanUrl,
    page_title: pageTitle,
    page_type: pageType,
    page_load_time: pageLoadTime > 0 ? pageLoadTime : undefined
  });
  
  // Start timing for engagement tracking
  sessionStorage.setItem('page_view_start_time', Date.now().toString());
  
  // Reset interaction counter for this page
  sessionStorage.setItem('page_interactions', '0');
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

// Track user interactions with improved data collection
export const trackInteraction = (
  elementId: string,
  elementClass: string,
  interactionType: string,
  elementContent?: string
) => {
  if (!window.gtag || !userHasConsented) return;

  // Increment interaction counter for the current page
  const currentInteractions = parseInt(sessionStorage.getItem('page_interactions') || '0', 10);
  sessionStorage.setItem('page_interactions', (currentInteractions + 1).toString());

  // Get location in page (using element position data if available)
  let locationInPage = 'unknown';
  const element = document.getElementById(elementId) || document.querySelector(`.${elementClass}`);
  if (element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (rect.top < viewportHeight / 3) {
      locationInPage = 'top';
    } else if (rect.top < viewportHeight * 2/3) {
      locationInPage = 'middle';
    } else {
      locationInPage = 'bottom';
    }
  }

  // Determine time on page before interaction
  const pageStartTime = parseInt(sessionStorage.getItem('page_view_start_time') || '0', 10);
  const timeBeforeInteraction = pageStartTime ? Math.round((Date.now() - pageStartTime) / 1000) : 0;

  // Send the enhanced interaction event
  window.gtag('event', 'user_interaction', {
    element_id: elementId,
    element_class: elementClass,
    interaction_type: interactionType,
    element_content: elementContent || 'not_provided',
    location_in_page: locationInPage,
    time_before_interaction: timeBeforeInteraction,
    interaction_count: currentInteractions + 1,
    page_path: window.location.pathname
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

// Track user engagement with enhanced metrics
export const trackEngagement = (
  engagementType: string,
  duration: number,
  pageSection?: string,
  additionalData?: Record<string, any>
) => {
  if (!window.gtag || !userHasConsented) return;

  // Get scroll depth
  let scrollDepth = 0;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight > 0) {
    scrollDepth = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
  }
  
  // Get interaction count
  const interactionCount = parseInt(sessionStorage.getItem('page_interactions') || '0', 10);
  
  // Calculate session duration
  const sessionStart = localStorage.getItem('session_start_time');
  let sessionDuration = 0;
  if (sessionStart) {
    sessionDuration = Math.round((Date.now() - parseInt(sessionStart, 10)) / 1000);
  } else {
    localStorage.setItem('session_start_time', Date.now().toString());
  }

  // Send the enhanced engagement event
  window.gtag('event', 'user_engagement', {
    engagement_type: engagementType,
    duration: duration,
    page_section: pageSection || 'not_specified',
    scroll_depth: scrollDepth,
    interaction_count: interactionCount,
    session_duration: sessionDuration,
    page_path: window.location.pathname,
    ...additionalData
  });
  
  // For exit engagement, track conversion probability
  if (engagementType === 'exit' || engagementType === 'leave') {
    // Calculate a rough conversion probability based on engagement factors
    const conversionProbability = _calculateConversionProbability(
      duration, 
      scrollDepth, 
      interactionCount
    );
    
    window.gtag('event', 'conversion_probability', {
      probability: conversionProbability,
      page_path: window.location.pathname,
      page_type: _getPageTypeFromPath(window.location.pathname)
    });
  }
};

// Helper function to calculate conversion probability
const _calculateConversionProbability = (
  duration: number, 
  scrollDepth: number, 
  interactionCount: number
): number => {
  // Simple weighted formula - can be refined based on actual data
  const durationScore = Math.min(1, duration / 120); // Max out at 2 minutes
  const scrollScore = scrollDepth / 100;
  const interactionScore = Math.min(1, interactionCount / 5); // Max out at 5 interactions
  
  // Weighted average with more emphasis on interactions
  return Math.round((durationScore * 0.3 + scrollScore * 0.3 + interactionScore * 0.4) * 100);
};

// Helper to get page type from path
const _getPageTypeFromPath = (path: string): string => {
  if (path === '/' || path === '/home') return 'home';
  if (path.startsWith('/services/')) return 'service';
  if (path.startsWith('/blog/')) return 'blog_post';
  if (path === '/blog') return 'blog_index';
  if (path.startsWith('/locations/')) return 'location';
  if (path === '/locations') return 'locations_index';
  if (path.startsWith('/case-studies/')) return 'case_study';
  if (path === '/case-studies') return 'case_studies_index';
  if (path === '/contact') return 'contact';
  if (path === '/about') return 'about';
  return 'other';
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Check consent status - but don't block initialization
  checkExistingConsent();
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: (string | GtagArg | Date)[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-VEDZ17M6MH', {
    anonymize_ip: true, // Anonymize IP addresses
    allow_ad_personalization_signals: false, // Disable ad personalization
    page_title: document.title,
    send_page_view: true,
    cookie_domain: 'auto',
    cookie_expires: 63072000, // 2 years in seconds
    cookie_update: true,
    cookie_flags: 'SameSite=None;Secure',
    transport_type: 'beacon', // Uses navigator.sendBeacon for better reliability
    custom_map: {
      'dimension1': 'page_type',
      'dimension2': 'user_type',
      'dimension3': 'device_type',
      'dimension4': 'site_version',
      'metric1': 'page_load_time',
      'metric2': 'interaction_count'
    } as any
  });

  // Send useful session-level data
  _sendSessionData();
};

// Private helper to send session-level data
const _sendSessionData = () => {
  if (!window.gtag || !userHasConsented) return;

  // Detect device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /iPad|tablet|Tablet|Android(?!.*Mobile)/i.test(navigator.userAgent);
  const deviceType = isTablet ? 'tablet' : (isMobile ? 'mobile' : 'desktop');

  // Detect user type (new vs returning)
  const isReturningUser = localStorage.getItem('user_first_visit') !== null;
  
  if (!isReturningUser) {
    localStorage.setItem('user_first_visit', new Date().toISOString());
  }

  // Get site version (or build date as proxy)
  const siteVersion = import.meta.env.VITE_BUILD_VERSION || 
                     import.meta.env.VITE_BUILD_DATE || 
                     new Date().toISOString().split('T')[0];

  // Set user properties
  window.gtag('set', 'user_properties', {
    device_type: deviceType,
    user_type: isReturningUser ? 'returning' : 'new',
    site_version: siteVersion,
    screen_size: `${window.innerWidth}x${window.innerHeight}`,
    viewport_size: `${window.screen.width}x${window.screen.height}`,
    connection_type: (navigator as any).connection ? (navigator as any).connection.effectiveType : 'unknown'
  });
};