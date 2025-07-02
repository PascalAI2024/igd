import { CaseStudy } from './types';
import { Scale, Calendar, Clock, FileText, Users } from 'lucide-react';

export const lawFirmCaseStudy: CaseStudy = {
  id: 'law-firm-digital-strategy',
  title: 'Law Firm Digital Transformation',
  subtitle: 'Helping a Small Law Practice Modernize Their Client Management',
  description: 'Complete digital strategy for a local law firm that streamlined operations, enhanced client acquisition, and established authority in their practice areas.',
  industry: 'Legal Services',
  challenge: 'A boutique law firm specializing in family law and estate planning was struggling with inefficient client intake processes, poor visibility in local searches, and administrative bottlenecks that limited growth. Their attorneys were spending too much time on paperwork and not enough on billable client work.',
  solution: 'We developed a comprehensive digital strategy including a professional practice website with optimized practice area pages, secure client portal, document automation system, streamlined intake process, and authoritative content marketing in their specialty areas.',
  results: [
    '28% more qualified inquiries after 6 months',
    'Intake time reduced from 2 hours to 45 minutes',
    'Managing 25% more cases with same staff',
    'Billable hours increased by 15%',
    'First page Google rankings for 3 key terms'
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
    quote: "Implementation wasn't smooth - we had to overcome staff resistance to new systems and deal with data migration issues. But after 8 months, the benefits are clear. Our intake process is much smoother, and clients appreciate the secure portal. We're not paperless yet, but we've made significant progress. The real win is spending more time practicing law instead of shuffling papers.",
    author: "Jonathan Miller",
    role: "Managing Partner, Miller Family Law (3 attorneys, 2 staff)"
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
    'Marketing Spend': 'More efficient by 20%',
    'Document Prep': '2 hours to 45 minutes average',
    'Client Reviews': '3.9 to 4.3 stars (Google)',
    'Response Time': '24 hours to 8 hours average',
    'Referrals': '15% to 22% of new clients'
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