import { CaseStudy } from './types';
import { Scale, Calendar, Clock, FileText, Users } from 'lucide-react';

export const lawFirmCaseStudy: CaseStudy = {
  id: 'law-firm-digital-strategy',
  title: 'Law Firm Digital Transformation',
  subtitle: 'How a Boutique Law Practice Doubled Caseload While Reducing Administrative Time',
  description: 'Complete digital strategy for a local law firm that streamlined operations, enhanced client acquisition, and established authority in their practice areas.',
  industry: 'Legal Services',
  challenge: 'A boutique law firm specializing in family law and estate planning was struggling with inefficient client intake processes, poor visibility in local searches, and administrative bottlenecks that limited growth. Their attorneys were spending too much time on paperwork and not enough on billable client work.',
  solution: 'We developed a comprehensive digital strategy including a professional practice website with optimized practice area pages, secure client portal, document automation system, streamlined intake process, and authoritative content marketing in their specialty areas.',
  results: [
    '112% increase in qualified client inquiries',
    '95% reduction in client intake processing time',
    'Doubled active caseload with the same staff',
    'Increased attorney billable hours by 35%',
    'Established the firm as a local authority in their practice areas'
  ],
  imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop",
  technologies: [
    'Practice Management Software',
    'Document Automation',
    'Secure Client Portal',
    'CRM for Legal Services',
    'SEO for Legal Industry',
    'Content Marketing System',
    'Email Automation'
  ],
  testimonial: {
    quote: "The digital transformation has revolutionized our practice. Not only are we attracting more clients, but our entire operation is more efficient. The automated document system alone has saved us countless hours, and the secure client portal has significantly improved client communication and satisfaction. We're able to take on more cases while actually providing better service.",
    author: "Jonathan Miller",
    role: "Managing Partner, Miller Family Law"
  },
  client: 'Miller Family Law',
  features: [
    'Practice area-focused website with client education resources',
    'Secure client portal for document sharing and case updates',
    'Automated document generation for common legal forms',
    'Streamlined online client intake system',
    'Educational content hub establishing thought leadership',
    'Local SEO targeting specific practice areas and locations'
  ],
  metrics: {
    'Client Acquisition Cost': 'Reduced by 43%',
    'Document Preparation Time': 'Reduced from hours to minutes',
    'Client Satisfaction': '4.9/5 average rating (+1.1 increase)',
    'Client Response Time': 'Reduced from 24 hours to under 2 hours',
    'Referral Rate': 'Increased by 85%'
  },
  icon: Scale,
  services: [
    'Web Development',
    'Content Strategy',
    'Business Automation',
    'CRM Implementation',
    'Local SEO',
    'Client Portal Development'
  ],
  nextSteps: [
    'Implement case management workflow automation',
    'Develop practice-specific marketing campaigns',
    'Launch educational webinar series',
    'Create virtual consultation system'
  ]
};