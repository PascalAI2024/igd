import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  Play,
  Download,
  MessageCircle
} from 'lucide-react';
import MetaTags from '../../components/MetaTags';
import PageTransition from '../../components/PageTransition';
import OptimizedImage from '../../components/OptimizedImage';
import ScrollReveal from '../../components/effects/ScrollReveal';
import { getSolutionBySlug, type Solution } from '../../data/solutions/solutions';

interface SolutionTemplateProps {
  solution?: Solution;
}

const SolutionTemplate: React.FC<SolutionTemplateProps> = ({ solution: propSolution }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const solution = propSolution || (slug ? getSolutionBySlug(slug) : null);
  
  useEffect(() => {
    if (slug && !solution) {
      navigate('/404');
    }
  }, [slug, solution, navigate]);
  
  if (!solution) {
    return null;
  }

  const Icon = solution.icon;
  
  const handleCTAClick = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      navigate(action);
    }
  };

  return (
    <PageTransition>
      <MetaTags 
        title={solution.metaTitle}
        description={solution.metaDescription}
        keywords={solution.keywords}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl mr-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  {solution.isPopular && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  )}
                  {solution.isFeatured && (
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {solution.name}
              </h1>
              
              <p className="text-2xl text-gray-300 mb-6 font-light">
                {solution.tagline}
              </p>
              
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {solution.description}
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{solution.averageROI}</div>
                  <div className="text-sm text-gray-400">Average ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{solution.timeToResults}</div>
                  <div className="text-sm text-gray-400">Time to Results</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{solution.startingPrice}</div>
                  <div className="text-sm text-gray-400">Starting Price</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => handleCTAClick(solution.ctaPrimary.action)}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  {solution.ctaPrimary.text}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleCTAClick(solution.ctaSecondary.action)}
                  className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-xl hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center"
                >
                  {solution.ctaSecondary.text}
                  <Play className="ml-2 w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <OptimizedImage
                src={solution.heroImage}
                alt={`${solution.name} Solution`}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Proven Results You Can Expect
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {solution.longDescription}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solution.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-black/50 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 text-lg">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* What's Included Section */}
      <ScrollReveal>
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                What's Included in Your Solution
              </h2>
              <p className="text-xl text-gray-400">
                Comprehensive packages designed for maximum impact
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {solution.included.map((package_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{package_.title}</h3>
                  <p className="text-gray-400 mb-6">{package_.description}</p>
                  
                  <ul className="space-y-3">
                    {package_.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Process Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Proven Process
              </h2>
              <p className="text-xl text-gray-400">
                Step-by-step methodology that delivers results
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {solution.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-6 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Results Section */}
      <ScrollReveal>
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Real Results From Real Clients
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {solution.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700"
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {result.improvement}
                  </div>
                  <div className="text-lg text-white mb-1">{result.metric}</div>
                  <div className="text-sm text-gray-400">in {result.timeframe}</div>
                </motion.div>
              ))}
            </div>
            
            {/* Testimonial */}
            {solution.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {solution.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-gray-300 mb-4 italic">
                      "{solution.testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{solution.testimonial.author}</div>
                        <div className="text-gray-400">{solution.testimonial.company}</div>
                        <div className="text-sm text-gray-500">{solution.testimonial.industry}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-400 font-semibold">
                          {solution.testimonial.results}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </ScrollReveal>
      
      {/* FAQ Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {solution.faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-6 p-6 bg-black/50 rounded-xl border border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{item.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join hundreds of businesses that have already transformed their operations with {solution.name}.
              Get started today and see results in {solution.timeToResults}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => handleCTAClick(solution.ctaPrimary.action)}
                className="px-10 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                {solution.ctaPrimary.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => handleCTAClick('/contact?type=consultation')}
                className="px-10 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-500 transition-all duration-300 flex items-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Free Consultation
              </button>
            </div>
            
            <p className="text-white/80 mt-6">
              💎 No long-term contracts • 🚀 Results guaranteed • 📞 Free strategy session
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default SolutionTemplate;