import { 
  Zap, 
  Target, 
  MapPin, 
  Building, 
  BarChart3, 
  Rocket,
  Brain,
  Shield,
  Globe,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export interface Solution {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  icon: any;
  category: 'growth' | 'automation' | 'local' | 'enterprise';
  isPopular?: boolean;
  isFeatured?: boolean;
  
  // Pricing and ROI
  startingPrice: string;
  averageROI: string;
  timeToResults: string;
  
  // Key features and benefits
  keyFeatures: string[];
  benefits: string[];
  
  // What's included
  included: {
    title: string;
    description: string;
    features: string[];
  }[];
  
  // Target audience
  idealFor: string[];
  businessSize: string[];
  industries: string[];
  
  // Process and methodology
  process: {
    step: number;
    title: string;
    description: string;
    duration: string;
  }[];
  
  // Results and testimonials
  results: {
    metric: string;
    improvement: string;
    timeframe: string;
  }[];
  
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    industry: string;
    results: string;
  };
  
  // Case studies and proof
  caseStudies: string[]; // IDs of related case studies
  
  // FAQ specific to this solution
  faq: {
    question: string;
    answer: string;
  }[];
  
  // CTA and next steps
  ctaPrimary: {
    text: string;
    action: string;
  };
  ctaSecondary: {
    text: string;
    action: string;
  };
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const solutions: Solution[] = [
  {
    id: 'digital-growth',
    name: 'Digital Growth Package',
    slug: 'digital-growth',
    tagline: 'Build a Strong Digital Foundation for Growth',
    description: 'Complete digital presence and marketing solution that drives measurable growth for your business.',
    longDescription: 'Our Digital Growth Package is a comprehensive solution designed to establish and accelerate your online presence. We combine strategic website development, search engine optimization, content marketing, and lead generation systems to create a powerful digital engine that drives consistent business growth.',
    heroImage: '/images/solutions/digital-growth-hero.webp',
    icon: Rocket,
    category: 'growth',
    isPopular: true,
    isFeatured: true,
    
    startingPrice: '$2,497/month',
    averageROI: '150-200%',
    timeToResults: '60-90 days',
    
    keyFeatures: [
      'Professional Website Design & Development',
      'Search Engine Optimization (SEO)',
      'Google Ads & Social Media Advertising',
      'Content Marketing Strategy',
      'Lead Generation System',
      'Analytics & Performance Tracking',
      'Monthly Strategy Reviews',
      '24/7 Technical Support'
    ],
    
    benefits: [
      'Increase online visibility significantly',
      'Generate 50-80% more qualified leads',
      'Improve conversion rates by 25-40%',
      'Build lasting brand authority',
      'Reduce marketing costs over time',
      'Scale growth predictably'
    ],
    
    included: [
      {
        title: 'Digital Foundation',
        description: 'Professional website and online presence setup',
        features: [
          'Custom website design and development',
          'Mobile-responsive optimization',
          'SSL security and hosting setup',
          'Google Business Profile optimization',
          'Social media profile creation'
        ]
      },
      {
        title: 'Traffic Generation',
        description: 'Multi-channel approach to drive qualified visitors',
        features: [
          'SEO strategy and implementation',
          'Google Ads campaign management',
          'Social media advertising',
          'Content marketing program',
          'Local SEO optimization'
        ]
      },
      {
        title: 'Lead Conversion',
        description: 'Systems to convert visitors into customers',
        features: [
          'Lead capture forms and landing pages',
          'Email marketing automation',
          'CRM integration and setup',
          'Follow-up sequence creation',
          'Conversion rate optimization'
        ]
      },
      {
        title: 'Growth Optimization',
        description: 'Continuous improvement and scaling',
        features: [
          'Monthly performance analysis',
          'Strategy optimization meetings',
          'A/B testing implementation',
          'ROI tracking and reporting',
          'Scaling recommendations'
        ]
      }
    ],
    
    idealFor: [
      'Small to medium businesses ready to scale',
      'Companies with limited online presence',
      'Businesses spending ineffectively on marketing',
      'Organizations wanting predictable growth',
      'Companies needing professional digital presence'
    ],
    
    businessSize: ['Small Business (1-50 employees)', 'Medium Business (51-200 employees)'],
    industries: ['Professional Services', 'Retail', 'Healthcare', 'Real Estate', 'Home Services'],
    
    process: [
      {
        step: 1,
        title: 'Discovery & Strategy',
        description: 'Deep dive into your business, goals, and competitive landscape to create a custom growth strategy.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Foundation Building',
        description: 'Design and develop your professional website, optimize Google Business Profile, and set up tracking.',
        duration: '2-4 weeks'
      },
      {
        step: 3,
        title: 'Traffic Generation',
        description: 'Launch SEO optimization, paid advertising campaigns, and content marketing to drive qualified traffic.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Lead Conversion',
        description: 'Implement lead capture systems, email automation, and CRM integration to convert visitors to leads.',
        duration: '1-2 weeks'
      },
      {
        step: 5,
        title: 'Optimization & Scale',
        description: 'Monitor performance, optimize campaigns, and scale successful strategies for maximum ROI.',
        duration: 'Ongoing'
      }
    ],
    
    results: [
      { metric: 'Website Traffic', improvement: '+150%', timeframe: '6 months' },
      { metric: 'Lead Generation', improvement: '+200%', timeframe: '6 months' },
      { metric: 'Conversion Rate', improvement: '1.8% to 2.9%', timeframe: '6 months' },
      { metric: 'Revenue Growth', improvement: '+25-35%', timeframe: '12 months' }
    ],
    
    testimonial: {
      quote: "Building our online presence was a gradual process. The first 3 months were mostly setup and learning. By month 6, we started seeing consistent leads - about 8-10 per month. After a year, we've grown revenue by 35% and have a steady pipeline. It's not overnight success, but sustainable growth.",
      author: "Sarah Johnson",
      company: "Johnson Legal Services (Solo practice + 2 staff)",
      industry: "Legal Services",
      results: "35% revenue growth, 8-10 qualified leads/month"
    },
    
    caseStudies: ['legal-firm-transformation', 'medical-practice-growth', 'home-services-scaling'],
    
    faq: [
      {
        question: "How long before I see results from the Digital Growth Package?",
        answer: "Most clients see initial improvements in website traffic within 30 days, with significant lead generation increases by 60-90 days. Full optimization and maximum ROI typically occur within 6-12 months."
      },
      {
        question: "What makes this different from hiring a marketing agency?",
        answer: "Our Digital Growth Package provides a complete, integrated solution rather than fragmented services. You get strategy, implementation, and optimization all in one package, with a dedicated team focused on your success."
      },
      {
        question: "Do you work with businesses in any industry?",
        answer: "We specialize in service-based businesses, professional services, retail, healthcare, and home services. Our strategies are adapted to your specific industry and local market conditions."
      },
      {
        question: "What's included in the monthly investment?",
        answer: "Everything: website maintenance, SEO optimization, ad management, content creation, lead system management, monthly strategy calls, and unlimited support. No hidden fees or additional charges."
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, we offer month-to-month agreements after the initial 6-month commitment. We're confident you'll see such great results that you'll want to continue growing with us."
      }
    ],
    
    ctaPrimary: {
      text: 'Start Your Digital Growth',
      action: '/contact?solution=digital-growth'
    },
    ctaSecondary: {
      text: 'View Case Studies',
      action: '/case-studies?filter=digital-growth'
    },
    
    metaTitle: 'Digital Growth Package - Complete Online Marketing Solution | Ingenious Digital',
    metaDescription: 'Transform your business with our comprehensive Digital Growth Package. Professional website, SEO, advertising, and lead generation - everything you need to scale online.',
    keywords: ['digital marketing package', 'online growth solution', 'website and SEO package', 'lead generation system', 'business growth marketing']
  },
  
  {
    id: 'automation-suite',
    name: 'Business Automation Suite',
    slug: 'automation',
    tagline: 'Streamline Operations with Smart Automation',
    description: 'Reduce repetitive tasks and improve efficiency with intelligent automation solutions tailored to your business.',
    longDescription: 'Our Business Automation Suite leverages cutting-edge AI and automation technologies to streamline your operations, reduce manual work, and improve consistency. From customer communications to data processing, we identify and automate key processes that free up your team to focus on high-value activities.',
    heroImage: '/images/solutions/automation-hero.webp',
    icon: Brain,
    category: 'automation',
    isPopular: true,
    
    startingPrice: '$1,997/month',
    averageROI: '200-250%',
    timeToResults: '30-60 days',
    
    keyFeatures: [
      'Process Analysis & Automation Mapping',
      'Custom Workflow Automation',
      'AI-Powered Customer Communications',
      'Data Integration & Processing',
      'Automated Reporting & Analytics',
      'CRM & Sales Automation',
      'Marketing Automation Sequences',
      'Ongoing Optimization & Support'
    ],
    
    benefits: [
      'Save 10-15 hours per week on manual tasks',
      'Reduce human error by 85%',
      'Improve response times by 60%',
      'Increase team productivity by 40-50%',
      'Ensure consistent processes',
      'Scale operations without hiring'
    ],
    
    included: [
      {
        title: 'Process Audit',
        description: 'Comprehensive analysis of your current workflows',
        features: [
          'Complete process mapping',
          'Inefficiency identification',
          'Automation opportunity assessment',
          'ROI projections for each automation',
          'Priority implementation roadmap'
        ]
      },
      {
        title: 'Core Automations',
        description: 'Essential business process automation',
        features: [
          'Customer inquiry auto-responses',
          'Appointment scheduling automation',
          'Lead qualification and routing',
          'Invoice and payment processing',
          'Data entry and management'
        ]
      },
      {
        title: 'Advanced Integrations',
        description: 'Connect and automate between systems',
        features: [
          'CRM and marketing tool integration',
          'Accounting software connections',
          'Communication platform automation',
          'E-commerce and inventory systems',
          'Custom API development'
        ]
      },
      {
        title: 'AI Enhancement',
        description: 'Intelligent automation with AI capabilities',
        features: [
          'Smart email responses',
          'Predictive analytics',
          'Automated content generation',
          'Intelligent data analysis',
          'Chatbot implementation'
        ]
      }
    ],
    
    idealFor: [
      'Businesses with repetitive manual processes',
      'Companies wanting to scale without overhead',
      'Organizations with data entry bottlenecks',
      'Teams spending too much time on admin tasks',
      'Businesses ready for digital transformation'
    ],
    
    businessSize: ['Small Business (5-50 employees)', 'Medium Business (51-200 employees)', 'Enterprise (200+ employees)'],
    industries: ['Professional Services', 'Manufacturing', 'Healthcare', 'Real Estate', 'Financial Services'],
    
    process: [
      {
        step: 1,
        title: 'Process Discovery',
        description: 'Map current workflows and identify automation opportunities with highest ROI potential.',
        duration: '1 week'
      },
      {
        step: 2,
        title: 'Automation Design',
        description: 'Create detailed automation blueprints and integration plans for your specific systems.',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Development & Setup',
        description: 'Build custom automations, integrate systems, and configure intelligent workflows.',
        duration: '2-4 weeks'
      },
      {
        step: 4,
        title: 'Testing & Training',
        description: 'Thoroughly test all automations and train your team on new processes and systems.',
        duration: '1 week'
      },
      {
        step: 5,
        title: 'Launch & Optimize',
        description: 'Deploy automations and continuously optimize performance based on real-world usage.',
        duration: 'Ongoing'
      }
    ],
    
    results: [
      { metric: 'Time Savings', improvement: '25+ hours/week', timeframe: '3 months' },
      { metric: 'Error Reduction', improvement: '95%', timeframe: '2 months' },
      { metric: 'Response Time', improvement: '50% faster', timeframe: '3 months' },
      { metric: 'Task Completion', improvement: '+45%', timeframe: '6 months' }
    ],
    
    testimonial: {
      quote: "Implementing automation wasn't smooth - we had system conflicts and staff pushback initially. But after 4 months of adjustments, we're saving about 15 hours weekly on data entry. Order processing improved by 60%, and errors dropped significantly. The investment is paying off, just slower than expected.",
      author: "Mike Chen",
      company: "Precision Manufacturing (35 employees)",
      industry: "Manufacturing",
      results: "15 hours/week saved, 60% faster processing"
    },
    
    caseStudies: ['manufacturing-automation', 'healthcare-workflow', 'financial-processing'],
    
    faq: [
      {
        question: "Which processes can be automated?",
        answer: "Almost any repetitive process can be automated - from customer communications and data entry to complex multi-step workflows. We'll assess your specific operations to identify the highest-impact opportunities."
      },
      {
        question: "Will automation work with our existing software?",
        answer: "Yes, our automations integrate with virtually any business software through APIs, webhooks, or custom connections. We specialize in making different systems work together seamlessly."
      },
      {
        question: "How much time will this save our team?",
        answer: "Most clients save 15-30 hours per week on manual tasks. The exact savings depend on your current processes, but we guarantee significant time reductions within 90 days."
      },
      {
        question: "What if our processes change?",
        answer: "Automations are designed to be flexible and easily modified. We provide ongoing support to adjust and optimize automations as your business evolves."
      },
      {
        question: "Is there a risk of losing control over our processes?",
        answer: "Not at all. You maintain full oversight with detailed reporting and controls. Automations handle routine tasks while flagging anything requiring human attention."
      }
    ],
    
    ctaPrimary: {
      text: 'Automate Your Business',
      action: '/contact?solution=automation'
    },
    ctaSecondary: {
      text: 'See Automation Examples',
      action: '/case-studies?filter=automation'
    },
    
    metaTitle: 'Business Automation Suite - AI-Powered Process Automation | Ingenious Digital',
    metaDescription: 'Streamline operations and boost efficiency with our Business Automation Suite. Custom AI-powered automations that save time and reduce errors.',
    keywords: ['business automation', 'AI automation', 'workflow automation', 'process automation', 'business efficiency']
  },
  
  {
    id: 'local-business',
    name: 'Local Business Accelerator',
    slug: 'local-business',
    tagline: 'Become a Local Market Leader',
    description: 'Comprehensive local marketing solution designed to make your business the go-to choice in your area.',
    longDescription: 'The Local Business Accelerator is specifically designed for businesses that serve local markets. We combine advanced local SEO, targeted advertising, reputation management, and community engagement strategies to establish your business as the dominant force in your local area.',
    heroImage: '/images/solutions/local-business-hero.webp',
    icon: MapPin,
    category: 'local',
    isFeatured: true,
    
    startingPrice: '$1,497/month',
    averageROI: '175-225%',
    timeToResults: '30-60 days',
    
    keyFeatures: [
      'Local SEO Optimization',
      'Google Business Profile Management',
      'Local Directory Submissions',
      'Targeted Local Advertising',
      'Reputation Management',
      'Community Engagement Strategy',
      'Local Content Marketing',
      'Competitor Analysis & Monitoring'
    ],
    
    benefits: [
      'Improve local search rankings',
      'Increase foot traffic by 50-75%',
      'Generate more local leads',
      'Build strong community presence',
      'Outrank competitors consistently',
      'Improve online reputation'
    ],
    
    included: [
      {
        title: 'Local SEO Foundation',
        description: 'Establish strong local search presence',
        features: [
          'Google Business Profile optimization',
          'Local keyword research and targeting',
          'NAP (Name, Address, Phone) consistency',
          'Local schema markup implementation',
          'Local landing page creation'
        ]
      },
      {
        title: 'Directory & Citations',
        description: 'Build authority across local platforms',
        features: [
          '50+ local directory submissions',
          'Industry-specific platform optimization',
          'Citation cleanup and consistency',
          'Review platform setup',
          'Local partnership opportunities'
        ]
      },
      {
        title: 'Reputation Management',
        description: 'Build and protect your local reputation',
        features: [
          'Review monitoring and response',
          'Review generation campaigns',
          'Crisis reputation management',
          'Customer feedback systems',
          'Online reputation auditing'
        ]
      },
      {
        title: 'Local Advertising',
        description: 'Targeted campaigns for local customers',
        features: [
          'Google Ads for local searches',
          'Facebook local awareness campaigns',
          'Geo-targeted social media ads',
          'Local event promotion',
          'Seasonal campaign management'
        ]
      }
    ],
    
    idealFor: [
      'Restaurants and food service businesses',
      'Home service providers',
      'Retail stores and shops',
      'Healthcare practices',
      'Professional service providers'
    ],
    
    businessSize: ['Small Business (1-25 employees)', 'Medium Business (26-100 employees)'],
    industries: ['Restaurants', 'Home Services', 'Retail', 'Healthcare', 'Automotive', 'Professional Services'],
    
    process: [
      {
        step: 1,
        title: 'Local Market Analysis',
        description: 'Analyze your local market, competitors, and identify opportunities for domination.',
        duration: '1 week'
      },
      {
        step: 2,
        title: 'Foundation Setup',
        description: 'Optimize Google Business Profile, set up tracking, and establish local SEO foundation.',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Local Authority Building',
        description: 'Submit to directories, build citations, and establish local authority signals.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Campaign Launch',
        description: 'Launch targeted local advertising and reputation management campaigns.',
        duration: '1 week'
      },
      {
        step: 5,
        title: 'Optimization & Growth',
        description: 'Monitor rankings, optimize campaigns, and scale successful local strategies.',
        duration: 'Ongoing'
      }
    ],
    
    results: [
      { metric: 'Local Search Rankings', improvement: 'Page 3 to Top 5', timeframe: '4-6 months' },
      { metric: 'Google Business Views', improvement: '+65%', timeframe: '3 months' },
      { metric: 'Phone Calls', improvement: '+40%', timeframe: '4 months' },
      { metric: 'Direction Requests', improvement: '+35%', timeframe: '6 months' }
    ],
    
    testimonial: {
      quote: "After years of relying on word-of-mouth, we finally invested in local SEO. It took about 4 months to see real results, but now we consistently get 15-20 calls per week from Google searches. We've been able to hire one additional server for busy nights. The steady growth has been manageable and sustainable.",
      author: "Maria Rodriguez",
      company: "Rodriguez Family Restaurant (Local Mexican restaurant, 15 tables)",
      industry: "Restaurant",
      results: "3x foot traffic increase, #1 local rankings"
    },
    
    caseStudies: ['restaurant-local-dominance', 'hvac-company-growth', 'dental-practice-expansion'],
    
    faq: [
      {
        question: "How quickly will I rank #1 locally?",
        answer: "Most businesses see significant ranking improvements within 30-60 days, with #1 positions typically achieved within 3-6 months depending on competition and current online presence."
      },
      {
        question: "What if there's strong competition in my area?",
        answer: "Strong competition means there's proven demand in your market. We specialize in competitive markets and use advanced strategies to outrank established competitors."
      },
      {
        question: "Do you work with franchise locations?",
        answer: "Yes, we have specific strategies for franchise businesses that balance corporate guidelines with local optimization needs."
      },
      {
        question: "How do you handle negative reviews?",
        answer: "We monitor reviews 24/7, respond professionally to all feedback, and implement strategies to generate more positive reviews while addressing legitimate concerns."
      },
      {
        question: "What's included in reputation management?",
        answer: "Review monitoring, professional responses, review generation campaigns, crisis management, and quarterly reputation audits with improvement recommendations."
      }
    ],
    
    ctaPrimary: {
      text: 'Grow Your Local Presence',
      action: '/contact?solution=local-business'
    },
    ctaSecondary: {
      text: 'View Local Success Stories',
      action: '/case-studies?filter=local'
    },
    
    metaTitle: 'Local Business Accelerator - Dominate Local Search & Marketing | Ingenious Digital',
    metaDescription: 'Become the #1 choice in your local market with our Local Business Accelerator. Local SEO, reputation management, and targeted advertising solutions.',
    keywords: ['local business marketing', 'local SEO', 'Google Business optimization', 'local search rankings', 'reputation management']
  },
  
  {
    id: 'enterprise',
    name: 'Enterprise Transformation',
    slug: 'enterprise',
    tagline: 'Large-Scale Digital Transformation',
    description: 'Comprehensive digital transformation and modernization for large organizations and enterprises.',
    longDescription: 'Our Enterprise Transformation solution addresses the complex digital challenges facing large organizations. We provide strategic planning, technology implementation, and change management to drive digital transformation at scale while ensuring security, compliance, and operational continuity.',
    heroImage: '/images/solutions/enterprise-hero.webp',
    icon: Building,
    category: 'enterprise',
    
    startingPrice: '$15,000/month',
    averageROI: '125-150%',
    timeToResults: '3-6 months',
    
    keyFeatures: [
      'Digital Transformation Strategy',
      'Legacy System Modernization',
      'Enterprise Software Development',
      'Cloud Migration & Infrastructure',
      'Data Analytics & Intelligence',
      'Cybersecurity Implementation',
      'Change Management & Training',
      'Compliance & Governance'
    ],
    
    benefits: [
      'Modernize legacy systems',
      'Improve operational efficiency by 25-35%',
      'Reduce IT costs by 20-25%',
      'Enhance security and compliance',
      'Enable data-driven decisions',
      'Accelerate innovation cycles'
    ],
    
    included: [
      {
        title: 'Strategic Planning',
        description: 'Comprehensive digital transformation roadmap',
        features: [
          'Current state assessment',
          'Future state vision development',
          'Technology roadmap creation',
          'ROI and budget planning',
          'Risk assessment and mitigation'
        ]
      },
      {
        title: 'Technology Implementation',
        description: 'Modern technology stack deployment',
        features: [
          'Cloud infrastructure setup',
          'Enterprise software development',
          'System integration and APIs',
          'Data migration and management',
          'Security implementation'
        ]
      },
      {
        title: 'Process Optimization',
        description: 'Streamlined business processes',
        features: [
          'Workflow analysis and redesign',
          'Automation implementation',
          'Performance monitoring systems',
          'Quality assurance frameworks',
          'Continuous improvement processes'
        ]
      },
      {
        title: 'Change Management',
        description: 'Smooth transition and adoption',
        features: [
          'Stakeholder engagement strategy',
          'Training program development',
          'Communication planning',
          'Support system setup',
          'Success measurement frameworks'
        ]
      }
    ],
    
    idealFor: [
      'Large corporations (500+ employees)',
      'Organizations with legacy systems',
      'Companies undergoing digital transformation',
      'Enterprises needing compliance solutions',
      'Organizations requiring custom software'
    ],
    
    businessSize: ['Enterprise (500+ employees)', 'Large Corporation (1000+ employees)'],
    industries: ['Financial Services', 'Healthcare', 'Manufacturing', 'Government', 'Education', 'Technology'],
    
    process: [
      {
        step: 1,
        title: 'Assessment & Strategy',
        description: 'Comprehensive analysis of current systems and development of transformation strategy.',
        duration: '4-6 weeks'
      },
      {
        step: 2,
        title: 'Planning & Design',
        description: 'Detailed project planning, architecture design, and timeline development.',
        duration: '4-8 weeks'
      },
      {
        step: 3,
        title: 'Development & Implementation',
        description: 'Phased development and deployment of new systems and processes.',
        duration: '12-24 weeks'
      },
      {
        step: 4,
        title: 'Testing & Training',
        description: 'Comprehensive testing, user training, and change management activities.',
        duration: '4-8 weeks'
      },
      {
        step: 5,
        title: 'Launch & Support',
        description: 'Go-live support, monitoring, and continuous optimization.',
        duration: 'Ongoing'
      }
    ],
    
    results: [
      { metric: 'Operational Efficiency', improvement: '+30%', timeframe: '12 months' },
      { metric: 'IT Cost Reduction', improvement: '20-25%', timeframe: '18 months' },
      { metric: 'Processing Speed', improvement: '+100%', timeframe: '6 months' },
      { metric: 'Security Compliance', improvement: '100%', timeframe: '12 months' }
    ],
    
    testimonial: {
      quote: "Enterprise transformation is a marathon. We're 18 months in and seeing 22% efficiency gains in key departments. Some legacy systems are still being phased out. Change management has been our biggest challenge, but the new systems are proving their worth. We expect full ROI by year 3.",
      author: "Robert Thompson",
      company: "Regional Financial Services (450 employees)",
      industry: "Financial Services",
      results: "22% efficiency gains, ROI projected year 3"
    },
    
    caseStudies: ['financial-modernization', 'healthcare-digital-transformation', 'manufacturing-automation'],
    
    faq: [
      {
        question: "How long does enterprise transformation take?",
        answer: "Timeline varies by scope and complexity, but most enterprise transformations take 12-24 months for full implementation. We use phased approaches to deliver value incrementally."
      },
      {
        question: "Can you work with our existing IT team?",
        answer: "Absolutely. We complement and enhance your internal capabilities, providing expertise in areas where you need support while building internal knowledge."
      },
      {
        question: "How do you ensure minimal business disruption?",
        answer: "We use proven methodologies including phased rollouts, parallel systems, and comprehensive testing to minimize downtime and business impact."
      },
      {
        question: "What about compliance and security requirements?",
        answer: "We specialize in heavily regulated industries and ensure all solutions meet your compliance requirements (HIPAA, SOX, PCI-DSS, etc.) and security standards."
      },
      {
        question: "Do you provide ongoing support after implementation?",
        answer: "Yes, we offer comprehensive support packages including monitoring, maintenance, optimization, and help desk services to ensure continued success."
      }
    ],
    
    ctaPrimary: {
      text: 'Discuss Your Transformation',
      action: '/contact?solution=enterprise'
    },
    ctaSecondary: {
      text: 'View Enterprise Case Studies',
      action: '/case-studies?filter=enterprise'
    },
    
    metaTitle: 'Enterprise Digital Transformation Solutions | Ingenious Digital',
    metaDescription: 'Large-scale digital transformation for enterprises. Legacy modernization, cloud migration, and comprehensive technology solutions for large organizations.',
    keywords: ['enterprise digital transformation', 'legacy system modernization', 'enterprise software development', 'digital transformation strategy', 'enterprise technology solutions']
  }
];

// Helper functions
export const getSolutionBySlug = (slug: string): Solution | undefined => {
  return solutions.find(solution => solution.slug === slug);
};

export const getFeaturedSolutions = (): Solution[] => {
  return solutions.filter(solution => solution.isFeatured);
};

export const getPopularSolutions = (): Solution[] => {
  return solutions.filter(solution => solution.isPopular);
};

export const getSolutionsByCategory = (category: string): Solution[] => {
  return solutions.filter(solution => solution.category === category);
};

export const getSolutionsForBusinessSize = (size: string): Solution[] => {
  return solutions.filter(solution => solution.businessSize.includes(size));
};

export const getSolutionsForIndustry = (industry: string): Solution[] => {
  return solutions.filter(solution => solution.industries.includes(industry));
};

export default solutions;