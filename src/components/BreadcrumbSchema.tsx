import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface BreadcrumbSchemaProps {
  // Optional custom breadcrumbs
  customBreadcrumbs?: {
    name: string;
    url: string;
    image?: string;
    description?: string;
  }[];
  // Optional current page title override
  currentPageTitle?: string;
  // Optional description for the current page
  currentPageDescription?: string;
  // Optional image for the current page
  currentPageImage?: string;
}

/**
 * Mapping of URL segments to more readable names
 * This helps with making breadcrumbs more user and SEO friendly
 */
const segmentNameMap: Record<string, string> = {
  'services': 'Services',
  'industries': 'Industries',
  'blog': 'Blog',
  'case-studies': 'Case Studies',
  'ai-machine-learning': 'AI & Machine Learning',
  'web-development': 'Web Development',
  'digital-marketing': 'Digital Marketing',
  'lead-generation': 'Lead Generation',
  'business-automation': 'Business Automation',
  'communication': 'Communication Solutions',
  'crm': 'CRM Solutions',
  'ad-management': 'Ad Management',
  'photography': 'Photography',
  'videography': 'Videography',
  'local-retail': 'Local Retail',
  'restaurants': 'Restaurants',
  'local-services': 'Local Services',
  'healthcare': 'Healthcare',
  'auto-services': 'Auto Services',
  'manufacturing': 'Manufacturing'
};

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ 
  customBreadcrumbs, 
  currentPageTitle,
  currentPageDescription,
  currentPageImage
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Generate breadcrumbs from URL if not provided
  const breadcrumbs = customBreadcrumbs || pathSegments.map((segment, index) => {
    // Use the mapped name if available, otherwise format the segment
    let name = segmentNameMap[segment];
    
    if (!name) {
      // Format the segment for display (capitalize, replace hyphens with spaces)
      name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Create the URL for this breadcrumb
    const url = `https://ingeniousdigital.com/${pathSegments.slice(0, index + 1).join('/')}`;
    
    return { 
      name, 
      url,
      image: undefined,
      description: undefined
    };
  });

  // If there are breadcrumbs and currentPageTitle is provided, override the last breadcrumb name
  if (breadcrumbs.length > 0 && currentPageTitle) {
    breadcrumbs[breadcrumbs.length - 1].name = currentPageTitle;
  }

  // Add home as the first breadcrumb if not already included and we have at least one path segment
  const fullBreadcrumbs = pathSegments.length > 0 
    ? [{ 
        name: 'Home', 
        url: 'https://ingeniousdigital.com',
        image: undefined,
        description: undefined
      }, ...breadcrumbs]
    : breadcrumbs; // Don't add Home if we're on the homepage (to avoid duplicate)

  // Create the schema.org JSON-LD data
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': fullBreadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': breadcrumb.name,
      'item': {
        '@type': 'WebPage',
        '@id': breadcrumb.url,
        'url': breadcrumb.url,
        ...(breadcrumb.image && { 'image': breadcrumb.image }),
        ...(breadcrumb.description && { 'description': breadcrumb.description })
      }
    }))
  };

  // Add WebPage schema for current page
  const currentUrl = `https://ingeniousdigital.com${location.pathname}`;
  const currentPageName = currentPageTitle || (breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : 'Home');

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': currentUrl,
    'url': currentUrl,
    'name': currentPageName,
    ...(currentPageDescription && { 'description': currentPageDescription }),
    ...(currentPageImage && { 'image': currentPageImage }),
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://ingeniousdigital.com',
      'name': 'Ingenious Digital',
      'url': 'https://ingeniousdigital.com'
    },
    'breadcrumb': {
      '@id': `${currentUrl}#breadcrumb`
    }
  };

  // Update the breadcrumbListSchema to include an @id
  (breadcrumbListSchema as any)['@id'] = `${currentUrl}#breadcrumb`;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbListSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
