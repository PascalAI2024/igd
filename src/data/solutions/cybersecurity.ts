import { Shield, Lock, Eye, AlertTriangle, FileCheck } from 'lucide-react';
import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    id: 'security-assessment',
    title: 'Security Assessment',
    description: 'Comprehensive evaluation of your security posture.',
    icon: Eye,
    features: [
      'Vulnerability Assessment',
      'Penetration Testing',
      'Risk Analysis',
      'Compliance Audit'
    ],
    benefits: [
      {
        title: 'Risk Mitigation',
        description: 'Identify and address security risks'
      },
      {
        title: 'Compliance',
        description: 'Meet regulatory requirements'
      }
    ],
    technologies: [
      'Nessus',
      'Metasploit',
      'Wireshark',
      'Burp Suite'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Discovery',
        description: 'Identify assets and scope'
      },
      {
        step: '02',
        title: 'Analysis',
        description: 'Evaluate security posture'
      }
    ],
    metrics: {
      coverage: '100%',
      findings: '30+',
      remediation: '90%'
    },
    path: '/services/cybersecurity/assessment'
  }
  // Add more security solutions...
];