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
      '48% reduction in data processing time',
      '32% improvement in prediction accuracy',
      'Near real-time processing of 20TB+ of data',
      'Custom visualization tools for complex data sets',
      'Automated anomaly detection saving 40+ hours per month'
    ],
    testimonial: {
      quote: "Building the platform required significant effort and iteration. Early models had accuracy issues that took months to resolve. However, after refinement, we've achieved meaningful improvements in processing speed and prediction quality. The journey was challenging but worthwhile.",
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
      '87% accuracy in threat detection after ML model training',
      '48% reduction in false positives over 6 months',
      'Average threat response time reduced from hours to minutes',
      'Comprehensive protection across cloud and on-premise systems',
      'Compliance with ISO 27001, GDPR, and HIPAA standards'
    ],
    testimonial: {
      quote: "Implementing the platform required careful tuning to reduce false positives, which initially overwhelmed our team. After 6 months of refinement and model training, we've achieved a good balance between detection accuracy and operational efficiency. It's an ongoing process of improvement.",
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
      '42% increase in operational efficiency over 12 months',
      '28% reduction in manual data entry',
      'Integration with 8 third-party services after customization',
      'Scalable architecture supporting 2,000+ concurrent users',
      'Analytics dashboard adopted by 65% of power users'
    ],
    testimonial: {
      quote: "The platform rollout faced initial adoption challenges and required significant customization. After 6 months of iterative improvements and user training, we've seen substantial efficiency gains. The analytics insights are valuable, though we're still learning how to fully leverage them.",
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
    description: "How we built a scalable SaaS platform that transformed business operations for a leading tech company, resulting in 42% increase in operational efficiency.",
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
      '15% reduction in traffic congestion during peak hours',
      '12% decrease in energy consumption after optimization',
      '18% improvement in emergency response times',
      'Near real-time monitoring with 15-minute data updates',
      'Predictive maintenance saving $450K annually after first year'
    ],
    testimonial: {
      quote: "Rolling out IoT infrastructure city-wide presented significant challenges - from connectivity issues to data integration complexity. It took 18 months to achieve stable operations, but we're now seeing measurable improvements in city services and resource management.",
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
      '38% increase in student engagement metrics',
      '22% improvement in learning outcomes after full adoption',
      'Personalized learning paths for 3,200 active students',
      'Collaboration features used by students in 8 countries',
      'Analytics dashboard actively used by 55% of educators'
    ],
    testimonial: {
      quote: "Transitioning to digital learning wasn't smooth - we faced technical issues and resistance from some educators. However, after proper training and platform refinements over 8 months, we're seeing positive results in engagement and learning outcomes. It's an ongoing journey of improvement.",
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
      '28% increase in service appointments after 6 months',
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
      quote: "The new booking system took time for both staff and customers to adapt to. We had some early technical issues, but after 3 months of refinements, we're seeing steady growth in appointments and positive customer feedback.",
      author: "Mike Johnson",
      role: "Owner"
    },
    client: 'Johnson Auto Repair'
  },
  {
    id: 'retail-growth',
    title: 'Retail Growth Strategy',
    subtitle: 'Multi-Channel Growth Strategy for Local Retailer',
    description: 'Helping a local boutique retailer increase sales by 35% with an integrated e-commerce solution and targeted digital marketing campaigns.',
    industry: 'Retail',
    challenge: 'A local boutique retailer was struggling to compete with online stores and needed to establish a strong digital presence.',
    solution: 'We developed an integrated e-commerce platform and implemented targeted digital marketing campaigns to reach new customers.',
    results: [
      '35% increase in overall sales over 8 months',
      '52% increase in online revenue after launch',
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
      quote: "The e-commerce launch was challenging - inventory sync issues and staff training took longer than expected. But after 6 months, we've established a solid online presence that complements our physical store well.",
      author: "Emily Chen",
      role: "Owner"
    },
    client: 'Urban Boutique'
  },
  {
    id: 'ecommerce-specialty',
    title: 'Specialty E-Commerce Platform',
    subtitle: 'Scaling Online Sales for Specialty Retailer',
    description: 'How we helped a specialty retailer increase online sales by 42% through platform optimization and digital marketing.',
    industry: 'E-Commerce',
    challenge: 'A specialty retailer needed to scale their online operations to meet growing demand and improve customer experience.',
    solution: 'We optimized their e-commerce platform for performance and conversion, while implementing targeted digital marketing campaigns.',
    results: [
      '42% increase in online sales over first year',
      '18% improvement in conversion rate after optimization',
      '22% reduction in cart abandonment',
      'Expanded product catalog by 65%'
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
      quote: "Platform migration had its hurdles - data transfer issues and SEO rankings took a hit initially. After 4 months of optimization and marketing efforts, we recovered and started seeing consistent growth in sales and customer satisfaction.",
      author: "David Thompson",
      role: "E-Commerce Director"
    },
    client: 'Artisan Goods Co.'
  },
  {
    id: 'realestate-digital',
    title: 'Real Estate Digital Transformation',
    subtitle: 'Modernizing Property Management and Sales',
    description: 'How we helped a local real estate agency increase listings by 35% and improve client satisfaction through digital innovation.',
    industry: 'Real Estate',
    challenge: 'A local real estate agency was struggling with outdated systems and needed to modernize their property management and sales processes.',
    solution: 'We developed a comprehensive digital platform for property management, virtual tours, and client relationship management.',
    results: [
      '35% increase in property listings over 8 months',
      '28% improvement in client satisfaction scores',
      'Virtual tours reducing unnecessary showings by 18%',
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
      quote: "Adopting new technology was met with resistance from some veteran agents. Training took longer than anticipated, but after 6 months, most have embraced the tools and we're seeing productivity gains across the board.",
      author: "Jennifer Martinez",
      role: "Managing Broker"
    },
    client: 'Premier Properties'
  },
  {
    id: 'fintech-payments',
    title: 'Small Business Payment Platform',
    subtitle: 'Revolutionizing Small Business Payments',
    description: 'How we built a secure, scalable payment platform that helped small businesses process $2.5M in transactions in the first year.',
    industry: 'FinTech',
    challenge: 'Small businesses needed an affordable, secure payment processing solution that integrated with their existing systems.',
    solution: 'We developed a custom payment platform with robust security features, flexible integration options, and competitive pricing.',
    results: [
      '$2.5M in processed transactions in first year',
      '12-18% cost savings for most clients',
      'Integration with 5 major accounting platforms',
      'Fraud protection reducing chargebacks by 25%'
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
      quote: "Integration wasn't as seamless as hoped - API limitations required workarounds. However, after 3 months of adjustments, the platform is working well and we're seeing meaningful savings on processing fees.",
      author: "Robert Williams",
      role: "CFO"
    },
    client: 'SmallBiz Financial'
  },
  {
    id: 'education-platform',
    title: 'Educational Institution Platform',
    subtitle: 'Transforming Education Through Technology',
    description: 'How we helped a local educational institution increase student engagement by 32% with a comprehensive digital learning platform.',
    industry: 'Education',
    challenge: 'A local educational institution needed to modernize their learning environment to better engage students and provide more flexible learning options.',
    solution: 'We developed a comprehensive digital learning platform with interactive content, real-time collaboration tools, and detailed analytics.',
    results: [
      '32% increase in student engagement metrics',
      '18% improvement in course completion rates',
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
      quote: "Rolling out the platform required significant faculty training and student onboarding. Initial adoption was slow, but after a full semester, we're seeing improved engagement and completion rates. Continuous support remains crucial.",
      author: "Dr. Thomas Anderson",
      role: "Academic Director"
    },
    client: 'Metropolitan Learning Center'
  }
];

export default allCaseStudies;
