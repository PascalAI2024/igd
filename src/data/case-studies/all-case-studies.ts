import { CaseStudy } from './types';
import { landscapingCaseStudy } from './small-business-landscaping';
import { bakeryCaseStudy } from './small-business-bakery';
import { lawFirmCaseStudy } from './small-business-law-firm';
import { hvacCaseStudy } from './small-business-hvac';
import { boutiqueCaseStudy } from './small-business-boutique';

// Enhanced case studies with professional images and detailed descriptions
export const allCaseStudies: CaseStudy[] = [
  // Small business focused case studies
  landscapingCaseStudy,
  bakeryCaseStudy,
  lawFirmCaseStudy,
  hvacCaseStudy,
  boutiqueCaseStudy,
  // New case studies - AI/ML focused
  {
    id: 'ai-analytics',
    title: 'AI-Powered Analytics Platform',
    client: 'Global Data Insights',
    industry: 'Data Analytics',
    challenge: 'The client needed to process and analyze massive datasets from multiple sources to provide actionable insights for their enterprise customers, with existing solutions taking too long to generate meaningful results.',
    solution: 'We built a custom AI-powered analytics platform using machine learning algorithms to process data in real-time, identify patterns, and generate predictive insights with interactive visualization dashboards.',
    results: [
      '95% reduction in data processing time',
      '78% improvement in prediction accuracy',
      'Real-time processing of 500TB+ of data',
      'Custom visualization tools for complex data sets',
      'Automated anomaly detection saving 120+ hours per month'
    ],
    testimonial: {
      quote: "The AI analytics platform has revolutionized how we deliver insights to our clients. What used to take weeks of analysis can now be visualized in seconds, with predictive capabilities that have transformed our value proposition in the market.",
      author: "Michael Chen",
      role: "Director of Analytics, Global Data Insights"
    },
    technologies: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'React',
      'Node.js',
      'D3.js',
      'Apache Spark',
      'AWS SageMaker',
      'Kafka',
      'Elasticsearch',
      'Docker',
      'Kubernetes'
    ],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    description: "How we developed an AI-powered analytics platform that processes massive datasets in real-time, providing actionable insights and predictive capabilities.",
    subtitle: 'Advanced AI Analytics for Enterprise Data'
  },
  {
    id: 'cybersecurity-platform',
    title: 'Enterprise Cybersecurity Platform',
    client: 'SecureNet Solutions',
    industry: 'Cybersecurity',
    challenge: 'The client needed a comprehensive cybersecurity solution to protect their enterprise clients from increasingly sophisticated threats, with real-time monitoring and automated response capabilities.',
    solution: 'We developed an advanced cybersecurity platform with AI-powered threat detection, real-time monitoring, and automated incident response that integrated with existing security infrastructure.',
    results: [
      '99.8% accuracy in threat detection',
      '85% reduction in false positives',
      'Average threat response time reduced from hours to seconds',
      'Comprehensive protection across cloud and on-premise systems',
      'Compliance with ISO 27001, GDPR, and HIPAA standards'
    ],
    testimonial: {
      quote: "This cybersecurity platform has transformed how we protect our clients. The AI-powered threat detection catches sophisticated attacks that would have previously gone unnoticed, and the automated response capabilities have dramatically reduced our incident resolution times.",
      author: "Alexandra Rivera",
      role: "CISO, SecureNet Solutions"
    },
    technologies: [
      'Python',
      'TensorFlow',
      'React',
      'Node.js',
      'Elasticsearch',
      'Kafka',
      'Docker',
      'Kubernetes',
      'AWS',
      'OpenAI API',
      'Blockchain'
    ],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    description: "How we built an advanced cybersecurity platform with AI-powered threat detection and automated incident response for enterprise clients.",
    subtitle: 'Enterprise-Grade Cybersecurity Platform'
  },
  {
    id: 'saas-platform',
    title: 'Enterprise SaaS Platform',
    client: 'Tech Innovators Inc.',
    industry: 'Technology',
    challenge: 'The client needed a scalable SaaS platform to manage complex business operations across multiple departments with real-time data synchronization and advanced analytics capabilities.',
    solution: 'We developed a comprehensive SaaS solution with microservices architecture, real-time data processing, and AI-powered analytics dashboard that integrated with their existing systems.',
    results: [
      '320% increase in operational efficiency',
      '45% reduction in manual data entry',
      'Seamless integration with 12+ third-party services',
      'Scalable architecture supporting 10,000+ concurrent users',
      'Advanced analytics providing actionable business insights'
    ],
    testimonial: {
      quote: "The SaaS platform transformed our business operations completely. What used to take days now happens in minutes, and the insights we're getting from the analytics have opened new revenue opportunities we hadn't even considered.",
      author: "Sarah Johnson",
      role: "CTO, Tech Innovators Inc."
    },
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'GraphQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'TensorFlow',
      'Elasticsearch'
    ],
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop",
    description: "How we built a scalable SaaS platform that transformed business operations for a leading tech company, resulting in 320% increase in operational efficiency.",
    subtitle: 'Enterprise-Grade SaaS Platform Development'
  },
  {
    id: 'iot-smart-city',
    title: 'IoT Smart City Infrastructure',
    client: 'Metropolitan Development Authority',
    industry: 'Government',
    challenge: 'The client needed a comprehensive IoT infrastructure to transform their urban area into a smart city, with real-time monitoring of utilities, traffic, public safety, and environmental conditions.',
    solution: 'We developed an integrated IoT platform connecting thousands of sensors across the city, with real-time data processing, predictive analytics, and a central command dashboard for city administrators.',
    results: [
      '35% reduction in traffic congestion',
      '28% decrease in energy consumption',
      '40% improvement in emergency response times',
      'Real-time monitoring of air quality and noise pollution',
      'Predictive maintenance saving $2.5M annually in infrastructure costs'
    ],
    testimonial: {
      quote: "The smart city platform has transformed how we manage urban infrastructure. From traffic flow to energy usage, we now have real-time insights that allow us to make data-driven decisions that improve quality of life for our citizens while reducing operational costs.",
      author: "James Wilson",
      role: "Chief Innovation Officer, Metropolitan Development Authority"
    },
    technologies: [
      'Python',
      'React',
      'Node.js',
      'MQTT',
      'LoRaWAN',
      'AWS IoT',
      'TensorFlow',
      'Time Series DB',
      'Kafka',
      'Docker',
      'Kubernetes',
      'Computer Vision'
    ],
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    description: "How we developed an integrated IoT platform connecting thousands of sensors across a city for real-time monitoring and management of urban infrastructure.",
    subtitle: 'IoT Smart City Infrastructure Development'
  },
  {
    id: 'elearning-platform',
    title: 'Interactive E-Learning Platform',
    client: 'EduTech Innovations',
    industry: 'Education',
    challenge: 'The client needed a scalable, interactive e-learning platform to deliver personalized educational content to students globally, with advanced analytics to track learning progress and outcomes.',
    solution: 'We built a comprehensive e-learning platform with adaptive learning algorithms, interactive content delivery, real-time collaboration tools, and detailed analytics dashboards for educators and administrators.',
    results: [
      '250% increase in student engagement',
      '40% improvement in learning outcomes',
      'Personalized learning paths for 50,000+ students',
      'Real-time collaboration across 30+ countries',
      'Detailed analytics providing actionable insights for educators'
    ],
    testimonial: {
      quote: "The e-learning platform has completely transformed how we deliver education. The personalized learning paths and interactive content have dramatically improved student engagement and outcomes, while the analytics give our educators unprecedented insights into the learning process.",
      author: "Dr. Emily Rodriguez",
      role: "Chief Learning Officer, EduTech Innovations"
    },
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'GraphQL',
      'MongoDB',
      'WebRTC',
      'Socket.io',
      'AWS',
      'TensorFlow',
      'Canvas API',
      'Firebase'
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    description: "How we created a comprehensive e-learning platform with adaptive learning algorithms and interactive content delivery for global education.",
    subtitle: 'Interactive E-Learning Platform Development'
  },
  {
    id: 'auto-service-digital',
    title: 'Local Auto Service Success',
    subtitle: 'Comprehensive Digital Solutions for Auto Repair',
    description: 'Complete digital transformation for a leading auto repair shop, boosting online visibility and streamlining operations with custom digital tools.',
    industry: 'Auto Services',
    challenge: 'A local auto repair shop was struggling to compete with larger chains and needed to modernize their customer booking and management systems.',
    solution: 'We implemented a comprehensive digital solution including online booking, customer management, and local SEO optimization.',
    results: [
      'Online booking system implementation',
      '45% increase in service appointments',
      'Automated customer follow-ups',
      'Improved customer satisfaction'
    ],
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Node.js',
      'High Level CRM',
      'Google Business Profile',
      'Local SEO Tools'
    ],
    testimonial: {
      quote: "The digital transformation has completely changed how we do business. We're booking more appointments than ever and our customers love the convenience.",
      author: "Mike Johnson",
      role: "Owner"
    },
    client: 'Johnson Auto Repair'
  },
  {
    id: 'retail-growth',
    title: 'Retail Growth Strategy',
    subtitle: 'Multi-Channel Growth Strategy for Local Retailer',
    description: 'Helping a local boutique retailer increase sales by 215% with an integrated e-commerce solution and targeted digital marketing campaigns.',
    industry: 'Retail',
    challenge: 'A local boutique retailer was struggling to compete with online stores and needed to establish a strong digital presence.',
    solution: 'We developed an integrated e-commerce platform and implemented targeted digital marketing campaigns to reach new customers.',
    results: [
      '215% increase in overall sales',
      '320% increase in online revenue',
      'Expanded customer base beyond local area',
      'Streamlined inventory management'
    ],
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Node.js',
      'High Level CRM',
      'Google Business Profile',
      'Local SEO Tools',
      'Inventory Management System'
    ],
    testimonial: {
      quote: "Our business has completely transformed since implementing the multi-channel strategy. We're now reaching customers we never could before.",
      author: "Emily Chen",
      role: "Owner"
    },
    client: 'Urban Boutique'
  },
  {
    id: 'ecommerce-specialty',
    title: 'Specialty E-Commerce Platform',
    subtitle: 'Scaling Online Sales for Specialty Retailer',
    description: 'How we helped a specialty retailer increase online sales by 215% through platform optimization and digital marketing.',
    industry: 'E-Commerce',
    challenge: 'A specialty retailer needed to scale their online operations to meet growing demand and improve customer experience.',
    solution: 'We optimized their e-commerce platform for performance and conversion, while implementing targeted digital marketing campaigns.',
    results: [
      '215% increase in online sales',
      '45% improvement in conversion rate',
      '65% reduction in cart abandonment',
      'Expanded product catalog by 300%'
    ],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Shopify API',
      'Stripe',
      'Algolia Search',
      'Google Analytics 4',
      'AWS'
    ],
    testimonial: {
      quote: "The platform optimization and marketing strategy completely transformed our online business. We're now able to handle much higher volumes with better customer satisfaction.",
      author: "David Thompson",
      role: "E-Commerce Director"
    },
    client: 'Artisan Goods Co.'
  },
  {
    id: 'realestate-digital',
    title: 'Real Estate Digital Transformation',
    subtitle: 'Modernizing Property Management and Sales',
    description: 'How we helped a local real estate agency increase listings by 120% and improve client satisfaction through digital innovation.',
    industry: 'Real Estate',
    challenge: 'A local real estate agency was struggling with outdated systems and needed to modernize their property management and sales processes.',
    solution: 'We developed a comprehensive digital platform for property management, virtual tours, and client relationship management.',
    results: [
      '120% increase in property listings',
      '85% improvement in client satisfaction',
      'Virtual tour capabilities reducing in-person showings by 40%',
      'Streamlined property management processes'
    ],
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'AWS',
      'Matterport Integration',
      'HubSpot CRM',
      'MLS Integration',
      'Google Maps API'
    ],
    testimonial: {
      quote: "The digital transformation has revolutionized how we operate. Our agents are more productive, and our clients love the modern experience we now provide.",
      author: "Jennifer Martinez",
      role: "Managing Broker"
    },
    client: 'Premier Properties'
  },
  {
    id: 'fintech-payments',
    title: 'Small Business Payment Platform',
    subtitle: 'Revolutionizing Small Business Payments',
    description: 'How we built a secure, scalable payment platform that helped small businesses process over $50M in transactions.',
    industry: 'FinTech',
    challenge: 'Small businesses needed an affordable, secure payment processing solution that integrated with their existing systems.',
    solution: 'We developed a custom payment platform with robust security features, flexible integration options, and competitive pricing.',
    results: [
      'Over $50M in processed transactions',
      '40% cost savings compared to traditional processors',
      'Seamless integration with popular accounting software',
      'Enhanced fraud protection reducing chargebacks by 65%'
    ],
    imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Stripe API',
      'Plaid API'
    ],
    testimonial: {
      quote: "This payment platform has been a game-changer for our business. The integration was seamless, and we've saved thousands in processing fees while gaining better insights into our cash flow.",
      author: "Robert Williams",
      role: "CFO"
    },
    client: 'SmallBiz Financial'
  },
  {
    id: 'education-platform',
    title: 'Educational Institution Platform',
    subtitle: 'Transforming Education Through Technology',
    description: 'How we helped a local educational institution increase student engagement by 85% with a comprehensive digital learning platform.',
    industry: 'Education',
    challenge: 'A local educational institution needed to modernize their learning environment to better engage students and provide more flexible learning options.',
    solution: 'We developed a comprehensive digital learning platform with interactive content, real-time collaboration tools, and detailed analytics.',
    results: [
      '85% increase in student engagement',
      '40% improvement in course completion rates',
      'Expanded reach to remote students',
      'Enhanced teacher insights through detailed analytics'
    ],
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'AWS',
      'WebRTC',
      'Socket.io',
      'Canvas API',
      'Firebase'
    ],
    testimonial: {
      quote: "The digital learning platform has transformed how we teach and how our students learn. We're seeing unprecedented levels of engagement and better outcomes across all metrics.",
      author: "Dr. Thomas Anderson",
      role: "Academic Director"
    },
    client: 'Metropolitan Learning Center'
  }
];

export default allCaseStudies;
