import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Building, Trophy, CheckCircle, ChevronRight, ArrowRight, Cpu, Megaphone, Smartphone } from 'lucide-react';
import { allServiceAreas, Location } from '../data/locations';
import MetaTags from '../components/MetaTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import PageTransition from '../components/PageTransition';
import { lazy3D } from '../utils/lazyLoad3D';
import { Helmet } from 'react-helmet';
import { AnimationErrorBoundary } from '../components/AnimationErrorBoundary';

const serviceIcons: Record<string, React.FC<{ className?: string }>> = {
  'Web Development': Cpu,
  'Local SEO': MapPin,
  'Digital Marketing': Megaphone,
  'Mobile Optimization': Smartphone
};

const LocationPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const location = allServiceAreas.find(loc => loc.id === locationId);
  const [contentReady, setContentReady] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set initial state to false
    setContentReady(false);
    
    // Use timeout to ensure DOM is fully rendered before adding the class
    // This helps prevent flickering during transitions
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 300);
    
    return () => {
      clearTimeout(timer);
      setContentReady(false);
    };
  }, [location]);

  if (!location) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MapPin className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Location Not Found</h1>
              <p className="text-xl text-gray-300 mb-8">Sorry, we couldn't find information about this location.</p>
              <Link 
                to="/locations" 
                className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Browse Locations
              </Link>
            </motion.div>
          </div>
        </div>
      </PageTransition>
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

      <PageTransition>
        <div className={`min-h-screen bg-black transition-opacity duration-500 ${contentReady ? 'opacity-100' : 'opacity-0'}`}>
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <div className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-6">
                  <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-500 font-semibold">{location.county} County</span>
                </div>
                <h1 className="text-5xl font-bold mb-6 text-gradient">
                  Digital Marketing in {location.city}, {location.stateAbbr}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Specialized digital solutions tailored for local {location.city} businesses.
                </p>
              </motion.div>
            </div>
          </section>

          {/* About Location Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Building className="w-12 h-12 text-red-500 mb-6" />
                  <h2 className="text-3xl font-bold text-gradient mb-6">
                    Your Business in {location.city}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {location.description}
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We combine our technical expertise with local knowledge of the {location.city} market to deliver tailored digital solutions that resonate with your local audience.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Why {location.city} Businesses Choose Us</h3>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-white">Local Market Expertise</h4>
                        <p className="mt-1 text-gray-400">We understand the unique dynamics of the {location.city} market and local consumer behavior.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-white">Tailored Strategies</h4>
                        <p className="mt-1 text-gray-400">Custom digital solutions designed specifically for {location.city} businesses and their unique challenges.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-white">Proven Results</h4>
                        <p className="mt-1 text-gray-400">Consistent success stories from {location.city} businesses who've transformed their digital presence.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Trophy className="w-12 h-12 text-red-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gradient mb-4">
                    Our Digital Services in {location.city}
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Comprehensive digital solutions designed to help your {location.city} business thrive in today's competitive marketplace.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {location.servicesOffered.map((service, index) => {
                  const Icon = serviceIcons[service] || Building;
                  return (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-shrink-0">
                            <div className="p-3 bg-red-500/10 rounded-lg">
                              <Icon className="h-8 w-8 text-red-500" />
                            </div>
                          </div>
                          <div className="flex-1 ml-4">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{service}</h3>
                            <p className="text-gray-400">
                              Customized {service.toLowerCase()} solutions for {location.city} businesses that drive tangible results.
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-red-500 group-hover:text-red-400 transition-colors text-sm font-medium"
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Local Digital Marketing Matters */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Why Local Digital Marketing Matters in {location.city}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  In today's digital landscape, having a strong local presence is essential for {location.city} businesses.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-gradient-to-r from-red-500/10 to-transparent backdrop-blur-sm border border-red-500/20 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Local Search Visibility</h3>
                  <p className="text-gray-300 mb-4">
                    78% of local mobile searches result in offline purchases. Our location-specific SEO strategies 
                    help your business appear in local search results when potential customers in {location.city} are looking for 
                    services in your area.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Google Business Profile optimization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Local keyword targeting</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Location-based search campaigns</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-r from-red-500/10 to-transparent backdrop-blur-sm border border-red-500/20 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Community Connection</h3>
                  <p className="text-gray-300 mb-4">
                    Building trust with the {location.city} community is essential for sustainable growth. 
                    Our targeted content strategies highlight your local expertise and community involvement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Local content creation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Community event promotions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Local partnerships and cross-promotion</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Demographics Section */}
          <section className="py-20 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  {location.city} Market Demographics
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Understanding the local market demographics helps develop targeted marketing strategies for your {location.city} business.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <AnimationErrorBoundary>
                  {lazy3D.OptimizedLocationDemographics({
                    locationName: location.city,
                    state: location.state,
                    population: location.population,
                    medianIncome: "$68,450",
                    medianHomeValue: "$395,000",
                    medianAge: "36.8",
                    employmentRate: "96.2%",
                    educationRate: "38%",
                    householdSize: "2.8",
                    commuteTime: "28 min",
                    topIndustries: ["Technology", "Healthcare", "Retail", "Education"],
                    additionalInfo: [
                      { label: "Internet Adoption", value: "94%" },
                      { label: "Smartphone Usage", value: "88%" },
                      { label: "E-commerce Shoppers", value: "76%" },
                      { label: "Social Media Users", value: "82%" }
                    ]
                  })}
                </AnimationErrorBoundary>
              </motion.div>
            </div>
          </section>

          {/* Nearby Locations Section */}
          {nearbyLocations.length > 0 && (
            <section className="py-20 bg-black/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl font-bold text-gradient mb-4">
                    We Also Serve Nearby Areas
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    Our digital expertise extends beyond {location.city} to these nearby locations.
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {nearbyLocations.map((loc, index) => (
                    <motion.div
                      key={loc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/locations/${loc.id}`}
                        className="group block bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/20 rounded-lg p-4 text-center transition-all duration-300"
                      >
                        <MapPin className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                          {loc.city}, {loc.stateAbbr}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {loc.servicesOffered.length} digital services
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold text-gradient mb-6">
                        Ready to Grow Your {location.city} Business?
                      </h2>
                      <p className="text-xl text-gray-300 mb-8">
                        Let's discuss how our digital expertise can help your business thrive in the {location.city} market.
                      </p>
                      <div className="hidden lg:block">
                        <Link
                          to="/contact"
                          className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          Get Started
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                  <div className="lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="bg-white/10 rounded-xl p-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-4">Request {location.city} Consultation</h3>
                      <form className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            placeholder="Phone (optional)"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="How can we help your business?"
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                          ></textarea>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                      <p className="mt-4 text-xs text-gray-500 text-center">
                        Your information is secure and will never be shared.
                      </p>
                    </motion.div>
                  </div>
                  <div className="lg:hidden text-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
};

export default LocationPage;