import React from 'react';
import { Helmet } from 'react-helmet';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  url: string;
  image?: string;
  provider?: string;
  providerUrl?: string;
  areaServed?: string;
  serviceType?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

interface ServiceSchemaType {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  areaServed: {
    '@type': string;
    geoMidpoint: {
      '@type': string;
      latitude: number;
      longitude: number;
    };
    geoRadius: string;
  };
  url: string;
  image: string;
  serviceType?: string;
  offers?: {
    '@type': string;
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
  [key: string]: any;
}

const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  serviceName,
  description,
  url,
  image = '/social-preview.jpg',
  provider = 'Ingenious Digital',
  providerUrl = 'https://ingeniousdigital.com',
  areaServed = 'Fort Lauderdale, FL', 
  serviceType,
  offers
}) => {
  // Create the schema.org JSON-LD data
  const serviceSchema: ServiceSchemaType = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'description': description,
    'provider': {
      '@type': 'Organization',
      'name': provider,
      'url': providerUrl
    },
    'areaServed': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': 26.1224,
        'longitude': -80.1373
      },
      'geoRadius': '50000'
    },
    'url': url,
    'image': new URL(image, url).toString(),
  };

  // Add service type if provided
  if (serviceType) {
    serviceSchema.serviceType = serviceType;
  }

  // Add offer if provided
  if (offers) {
    serviceSchema.offers = {
      '@type': 'Offer',
      ...offers,
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default ServiceSchema;