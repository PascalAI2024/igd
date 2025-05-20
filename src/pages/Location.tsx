import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allServiceAreas, Location } from '../data/locations';
import MetaTags from '../components/MetaTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';

const LocationPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const location = allServiceAreas.find(loc => loc.id === locationId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!location) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Location Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find information about this location.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800">Return to Home</Link>
      </div>
    );
  }

  const nearbyLocations = location.nearbyLocations
    .map(id => allServiceAreas.find(loc => loc.id === id))
    .filter(loc => loc !== undefined) as Location[];

  // Schema.org LocalBusiness structured data for location page
  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Ingenious Digital - ${location.city}, ${location.stateAbbr}`,
    'description': `Digital marketing and web development services in ${location.city}, ${location.state}. ${location.description.substring(0, 100)}...`,
    'url': `https://ingeniousdigital.com/locations/${location.id}`,
    'telephone': '+19545158586',
    'email': 'pascal@ingeniousdigital.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': location.city,
      'addressRegion': location.stateAbbr,
      'postalCode': location.zip,
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': location.lat,
      'longitude': location.lng
    },
    'areaServed': {
      '@type': 'City',
      'name': location.city,
      'sameAs': `https://en.wikipedia.org/wiki/${location.city.replace(' ', '_')},_${location.state}`
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `Digital Services in ${location.city}`,
      'itemListElement': location.servicesOffered.map((service, index) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service,
          'description': `${service} services for businesses in ${location.city}, ${location.stateAbbr}.`,
          'areaServed': {
            '@type': 'City',
            'name': location.city,
            'containedInPlace': {
              '@type': 'State',
              'name': location.state
            }
          }
        }
      }))
    }
  };

  return (
    <>
      <MetaTags 
        title={location.metaTitle || `Digital Marketing Services in ${location.city}, ${location.stateAbbr}`}
        description={location.metaDescription || `Specialized digital marketing and web development services for ${location.city} businesses. Local SEO, website development, and digital strategies tailored to the ${location.city} market.`}
        image={location.imageUrl || '/social-preview.jpg'}
        url={`https://ingeniousdigital.com/locations/${location.id}`}
        cityName={location.city}
        regionName={location.stateAbbr}
        keywords={[
          `${location.city} digital marketing`,
          `${location.city} web development`,
          `${location.city} SEO`,
          `${location.city} website design`,
          `${location.city} social media management`,
          'local business marketing',
          'small business digital solutions'
        ]}
      />
      
      <BreadcrumbSchema 
        customBreadcrumbs={[
          { name: 'Home', url: 'https://ingeniousdigital.com' },
          { name: 'Locations', url: 'https://ingeniousdigital.com/locations' },
          { name: `${location.city}, ${location.stateAbbr}`, url: `https://ingeniousdigital.com/locations/${location.id}` }
        ]}
        currentPageTitle={`Digital Marketing in ${location.city}, ${location.stateAbbr}`}
        currentPageDescription={`Specialized digital marketing and web development services for ${location.city} businesses. Local SEO, website development, and digital strategies tailored to the ${location.city} market.`}
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(locationSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Digital Marketing Services in {location.city}, {location.stateAbbr}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-2">
            <p className="text-lg mb-6">
              {location.description}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Digital Services in {location.city}</h2>
            <p className="mb-4">
              We offer a comprehensive suite of digital marketing and web development services tailored specifically for businesses in {location.city}, {location.stateAbbr}. Our local expertise helps your business connect with customers in the {location.county} County area.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {location.servicesOffered.map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-semibold mb-2">{service}</h3>
                  <p className="text-sm text-gray-700">
                    Customized {service.toLowerCase()} strategies for {location.city} businesses.
                  </p>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why Choose Local Digital Marketing in {location.city}</h2>
            <p className="mb-4">
              Working with a digital marketing agency that understands the {location.city} market gives your business a significant advantage. We combine our technical expertise with local knowledge to deliver results that matter for your specific location.
            </p>
            
            <ul className="list-disc pl-6 mb-8">
              <li className="mb-2">Local SEO strategies to help you rank for {location.city}-specific searches</li>
              <li className="mb-2">Understanding of the local customer base and their unique preferences</li>
              <li className="mb-2">Knowledge of local competitors and how to differentiate your business</li>
              <li className="mb-2">Familiarity with local events and opportunities for marketing tie-ins</li>
              <li className="mb-2">Targeted advertising to reach customers in {location.city} and surrounding areas</li>
            </ul>
            
            {nearbyLocations.length > 0 && (
              <>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">We Also Serve Nearby Areas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {nearbyLocations.map((loc, index) => (
                    <Link 
                      key={index} 
                      to={`/locations/${loc.id}`}
                      className="bg-blue-50 hover:bg-blue-100 p-3 rounded text-center transition-colors"
                    >
                      {loc.city}, {loc.stateAbbr}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Get a Free Consultation</h3>
            <p className="mb-4">Grow your {location.city} business with our digital marketing expertise. Contact us today for a free consultation.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationPage;