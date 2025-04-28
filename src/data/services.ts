import { 
  Code2, 
  Brain, 
  Cloud, 
  Shield, 
  LineChart, 
  Smartphone,
  Database,
  Globe,
  Cpu,
  Network,
  Lock,
  Zap
} from 'lucide-react';

export const services = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to meet your unique business needs.',
    icon: Code2,
    features: [
      'Web Applications',
      'Mobile Apps',
      'Enterprise Software',
      'API Integration'
    ],
    details: 'Our expert developers create scalable, maintainable software solutions using the latest technologies and best practices.',
    benefits: [
      'Increased Efficiency',
      'Reduced Operational Costs',
      'Improved Customer Experience',
      'Competitive Advantage'
    ],
    technologies: [
      'React', 'Node.js', 'Python', 'TypeScript'
    ],
    caseStudies: [
      {
        title: 'Enterprise Resource Planning System',
        client: 'Manufacturing Company',
        challenge: 'Legacy system modernization',
        solution: 'Custom ERP with real-time analytics',
        results: '40% efficiency increase'
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to transform your business.',
    icon: Brain,
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Process Automation'
    ],
    details: 'We implement cutting-edge AI solutions to automate processes, gain insights, and drive innovation.',
    benefits: [
      'Data-Driven Decisions',
      'Automated Workflows',
      'Enhanced Customer Insights',
      'Predictive Capabilities'
    ],
    technologies: [
      'TensorFlow', 'PyTorch', 'OpenAI', 'scikit-learn'
    ],
    caseStudies: [
      {
        title: 'Customer Behavior Analysis',
        client: 'Retail Chain',
        challenge: 'Understanding customer patterns',
        solution: 'AI-powered analytics platform',
        results: '25% increase in sales'
      }
    ]
  },
  {
    id: 'cloud-services',
    title: 'Cloud Services',
    description: 'Secure, scalable cloud infrastructure and migration services.',
    icon: Cloud,
    features: [
      'Cloud Migration',
      'Infrastructure Design',
      'DevOps',
      'Serverless Solutions'
    ],
    details: 'Leverage the power of cloud computing with our expert cloud architecture and implementation services.',
    benefits: [
      'Scalability',
      'Cost Optimization',
      'Enhanced Security',
      'Global Reach'
    ],
    technologies: [
      'AWS', 'Azure', 'Google Cloud', 'Kubernetes'
    ],
    caseStudies: [
      {
        title: 'Cloud Migration Project',
        client: 'Financial Services Firm',
        challenge: 'Legacy infrastructure modernization',
        solution: 'Hybrid cloud architecture',
        results: '60% cost reduction'
      }
    ]
  }
];

export const industries = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Digital solutions for modern healthcare providers.',
    icon: Database,
    solutions: [
      'Electronic Health Records',
      'Telemedicine Platforms',
      'Medical Imaging Systems',
      'Healthcare Analytics'
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Innovative fintech solutions for financial institutions.',
    icon: LineChart,
    solutions: [
      'Trading Platforms',
      'Payment Systems',
      'Risk Management',
      'Blockchain Solutions'
    ]
  },
  {
    id: 'retail',
    title: 'Retail',
    description: 'Digital transformation solutions for retail businesses.',
    icon: Globe,
    solutions: [
      'E-commerce Platforms',
      'Inventory Management',
      'Customer Analytics',
      'POS Systems'
    ]
  }
];