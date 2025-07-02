import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Filter, 
  Users, 
  Building, 
  TrendingUp,
  CheckCircle,
  Star,
  Clock
} from 'lucide-react';
import MetaTags from '../components/MetaTags';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/effects/ScrollReveal';
import { solutions, getSolutionsByCategory, type Solution } from '../data/solutions/solutions';

const Solutions: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBusinessSize, setSelectedBusinessSize] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Solutions', icon: TrendingUp },
    { id: 'growth', name: 'Growth & Marketing', icon: TrendingUp },
    { id: 'automation', name: 'Automation & AI', icon: Users },
    { id: 'local', name: 'Local Business', icon: Building },
    { id: 'enterprise', name: 'Enterprise', icon: Building }
  ];
  
  const businessSizes = [
    { id: 'all', name: 'All Business Sizes' },
    { id: 'Small Business', name: 'Small Business (1-50)' },
    { id: 'Medium Business', name: 'Medium Business (51-200)' },
    { id: 'Enterprise', name: 'Enterprise (200+)' }
  ];
  
  const getFilteredSolutions = (): Solution[] => {
    let filtered = selectedCategory === 'all' ? solutions : getSolutionsByCategory(selectedCategory);
    
    if (selectedBusinessSize !== 'all') {
      filtered = filtered.filter(solution => 
        solution.businessSize.some(size => size.includes(selectedBusinessSize))
      );
    }
    
    // Sort by popularity and featured status
    return filtered.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });
  };
  
  const handleSolutionClick = (solution: Solution) => {
    navigate(`/solutions/${solution.slug}`);
  };
  
  const SolutionCard: React.FC<{ solution: Solution; index: number }> = ({ solution, index }) => {
    const Icon = solution.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => handleSolutionClick(solution)}
      >
        {/* Popular/Featured Badge */}
        {(solution.isPopular || solution.isFeatured) && (
          <div className="absolute top-4 right-4 z-10">
            {solution.isPopular && (
              <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full mb-2 block">
                Most Popular
              </span>
            )}
            {solution.isFeatured && (
              <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        )}
        
        <div className="p-8">
          {/* Icon and Category */}
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full capitalize">
              {solution.category}
            </span>
          </div>
          
          {/* Title and Description */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
            {solution.name}
          </h3>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {solution.description}
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-black/50 rounded-lg">
              <div className="text-lg font-bold text-green-400">{solution.averageROI}</div>
              <div className="text-xs text-gray-400">Avg ROI</div>
            </div>
            <div className="text-center p-3 bg-black/50 rounded-lg">
              <div className="text-lg font-bold text-blue-400">{solution.timeToResults}</div>
              <div className="text-xs text-gray-400">Results</div>
            </div>
          </div>
          
          {/* Key Features Preview */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {solution.keyFeatures.slice(0, 3).map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
              {solution.keyFeatures.length > 3 && (
                <li className="text-sm text-gray-500">
                  +{solution.keyFeatures.length - 3} more features...
                </li>
              )}
            </ul>
          </div>
          
          {/* Pricing */}
          <div className="mb-6 p-4 bg-gradient-to-r from-gray-800 to-black rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{solution.startingPrice}</div>
                <div className="text-sm text-gray-400">Starting price</div>
              </div>
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="text-sm">High ROI</span>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center justify-between">
            <button className="flex items-center text-red-400 hover:text-red-300 font-semibold group-hover:translate-x-2 transition-transform">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Quick setup
            </div>
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </motion.div>
    );
  };
  
  return (
    <PageTransition>
      <MetaTags 
        title="Digital Solutions - Complete Business Transformation | Ingenious Digital"
        description="Choose from our comprehensive digital solutions designed to transform your business. From growth packages to enterprise automation - find the perfect solution for your needs."
        keywords={['digital solutions', 'business transformation', 'growth packages', 'automation solutions', 'enterprise solutions']}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Digital Solutions That Drive
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent block">
                Real Results
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Choose from our comprehensive suite of digital solutions designed to transform your business, 
              streamline operations, and accelerate growth. Each solution is proven to deliver measurable results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Get a Custom Recommendation
              </button>
              <button
                onClick={() => navigate('/case-studies')}
                className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
              >
                View Success Stories
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Filters Section */}
      <ScrollReveal>
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                          selectedCategory === category.id
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <CategoryIcon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Business Size Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 font-medium">Business Size:</span>
                <select
                  value={selectedBusinessSize}
                  onChange={(e) => setSelectedBusinessSize(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
                >
                  {businessSizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Solutions Grid */}
      <ScrollReveal>
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredSolutions().map((solution, index) => (
                <SolutionCard 
                  key={solution.id} 
                  solution={solution} 
                  index={index}
                />
              ))}
            </div>
            
            {getFilteredSolutions().length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-4">
                  No solutions found for the selected filters.
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBusinessSize('all');
                  }}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Not Sure Which Solution Is Right for You?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Our experts will analyze your business needs and recommend the perfect solution 
              to drive your growth and success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact?type=solution-consultation')}
                className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
              >
                Get Free Solution Analysis
              </button>
              <button
                onClick={() => navigate('/process')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-500 transition-all duration-300"
              >
                Learn About Our Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Solutions;