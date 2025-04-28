import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  {
    id: 'cybersecurity-best-practices-2024',
    title: 'Cybersecurity Best Practices for South Florida Businesses',
    excerpt: 'Essential security measures and strategies to protect your business in the digital age.',
    content: `
      # Cybersecurity Best Practices for South Florida Businesses

      As cyber threats evolve, businesses in South Florida need robust security strategies...

      ## Essential Security Measures
      - Regular security audits
      - Employee training
      - Data encryption
      - Incident response planning

      ## Local Compliance Requirements
      - Florida Information Protection Act
      - Industry-specific regulations
      - Data breach notification laws

      ## Implementation Guide
      [Content continues...]
    `,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80',
    category: 'Security',
    author: {
      name: 'Pascal',
      role: 'Security Solutions Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-08',
    readTime: '6 min read',
    tags: ['Cybersecurity', 'Business', 'Florida'],
    relatedPosts: ['zero-trust-architecture', 'cloud-security']
  },
  {
    id: 'zero-trust-architecture',
    title: 'Implementing Zero Trust Architecture',
    excerpt: 'A comprehensive guide to implementing zero trust security in modern organizations.',
    content: `
      # Implementing Zero Trust Architecture

      Zero trust architecture is becoming essential in today's security landscape...

      ## Core Principles
      - Never trust, always verify
      - Least privilege access
      - Micro-segmentation
      - Continuous monitoring

      ## Implementation Steps
      1. Asset inventory
      2. Network segmentation
      3. Access control implementation
      4. Monitoring setup

      ## Best Practices
      [Content continues...]
    `,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    category: 'Security',
    author: {
      name: 'Pascal',
      role: 'Security Solutions Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-05',
    readTime: '10 min read',
    tags: ['Zero Trust', 'Security Architecture', 'Cybersecurity'],
    relatedPosts: ['cybersecurity-best-practices-2024', 'cloud-security']
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Essentials for 2024',
    excerpt: 'Key considerations and best practices for securing cloud infrastructure.',
    content: `
      # Cloud Security Essentials for 2024

      Securing cloud infrastructure requires a comprehensive approach...

      ## Key Areas
      - Identity management
      - Data protection
      - Network security
      - Compliance

      ## Security Controls
      1. Access management
      2. Encryption
      3. Monitoring
      4. Incident response

      ## Implementation Guide
      [Content continues...]
    `,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    category: 'Security',
    author: {
      name: 'Pascal',
      role: 'Security Solutions Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-03',
    readTime: '8 min read',
    tags: ['Cloud Security', 'Infrastructure', 'Best Practices'],
    relatedPosts: ['zero-trust-architecture', 'cybersecurity-best-practices-2024']
  }
];