import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, ArrowRight, Zap, Target, LineChart, ChevronRight,
  Smartphone, Search, TrendingUp, Users, Code, Layout, Server, Database
} from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import NavigationButton from '../../components/NavigationButton';
import FeatureShowcase from '../../components/services/web-development/FeatureShowcase';
import WebsiteVisualizer from '../../components/services/web-development/WebsiteVisualizer';
import OptimizedWebDevelopmentProcess from '../../components/services/web-development/OptimizedWebDevelopmentProcess';
import CodeShowcase from '../../components/services/web-development/CodeShowcase';
import ResultsComparison from '../../components/services/shared/ResultsComparison';
import TechnologyShowcase from '../../components/services/shared/TechnologyShowcase';

const stats = [
  { label: 'Page Speed', value: '< 3s', icon: Zap, trend: '-40%' },
  { label: 'Mobile Score', value: '95+', icon: Smartphone, trend: '+15%' },
  { label: 'SEO Rank', value: 'Top 3', icon: Search, trend: '+5' }
];

const features = [
  {
    title: 'Mobile-First Design',
    description: 'Perfect performance on all devices',
    icon: Smartphone,
    metrics: [
      { label: 'Mobile Traffic', value: '60%' },
      { label: 'Conversion Rate', value: '+40%' },
      { label: 'User Engagement', value: '+55%' }
    ]
  },
  {
    title: 'Local SEO Integration',
    description: 'Built to rank in your service area',
    icon: Search,
    metrics: [
      { label: 'Local Rankings', value: 'Top 3' },
      { label: 'Map Pack', value: '90%' },
      { label: 'Local Reach', value: '5mi' }
    ]
  },
  {
    title: 'Lead Generation',
    description: 'Convert visitors into customers',
    icon: Users,
    metrics: [
      { label: 'Conversion', value: '+45%' },
      { label: 'Lead Quality', value: '85%' },
      { label: 'Response Time', value: '< 1h' }
    ]
  },
  {
    title: 'Analytics & Tracking',
    description: 'Monitor and improve performance',
    icon: LineChart,
    metrics: [
      { label: 'Data Points', value: '50+' },
      { label: 'Insights', value: '24/7' },
      { label: 'Reports', value: 'Live' }
    ]
  }
];

const WebDevelopment = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <PageTransition>
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
                className="text-5xl font-bold mb-6 text-gradient"
              >
                Local Business Websites
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 leading-relaxed mb-12"
              >
                Create a powerful online presence for your local business with a custom website designed to attract and convert customers
              </motion.p>

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
                    Fast, responsive websites that convert
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
                    Built for local SEO success
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
                    Scalable for your success
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
              description="Average improvements our clients see after launching their new website"
              results={[
                {
                  label: "Page Load Time",
                  before: 5.2,
                  after: 1.8,
                  unit: "s",
                  icon: <Zap className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Mobile Conversion Rate",
                  before: 1.2,
                  after: 3.8,
                  unit: "%",
                  icon: <Smartphone className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Organic Traffic",
                  before: 850,
                  after: 3200,
                  unit: "/mo",
                  icon: <Search className="w-5 h-5 text-red-500 mr-2" />
                },
                {
                  label: "Bounce Rate",
                  before: 68,
                  after: 32,
                  unit: "%",
                  icon: <Users className="w-5 h-5 text-red-500 mr-2" />
                }
              ]}
            />
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
      </div>
    </PageTransition>
  );
};

export default WebDevelopment;
