import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FadeIn, 
  SlideIn, 
  SlideBlur, 
  ScaleIn, 
  StaggerContainer, 
  InteractiveWrapper,
  RevealOnScroll,
  LoadingAnimation,
  ErrorAnimation,
  AnimationComposer
} from './AnimationWrappers';
import animationSystem from '../styles/animation-system';
import { 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Shield, 
  Rocket,
  ArrowRight,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

/**
 * Real-world showcase of animation system usage
 * This component demonstrates practical implementations
 * of the animation design system in various UI scenarios
 */
const AnimationShowcase: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technology',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Lightning-fast applications optimized for speed',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Solutions that scale across borders and languages',
      color: 'from-green-500 to-green-600',
    },
  ];

  const stats = [
    { value: '99%', label: 'Client Satisfaction' },
    { value: '500+', label: 'Projects Completed' },
    { value: '50+', label: 'Team Members' },
    { value: '10+', label: 'Years Experience' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Hero Section with Premium Animations */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, red 0%, transparent 50%), radial-gradient(circle at 80% 80%, blue 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Main heading with composed animations */}
          <AnimationComposer
            animations={['fade', 'scale']}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                Animation Design System
              </span>
              <SlideBlur direction="up" delay={0.2}>
                <span className="block text-3xl md:text-4xl mt-4 text-gray-300">
                  Premium Animations Made Simple
                </span>
              </SlideBlur>
            </h1>
          </AnimationComposer>

          {/* CTA Buttons with interactions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <InteractiveWrapper hoverType="lift" tapType="press">
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg font-semibold flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </InteractiveWrapper>

            <InteractiveWrapper hoverType="glow" tapType="scale">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold">
                View Examples
              </button>
            </InteractiveWrapper>
          </div>

          {/* Animated stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StaggerContainer staggerDelay={0.1}>
              {stats.map((stat, index) => (
                <SlideIn key={index} direction="up">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl md:text-5xl font-bold text-red-500 mb-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </SlideIn>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section with Staggered Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll threshold={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Our Services
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerContainer staggerDelay={0.1}>
              {services.map((service, index) => (
                <RevealOnScroll key={index} threshold={0.3}>
                  <InteractiveWrapper hoverType="lift" tapType="scale">
                    <motion.div
                      className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 h-full"
                      whileHover={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <motion.div
                        className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </motion.div>
                  </InteractiveWrapper>
                </RevealOnScroll>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Interactive States Demo
            </h2>
          </RevealOnScroll>

          <div className="space-y-8">
            {/* Loading State Demo */}
            <div className="p-8 bg-white/5 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Loading States</h3>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => setIsLoading(!isLoading)}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Toggle Loading
                </button>
                
                {isLoading && (
                  <LoadingAnimation type="pulse">
                    <div className="w-32 h-10 bg-white/10 rounded-lg" />
                  </LoadingAnimation>
                )}
              </div>
            </div>

            {/* Error State Demo */}
            <div className="p-8 bg-white/5 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Error States</h3>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    setShowError(true);
                    setTimeout(() => setShowError(false), 2000);
                  }}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Trigger Error
                </button>
                
                <ErrorAnimation type="shake" trigger={showError}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span>Error occurred!</span>
                  </div>
                </ErrorAnimation>
              </div>
            </div>

            {/* Success State Demo */}
            <div className="p-8 bg-white/5 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Success States</h3>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 2000);
                  }}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Trigger Success
                </button>
                
                {showSuccess && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                    <span>Success!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Complex Animations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Animation Features
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Performance */}
            <RevealOnScroll>
              <motion.div
                className="relative p-8 bg-gradient-to-br from-red-900/20 to-transparent rounded-xl border border-red-500/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative z-10">
                  <Rocket className="w-12 h-12 text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">60 FPS Performance</h3>
                  <p className="text-gray-400">
                    Optimized animations that maintain smooth 60fps even on complex interactions
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Feature 2: Accessibility */}
            <RevealOnScroll delay={0.1}>
              <motion.div
                className="relative p-8 bg-gradient-to-br from-blue-900/20 to-transparent rounded-xl border border-blue-500/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
                <div className="relative z-10">
                  <Shield className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Accessibility First</h3>
                  <p className="text-gray-400">
                    Respects reduced motion preferences and maintains WCAG compliance
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Feature 3: Developer Experience */}
            <RevealOnScroll delay={0.2}>
              <motion.div
                className="relative p-8 bg-gradient-to-br from-green-900/20 to-transparent rounded-xl border border-green-500/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                  }}
                />
                <div className="relative z-10">
                  <Code2 className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Developer Friendly</h3>
                  <p className="text-gray-400">
                    Simple, composable components that make animation implementation a breeze
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Simple to Implement
            </h2>
          </RevealOnScroll>

          <SlideBlur direction="up">
            <div className="bg-black/80 rounded-xl p-8 border border-white/10">
              <pre className="text-sm md:text-base overflow-x-auto">
                <code className="language-jsx text-gray-300">
{`// Import animation components
import { SlideIn, InteractiveWrapper } from './AnimationWrappers';

// Use with any component
<SlideIn direction="up" delay={0.2}>
  <InteractiveWrapper hoverType="lift">
    <Card>
      Your content here
    </Card>
  </InteractiveWrapper>
</SlideIn>`}
                </code>
              </pre>
            </div>
          </SlideBlur>
        </div>
      </section>
    </div>
  );
};

export default AnimationShowcase;