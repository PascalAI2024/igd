import type { BlogPost } from '../../types';

export const posts: BlogPost[] = [
  // Existing posts...
  {
    id: 'devops-automation-2024',
    title: 'DevOps Automation Strategies for 2024',
    excerpt: 'Modern approaches to DevOps automation and continuous delivery.',
    content: `
      # DevOps Automation Strategies for 2024

      Effective DevOps automation is crucial for modern software delivery...

      ## Key Areas
      - CI/CD Pipeline Automation
      - Infrastructure as Code
      - Monitoring and Observability
      - Security Integration

      ## Implementation Guide
      [Detailed implementation steps...]
    `,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80',
    category: 'Software Development',
    author: {
      name: 'Pascal',
      role: 'DevOps Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-15',
    readTime: '13 min read',
    tags: ['DevOps', 'Automation', 'CI/CD']
  },
  {
    id: 'api-design-patterns',
    title: 'Modern API Design Patterns and Best Practices',
    excerpt: 'Essential patterns for building scalable and maintainable APIs.',
    content: `
      # Modern API Design Patterns and Best Practices

      Well-designed APIs are crucial for modern software architecture...

      ## Design Principles
      - RESTful Best Practices
      - GraphQL Implementation
      - Security Considerations
      - Documentation Standards

      ## Pattern Examples
      [Detailed pattern examples...]
    `,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    category: 'Software Development',
    author: {
      name: 'Pascal',
      role: 'Software Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
    },
    date: '2024-03-14',
    readTime: '11 min read',
    tags: ['API Design', 'REST', 'GraphQL']
  }
];