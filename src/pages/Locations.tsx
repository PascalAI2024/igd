import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Building, Users, ArrowRight, Search, TrendingUp, CheckCircle, BarChart } from 'lucide-react';
import { primaryServiceArea, secondaryServiceArea } from '../data/locations';
import MetaTags from '../components/MetaTags';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import PageTransition from '../components/PageTransition';
import LocationDemographics3D from '../components/locations/LocationDemographics3D';
import { Helmet } from 'react-helmet';

const Locations: React.FC = () => {
  useEffect(() => {
    // Scroll to top and add a small delay to allow the page to render properly
    window.scrollTo(0, 0);
    
    // Force a reflow/repaint after render to prevent animation issues
    const timer = setTimeout(() => {
      const element = document.querySelector('.locations-page');
      if (element) {
        element.classList.add('locations-ready');
      }
    }, 50);
    
    return () => clearTimeout(timer);
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

      <PageTransition>
        <div className="min-h-screen bg-black locations-page">
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
                <MapPin className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h1 className="text-5xl font-bold mb-6 text-gradient">
                  Our Service Areas
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Specialized digital marketing and web development services for businesses throughout South Florida.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Featured Service Areas */}
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
                  Primary Service Areas
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our team of digital experts provides comprehensive services in these key locations.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {primaryServiceArea.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link 
                      to={`/locations/${location.id}`}
                      className="group block bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/20 rounded-xl overflow-hidden transition-all duration-300 h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-red-500/10 rounded-lg">
                            <Building className="h-6 w-6 text-red-500" />
                          </div>
                          <h3 className="text-xl font-bold text-white ml-3 group-hover:text-red-400 transition-colors">
                            {location.city}, {location.stateAbbr}
                          </h3>
                        </div>
                        
                        <p className="text-gray-400 mb-6">
                          {location.description.substring(0, 120)}...
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {location.servicesOffered.slice(0, 3).map((service, idx) => (
                            <span key={idx} className="bg-white/5 text-gray-300 text-xs px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                          {location.servicesOffered.length > 3 && (
                            <span className="bg-white/5 text-gray-400 text-xs px-2 py-1 rounded-full">
                              +{location.servicesOffered.length - 3}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-red-500 group-hover:text-red-400 transition-colors text-sm font-medium">
                          View Services
                          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl font-bold text-gradient mb-6">
                      Find Services in Your Area
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      We provide tailored digital solutions for businesses across South Florida. 
                      Search for your location to discover services specific to your area.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your city or ZIP code..."
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-white">
                        Search
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Service Areas */}
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
                  Additional Service Areas
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our digital expertise extends to these additional locations throughout South Florida.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {secondaryServiceArea.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link 
                      to={`/locations/${location.id}`}
                      className="group flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/20 rounded-lg p-4 transition-all duration-300"
                    >
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-red-500 mr-2" />
                        <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                          {location.city}, {location.stateAbbr}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {location.servicesOffered.length} digital services
                      </p>
                    </Link>
                  </motion.div>
                ))}
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
                <Users className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Why Local Digital Marketing Matters
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Connecting with your local community online has never been more important for business growth.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
                    <div className="flex items-start mb-6">
                      <div className="p-2 bg-red-500/10 rounded-lg mr-4">
                        <Search className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Local Search Visibility</h3>
                        <p className="text-gray-400">
                          78% of local mobile searches result in offline purchases. Our location-specific SEO 
                          strategies help your business appear in local search results when potential customers 
                          are looking for services in your area.
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Google Business Profile optimization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Local keyword targeting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Location-based search campaigns</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full">
                    <div className="flex items-start mb-6">
                      <div className="p-2 bg-red-500/10 rounded-lg mr-4">
                        <TrendingUp className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Competitive Edge</h3>
                        <p className="text-gray-400">
                          Understanding the local competitive landscape helps your business stand out. 
                          We research your local competitors to develop strategies that highlight your 
                          unique advantages.
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Competitive market analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Local differentiator identification</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">Targeted local advertising campaigns</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Demographics Visualization Preview */}
          <section className="py-20 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <BarChart className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gradient mb-4">
                  Data-Driven Local Marketing
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Our location-specific approach leverages demographic insights to create targeted marketing strategies tailored to each community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <LocationDemographics3D
                    locationName="Fort Lauderdale"
                    state="Florida"
                    population="182437"
                    medianIncome="$64,850"
                    medianHomeValue="$378,000"
                    medianAge="42.4"
                    employmentRate="95.8%"
                    educationRate="36%"
                    householdSize="2.4"
                    commuteTime="27 min"
                    topIndustries={["Tourism", "Healthcare", "Technology", "Retail"]}
                    additionalInfo={[
                      { label: "Internet Adoption", value: "92%" },
                      { label: "Smartphone Usage", value: "86%" },
                      { label: "E-commerce Shoppers", value: "73%" }
                    ]}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-red-500/20 max-w-xl text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Interactive Demographics</h3>
                      <p className="text-gray-300 mb-4">
                        Each location page features interactive 3D demographic visualizations to help you understand the local market.
                      </p>
                      <Link
                        to="/locations/fort-lauderdale"
                        className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        Explore Fort Lauderdale
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-8">
                  <Link 
                    to="/locations/fort-lauderdale" 
                    className="inline-flex items-center text-red-500 hover:text-red-400 font-medium transition-colors"
                  >
                    View Full Fort Lauderdale Demographics
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl mx-auto text-center"
                >
                  <h2 className="text-3xl font-bold text-gradient mb-6">
                    Don't See Your Location?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    We serve clients throughout South Florida. Contact us to discuss how we can help your business, 
                    regardless of location.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
};

export default Locations;