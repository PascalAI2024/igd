import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
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
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'React', 'Node.js', 'D3.js', 'Apache Spark', 'AWS SageMaker', 'Kafka', 'Elasticsearch', 'Docker', 'Kubernetes'],
    challenge: 'The client needed to process and analyze massive datasets from multiple sources to provide actionable insights for their enterprise customers, with existing solutions taking too long to generate meaningful results.',
    solution: 'We built a custom AI-powered analytics platform using machine learning algorithms to process data in real-time, identify patterns, and generate predictive insights with interactive visualization dashboards.',
    results: [
      '95% reduction in data processing time',
      '78% improvement in prediction accuracy',
      'Real-time processing of 500TB+ of data',
      'Custom visualization tools for complex data sets',
      'Automated anomaly detection saving 120+ hours per month'
    ],
    testimonial: {
      quote: "The AI analytics platform has revolutionized how we deliver insights to our clients. What used to take weeks of analysis can now be visualized in seconds, with predictive capabilities that have transformed our value proposition in the market.",
      author: "Michael Chen",
      role: "Director of Analytics, Global Data Insights"
    },
    client: 'Global Data Insights'
  },
  {
    id: 'cybersecurity-platform',
    title: 'Enterprise Cybersecurity Platform',
    subtitle: 'Enterprise-Grade Cybersecurity Platform',
    description: 'How we built an advanced cybersecurity platform with AI-powered threat detection and automated incident response for enterprise clients.',
    industry: 'Cybersecurity',
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'Elasticsearch', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'OpenAI API', 'Blockchain'],
    challenge: 'The client needed a comprehensive cybersecurity solution to protect their enterprise clients from increasingly sophisticated threats, with real-time monitoring and automated response capabilities.',
    solution: 'We developed an advanced cybersecurity platform with AI-powered threat detection, real-time monitoring, and automated incident response that integrated with existing security infrastructure.',
    results: [
      '99.8% accuracy in threat detection',
      '85% reduction in false positives',
      'Average threat response time reduced from hours to seconds',
      'Comprehensive protection across cloud and on-premise systems',
      'Compliance with ISO 27001, GDPR, and HIPAA standards'
    ],
    testimonial: {
      quote: "This cybersecurity platform has transformed how we protect our clients. The AI-powered threat detection catches sophisticated attacks that would have previously gone unnoticed, and the automated response capabilities have dramatically reduced our incident resolution times.",
      author: "Alexandra Rivera",
      role: "CISO, SecureNet Solutions"
    },
    client: 'SecureNet Solutions'
  },
  {
    id: 'saas-platform',
    title: 'Enterprise SaaS Platform',
    subtitle: 'Enterprise-Grade SaaS Platform Development',
    description: 'How we built a scalable SaaS platform that transformed business operations for a leading tech company, resulting in 320% increase in operational efficiency.',
    industry: 'Technology',
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&auto=format&fit=crop",
    technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'TensorFlow', 'Elasticsearch'],
    challenge: 'The client needed a scalable SaaS platform to manage complex business operations across multiple departments with real-time data synchronization and advanced analytics capabilities.',
    solution: 'We developed a comprehensive SaaS solution with microservices architecture, real-time data processing, and AI-powered analytics dashboard that integrated with their existing systems.',
    results: [
      '320% increase in operational efficiency',
      '45% reduction in manual data entry',
      'Seamless integration with 12+ third-party services',
      'Scalable architecture supporting 10,000+ concurrent users',
      'Advanced analytics providing actionable business insights'
    ],
    testimonial: {
      quote: "The SaaS platform transformed our business operations completely. What used to take days now happens in minutes, and the insights we're getting from the analytics have opened new revenue opportunities we hadn't even considered.",
      author: "Sarah Johnson",
      role: "CTO, Tech Innovators Inc."
    },
    client: 'Tech Innovators Inc.'
  }
];

const SimpleCaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigateWithTransition = useNavigateWithTransition();
  const study = caseStudies.find(s => s.id === id);

  if (!study) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-6">Case Study Not Found</h1>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/case-studies');
              }}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Case Studies
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/case-studies');
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full mb-4">
              {study.industry}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              {study.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-6 max-w-3xl mx-auto">
              {study.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {study.technologies.map((tech: string, index: number) => (
                <span
                  key={`${tech}-${index}`}
                  className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/5 rounded-xl overflow-hidden aspect-[21/9] max-h-[500px]">
            <img
              src={`/case-studies/${study.id}.webp`}
              alt={study.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Try SVG if webp fails, then fallback to unsplash URL
                const target = e.target as HTMLImageElement;
                const svgPath = `/case-studies/${study.id}.svg`;
                
                // First try to load the SVG version
                fetch(svgPath)
                  .then(response => {
                    if (response.ok) {
                      target.src = svgPath;
                    } else {
                      // If SVG also fails, use the fallback URL
                      target.src = study.imageUrl;
                    }
                  })
                  .catch(() => {
                    // If fetch fails, use the fallback URL
                    target.src = study.imageUrl;
                  });
              }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">1</span>
                </span>
                Challenge
              </h2>
              <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">2</span>
                </span>
                Solution
              </h2>
              <p className="text-gray-300 leading-relaxed">{study.solution}</p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/5 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500">3</span>
                </span>
                Results
              </h2>
              <ul className="space-y-4">
                {study.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {study.testimonial && (
              <div className="bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-xl p-8 border border-red-500/20">
                <h2 className="text-2xl font-bold text-white mb-4">Client Testimonial</h2>
                <blockquote>
                  <p className="text-gray-300 italic mb-4">"{study.testimonial.quote}"</p>
                  <footer className="flex items-center">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-3 text-red-400 font-bold">
                      {study.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{study.testimonial.author}</div>
                      <div className="text-sm text-gray-400">{study.testimonial.role}</div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigateWithTransition('/contact');
            }}
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default SimpleCaseStudyDetail;
