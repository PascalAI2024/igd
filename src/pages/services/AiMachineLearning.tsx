import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Database, LineChart, Bot, BarChart, PieChart, TrendingUp } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import MetaTags from '../../components/MetaTags';
import ServiceCTA from '../../services/components/ServiceCTA';
import OptimizedImage from '../../components/OptimizedImage';
import DataVisualization from '../../components/services/ai-ml/DataVisualization';
import NeuralNetworkAnimation from '../../components/services/ai-ml/NeuralNetworkAnimation';
import MetricsShowcase from '../../components/services/ai-ml/MetricsShowcase';
import UseCaseShowcase from '../../components/services/ai-ml/UseCaseShowcase';

const AiMachineLearning = () => {
  const showcaseMetrics = [
    {
      value: '99%',
      label: 'Accuracy',
      trend: 'High Precision',
      icon: Brain
    },
    {
      value: '10x',
      label: 'Efficiency',
      trend: 'Improvement',
      icon: Cpu
    },
    {
      value: '24/7',
      label: 'Automation',
      trend: 'Always On',
      icon: Network
    }
  ];

  return (
    <PageTransition>
      <MetaTags
        title="AI & Machine Learning Solutions"
        description="Transform your business with our cutting-edge AI and machine learning solutions. Harness the power of artificial intelligence for automation, insights, and innovation."
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="text-gradient">AI & Machine Learning</span> Solutions
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Harness the power of artificial intelligence to transform your business with data-driven insights, automation, and innovation.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {showcaseMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex-1 min-w-[120px]"
                    >
                      <div className="flex items-center mb-2">
                        <metric.icon className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-sm text-gray-400">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="text-xs text-red-500">{metric.trend}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl p-6 bg-black/30">
                <h3 className="text-xl font-bold mb-2">Neural Network Visualization</h3>
                <p className="text-gray-400 mb-6">See how our AI models process and analyze data in real-time</p>

                <div className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/50 to-purple-500/50 animate-pulse"></div>
                    <p className="text-white">Interactive visualization loading...</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <div className="text-sm text-gray-300 mb-2">Powered by</div>
                  <div className="text-xl font-bold text-white">Advanced Neural Networks</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI & ML Solutions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We implement cutting-edge artificial intelligence solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <solution.icon className="w-6 h-6 text-red-500" />
                </div>

                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-gray-400 mb-6">{solution.description}</p>

                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Data Visualizations */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataVisualization
              title="AI Performance Metrics"
              description="Our AI solutions consistently outperform traditional approaches across key metrics"
              type="bar"
              data={[
                { label: 'Accuracy', value: 95, color: 'rgba(255, 0, 0, 0.8)' },
                { label: 'Speed', value: 87, color: 'rgba(255, 50, 0, 0.8)' },
                { label: 'Efficiency', value: 92, color: 'rgba(255, 100, 0, 0.8)' },
                { label: 'Scalability', value: 89, color: 'rgba(255, 150, 0, 0.8)' },
                { label: 'Cost Savings', value: 78, color: 'rgba(255, 200, 0, 0.8)' }
              ]}
              height={300}
              animationDelay={0.3}
            />

            <DataVisualization
              title="AI Adoption by Industry"
              description="See how different industries are leveraging AI technologies"
              type="radar"
              data={[
                { label: 'Retail', value: 85, color: 'rgba(255, 0, 0, 0.8)' },
                { label: 'Finance', value: 92, color: 'rgba(255, 50, 0, 0.8)' },
                { label: 'Healthcare', value: 78, color: 'rgba(255, 100, 0, 0.8)' },
                { label: 'Manufacturing', value: 88, color: 'rgba(255, 150, 0, 0.8)' },
                { label: 'Logistics', value: 82, color: 'rgba(255, 200, 0, 0.8)' },
                { label: 'Marketing', value: 90, color: 'rgba(255, 250, 0, 0.8)' }
              ]}
              height={300}
              animationDelay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Implementation Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A systematic approach to implementing AI solutions for your business
            </p>
          </div>

          {/* Metrics Showcase */}
          <div className="mb-16">
            <MetricsShowcase
              title="AI Implementation Success Metrics"
              description="Our AI implementation process consistently delivers exceptional results"
              metrics={[
                {
                  value: 92,
                  label: "Implementation Success Rate",
                  suffix: "%",
                  color: "#FF3A29",
                  icon: <TrendingUp className="w-8 h-8 text-red-500/70" />,
                  description: "Projects successfully deployed to production"
                },
                {
                  value: 3,
                  label: "Average Time to Value",
                  suffix: " months",
                  color: "#FF5722",
                  icon: <BarChart className="w-8 h-8 text-red-500/70" />,
                  description: "From concept to measurable business impact"
                },
                {
                  value: 85,
                  label: "Model Accuracy",
                  suffix: "%",
                  color: "#FF7043",
                  icon: <PieChart className="w-8 h-8 text-red-500/70" />,
                  description: "Average accuracy across all deployed models"
                }
              ]}
              columns={3}
              animationDelay={0.3}
            />
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-purple-500/50 transform -translate-x-1/2 hidden md:block" />

            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-16 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 p-6">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                        <span className="text-xl font-bold text-red-500">{index + 1}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-6">{step.description}</p>

                      <ul className="space-y-2">
                        {step.points.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span className="text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2 p-6">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <OptimizedImage
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto"
                        fallbackClassName="bg-gradient-to-br from-red-900/20 to-purple-900/20 aspect-video flex items-center justify-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hidden md:block" />
              </motion.div>
            ))}
          </div>

          {/* Line Chart */}
          <div className="mt-20">
            <DataVisualization
              title="AI Implementation Timeline"
              description="Typical project timeline showing key milestones and deliverables"
              type="line"
              data={[
                { label: 'Week 1', value: 10, color: 'rgba(255, 0, 0, 0.8)' },
                { label: 'Week 3', value: 25, color: 'rgba(255, 50, 0, 0.8)' },
                { label: 'Week 6', value: 45, color: 'rgba(255, 100, 0, 0.8)' },
                { label: 'Week 9', value: 65, color: 'rgba(255, 150, 0, 0.8)' },
                { label: 'Week 12', value: 90, color: 'rgba(255, 200, 0, 0.8)' },
                { label: 'Week 14', value: 100, color: 'rgba(255, 250, 0, 0.8)' }
              ]}
              height={300}
              animationDelay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI & ML Use Cases</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world applications of our AI and machine learning solutions
            </p>
          </div>

          <UseCaseShowcase
            title="Success Stories"
            description="Explore how our AI solutions have transformed businesses across industries"
            useCases={[
              {
                title: "Customer Churn Prediction",
                description: "A leading retail chain was struggling with high customer churn rates, impacting revenue and growth.",
                challenge: "The client needed to identify at-risk customers before they churned, but their manual analysis was ineffective and reactive.",
                solution: "We developed a machine learning model that analyzed customer behavior patterns, purchase history, and engagement metrics to predict churn likelihood with 92% accuracy.",
                results: [
                  "24% reduction in customer churn rate",
                  "18% increase in customer retention campaigns ROI",
                  "35% improvement in identifying high-value at-risk customers"
                ],
                image: "/images/ai-ml/ai-usecase-1.webp",
                technologies: ["TensorFlow", "Python", "SQL", "Tableau"]
              },
              {
                title: "Automated Document Processing",
                description: "A financial services firm was spending thousands of hours manually processing documents, causing delays and errors.",
                challenge: "The client needed to automate the extraction and processing of information from various document types while maintaining accuracy.",
                solution: "We implemented an AI-powered document processing system using OCR and NLP to automatically extract, classify, and validate information from multiple document formats.",
                results: [
                  "85% reduction in document processing time",
                  "93% accuracy in information extraction",
                  "67% decrease in processing costs",
                  "Staff redeployed to higher-value tasks"
                ],
                image: "/images/ai-ml/ai-usecase-2.webp",
                technologies: ["OCR", "NLP", "Python", "AWS"]
              },
              {
                title: "Predictive Maintenance System",
                description: "A manufacturing company was experiencing costly unplanned downtime due to equipment failures.",
                challenge: "The client needed to predict equipment failures before they occurred to schedule maintenance proactively and minimize disruption.",
                solution: "We developed a predictive maintenance system using IoT sensors and machine learning to monitor equipment health in real-time and forecast potential failures.",
                results: [
                  "37% decrease in unplanned downtime",
                  "42% reduction in maintenance costs",
                  "22% increase in equipment lifespan",
                  "ROI achieved within 8 months"
                ],
                image: "/images/ai-ml/ai-usecase-3.webp",
                technologies: ["IoT", "Python", "TensorFlow", "Azure"]
              },
              {
                title: "Personalized Recommendation Engine",
                description: "An e-commerce platform wanted to increase average order value through personalized product recommendations.",
                challenge: "The client's generic recommendation system wasn't driving meaningful engagement or sales increases.",
                solution: "We built a sophisticated recommendation engine that analyzed user behavior, purchase history, and product relationships to provide highly personalized suggestions.",
                results: [
                  "28% increase in average order value",
                  "32% improvement in click-through rates",
                  "19% higher conversion rate",
                  "41% increase in cross-selling success"
                ],
                image: "/images/ai-ml/ai-usecase-4.webp",
                technologies: ["Collaborative Filtering", "Python", "AWS", "Redis"]
              }
            ]}
            animationDelay={0.3}
          />

          {/* ROI Visualization */}
          <div className="mt-20">
            <DataVisualization
              title="AI Implementation ROI"
              description="Average return on investment timeline for our AI solutions"
              type="line"
              data={[
                { label: 'Month 1', value: -20, color: 'rgba(255, 0, 0, 0.8)' },
                { label: 'Month 3', value: 0, color: 'rgba(255, 50, 0, 0.8)' },
                { label: 'Month 6', value: 40, color: 'rgba(255, 100, 0, 0.8)' },
                { label: 'Month 9', value: 90, color: 'rgba(255, 150, 0, 0.8)' },
                { label: 'Month 12', value: 150, color: 'rgba(255, 200, 0, 0.8)' },
                { label: 'Month 18', value: 220, color: 'rgba(255, 250, 0, 0.8)' }
              ]}
              height={300}
              animationDelay={0.5}
            />
          </div>

          {/* Additional Charts Section */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Data Visualizations</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore our AI metrics through interactive visualizations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Performance Chart */}
              <DataVisualization
                title="AI Performance by Industry"
                description="Comparative analysis of AI performance metrics across different industries"
                type="bar"
                data={[
                  { label: 'Retail', value: 85, color: 'rgba(255, 0, 0, 0.8)' },
                  { label: 'Finance', value: 92, color: 'rgba(255, 50, 0, 0.8)' },
                  { label: 'Healthcare', value: 78, color: 'rgba(255, 100, 0, 0.8)' },
                  { label: 'Manufacturing', value: 88, color: 'rgba(255, 150, 0, 0.8)' },
                  { label: 'Logistics', value: 82, color: 'rgba(255, 200, 0, 0.8)' }
                ]}
                height={400}
                animationDelay={0.3}
              />

              {/* Technology Distribution Chart */}
              <DataVisualization
                title="AI Technology Distribution"
                description="Breakdown of AI technologies used in our solutions"
                type="bar"
                data={[
                  { label: 'Machine Learning', value: 35, color: 'rgba(255, 82, 82, 0.8)' },
                  { label: 'Deep Learning', value: 25, color: 'rgba(255, 123, 82, 0.8)' },
                  { label: 'Natural Language Processing', value: 20, color: 'rgba(255, 163, 82, 0.8)' },
                  { label: 'Computer Vision', value: 15, color: 'rgba(255, 212, 82, 0.8)' },
                  { label: 'Reinforcement Learning', value: 5, color: 'rgba(82, 255, 123, 0.8)' }
                ]}
                height={400}
                animationDelay={0.5}
              />
            </div>

            {/* Timeline Chart */}
            <DataVisualization
              title="AI Implementation Timeline & Metrics"
              description="Visualization of AI project metrics over time"
              type="line"
              data={[
                { label: 'Month 1', value: 20, color: 'rgba(255, 0, 0, 0.8)' },
                { label: 'Month 2', value: 40, color: 'rgba(255, 50, 0, 0.8)' },
                { label: 'Month 3', value: 55, color: 'rgba(255, 100, 0, 0.8)' },
                { label: 'Month 4', value: 70, color: 'rgba(255, 150, 0, 0.8)' },
                { label: 'Month 5', value: 85, color: 'rgba(255, 200, 0, 0.8)' },
                { label: 'Month 6', value: 95, color: 'rgba(255, 250, 0, 0.8)' }
              ]}
              height={400}
              animationDelay={0.7}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ServiceCTA
            title="Ready to Transform Your Business with AI?"
            description="Let's discuss how our AI and machine learning solutions can drive innovation and efficiency for your organization."
            buttonText="Get Started"
            to="/contact"
          />
        </div>
      </section>
    </PageTransition>
  );
};

// Solution data
const solutions = [
  {
    title: 'Predictive Analytics',
    description: 'Forecast trends and behaviors with advanced predictive models',
    icon: LineChart,
    features: [
      'Customer behavior prediction',
      'Sales forecasting',
      'Inventory optimization',
      'Risk assessment'
    ]
  },
  {
    title: 'Natural Language Processing',
    description: 'Extract insights from text data with cutting-edge NLP',
    icon: Bot,
    features: [
      'Sentiment analysis',
      'Text classification',
      'Named entity recognition',
      'Automated summarization'
    ]
  },
  {
    title: 'Computer Vision',
    description: 'Analyze and interpret visual information using AI',
    icon: Brain,
    features: [
      'Image recognition',
      'Object detection',
      'Visual inspection',
      'Facial recognition'
    ]
  },
  {
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation',
    icon: Cpu,
    features: [
      'Workflow optimization',
      'Document processing',
      'Decision automation',
      'Quality control'
    ]
  },
  {
    title: 'Data Mining',
    description: 'Discover patterns and insights from large datasets',
    icon: Database,
    features: [
      'Pattern recognition',
      'Anomaly detection',
      'Cluster analysis',
      'Association rule learning'
    ]
  },
  {
    title: 'Recommendation Systems',
    description: 'Personalize user experiences with AI-powered recommendations',
    icon: Network,
    features: [
      'Product recommendations',
      'Content personalization',
      'Cross-selling suggestions',
      'User preference learning'
    ]
  }
];

// Process data
const process = [
  {
    title: 'Discovery & Assessment',
    description: 'We analyze your business needs and identify AI opportunities',
    image: '/images/ai-ml/ai-process-1.webp',
    points: [
      'Business process analysis',
      'Data assessment',
      'Opportunity identification',
      'ROI estimation'
    ]
  },
  {
    title: 'Data Preparation',
    description: 'We collect, clean, and structure your data for AI processing',
    image: '/images/ai-ml/ai-process-2.webp',
    points: [
      'Data collection',
      'Data cleaning',
      'Feature engineering',
      'Data validation'
    ]
  },
  {
    title: 'Model Development',
    description: 'We build and train custom AI models for your specific needs',
    image: '/images/ai-ml/ai-process-3.webp',
    points: [
      'Algorithm selection',
      'Model training',
      'Hyperparameter tuning',
      'Performance evaluation'
    ]
  },
  {
    title: 'Implementation & Integration',
    description: 'We deploy AI solutions and integrate them with your systems',
    image: '/images/ai-ml/ai-process-4.webp',
    points: [
      'API development',
      'System integration',
      'User interface design',
      'Documentation'
    ]
  },
  {
    title: 'Monitoring & Optimization',
    description: 'We continuously monitor and improve your AI solutions',
    image: '/images/ai-ml/ai-process-5.webp',
    points: [
      'Performance monitoring',
      'Model retraining',
      'Continuous improvement',
      'ROI tracking'
    ]
  }
];

// Use case data
const useCases = [
  {
    title: 'Customer Churn Prediction',
    description: 'Implemented a machine learning model to predict customer churn with 92% accuracy, enabling proactive retention strategies.',
    image: '/images/ai-ml/ai-usecase-1.webp',
    industry: 'Retail & E-commerce',
    results: '24% reduction in customer churn rate',
    technologies: ['TensorFlow', 'Python', 'SQL', 'Tableau']
  },
  {
    title: 'Automated Document Processing',
    description: 'Developed an AI-powered system to automatically extract, classify, and process information from various document types.',
    image: '/images/ai-ml/ai-usecase-2.webp',
    industry: 'Financial Services',
    results: '85% reduction in processing time',
    technologies: ['OCR', 'NLP', 'Python', 'AWS']
  },
  {
    title: 'Predictive Maintenance System',
    description: 'Created a predictive maintenance solution using IoT sensors and machine learning to forecast equipment failures before they occur.',
    image: '/images/ai-ml/ai-usecase-3.webp',
    industry: 'Manufacturing',
    results: '37% decrease in unplanned downtime',
    technologies: ['IoT', 'Python', 'TensorFlow', 'Azure']
  },
  {
    title: 'Personalized Recommendation Engine',
    description: 'Built a sophisticated recommendation system that analyzes user behavior to provide highly personalized product suggestions.',
    image: '/images/ai-ml/ai-usecase-4.webp',
    industry: 'E-commerce',
    results: '28% increase in average order value',
    technologies: ['Collaborative Filtering', 'Python', 'AWS', 'Redis']
  }
];

export default AiMachineLearning;
