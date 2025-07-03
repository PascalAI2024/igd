// Standardized button styles for consistency across the site
export const buttonStyles = {
  // Primary button - used for main CTAs
  primary: "inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
  
  // Secondary button - used for secondary actions
  secondary: "inline-flex items-center px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-200",
  
  // Small button - used in cards and compact spaces
  small: "inline-flex items-center px-6 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all duration-200",
  
  // Ghost button - minimal style
  ghost: "inline-flex items-center px-6 py-2 text-red-400 hover:text-red-300 transition-colors duration-200",
  
  // Icon button - square button for icons
  icon: "flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200",
  
  // Disabled state
  disabled: "inline-flex items-center px-8 py-3 bg-gray-600 text-gray-400 rounded-lg cursor-not-allowed opacity-50"
};

// Standardized spacing values
export const spacing = {
  section: {
    small: "py-12 sm:py-16",
    medium: "py-16 sm:py-20", 
    large: "py-20 sm:py-24"
  },
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  content: {
    small: "mb-4",
    medium: "mb-6 sm:mb-8",
    large: "mb-8 sm:mb-12"
  }
};

// Standardized text styles
export const textStyles = {
  h1: "text-4xl sm:text-5xl md:text-6xl font-bold",
  h2: "text-3xl sm:text-4xl md:text-5xl font-bold", 
  h3: "text-2xl sm:text-3xl font-bold",
  h4: "text-xl sm:text-2xl font-semibold",
  body: "text-gray-300 leading-relaxed",
  caption: "text-sm text-gray-400"
};

// Standardized card styles
export const cardStyles = {
  base: "bg-gray-900/50 border border-white/10 rounded-lg p-6 hover:bg-gray-800/50 hover:border-red-500/30 transition-all duration-300",
  premium: "card-premium",
  glass: "glass hover:border-white/20"
};