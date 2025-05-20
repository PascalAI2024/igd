/**
 * Standardized form content and messaging
 * 
 * This file contains consistent messaging, options, and text for forms across the site.
 * Using these constants helps maintain brand consistency and makes it easier to update text.
 */

// Form headings
export const FORM_HEADINGS = {
  CONTACT: "Start Your Project",
  LEAD_CAPTURE: "Get Your Free Consultation",
  SUPPORT: "Get Support",
  FEEDBACK: "Share Your Feedback"
};

// Form descriptions
export const FORM_DESCRIPTIONS = {
  CONTACT: "Tell us about your project and let's create something amazing together.",
  LEAD_CAPTURE: "Schedule a free strategy session with one of our experts.",
  SUPPORT: "Our team is ready to help you resolve any issues.",
  FEEDBACK: "Your feedback helps us improve our products and services."
};

// Form success messages
export const FORM_SUCCESS_MESSAGES = {
  CONTACT: "Thank you! One of our specialists will contact you within 1 business day.",
  LEAD_CAPTURE: "Thank you! Your consultation has been scheduled. Check your email for confirmation.",
  SUPPORT: "Thank you! Our support team will respond to your request within 24 hours.",
  FEEDBACK: "Thank you for your feedback! We appreciate your input."
};

// Form error messages
export const FORM_ERROR_MESSAGES = {
  GENERAL: "We're having technical difficulties. Please try again or contact us directly.",
  VALIDATION: "Please check your information and try again.",
  SERVER: "Our server is currently unavailable. Please try again later.",
  RATE_LIMIT: "Too many requests. Please try again later."
};

// Button text
export const FORM_BUTTON_TEXT = {
  SUBMIT: "Submit",
  CONTACT: "Send Message",
  LEAD_CAPTURE: "Book Consultation",
  SUPPORT: "Get Support",
  FEEDBACK: "Send Feedback",
  LOADING: "Sending..."
};

// Project type options
export const PROJECT_TYPE_OPTIONS = [
  { value: "", label: "Select project type" },
  { value: "web-development", label: "Web Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "ai-ml", label: "AI & Machine Learning" },
  { value: "business-automation", label: "Business Automation" },
  { value: "crm", label: "CRM Implementation" },
  { value: "seo", label: "Search Engine Optimization" },
  { value: "ecommerce", label: "E-commerce Development" },
  { value: "other", label: "Other" }
];

// Budget range options
export const BUDGET_OPTIONS = [
  { value: "", label: "Select budget range" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" }
];

// Timeframe options
export const TIMEFRAME_OPTIONS = [
  { value: "", label: "Select timeframe" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "3-months", label: "Within 3 months" },
  { value: "6-months", label: "Within 6 months" },
  { value: "flexible", label: "Flexible / Not sure yet" }
];

// Lead source options
export const LEAD_SOURCE_OPTIONS = [
  { value: "", label: "How did you hear about us?" },
  { value: "google", label: "Google Search" },
  { value: "referral", label: "Referral" },
  { value: "social", label: "Social Media" },
  { value: "email", label: "Email" },
  { value: "other", label: "Other" }
];

// Contact information
export const CONTACT_INFO = {
  EMAIL: "pascal@ingeniousdigital.com",
  PHONE: "(954) 515-8586",
  ADDRESS: {
    CITY: "Fort Lauderdale",
    STATE: "FL",
    ZIP: "33304"
  },
  HOURS: {
    DAYS: "Monday - Friday",
    TIME: "9:00 AM - 5:00 PM"
  }
};

// General form field limits
export const FIELD_LIMITS = {
  NAME: 100,
  EMAIL: 150,
  PHONE: 20,
  COMPANY: 100,
  MESSAGE: 2000,
  SUBJECT: 150
};