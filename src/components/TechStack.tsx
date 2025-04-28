import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Server, Cpu, Cloud, ChevronRight } from "lucide-react";

interface Technology {
  name: string;
  logo: string;
  category: string;
  description: string;
  features: string[];
  color: string;
}

const technologies: Technology[] = [
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    category: "Frontend",
    description: "A JavaScript library for building user interfaces with reusable components",
    features: ["Component-based architecture", "Virtual DOM for performance", "Declarative UI development", "Rich ecosystem"],
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
    description: "React framework that enables server-side rendering and static site generation",
    features: ["Server-side rendering", "Static site generation", "API routes", "Optimized performance"],
    color: "#000000"
  },
  {
    name: "TypeScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    category: "Frontend",
    description: "Strongly typed programming language that builds on JavaScript",
    features: ["Static type checking", "Enhanced IDE support", "Early error detection", "Better code organization"],
    color: "#3178C6"
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    category: "Frontend",
    description: "Utility-first CSS framework for rapidly building custom designs",
    features: ["Utility-first approach", "Responsive design", "Component-friendly", "Customizable"],
    color: "#38B2AC"
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    category: "Backend",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    features: ["Event-driven architecture", "Non-blocking I/O", "Vast package ecosystem", "Scalable applications"],
    color: "#339933"
  },
  {
    name: "Express",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    category: "Backend",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    features: ["Middleware support", "Routing system", "Template engine integration", "HTTP utility methods"],
    color: "#000000"
  },
  {
    name: "MongoDB",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    category: "Backend",
    description: "Document-oriented NoSQL database for modern applications",
    features: ["Document-based storage", "Flexible schema", "Horizontal scaling", "High availability"],
    color: "#47A248"
  },
  {
    name: "PostgreSQL",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
    category: "Backend",
    description: "Powerful, open source object-relational database system",
    features: ["ACID compliance", "JSON support", "Extensible", "Robust feature set"],
    color: "#336791"
  },
  {
    name: "Python",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    category: "AI/ML",
    description: "Versatile programming language with powerful libraries for AI/ML",
    features: ["Easy to learn and use", "Extensive libraries", "Cross-platform", "Large community"],
    color: "#3776AB"
  },
  {
    name: "TensorFlow",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
    category: "AI/ML",
    description: "Open-source platform for machine learning and artificial intelligence",
    features: ["End-to-end ML platform", "Model deployment", "Distributed training", "Visualization tools"],
    color: "#FF6F00"
  },
  {
    name: "PyTorch",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    category: "AI/ML",
    description: "Open source machine learning framework for research and production",
    features: ["Dynamic computation graph", "GPU acceleration", "Pythonic interface", "Research-friendly"],
    color: "#EE4C2C"
  },
  {
    name: "scikit-learn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    category: "AI/ML",
    description: "Machine learning library for Python with simple and efficient tools",
    features: ["Classification algorithms", "Regression methods", "Clustering techniques", "Model selection"],
    color: "#F7931E"
  },
  {
    name: "AWS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    category: "Cloud",
    description: "Comprehensive cloud computing platform with over 200 services",
    features: ["Global infrastructure", "Security compliance", "Pay-as-you-go pricing", "Scalable services"],
    color: "#FF9900"
  },
  {
    name: "Google Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    category: "Cloud",
    description: "Suite of cloud computing services running on Google infrastructure",
    features: ["AI and ML tools", "Data analytics", "Serverless computing", "Global network"],
    color: "#4285F4"
  },
  {
    name: "Docker",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
    category: "Cloud",
    description: "Platform for developing, shipping, and running applications in containers",
    features: ["Containerization", "Consistent environments", "Isolation", "Efficient resource usage"],
    color: "#2496ED"
  },
  {
    name: "Kubernetes",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg",
    category: "Cloud",
    description: "Open-source system for automating deployment and scaling of containerized applications",
    features: ["Container orchestration", "Auto-scaling", "Self-healing", "Service discovery"],
    color: "#326CE5"
  }
];

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const [activeTech, setActiveTech] = useState<Technology | null>(null);

  const categories = [
    { id: "Frontend", name: "Frontend", icon: <Code className="w-5 h-5" />, color: "#61DAFB" },
    { id: "Backend", name: "Backend", icon: <Server className="w-5 h-5" />, color: "#339933" },
    { id: "AI/ML", name: "AI/ML", icon: <Cpu className="w-5 h-5" />, color: "#FF6F00" },
    { id: "Cloud", name: "Cloud", icon: <Cloud className="w-5 h-5" />, color: "#FF9900" }
  ];

  const filteredTechnologies = technologies.filter(tech => tech.category === activeCategory);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gradient-to-r from-red-500/10 to-red-500/5 rounded-full px-4 py-2 mb-4 border border-red-500/10"
          >
            <Cpu className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500 font-semibold">Cutting-Edge Technology Stack</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gradient mb-4"
          >
            Powered by Innovation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We leverage cutting-edge technologies to deliver powerful, scalable solutions
            that drive business growth and efficiency
          </motion.p>
        </div>

        {/* Infinite Scroll Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative mb-20"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

          <div className="flex space-x-12 animate-scroll">
            {[...technologies, ...technologies].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-none group relative"
                onClick={() => {
                  setActiveCategory(tech.category);
                  setActiveTech(tech);
                }}
              >
                <div
                  className="w-24 h-24 bg-black/60 rounded-xl p-4 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:bg-black/80 cursor-pointer"
                  style={{
                    boxShadow: `0 0 20px 0 ${tech.color}10`
                  }}
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10 backdrop-blur-sm z-20">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 border-t border-l border-white/10 rotate-45" />
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveTech(null);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className={`relative flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-500/20 to-red-500/5 text-white'
                    : 'bg-black/60 text-gray-400 hover:bg-black/80 hover:text-white'
                }`}
                style={{
                  border: activeCategory === category.id
                    ? `1px solid ${category.color}40`
                    : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className={`mr-2 ${activeCategory === category.id ? 'text-red-500' : ''}`}>
                  {category.icon}
                </div>
                <span>{category.name}</span>

                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTechTab"
                    className="absolute inset-0 rounded-lg z-0"
                    style={{
                      boxShadow: `0 0 20px 0 ${category.color}20`
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 bg-black/60 rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  activeTech?.name === tech.name
                    ? 'border-white/20 shadow-lg'
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{
                  boxShadow: activeTech?.name === tech.name ? `0 0 30px 0 ${tech.color}20` : 'none'
                }}
                onClick={() => setActiveTech(activeTech?.name === tech.name ? null : tech)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black/80 rounded-lg p-2 mr-4 border border-white/5">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-gray-400">{tech.category}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-500 ml-auto transition-transform ${
                    activeTech?.name === tech.name ? 'rotate-90' : ''
                  }`} />
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {tech.description}
                </p>

                <AnimatePresence>
                  {activeTech?.name === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {tech.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start text-sm"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2" />
                              <span className="text-gray-300">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Technology Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-black to-black/80 rounded-2xl p-8 backdrop-blur-sm border border-white/10 relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-purple-500/10 blur-xl opacity-50 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Technology Expertise That Delivers Results
            </h3>
            <p className="text-gray-300 mb-6">
              Our team stays at the forefront of technology to ensure your business benefits from the latest innovations and best practices.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -5 }}
                  className="bg-black/60 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/5 mx-auto flex items-center justify-center mb-3 border border-red-500/10">
                    <div className="text-red-500">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="text-white font-medium">{category.name}</h4>
                  <p className="text-gray-400 text-xs">
                    {category.id === "Frontend" && "Modern, responsive UIs"}
                    {category.id === "Backend" && "Scalable server solutions"}
                    {category.id === "AI/ML" && "Intelligent automation"}
                    {category.id === "Cloud" && "Reliable infrastructure"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
