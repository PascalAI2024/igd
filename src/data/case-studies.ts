import { BarChart2, Shield, Cloud, Brain, Code2, LineChart } from 'lucide-react';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  icon: any;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'financial-analytics',
    title: 'Enterprise Analytics Platform',
    client: 'Global Financial Institution',
    industry: 'Finance',
    challenge: 'Legacy system modernization and real-time data processing',
    solution: 'Custom analytics platform with real-time processing capabilities',
    results: [
      '200% increase in processing speed',
      '50% reduction in operational costs',
      'Real-time insights for decision making'
    ],
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    icon: BarChart2
  },
  {
    id: 'healthcare-platform',
    title: 'Healthcare Management System',
    client: 'Regional Medical Center',
    industry: 'Healthcare',
    challenge: 'Inefficient patient data management and scheduling',
    solution: 'Integrated healthcare management platform',
    results: [
      '40% reduction in wait times',
      'Improved patient satisfaction',
      'Enhanced data security'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    icon: Shield
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Infrastructure Migration',
    client: 'E-commerce Company',
    industry: 'Retail',
    challenge: 'Scalability issues during peak seasons',
    solution: 'Cloud migration and infrastructure optimization',
    results: [
      '99.99% uptime achieved',
      '60% cost reduction',
      'Improved scalability'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    icon: Cloud
  },
  {
    id: 'ai-automation',
    title: 'AI-Powered Process Automation',
    client: 'Manufacturing Company',
    industry: 'Manufacturing',
    challenge: 'Manual quality control and inefficient processes',
    solution: 'AI-based automation and quality control system',
    results: [
      '80% reduction in defects',
      '50% increase in productivity',
      'Enhanced quality consistency'
    ],
    image: 'https://images.unsplash.com/photo-1565465295423-68c959ca3c30?auto=format&fit=crop&q=80',
    icon: Brain
  },
  {
    id: 'custom-erp',
    title: 'Custom ERP Implementation',
    client: 'Logistics Corporation',
    industry: 'Transportation',
    challenge: 'Fragmented systems and data silos',
    solution: 'Unified ERP platform with real-time tracking',
    results: [
      '35% operational efficiency increase',
      'Real-time fleet management',
      'Improved resource allocation'
    ],
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80',
    icon: Code2
  },
  {
    id: 'fintech-platform',
    title: 'Digital Banking Platform',
    client: 'Regional Bank',
    industry: 'Finance',
    challenge: 'Digital transformation of traditional banking services',
    solution: 'Modern digital banking platform with advanced features',
    results: [
      '150% increase in digital transactions',
      '45% reduction in operational costs',
      'Enhanced customer satisfaction'
    ],
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80',
    icon: LineChart
  }
];