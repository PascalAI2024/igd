import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Zap, Brain, Globe, BarChart2 } from 'lucide-react';
import TypeWriter from './TypeWriter';
import { trackInteraction, trackEngagement } from '../utils/analytics';
import OptimizedImage from './OptimizedImage';

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
    const maxParticles = 120; // Increased for more visual density
    const connectionDistance = 180; // Extended for wider connection network
    const mouseRadius = 250; // Increased for stronger mouse interaction
    const mousePos = { x: 0, y: 0 };
    let mouseActive = false;

    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1, // Larger particle variation
        speedX: (Math.random() - 0.5) * 0.7, // Faster movement
        speedY: (Math.random() - 0.5) * 0.7,
        color: `rgba(${Math.floor(Math.random() * 50) + 200}, ${Math.floor(Math.random() * 30)}, ${Math.floor(Math.random() * 30)}, `, // Keeping the red theme
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
      // Enhanced trail effect with slower fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
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
            const force = (1 - distance / mouseRadius) * 0.05; // Stronger force for more dynamic interaction
            p.speedX += dx * force;
            p.speedY += dy * force;
          }
        }

        // Apply speed limits - faster for more dynamic movement
        const maxSpeed = 2.5;
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
          p.x, p.y, p.size * 4 // Larger glow radius
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
        ctx.lineWidth = Math.min(p1.size, p2.size) * 0.7; // Thicker connections
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
      image: "/ai-ml-hero.webp"
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

      {/* Enhanced radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.18),transparent_80%)]"></div>

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
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-5 relative z-10">
                  <span className="text-gradient drop-shadow-lg">Building Digital Excellence</span>
                </h1>
                {/* Enhanced glow effect */}
                <div className="absolute -inset-1 bg-red-500/20 blur-3xl rounded-full z-0 opacity-80"></div>
              </div>
              <h2 className="text-2xl md:text-4xl text-gray-200 font-light tracking-wide">
                Where Innovation Meets Results
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center px-6 py-3 rounded-full border border-red-500/30 bg-gradient-to-r from-black/80 to-black/40 backdrop-blur-sm mb-10 shadow-inner"
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
              className="flex flex-col sm:flex-row gap-6 mt-2"
            >
              {/* Primary CTA - Start Project */}
              <div className="relative group">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-purple-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:duration-200 animate-gradient"></div>

                <motion.a
                  href="#contact"
                  onClick={handleStartProjectClick}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center px-8 py-4 bg-black rounded-lg text-white text-lg font-medium overflow-hidden shadow-xl border border-white/10 backdrop-blur-sm"
                >
                  {/* Subtle particle effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 left-[10%] w-2 h-2 bg-white rounded-full animate-float" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute top-[40%] left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
                    <div className="absolute top-[80%] left-[30%] w-1 h-1 bg-white rounded-full animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
                  </div>

                  {/* Button content with enhanced animation */}
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">✨</span>
                    <span className="relative">
                      <span className="block">Start Your Project</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </span>
                    <span className="relative ml-3 w-6 h-6 flex items-center justify-center overflow-hidden">
                      <ArrowRight className="w-6 h-6 absolute group-hover:translate-x-8 group-hover:opacity-0 transition-all duration-300" />
                      <ArrowRight className="w-6 h-6 absolute -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </span>
                  </span>
                </motion.a>
              </div>

              {/* Secondary CTA - Explore Solutions */}
              <motion.a
                href="#services"
                onClick={handleExploreSolutionsClick}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-8 py-4 border border-red-500/20 rounded-lg text-white text-lg font-medium overflow-hidden bg-black/40 backdrop-blur-sm shadow-lg"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-lg p-[1px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-purple-500/30 to-red-500/30 animate-gradient rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  <span className="relative">
                    <span className="block">Explore Solutions</span>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Modern feature showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="relative w-full max-w-xl">
              {/* Dynamic background elements */}
              <div className="absolute -inset-10 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-red-500/10 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-red-500/5 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Floating particles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-xl animate-float" style={{ animationDuration: '15s' }}></div>
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
                <div className="absolute top-40 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-float" style={{ animationDuration: '18s', animationDelay: '1s' }}></div>
              </div>

              {/* Service showcase */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.5
                  }}
                  className="relative z-10"
                >
                  {/* Modern asymmetrical layout */}
                  <div className="relative">
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-red-500/20 to-purple-500/5 opacity-30 blur-3xl rounded-[30%] z-0"></div>

                    <div className="relative glass-premium rounded-3xl overflow-hidden backdrop-blur-md z-10">
                      <div className="flex flex-col p-8">
                        {/* Icon and title row */}
                        <div className="flex items-center mb-6">
                          <div className="relative mr-4">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-purple-500/20 rounded-full blur-md"></div>
                            <div className="relative w-16 h-16 rounded-full bg-black/80 border border-red-500/30 flex items-center justify-center">
                              {features[activeFeature].icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-gradient">{features[activeFeature].title}</h3>
                            <div className="h-0.5 w-20 bg-gradient-to-r from-red-500 to-transparent mt-2"></div>
                          </div>
                        </div>

                        {/* Content area with asymmetrical design */}
                        <div className="grid grid-cols-5 gap-6">
                          {/* Description column */}
                          <div className="col-span-2">
                            <p className="text-gray-200 text-lg leading-relaxed">{features[activeFeature].description}</p>

                            <motion.a
                              href={
                                activeFeature === 0 ? "/services/web-development" :
                                activeFeature === 1 ? "/services/ai-machine-learning" :
                                "/services/digital-marketing"
                              }
                              className="group inline-flex items-center mt-6 text-red-400 hover:text-red-300 transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <span>Explore service</span>
                              <ArrowRight className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.a>
                          </div>

                          {/* Image column */}
                          <div className="col-span-3 relative">
                            <div className="relative h-64 rounded-2xl overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                              <OptimizedImage
                                src={features[activeFeature].image}
                                alt={features[activeFeature].title}
                                className="w-full h-full object-cover object-center"
                              />

                              {/* Decorative elements */}
                              <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full z-20 opacity-60"></div>
                              <div className="absolute bottom-4 left-4 w-12 h-12 border border-red-500/20 rounded-full z-20 opacity-60"></div>

                              {/* Floating action button */}
                              <motion.a
                                href={
                                  activeFeature === 0 ? "/services/web-development" :
                                  activeFeature === 1 ? "/services/ai-machine-learning" :
                                  "/services/digital-marketing"
                                }
                                className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-red-500/90 flex items-center justify-center backdrop-blur-sm border border-red-400/30 shadow-lg"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ArrowRight className="w-5 h-5 text-white" />
                              </motion.a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Modern service indicators */}
              <div className="relative mt-8 flex justify-center space-x-2 z-20">
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className="group relative px-4 py-2"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className={`block text-sm transition-colors duration-300 ${
                      activeFeature === index ? 'text-red-400' : 'text-gray-500 group-hover:text-gray-300'
                    }`}>
                      {feature.title.split(' ')[0]}
                    </span>
                    <span className={`block h-0.5 mt-1 transition-all duration-300 ${
                      activeFeature === index ? 'w-full bg-red-500' : 'w-0 group-hover:w-full bg-gray-700 group-hover:bg-gray-500'
                    }`}></span>
                  </motion.button>
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
