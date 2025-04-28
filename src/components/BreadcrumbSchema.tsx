import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface BreadcrumbSchemaProps {
  // Optional custom breadcrumbs
  customBreadcrumbs?: {
    name: string;
    url: string;
  }[];
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ customBreadcrumbs }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Generate breadcrumbs from URL if not provided
  const breadcrumbs = customBreadcrumbs || pathSegments.map((segment, index) => {
    // Format the segment for display (capitalize, replace hyphens with spaces)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create the URL for this breadcrumb
    const url = `https://ingeniousdigital.com/${pathSegments.slice(0, index + 1).join('/')}`;
    
    return { name, url };
  });

  // Add home as the first breadcrumb if not already included
  const fullBreadcrumbs = [
    { name: 'Home', url: 'https://ingeniousdigital.com' },
    ...breadcrumbs
  ];

  // Create the schema.org JSON-LD data
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': fullBreadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': breadcrumb.name,
      'item': breadcrumb.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbListSchema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
