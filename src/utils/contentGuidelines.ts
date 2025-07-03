// Content tone and messaging guidelines for consistency

export const contentGuidelines = {
  // Brand voice attributes
  voice: {
    tone: 'professional yet approachable',
    style: 'clear, concise, and confident',
    personality: 'innovative, reliable, results-driven'
  },
  
  // Key messaging pillars
  messaging: {
    primary: 'Transform your business with cutting-edge digital solutions',
    secondary: 'Local expertise, global standards',
    callToAction: 'Start your digital transformation today'
  },
  
  // Standardized phrases
  phrases: {
    // Service descriptions
    services: {
      intro: 'Our comprehensive digital services are designed to',
      benefit: 'helping your business achieve',
      outcome: 'measurable results and sustainable growth'
    },
    
    // Call-to-action variations
    cta: {
      primary: 'Get Started',
      secondary: 'Learn More',
      contact: 'Schedule a Consultation',
      demo: 'See It In Action',
      pricing: 'Get Custom Quote'
    },
    
    // Value propositions
    value: {
      expertise: 'With over a decade of experience',
      local: 'Serving Fort Lauderdale and surrounding areas',
      results: 'Proven track record of success',
      innovation: 'Leveraging the latest technologies'
    }
  },
  
  // Industry-specific terminology
  terminology: {
    // Preferred terms
    preferred: {
      'small business': 'small business', // not 'SMB'
      'artificial intelligence': 'AI',
      'return on investment': 'ROI',
      'search engine optimization': 'SEO',
      'customer relationship management': 'CRM'
    },
    
    // Avoid these terms
    avoid: [
      'cheap', // use 'affordable' or 'cost-effective'
      'basic', // use 'essential' or 'foundational'
      'simple', // use 'straightforward' or 'streamlined'
      'buy', // use 'invest' or 'get started'
    ]
  },
  
  // Content templates
  templates: {
    // Page hero sections
    heroSection: {
      structure: '[Powerful headline] | [Supporting description] | [Clear CTA]',
      example: 'Transform Your Business | Comprehensive digital solutions designed for growth | Get Started'
    },
    
    // Service descriptions
    serviceDescription: {
      structure: '[What we do] | [How it helps] | [Expected outcome]',
      example: 'We create custom websites | tailored to your business needs | that drive conversions and growth'
    },
    
    // Testimonial format
    testimonial: {
      structure: '[Specific result] | [How we helped] | [Client name, title]',
      example: 'Increased sales by 150% | through targeted digital marketing | John Smith, CEO'
    }
  },
  
  // Grammar and style rules
  style: {
    // Always use
    use: [
      'Active voice',
      'Present tense for current services',
      'Specific numbers and metrics',
      'Oxford comma',
      'Title case for headings'
    ],
    
    // Avoid
    avoid: [
      'Passive voice',
      'Jargon without explanation',
      'Vague claims',
      'ALL CAPS (except acronyms)',
      'Multiple exclamation points'
    ]
  }
};

// Helper function to ensure consistent capitalization
export const capitalizeHeading = (text: string): string => {
  const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
  
  return text.split(' ').map((word, index) => {
    // Always capitalize first and last word
    if (index === 0 || index === text.split(' ').length - 1) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    
    // Don't capitalize small words unless they start a sentence
    if (smallWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};