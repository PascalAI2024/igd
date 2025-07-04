import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, ArrowRight, Zap, Target, LineChart, ChevronRight,
  Smartphone, Search, TrendingUp, Users, Code, Layout, Server, Database,
  Clock, Shield, Award, Info
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import NavigationButton from '../../components/NavigationButton';
import FeatureShowcase from '../../components/services/web-development/FeatureShowcase';
import WebsiteVisualizer from '../../components/services/web-development/WebsiteVisualizer';
import OptimizedWebDevelopmentProcess from '../../components/services/web-development/OptimizedWebDevelopmentProcess';
import CodeShowcase from '../../components/services/web-development/CodeShowcase';
import LiveCodeEditor from '../../components/services/web-development/LiveCodeEditor';
import ResultsComparison from '../../components/services/shared/ResultsComparison';
import TechnologyShowcase from '../../components/services/shared/TechnologyShowcase';
import MetaTags from '../../components/MetaTags';
import ServiceSchema from '../../components/ServiceSchema';
import Tooltip from '../../components/ui/Tooltip';
import ComparisonTable from '../../components/ui/ComparisonTable';
import TrustSignals, { SecurityBadges, YearsInBusinessBadge } from '../../components/ui/TrustSignals';
import { SocialProofNotification, MetricCounter, ClientLogoCarousel } from '../../components/ui/SocialProof';

const stats = [
  { label: 'Page Speed', value: '< 3s', icon: Zap, trend: 'Target' },
  { label: 'Mobile Score', value: '85+', icon: Smartphone, trend: 'Google' },
  { label: 'SEO Ready', value: '100%', icon: Search, trend: 'Built-in' }
];

const features = [
  {
    title: 'Mobile-First Design',
    description: 'Perfect performance on all devices',
    icon: Smartphone,
    metrics: [
      { label: 'Mobile Traffic', value: '50-70%' },
      { label: 'Bounce Rate', value: '-25%' },
      { label: 'Page Speed', value: '<3s' }
    ]
  },
  {
    title: 'Local SEO Integration',
    description: 'Built to rank in your service area',
    icon: Search,
    metrics: [
      { label: 'SEO Score', value: '85+' },
      { label: 'Schema Markup', value: 'Yes' },
      { label: 'Local Keywords', value: 'Optimized' }
    ]
  },
  {
    title: 'Lead Generation',
    description: 'Convert visitors into customers',
    icon: Users,
    metrics: [
      { label: 'Form Completion', value: '15-25%' },
      { label: 'Contact Options', value: 'Multiple' },
      { label: 'CRM Ready', value: 'Yes' }
    ]
  },
  {
    title: 'Analytics & Tracking',
    description: 'Monitor and improve performance',
    icon: LineChart,
    metrics: [
      { label: 'Google Analytics', value: 'GA4' },
      { label: 'Monthly Reports', value: 'Included' },
      { label: 'Real-time Data', value: 'Yes' }
    ]
  }
];

const WebDevelopment = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <PageTransition>
      <MetaTags 
        title="Web Development Services Fort Lauderdale | Ingenious Digital"
        description="Professional web development services in Fort Lauderdale. Custom websites, e-commerce solutions, and mobile-responsive designs that convert visitors into customers. Get a free consultation today."
        keywords={['web development Fort Lauderdale', 'website design', 'custom web development', 'responsive design', 'e-commerce development', 'local web developer']}
      />
      <ServiceSchema 
        serviceName="Web Development Services"
        description="Professional web development services including custom websites, e-commerce solutions, and mobile-responsive designs that convert visitors into customers."
        url="https://ingeniousdigital.com/services/web-development"
        serviceType="Web Development"
      />
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative inline-block"
              >
                <Globe className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-gradient"
              >
                Local Business Websites
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 leading-relaxed mb-8"
              >
                Build a professional website that attracts local customers and grows your business. Most projects completed within 4-8 weeks.
              </motion.p>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-12"
              >
                <TrustSignals variant="inline" showAll={false} />
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg mb-3">
                      <stat.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="flex items-center justify-center text-sm mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Zap className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">High Performance</h3>
                  <p className="text-gray-400 text-sm">
                    Load times under 3 seconds on most devices
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <Target className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Local Focus</h3>
                  <p className="text-gray-400 text-sm">
                    SEO best practices built into every page
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
                >
                  <LineChart className="w-8 h-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">Growth Ready</h3>
                  <p className="text-gray-400 text-sm">
                    Built to grow with your business needs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Website Visualizer */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Responsive Design
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Websites that look great and perform perfectly on all devices
              </p>
            </motion.div>

            <WebsiteVisualizer
              title="Responsive Web Design"
              description="See how your website will look across all devices"
              websiteScreenshots={{
                desktop: "/images/web-dev/desktop.webp",
                tablet: "/images/web-dev/tablet.webp",
                mobile: "/images/web-dev/mobile.webp"
              }}
              features={[
                "Mobile-first responsive design",
                "Touch-friendly navigation",
                "Optimized images for all screen sizes",
                "Fast loading on all devices",
                "Consistent branding across platforms",
                "Accessible user interface"
              ]}
            />
          </div>
        </section>

        {/* Feature Showcase */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Built for Local Success
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything your local business needs to succeed online
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Simple Development Process
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get your business online efficiently and effectively
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="shadow-xl shadow-red-500/5"
            >
              <OptimizedWebDevelopmentProcess />
            </motion.div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Reliable Technology
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Built with proven technologies that keep your site fast and secure
              </p>
            </motion.div>

            <TechnologyShowcase
              title="Our Web Development Stack"
              description="We use cutting-edge technologies to build fast, secure, and scalable websites"
              technologies={[
                {
                  name: "React",
                  description: "Modern, component-based UI development",
                  icon: <Code className="w-5 h-5" />,
                  image: "/images/tech/react.webp",
                  features: [
                    "Fast, responsive user interfaces",
                    "Component-based architecture",
                    "Efficient rendering",
                    "SEO-friendly with Next.js"
                  ],
                  color: "#61DAFB"
                },
                {
                  name: "Node.js",
                  description: "Scalable, high-performance backend",
                  icon: <Server className="w-5 h-5" />,
                  image: "/images/tech/nodejs.webp",
                  features: [
                    "Fast API development",
                    "Real-time capabilities",
                    "Efficient data processing",
                    "Extensive package ecosystem"
                  ],
                  color: "#68A063"
                },
                {
                  name: "Tailwind CSS",
                  description: "Utility-first CSS framework for rapid UI development",
                  icon: <Layout className="w-5 h-5" />,
                  image: "/images/tech/tailwind.webp",
                  features: [
                    "Responsive design system",
                    "Consistent UI components",
                    "Minimal CSS footprint",
                    "Rapid development workflow"
                  ],
                  color: "#38B2AC"
                },
                {
                  name: "MongoDB",
                  description: "Flexible, scalable document database",
                  icon: <Database className="w-5 h-5" />,
                  image: "/images/tech/mongodb.webp",
                  features: [
                    "Flexible data modeling",
                    "Horizontal scaling",
                    "High performance",
                    "JSON-like documents"
                  ],
                  color: "#4DB33D"
                },
                {
                  name: "AWS",
                  description: "Enterprise-grade cloud infrastructure",
                  icon: <Server className="w-5 h-5" />,
                  image: "/images/tech/aws.webp",
                  features: [
                    "Global content delivery",
                    "Automatic scaling",
                    "High availability",
                    "Enterprise security"
                  ],
                  color: "#FF9900"
                },
                {
                  name: "GraphQL",
                  description: "Efficient API query language",
                  icon: <Code className="w-5 h-5" />,
                  image: "/images/tech/graphql.webp",
                  features: [
                    "Precise data fetching",
                    "Single request resolution",
                    "Strong typing system",
                    "Self-documenting API"
                  ],
                  color: "#E535AB"
                }
              ]}
              columns={3}
            />
          </div>
        </section>

        {/* Code Showcase */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Clean, Modern Code
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We build websites with clean, maintainable code using modern best practices
              </p>
            </motion.div>

            <CodeShowcase
              title="Our Development Approach"
              description="See examples of the clean, efficient code we use to build your website"
            />
          </div>
        </section>

        {/* Live Code Editor - Interactive Demo */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveCodeEditor
              title="🚀 Interactive Development Demo"
              description="This is what sets us apart - try editing the code below and watch it update in real-time! This demonstrates our expertise in creating interactive, responsive websites."
            />
          </div>
        </section>

        {/* Results Comparison */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Real Results
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See the impact our websites have on local businesses
              </p>
            </motion.div>

            <ResultsComparison
              title="Client Success Metrics"
              description="Typical improvements seen within 6 months of launching a new website (results vary by industry)"
              results={[
                {
                  label: "Page Load Time",
                  before: 5.2,
                  after: 2.8,
                  unit: "s",
                  icon: <Zap className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Mobile Conversion Rate",
                  before: 1.2,
                  after: 2.4,
                  unit: "%",
                  icon: <Smartphone className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Organic Traffic",
                  before: 850,
                  after: 1800,
                  unit: "/mo",
                  icon: <Search className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Bounce Rate",
                  before: 68,
                  after: 48,
                  unit: "%",
                  icon: <Users className="w-5 h-5 text-red-500 mr-2" />
                }
              ]}
            />
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ComparisonTable
              title="Choose the Right Web Development Package"
              description="All packages include mobile-responsive design, SEO optimization, and 6 months of support"
              features={[
                { 
                  name: "Number of Pages", 
                  tooltip: "The total number of unique pages included in your website"
                },
                { 
                  name: "Custom Design", 
                  tooltip: "Unique design tailored to your brand, not a template"
                },
                { 
                  name: "Content Management System", 
                  tooltip: "Easy-to-use system to update your website content without coding"
                },
                { 
                  name: "Contact Forms", 
                  tooltip: "Forms that allow customers to reach you directly from your website"
                },
                {
                  name: "SEO Optimization",
                  tooltip: "On-page optimization to help your site rank in local searches"
                },
                { 
                  name: "Google Analytics", 
                  tooltip: "Track visitor behavior and website performance"
                },
                { 
                  name: "SSL Certificate", 
                  tooltip: "Secure your website with HTTPS encryption for customer trust"
                },
                {
                  name: "E-commerce Ready",
                  tooltip: "Ability to sell products or services directly on your website"
                },
                {
                  name: "Blog/News Section",
                  tooltip: "Regular content updates to improve SEO and engage visitors"
                },
                {
                  name: "Social Media Integration",
                  tooltip: "Connect your social profiles and enable content sharing"
                },
                {
                  name: "Development Time"
                },
                {
                  name: "Monthly Maintenance"
                }
              ]}
              columns={[
                {
                  title: "Starter",
                  subtitle: "Perfect for new businesses",
                  price: "$2,500",
                  priceNote: "One-time payment",
                  features: [
                    "Up to 5 pages",
                    true,
                    false,
                    "1 form",
                    "Basic",
                    true,
                    true,
                    false,
                    false,
                    "Basic",
                    "2-3 weeks",
                    { value: false, note: "Available as add-on" }
                  ]
                },
                {
                  title: "Professional",
                  subtitle: "Most popular for growing businesses",
                  price: "$4,500",
                  priceNote: "One-time payment",
                  popular: true,
                  highlight: true,
                  features: [
                    "Up to 15 pages",
                    true,
                    true,
                    "3 forms",
                    "Advanced",
                    true,
                    true,
                    { value: true, note: "Basic store" },
                    true,
                    "Full integration",
                    "4-6 weeks",
                    { value: "$99/mo", note: "Optional" }
                  ]
                },
                {
                  title: "Enterprise",
                  subtitle: "For established businesses",
                  price: "$8,500+",
                  priceNote: "Custom quote",
                  features: [
                    "Unlimited pages",
                    true,
                    true,
                    "Unlimited",
                    "Enterprise",
                    true,
                    true,
                    { value: true, note: "Full store" },
                    true,
                    "Full integration",
                    "6-8 weeks",
                    { value: "$199/mo", note: "Included" }
                  ]
                }
              ]}
              variant="service"
              className="mb-16"
            />

            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <SecurityBadges />
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
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
                  Website Features
                </h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                    >
                      <div className={`flex items-start transition-colors duration-300 rounded-lg p-4 -mx-4 ${
                        hoveredFeature === index ? 'bg-white/5' : ''
                      }`}>
                        <feature.icon className={`w-8 h-8 text-red-500 mr-4 transition-transform duration-300 ${
                          hoveredFeature === index ? 'scale-110' : ''
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                            <ChevronRight
                              className={`w-5 h-5 ml-2 text-red-500 transition-transform duration-300 ${
                                activeFeature === index ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                          <p className="text-gray-400">{feature.description}</p>

                          {activeFeature === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-3 gap-4 mt-4"
                            >
                              {feature.metrics.map((metric) => (
                                <motion.div
                                  key={metric.label}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-center p-3 bg-white/5 rounded-lg"
                                >
                                  <div className="text-lg font-bold text-red-500">{metric.value}</div>
                                  <div className="text-sm text-gray-400">{metric.label}</div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
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
                  Ready to Grow Your Local Business Online?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create a website that brings more customers to your business
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

        {/* Client Success Metrics */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Proven Success Metrics
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Real results from real Fort Lauderdale businesses
              </p>
            </motion.div>

            <MetricCounter
              metrics={[
                {
                  label: "Websites Launched",
                  value: 87,
                  suffix: "+",
                  icon: Globe,
                  color: "text-blue-500"
                },
                {
                  label: "Average Load Time",
                  value: 2.8,
                  suffix: "s",
                  icon: Zap,
                  color: "text-yellow-500"
                },
                {
                  label: "Client Satisfaction",
                  value: 98,
                  suffix: "%",
                  icon: Award,
                  color: "text-green-500"
                },
                {
                  label: "Uptime Guarantee",
                  value: 99.9,
                  suffix: "%",
                  icon: Shield,
                  color: "text-purple-500"
                }
              ]}
              animated={true}
              className="mb-16"
            />

            {/* Client Logos */}
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-6">Trusted by Leading Local Businesses</p>
              <ClientLogoCarousel
                logos={[
                  { name: "Miami Boutique", logo: "👗" },
                  { name: "Coral Springs Restaurant", logo: "🍽️" },
                  { name: "Fort Lauderdale Dental", logo: "🦷" },
                  { name: "Pompano Auto Service", logo: "🚗" },
                  { name: "Boca Raton Fitness", logo: "💪" },
                  { name: "Hollywood Real Estate", logo: "🏠" }
                ]}
                speed={40}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Social Proof Notifications */}
      <SocialProofNotification position="bottom-left" />
    </PageTransition>
  );
};

export default WebDevelopment;
