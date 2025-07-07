import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Target, LineChart, Zap, ChevronRight, Users, TrendingUp, Star, ArrowRight, BarChart, MapPin, Globe, Mail } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import NavigationButton from '../../components/NavigationButton';
import MetaTags from '../../components/MetaTags';
import ServiceSchema from '../../components/ServiceSchema';
import FAQSchema from '../../components/FAQSchema';
import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import FeatureShowcase from '../../components/services/digital-marketing/FeatureShowcase';
import OptimizedDigitalMarketingFlow from '../../components/services/digital-marketing/OptimizedDigitalMarketingFlow';
import ResultsComparison from '../../components/services/shared/ResultsComparison';
import TechnologyShowcase from '../../components/services/shared/TechnologyShowcase';
import TestimonialShowcase from '../../components/services/shared/TestimonialShowcase';
import { lazy3D } from '../../utils/lazyLoad3D';

const stats = [
  { label: 'Avg. Growth', value: '25-45%', icon: TrendingUp },
  { label: 'Local Reach', value: '3-5K', icon: Users },
  { label: 'Client Satisfaction', value: '88%', icon: Star }
];

const DigitalMarketing = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // FAQ data for schema
  const faqData = [
    {
      question: "How long does it take to see results from digital marketing?",
      answer: "Most clients begin to see initial results within 60-90 days, with measurable improvements in visibility and lead generation typically occurring within 3-6 months. SEO requires sustained effort over 6-12 months for optimal results, while paid advertising can show initial data within 2-4 weeks after proper setup and optimization. Results vary based on competition, budget, and market conditions."
    },
    {
      question: "What digital marketing services do you offer?",
      answer: "We offer comprehensive digital marketing services including local SEO, Google Business Profile optimization, social media marketing, content creation, PPC advertising, email marketing, reputation management, and detailed analytics reporting."
    },
    {
      question: "How much does digital marketing cost?",
      answer: "Our digital marketing packages start at $1,500 per month, with custom pricing based on your business size, goals, industry competition, and selected services. We provide transparent pricing and detailed ROI reporting."
    },
    {
      question: "Do you guarantee first page rankings?",
      answer: "No reputable agency can guarantee specific rankings due to search algorithms and competition. However, 70% of our clients achieve first page rankings for targeted local keywords within 6-12 months. We focus on sustainable strategies and measurable metrics like traffic quality, conversions, and ROI rather than just rankings."
    },
    {
      question: "How do you measure digital marketing success?",
      answer: "We measure success through key performance indicators aligned with your business goals, including website traffic, conversion rates, lead quality, customer acquisition cost, local visibility, and ultimately, ROI. We provide detailed monthly reporting and analytics."
    }
  ];

  return (
    <PageTransition>
      <MetaTags 
        title="Digital Marketing & Local SEO Services"
        description="Boost your local business with our digital marketing and local SEO services. We help you attract, engage, and convert local customers with proven strategies."
      />
      
      <ServiceSchema 
        serviceName="Digital Marketing & Local SEO"
        description="Professional digital marketing and local SEO services for businesses in Fort Lauderdale and South Florida. We help local businesses improve their online visibility, generate qualified leads, and increase revenue through targeted digital marketing campaigns."
        url="https://ingeniousdigital.com/services/digital-marketing"
        serviceType="DigitalMarketingService"
        areaServed="Fort Lauderdale, FL"
        image="/images/digital-marketing/seo.webp"
      />
      
      <FAQSchema faqs={faqData} />
      
      <BreadcrumbSchema 
        customBreadcrumbs={[
          { name: 'Home', url: 'https://ingeniousdigital.com' },
          { name: 'Services', url: 'https://ingeniousdigital.com/services' },
          { name: 'Digital Marketing', url: 'https://ingeniousdigital.com/services/digital-marketing' }
        ]}
      />
      
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center bg-red-500/10 rounded-full px-4 py-2 mb-4"
              >
                <Search className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500 font-semibold">Local SEO & Digital Marketing</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-6"
              >
                Grow Your Local Business Online
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg"
              >
                Build a strong online presence with digital marketing strategies designed for local businesses. Typical results within 3-6 months.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-8 mb-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Target className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Local Targeting</h3>
                  <p className="text-gray-400 text-sm">
                    Target customers within 5-15 miles of your business
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <LineChart className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Measurable Results</h3>
                  <p className="text-gray-400 text-sm">
                    Monthly reports with clear, actionable insights
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Zap className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Continuous Growth</h3>
                  <p className="text-gray-400 text-sm">
                    Quarterly reviews and optimization based on data
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Comprehensive Digital Marketing
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From local SEO to targeted ads, we provide everything you need to grow your online presence.
              </p>
            </motion.div>
            <FeatureShowcase />
          </div>
        </section>


        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Our Marketing Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A proven approach to digital marketing with clear milestones and results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="shadow-xl shadow-red-500/5"
            >
              <OptimizedDigitalMarketingFlow />
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Our Technology Stack
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We use industry-leading tools and technologies to deliver exceptional results.
              </p>
            </motion.div>

            <TechnologyShowcase
              title="Advanced Marketing Technologies"
              description="Our suite of cutting-edge tools helps us deliver superior results for your business"
              technologies={[
                {
                  name: "Google Business Profile",
                  description: "Optimize your local business presence for maximum visibility",
                  icon: <MapPin className="w-5 h-5" />,
                  image: "/images/tech/google-business.webp",
                  features: [
                    "Profile optimization for local search",
                    "Review management and response",
                    "Local post scheduling",
                    "Photo optimization for engagement"
                  ],
                  color: "#4285F4"
                },
                {
                  name: "Google Analytics",
                  description: "Comprehensive tracking and insights for data-driven decisions",
                  icon: <BarChart className="w-5 h-5" />,
                  image: "/images/tech/analytics.webp",
                  features: [
                    "Real-time performance tracking",
                    "User behavior analysis",
                    "Conversion tracking",
                    "Custom reporting dashboards"
                  ],
                  color: "#E8710A"
                },
                {
                  name: "SEO Suite",
                  description: "Advanced tools for optimizing your search engine rankings",
                  icon: <Search className="w-5 h-5" />,
                  image: "/images/tech/seo-suite.webp",
                  features: [
                    "Keyword research and tracking",
                    "Competitor analysis",
                    "Content optimization",
                    "Technical SEO improvements"
                  ],
                  color: "#5F6368"
                },
                {
                  name: "Social Media Platform",
                  description: "Manage and optimize your social media presence",
                  icon: <Users className="w-5 h-5" />,
                  image: "/images/tech/social.webp",
                  features: [
                    "Content scheduling and publishing",
                    "Engagement monitoring",
                    "Audience insights",
                    "Performance analytics"
                  ],
                  color: "#1DA1F2"
                },
                {
                  name: "Email Marketing",
                  description: "Targeted email campaigns to nurture leads and customers",
                  icon: <Mail className="w-5 h-5" />,
                  image: "/images/tech/email.webp",
                  features: [
                    "Automated email sequences",
                    "Personalized messaging",
                    "A/B testing",
                    "Performance analytics"
                  ],
                  color: "#D44638"
                },
                {
                  name: "Ad Management Platform",
                  description: "Optimize your advertising spend for maximum ROI",
                  icon: <Target className="w-5 h-5" />,
                  image: "/images/tech/ads.webp",
                  features: [
                    "Campaign management",
                    "Audience targeting",
                    "Budget optimization",
                    "Performance tracking"
                  ],
                  color: "#34A853"
                }
              ]}
              columns={3}
            />
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Track Your Growth
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Monitor your rankings and performance with real-time analytics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <lazy3D.RankingVisualizer3D />

              <ResultsComparison
                title="Client Success Metrics"
                description="Typical improvements our clients see after 6 months of digital marketing (results vary by industry and competition)"
                results={[
                  {
                    label: "Website Traffic",
                    before: 1200,
                    after: 2400,
                    unit: " visits/mo",
                    icon: <Users className="w-5 h-5 text-red-500 mr-2" />
                  },
                  {
                    label: "Search Rankings",
                    before: 18,
                    after: 8,
                    unit: " position",
                    icon: <Search className="w-5 h-5 text-red-500 mr-2" />
                  },
                  {
                    label: "Conversion Rate",
                    before: 1.8,
                    after: 2.8,
                    unit: "%",
                    icon: <Target className="w-5 h-5 text-red-500 mr-2" />
                  },
                  {
                    label: "Local Leads",
                    before: 15,
                    after: 35,
                    unit: " per month",
                    icon: <MapPin className="w-5 h-5 text-red-500 mr-2" />
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Strategy Overview */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gradient mb-6 text-center">
                  Our Strategic Approach
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: 'Foundation Building',
                      description: 'Comprehensive setup and optimization of your digital presence'
                    },
                    {
                      title: 'Active Growth',
                      description: 'Strategic ad campaigns and content marketing'
                    },
                    {
                      title: 'Optimization',
                      description: 'Continuous refinement based on performance data'
                    },
                    {
                      title: 'Sustained Growth',
                      description: 'Long-term strategies for continued market dominance'
                    },
                    {
                      title: 'Innovation',
                      description: 'Staying ahead with emerging trends and technologies'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start group cursor-pointer"
                      onClick={() => setActiveSection(activeSection === item.title ? null : item.title)}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                          <ChevronRight
                            className={`w-4 h-4 ml-2 text-red-500 transition-transform duration-300 ${
                              activeSection === item.title ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {activeSection === item.title && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-gray-400"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Client Success Stories
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Hear from businesses that have transformed their online presence with our digital marketing services.
              </p>
            </motion.div>

            <TestimonialShowcase
              title="What Our Clients Say"
              description="Real results from real businesses in your area"
              testimonials={[
                {
                  quote: "We started with zero online presence and outdated Yellow Pages ads. Ingenious Digital built our digital foundation over 8 months - website, Google Business Profile, and targeted ads. We now get 12-15 quality leads weekly, up from maybe 2-3 walk-ins. The investment paid for itself within the first year.",
                  author: "Dr. Sarah Johnson",
                  company: "Johnson Family Dental (Solo practice)",
                  image: "/images/testimonials/client1.webp",
                  industry: "Healthcare",
                  results: "2-3 to 12-15 leads/week, ROI positive after 12 months"
                },
                {
                  quote: "After two bad experiences with marketing agencies, I was skeptical. But Ingenious Digital actually listened to our needs. They focused on our 10-mile service area first, got us ranking locally, then helped expand to neighboring towns. It took a full year, but now we're booked 2 weeks out consistently.",
                  author: "Michael Rodriguez",
                  company: "Rodriguez Plumbing Services (Family business, 6 techs)",
                  image: "/images/testimonials/client2.webp",
                  industry: "Home Services",
                  results: "From 3-4 to 10-12 calls/day, 40% revenue growth year-over-year"
                },
                {
                  quote: "Previous agencies promised the moon but delivered nothing. Ingenious Digital set realistic expectations - they said it would take 6 months to see real results. Month 1-3 was foundation building, by month 6 we had steady inquiries. Now at month 10, I'm hiring another agent to handle the volume.",
                  author: "Jennifer Williams",
                  company: "Cornerstone Real Estate (Independent broker)",
                  image: "/images/testimonials/client3.webp",
                  industry: "Real Estate",
                  results: "5-6 to 15-18 quality inquiries/week, 35% more active listings"
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Grow Your Online Presence?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a digital marketing strategy that brings more customers to your business
                </p>
                <NavigationButton
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </NavigationButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default DigitalMarketing;
