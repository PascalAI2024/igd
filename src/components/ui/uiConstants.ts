/**
 * UI constants for consistent styling and text throughout the application
 */

// CTA button text for different contexts
export const CTA_TEXT = {
  // Primary CTAs
  START_PROJECT: "Start Your Project",
  CONTACT_US: "Contact Us",
  GET_STARTED: "Get Started",
  BOOK_CONSULTATION: "Book a Consultation",
  
  // Secondary CTAs
  LEARN_MORE: "Learn More",
  EXPLORE_SOLUTIONS: "Explore Solutions",
  VIEW_SERVICES: "View Services",
  VIEW_CASE_STUDIES: "View Case Studies",
  
  // Tertiary CTAs
  READ_MORE: "Read More",
  VIEW_DETAILS: "View Details",
  EXPLORE: "Explore",
  BROWSE_ALL: "Browse All"
};

// Category types for services, projects, etc.
export const CATEGORY_TYPES = {
  WEB_DEVELOPMENT: "Web Development",
  DIGITAL_MARKETING: "Digital Marketing",
  BUSINESS_AUTOMATION: "Business Automation",
  AI_ML: "AI & Machine Learning",
  CRM: "CRM Solutions",
  SYSTEM_INTEGRATION: "System Integration",
  CUSTOM_SOFTWARE: "Custom Software",
  CLOUD_SOLUTIONS: "Cloud Solutions"
};

// Spacing constants for consistent layout
export const SPACING = {
  SECTION: {
    LARGE: "py-24", // 96px (6rem)
    MEDIUM: "py-16", // 64px (4rem)
    SMALL: "py-12", // 48px (3rem)
    XSMALL: "py-8" // 32px (2rem)
  },
  CONTAINER: {
    DEFAULT: "px-4 sm:px-6 lg:px-8",
    NARROW: "px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto",
    WIDE: "px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
  },
  GAP: {
    LARGE: "gap-8", // 32px (2rem)
    MEDIUM: "gap-6", // 24px (1.5rem)
    SMALL: "gap-4", // 16px (1rem)
    XSMALL: "gap-2" // 8px (0.5rem)
  }
};

// Card style classes for consistency
export const CARD_STYLES = {
  DEFAULT: "bg-black/60 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300",
  DARK: "bg-black/80 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300",
  LIGHT: "bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300",
  ACCENT: "bg-red-900/10 backdrop-blur-sm rounded-xl p-8 border border-red-500/10 hover:border-red-500/20 transition-all duration-300"
};

// Icon size classes
export const ICON_SIZES = {
  XSMALL: "w-4 h-4",
  SMALL: "w-5 h-5",
  MEDIUM: "w-6 h-6",
  LARGE: "w-8 h-8",
  XLARGE: "w-10 h-10"
};

// Common gradients
export const GRADIENTS = {
  RED: "bg-gradient-to-r from-red-600 to-red-700",
  RED_DARK: "bg-gradient-to-r from-red-700 to-red-800",
  RED_LIGHT: "bg-gradient-to-r from-red-500 to-red-600",
  RED_SUBTLE: "bg-gradient-to-r from-red-500/10 to-red-500/5"
};