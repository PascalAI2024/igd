import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { primaryServiceArea, secondaryServiceArea } from '../data/locations';
import MetaTags from '../components/MetaTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { Helmet } from 'react-helmet';

const Locations: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Schema.org Place structured data for service areas
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Ingenious Digital',
    'url': 'https://ingeniousdigital.com',
    'logo': 'https://ingeniousdigital.com/ingenious-digital-logo.svg',
    'areaServed': [
      ...primaryServiceArea.map(location => ({
        '@type': 'City',
        'name': location.city,
        'sameAs': `https://en.wikipedia.org/wiki/${location.city.replace(' ', '_')},_${location.state}`,
        'containedInPlace': {
          '@type': 'State',
          'name': location.state
        }
      })),
      ...secondaryServiceArea.map(location => ({
        '@type': 'City',
        'name': location.city,
        'sameAs': `https://en.wikipedia.org/wiki/${location.city.replace(' ', '_')},_${location.state}`,
        'containedInPlace': {
          '@type': 'State',
          'name': location.state
        }
      }))
    ]
  };

  return (
    <>
      <MetaTags 
        title="Service Areas | Digital Marketing Services in South Florida"
        description="Ingenious Digital provides specialized digital marketing and web development services throughout South Florida. Find location-specific digital solutions for your business."
        keywords={[
          'South Florida digital marketing',
          'Fort Lauderdale web design',
          'Miami SEO services',
          'Boca Raton digital marketing',
          'local business marketing',
          'Florida web development',
          'local SEO services'
        ]}
      />
      
      <BreadcrumbSchema 
        customBreadcrumbs={[
          { name: 'Home', url: 'https://ingeniousdigital.com' },
          { name: 'Locations', url: 'https://ingeniousdigital.com/locations' }
        ]}
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceAreaSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Digital Marketing Service Areas</h1>
        
        <div className="mb-12">
          <p className="text-lg mb-6">
            Ingenious Digital provides specialized digital marketing services throughout South Florida. 
            Our local expertise helps businesses connect with their communities through targeted digital strategies.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Primary Service Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {primaryServiceArea.map((location, index) => (
              <Link 
                key={index}
                to={`/locations/${location.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.city}, {location.stateAbbr}</h3>
                  <p className="text-gray-600 text-sm mb-4">{location.description.substring(0, 120)}...</p>
                  <div className="flex flex-wrap gap-2">
                    {location.servicesOffered.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {location.servicesOffered.length > 3 && (
                      <span className="bg-gray-50 text-gray-500 text-xs px-2 py-1 rounded">
                        +{location.servicesOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-blue-50 p-3 text-center border-t border-gray-200">
                  <span className="text-blue-600 font-medium">View Services</span>
                </div>
              </Link>
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Additional Service Areas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {secondaryServiceArea.map((location, index) => (
              <Link 
                key={index}
                to={`/locations/${location.id}`}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-semibold">{location.city}, {location.stateAbbr}</h3>
                <p className="text-sm text-gray-600 mt-1">{location.servicesOffered.length} services available</p>
              </Link>
            ))}
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Local Digital Marketing Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Local Search Visibility</h3>
                <p className="text-gray-700">
                  78% of local mobile searches result in offline purchases. Our location-specific SEO strategies 
                  help your business appear in local search results when potential customers are looking for 
                  services in your area.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Community Connection</h3>
                <p className="text-gray-700">
                  Building trust with your local community is essential for sustainable growth. 
                  Our targeted content strategies highlight your local expertise and community involvement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Competitive Edge</h3>
                <p className="text-gray-700">
                  Understanding the local competitive landscape helps your business stand out. 
                  We research your local competitors to develop strategies that highlight your unique advantages.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Mobile Optimization</h3>
                <p className="text-gray-700">
                  With 88% of consumers who search for local businesses on mobile devices calling or visiting 
                  within 24 hours, we ensure your website is optimized for local mobile searches.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Don't See Your Location?</h2>
            <p className="mb-6">
              We serve clients throughout South Florida. Contact us to discuss how we can help your business, 
              regardless of location.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Locations;