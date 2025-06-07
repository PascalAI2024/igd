import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Stethoscope, ShoppingCart, Wrench, ChefHat, Car, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { industryRoutes } from '../data/routes';
import MetaTags from '../components/MetaTags';

const Industries: React.FC = () => {
  const getIndustryIcon = (path: string) => {
    if (path.includes('healthcare')) return Stethoscope;
    if (path.includes('retail')) return ShoppingCart;
    if (path.includes('restaurant')) return ChefHat;
    if (path.includes('auto')) return Car;
    if (path.includes('manufacturing')) return Factory;
    if (path.includes('local-services')) return Wrench;
    return Building2;
  };

  return (
    <PageTransition>
      <MetaTags 
        title="Industries We Serve - Ingenious Digital"
        description="Specialized digital solutions for small businesses across various industries. Healthcare, retail, restaurants, auto services, manufacturing, and more."
        keywords={["digital solutions by industry", "small business marketing", "healthcare digital marketing", "retail technology", "restaurant marketing"]}
      />
      
      <div className="min-h-screen bg-black pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                <span className="text-red-500">Small Business</span> Solutions
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Tailored digital strategies for local businesses across all industries. 
                We understand the unique challenges and opportunities in your market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Get Industry-Specific Strategy <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  View Success Stories
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Industries We <span className="text-red-500">Specialize In</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From local retail stores to healthcare practices, we've helped businesses 
                across diverse industries achieve digital success.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {industryRoutes.items.map((industry, index) => {
                const IconComponent = getIndustryIcon(industry.path);
                return (
                  <motion.div
                    key={industry.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="group"
                  >
                    <Link to={industry.path} className="block">
                      <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 h-full hover:bg-gray-800/50 hover:border-red-500/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
                            <IconComponent className="w-6 h-6 text-red-500" />
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors duration-200">
                            {industry.name}
                          </h3>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {industry.description}
                        </p>
                        <div className="flex items-center text-red-400 group-hover:text-red-300 transition-colors duration-200">
                          <span className="text-sm font-medium">Explore Solutions</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Why Industry-Specific Matters */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why Industry <span className="text-red-500">Expertise</span> Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Local Market Knowledge</h3>
                  <p className="text-gray-300">
                    We understand the unique challenges and opportunities in your local market, 
                    helping you connect with customers in your area.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Proven Strategies</h3>
                  <p className="text-gray-300">
                    Industry-specific approaches that have been tested and proven successful 
                    with businesses similar to yours.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Compliance & Best Practices</h3>
                  <p className="text-gray-300">
                    We understand industry regulations and best practices, ensuring your 
                    digital presence meets all necessary requirements.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Real Results for <span className="text-red-500">Real Businesses</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See how we've helped small businesses across different industries 
                achieve their digital transformation goals.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-red-500 mb-2">150+</div>
                <div className="text-white font-semibold mb-2">Small Businesses Served</div>
                <div className="text-gray-400 text-sm">Across all industries</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-red-500 mb-2">300%</div>
                <div className="text-white font-semibold mb-2">Average Growth</div>
                <div className="text-gray-400 text-sm">In online visibility</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-red-500 mb-2">24/7</div>
                <div className="text-white font-semibold mb-2">Support Available</div>
                <div className="text-gray-400 text-sm">For all our clients</div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link
                to="/case-studies"
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                View All Case Studies <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-12 border border-red-500/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Dominate Your Industry?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get a customized digital strategy designed specifically for your industry and local market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Get Your Custom Strategy <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  Explore Our Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Industries;