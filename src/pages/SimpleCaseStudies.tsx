import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

// Simple case studies data with all required properties inline
export const caseStudies = [
  {
    id: 'ai-analytics',
    title: 'AI-Powered Analytics Platform',
    subtitle: 'Advanced AI Analytics for Enterprise Data',
    description: 'How we developed an AI-powered analytics platform that processes massive datasets in real-time, providing actionable insights and predictive capabilities.',
    industry: 'Data Analytics',
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js', 'D3.js']
  },
  {
    id: 'cybersecurity-platform',
    title: 'Enterprise Cybersecurity Platform',
    subtitle: 'Enterprise-Grade Cybersecurity Platform',
    description: 'How we built an advanced cybersecurity platform with AI-powered threat detection and automated incident response for enterprise clients.',
    industry: 'Cybersecurity',
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'Elasticsearch', 'Kafka']
  },
  {
    id: 'saas-platform',
    title: 'Enterprise SaaS Platform',
    subtitle: 'Enterprise-Grade SaaS Platform Development',
    description: 'How we built a scalable SaaS platform that transformed business operations for a leading tech company, resulting in 320% increase in operational efficiency.',
    industry: 'Technology',
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB', 'Redis']
  },
  {
    id: 'iot-smart-city',
    title: 'IoT Smart City Infrastructure',
    subtitle: 'IoT Smart City Infrastructure Development',
    description: 'How we developed an integrated IoT platform connecting thousands of sensors across a city for real-time monitoring and management of urban infrastructure.',
    industry: 'Government',
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    technologies: ['Python', 'React', 'Node.js', 'MQTT', 'LoRaWAN', 'AWS IoT']
  },
  {
    id: 'elearning-platform',
    title: 'Interactive E-Learning Platform',
    subtitle: 'Interactive E-Learning Platform Development',
    description: 'How we created a comprehensive e-learning platform with adaptive learning algorithms and interactive content delivery for global education.',
    industry: 'Education',
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB', 'WebRTC']
  },
  {
    id: 'auto-service-digital',
    title: 'Local Auto Service Success',
    subtitle: 'Comprehensive Digital Solutions for Auto Repair',
    description: 'Complete digital transformation for a leading auto repair shop, boosting online visibility and streamlining operations with custom digital tools.',
    industry: 'Auto Services',
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'High Level CRM', 'Google Business Profile']
  },
  {
    id: 'retail-growth',
    title: 'Retail Growth Strategy',
    subtitle: 'Multi-Channel Growth Strategy for Local Retailer',
    description: 'Helping a local boutique retailer increase sales by 215% with an integrated e-commerce solution and targeted digital marketing campaigns.',
    industry: 'Retail',
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'High Level CRM', 'Google Business Profile']
  },
  {
    id: 'ecommerce-specialty',
    title: 'Specialty E-Commerce Platform',
    subtitle: 'Scaling Online Sales for Specialty Retailer',
    description: 'How we helped a specialty retailer increase online sales by 215% through platform optimization and digital marketing.',
    industry: 'E-Commerce',
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Next.js', 'Node.js', 'Shopify API', 'Stripe']
  },
  {
    id: 'realestate-digital',
    title: 'Real Estate Digital Transformation',
    subtitle: 'Modernizing Property Management and Sales',
    description: 'How we helped a local real estate agency increase listings by 120% and improve client satisfaction through digital innovation.',
    industry: 'Real Estate',
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Matterport Integration']
  },
  {
    id: 'fintech-payments',
    title: 'Small Business Payment Platform',
    subtitle: 'Revolutionizing Small Business Payments',
    description: 'How we built a secure, scalable payment platform that helped small businesses process over $50M in transactions.',
    industry: 'FinTech',
    imageUrl: "https://images.unsplash.com/photo-1565514020179-026b92b2d70b?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis']
  }
];

const SimpleCaseStudies = () => {
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
              <Code2 className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-6 text-gradient">
                Case Studies
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Explore how we've helped businesses transform through innovative technology solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Link
                  key={study.id}
                  to={`/case-studies/${study.id}`}
                  className="group block rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/5 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={`/case-studies/${study.id}.webp`}
                        alt={study.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to unsplash URL if local image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = study.imageUrl;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-red-500/90 text-white text-sm rounded-full">
                          {study.industry}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {study.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded">
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 text-xs text-gray-300 rounded">
                            +{study.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* View Case Study Button */}
                      <div className="flex items-center text-red-500 group-hover:text-red-400 transition-colors mt-2 text-sm font-medium">
                        View Case Study
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gradient mb-6">
                  Ready to Write Your Success Story?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's discuss how we can help transform your business with innovative solutions.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default SimpleCaseStudies;
