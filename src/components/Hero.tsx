import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Zap, Brain, Globe, BarChart2, Layers } from 'lucide-react';
import TypeWriter from './TypeWriter';
import { trackInteraction, trackEngagement } from '../utils/analytics';
import OptimizedImage from './OptimizedImage';

interface Line {
  x: number;
  y: number;
  angle: number;
  length: number;
  progress: number;
  width: number;
  speed: number;
  alpha: number;
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Enhanced particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      connections: number[];
    }

    interface Connection {
      from: number;
      to: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const connections: Connection[] = [];
    const maxParticles = 100;
    const connectionDistance = 150;
    const mouseRadius = 200;
    const mousePos = { x: 0, y: 0 };
    let mouseActive = false;

    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${Math.floor(Math.random() * 50) + 200}, ${Math.floor(Math.random() * 30)}, ${Math.floor(Math.random() * 30)}, `,
        alpha: 0.1 + Math.random() * 0.4,
        connections: []
      });
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mousePos.y = (e.clientY - rect.top) * (canvas.height / rect.height);
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Calculate connections between particles
    const calculateConnections = () => {
      connections.length = 0;

      for (let i = 0; i < particles.length; i++) {
        particles[i].connections = [];

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const alpha = 1 - (distance / connectionDistance);
            connections.push({
              from: i,
              to: j,
              alpha: alpha * 0.5
            });

            particles[i].connections.push(j);
            particles[j].connections.push(i);
          }
        }
      }
    };

    const animate = () => {
      // Clear with fade effect for trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply mouse influence
        if (mouseActive) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (1 - distance / mouseRadius) * 0.03;
            p.speedX += dx * force;
            p.speedY += dy * force;
          }
        }

        // Apply speed limits
        const maxSpeed = 2;
        const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
        if (speed > maxSpeed) {
          p.speedX = (p.speedX / speed) * maxSpeed;
          p.speedY = (p.speedY / speed) * maxSpeed;
        }

        // Apply friction
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();

        // Add glow effect
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        );
        gradient.addColorStop(0, p.color + p.alpha * 0.5 + ')');
        gradient.addColorStop(1, p.color + '0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Calculate connections
      calculateConnections();

      // Draw connections
      for (const conn of connections) {
        const p1 = particles[conn.from];
        const p2 = particles[conn.to];

        // Draw line
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Create gradient for line
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, p1.color + conn.alpha + ')');
        gradient.addColorStop(1, p2.color + conn.alpha + ')');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.min(p1.size, p2.size) * 0.5;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Track hero section engagement
  useEffect(() => {
    if (!sectionRef.current) return;

    let startTime = Date.now();
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            startTime = Date.now();
          } else if (!entry.isIntersecting && isVisible) {
            isVisible = false;
            const duration = (Date.now() - startTime) / 1000; // Convert to seconds
            trackEngagement('hero_section_view', duration, 'hero');
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (isVisible) {
        const duration = (Date.now() - startTime) / 1000;
        trackEngagement('hero_section_view', duration, 'hero');
      }
      observer.disconnect();
    };
  }, []);

  const handleStartProjectClick = () => {
    trackInteraction(
      'hero-cta',
      'start-project-button',
      'click'
    );
  };

  const handleExploreSolutionsClick = () => {
    trackInteraction(
      'hero-cta',
      'explore-solutions-button',
      'click'
    );
  };

  const handleScrollIndicatorClick = () => {
    trackInteraction(
      'hero-scroll',
      'scroll-indicator',
      'click'
    );
  };

  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Stunning, high-performance websites that convert visitors into customers",
      image: "/images/web-dev/desktop.webp"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Harness the power of artificial intelligence to automate and optimize your business",
      image: "/images/ai-ml/ai-ml-hero.webp"
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Data-driven strategies to increase your online visibility and drive more leads",
      image: "/images/digital-marketing/analytics.webp"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Background canvas animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95"></div>

      {/* Feature image background - very subtle */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.08),transparent_70%)]"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.4)_100%)]"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
          {/* Left column - Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            {/* Terminal-style header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-black/60 backdrop-blur-sm border border-red-500/10 rounded-lg p-3 mb-8 w-fit"
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1">
                  <Code2 className="w-5 h-5 text-red-500" />
                  <span className="text-gray-400 text-sm font-mono">sudo transform --optimize</span>
                  <Zap className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 relative z-10">
                  <span className="text-gradient">Building Digital Excellence</span>
                </h1>
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-red-500/5 blur-2xl rounded-full z-0 opacity-50"></div>
              </div>
              <h2 className="text-2xl md:text-3xl text-gray-400 font-light">
                Where Innovation Meets Results
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-red-500/20 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm mb-8 shadow-inner"
            >
              <span className="animate-pulse mr-2 text-red-500">●</span>
              <TypeWriter
                words={[
                  'Digital Marketing & SEO',
                  'AI & Machine Learning',
                  'Web Development',
                  'Lead Generation'
                ]}
                delay={80}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#contact"
                onClick={handleStartProjectClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white font-medium overflow-hidden shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>

              <motion.a
                href="#services"
                onClick={handleExploreSolutionsClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-8 py-4 border border-red-500/20 rounded-lg text-white font-medium overflow-hidden bg-black/50"
              >
                <span className="relative z-10">Explore Solutions</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Feature showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* 3D rotating feature cards */}
              <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.5
                    }}
                    className="bg-gradient-to-br from-black to-gray-900/80 backdrop-blur-md border border-red-500/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px -5px rgba(255, 0, 0, 0.1)"
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Glowing icon */}
                      <div className="relative w-20 h-20 mb-6">
                        <div className="absolute inset-0 bg-red-500/5 rounded-full blur-xl"></div>
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-500/20 to-red-800/5 flex items-center justify-center border border-red-500/10">
                          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                            {features[activeFeature].icon}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-3 text-gradient">{features[activeFeature].title}</h3>
                      <p className="text-gray-400 mb-6">{features[activeFeature].description}</p>

                      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-6 border border-white/5 shadow-lg">
                        <OptimizedImage
                          src={features[activeFeature].image}
                          alt={features[activeFeature].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                        {/* Animated overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      <a
                        href={`/services/${features[activeFeature].title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group relative inline-flex items-center px-4 py-2 overflow-hidden rounded-lg bg-black border border-red-500/20 text-white transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center">
                          Learn more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Feature indicators */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeFeature === index ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    aria-label={`View ${features[index].title}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          onClick={handleScrollIndicatorClick}
        >
          <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
            <span className="text-sm text-gray-400 mb-2">Discover More</span>
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-full blur-md"></div>
              <div className="relative w-6 h-10 border border-red-500/30 rounded-full p-1 bg-black/50 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce mx-auto" />
              </div>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
