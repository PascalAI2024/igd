export interface RouteItem {
  name: string;
  path: string;
  description?: string;
  icon?: string;
  keywords?: string[];
}

export interface RouteGroup {
  name: string;
  items: RouteItem[];
  description?: string;
}

// Main navigation routes
export const mainRoutes: RouteItem[] = [
  { 
    name: 'About', 
    path: '/about',
    description: 'Learn about Ingenious Digital and our mission',
    keywords: ['company', 'about', 'team', 'mission']
  },
  { 
    name: 'Case Studies', 
    path: '/case-studies',
    description: 'Success stories and client outcomes',
    keywords: ['portfolio', 'projects', 'success', 'clients']
  },
  { 
    name: 'Locations', 
    path: '/locations',
    description: 'Service areas and local presence',
    keywords: ['locations', 'areas', 'local', 'service']
  },
  { 
    name: 'Blog', 
    path: '/blog',
    description: 'Latest insights and industry trends',
    keywords: ['articles', 'insights', 'news', 'trends']
  },
  { 
    name: 'Contact', 
    path: '/contact',
    description: 'Get in touch with our team',
    keywords: ['contact', 'get in touch', 'support', 'help']
  }
];

// Industry routes
export const industryRoutes: RouteGroup = {
  name: 'Small Business',
  description: 'Tailored solutions for local businesses',
  items: [
    { 
      name: 'Local Retail', 
      path: '/industries/local-retail',
      description: 'Digital solutions for retail businesses',
      keywords: ['retail', 'store', 'shop', 'local business']
    },
    { 
      name: 'Retail Businesses', 
      path: '/industries/retail',
      description: 'Comprehensive retail technology solutions',
      keywords: ['retail', 'ecommerce', 'inventory', 'sales']
    },
    { 
      name: 'Small Restaurants', 
      path: '/industries/restaurants',
      description: 'Technology for food service businesses',
      keywords: ['restaurant', 'food', 'dining', 'hospitality']
    },
    { 
      name: 'Local Services', 
      path: '/industries/local-services',
      description: 'Solutions for service-based businesses',
      keywords: ['services', 'local', 'professional', 'B2B']
    },
    { 
      name: 'Small Healthcare', 
      path: '/industries/healthcare',
      description: 'Healthcare technology solutions',
      keywords: ['healthcare', 'medical', 'clinic', 'practice']
    },
    { 
      name: 'Auto Services', 
      path: '/industries/auto-services',
      description: 'Automotive service technology',
      keywords: ['automotive', 'repair', 'service', 'auto']
    },
    { 
      name: 'Small Manufacturing', 
      path: '/industries/manufacturing',
      description: 'Manufacturing efficiency solutions',
      keywords: ['manufacturing', 'production', 'automation', 'industry']
    }
  ]
};

// Service routes
export const serviceRoutes: RouteGroup = {
  name: 'Services',
  description: 'Comprehensive digital solutions',
  items: [
    { 
      name: 'AI & Machine Learning', 
      path: '/services/ai-machine-learning',
      description: 'Intelligent automation and AI solutions',
      keywords: ['AI', 'machine learning', 'automation', 'intelligence']
    },
    { 
      name: 'Digital Marketing', 
      path: '/services/digital-marketing',
      description: 'Complete digital marketing strategies',
      keywords: ['marketing', 'SEO', 'advertising', 'digital']
    },
    { 
      name: 'Lead Generation', 
      path: '/services/lead-generation',
      description: 'Customer acquisition and lead systems',
      keywords: ['leads', 'customers', 'acquisition', 'growth']
    },
    { 
      name: 'CRM Solutions', 
      path: '/services/crm',
      description: 'Customer relationship management',
      keywords: ['CRM', 'customer', 'management', 'sales']
    },
    { 
      name: 'Web Development', 
      path: '/services/web-development',
      description: 'Custom web applications and websites',
      keywords: ['web', 'development', 'website', 'application']
    },
    { 
      name: 'Communication', 
      path: '/services/communication',
      description: 'Business communication solutions',
      keywords: ['communication', 'messaging', 'collaboration', 'team']
    },
    { 
      name: 'Photography', 
      path: '/services/photography',
      description: 'Professional photography services',
      keywords: ['photography', 'photos', 'visual', 'media']
    },
    { 
      name: 'Videography', 
      path: '/services/videography',
      description: 'Video production and marketing',
      keywords: ['video', 'production', 'marketing', 'content']
    },
    { 
      name: 'Ad Management', 
      path: '/services/ad-management',
      description: 'Advertising campaign management',
      keywords: ['ads', 'advertising', 'campaigns', 'management']
    },
    { 
      name: 'Business Automation', 
      path: '/services/business-automation',
      description: 'Process automation and efficiency',
      keywords: ['automation', 'process', 'efficiency', 'workflow']
    }
  ]
};

// Legal and utility routes
export const legalRoutes: RouteItem[] = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Cookie Policy', path: '/cookie' },
  { name: 'GDPR', path: '/gdpr' }
];

// All routes combined for search and navigation
export const allRoutes: RouteItem[] = [
  ...mainRoutes,
  ...industryRoutes.items,
  ...serviceRoutes.items,
  ...legalRoutes
];

// Route utilities
export const getRouteByPath = (path: string): RouteItem | undefined => {
  return allRoutes.find(route => route.path === path);
};

export const getParentRoute = (path: string): RouteGroup | undefined => {
  if (path.startsWith('/industries/')) {
    return industryRoutes;
  }
  if (path.startsWith('/services/')) {
    return serviceRoutes;
  }
  return undefined;
};

export const getBreadcrumbs = (path: string): Array<{ name: string; path: string }> => {
  const breadcrumbs = [{ name: 'Home', path: '/' }];
  
  const parentRoute = getParentRoute(path);
  if (parentRoute) {
    // Add parent category
    breadcrumbs.push({ 
      name: parentRoute.name, 
      path: path.startsWith('/industries/') ? '/industries' : '/services' 
    });
  }
  
  const currentRoute = getRouteByPath(path);
  if (currentRoute && path !== '/') {
    breadcrumbs.push({ name: currentRoute.name, path: currentRoute.path });
  }
  
  return breadcrumbs;
};

export const searchRoutes = (query: string): RouteItem[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];
  
  return allRoutes.filter(route => 
    route.name.toLowerCase().includes(normalizedQuery) ||
    route.description?.toLowerCase().includes(normalizedQuery) ||
    route.keywords?.some(keyword => keyword.toLowerCase().includes(normalizedQuery))
  );
};