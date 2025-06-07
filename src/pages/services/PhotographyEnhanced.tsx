import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sun, Cloud, Aperture, Zap, Shield, Award, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../../components/PageTransition';
import FeatureShowcase from '../../components/services/photography/FeatureShowcase';
import ProcessFlow from '../../components/services/photography/ProcessFlow';
import TechnologyStack from '../../components/services/photography/TechnologyStack';
import GSAPPortfolioShowcase from '../../components/services/photography/GSAPPortfolioShowcase';
import { MagneticCursor, createTextReveal, createCounter, createStaggerAnimation } from '../../utils/gsapAnimations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PhotographyEnhanced = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const magneticCursorRef = useRef<MagneticCursor | null>(null);

  const showcaseMetrics = [
    { 
      value: '4000',
      suffix: '+',
      label: 'Photos Delivered',
      trend: 'Monthly',
      icon: Camera
    },
    { 
      value: '100',
      suffix: '%',
      label: 'Client Satisfaction',
      trend: 'Guaranteed',
      icon: Sun
    },
    { 
      value: '24',
      suffix: 'hr',
      label: 'Turnaround Time',
      trend: 'Fast Delivery',
      icon: Cloud
    }
  ];

  const premiumFeatures = [
    {
      icon: Aperture,
      title: "Professional Equipment",
      description: "State-of-the-art cameras and lighting equipment for perfect shots"
    },
    {
      icon: Zap,
      title: "Rapid Editing",
      description: "Quick turnaround with professional post-processing"
    },
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind"
    },
    {
      icon: Award,
      title: "Award-Winning",
      description: "Recognized for excellence in commercial photography"
    }
  ];

  useEffect(() => {
    // Initialize magnetic cursor
    magneticCursorRef.current = new MagneticCursor();

    // Hero animations with GSAP
    const ctx = gsap.context(() => {
      // Split text for hero title animation
      const heroTitle = heroRef.current?.querySelector('.hero-title');
      if (heroTitle) {
        const text = heroTitle.textContent || '';
        heroTitle.innerHTML = text.split('').map(char => 
          `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');

        gsap.fromTo('.char', 
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
            transformOrigin: '50% 50% -50'
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: heroTitle,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Hero subtitle animation
      gsap.fromTo('.hero-subtitle',
        {
          opacity: 0,
          y: 30,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          delay: 0.5,
          ease: 'power3.out'
        }
      );

      // Animate hero background gradient
      gsap.to('.hero-gradient', {
        backgroundPosition: '100% 100%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });

      // Stats counter animations
      if (statsRef.current) {
        showcaseMetrics.forEach((metric, index) => {
          const statElement = statsRef.current?.querySelector(`.stat-${index}`);
          if (statElement) {
            createCounter(statElement as HTMLElement, parseInt(metric.value), {
              duration: 2.5,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: statElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            });
          }
        });
      }

      // Feature cards entrance animation
      createStaggerAnimation('.feature-card', {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        },
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 70%'
        }
      });

      // CTA section premium animation
      gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
      .fromTo('.cta-bg', 
        {
          scale: 0.8,
          opacity: 0,
          borderRadius: '100px'
        },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '20px',
          duration: 1,
          ease: 'power3.out'
        }
      )
      .fromTo('.cta-content > *', 
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.5'
      );

      // Floating animation for icons
      gsap.utils.toArray('.floating-icon').forEach((icon: any, index) => {
        gsap.to(icon, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      });

      // Parallax effects
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

    }, heroRef);

    return () => {
      ctx.revert();
      magneticCursorRef.current?.destroy();
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-black overflow-hidden">
        {/* Enhanced Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          <div className="parallax-bg absolute inset-0">
            <div className="hero-gradient absolute inset-0 bg-gradient-to-br from-red-600/20 via-purple-600/20 to-pink-600/20" 
                 style={{ backgroundSize: '200% 200%' }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center bg-red-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-red-500/20"
              >
                <Camera className="w-6 h-6 text-red-500 mr-3 floating-icon" />
                <span className="text-red-500 font-bold text-lg">Professional Photography</span>
              </motion.div>

              <h1 className="hero-title text-6xl md:text-8xl font-bold text-gradient mb-6">
                Capture Excellence
              </h1>
              
              <p className="hero-subtitle text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                Transform your business with stunning photography that tells your story and captivates your audience
              </p>

              {/* Enhanced Stats */}
              <div ref={statsRef} className="grid grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                {showcaseMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-500 to-purple-500 rounded-xl mb-4">
                        <metric.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl font-bold text-white mb-1">
                        <span className={`stat-${index}`}>0</span>
                        <span>{metric.suffix}</span>
                      </div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                      {metric.trend && (
                        <div className="flex items-center justify-center text-sm mt-2">
                          <span className="text-green-500 font-semibold">{metric.trend}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#portfolio"
                  className="magnetic-target inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
                >
                  <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Portfolio
                </a>
                <a
                  href="/contact"
                  className="magnetic-target inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section ref={featuresRef} className="py-20 bg-gradient-to-b from-black to-gray-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gradient mb-4">Why Choose Our Photography</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Experience the difference professional photography makes for your brand
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/50 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Original Features Section */}
        <section className="py-20 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive photography solutions tailored to your needs
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A systematic approach to delivering excellence
              </p>
            </div>

            <ProcessFlow />
          </div>
        </section>

        {/* GSAP Portfolio Showcase */}
        <section id="portfolio" className="py-20 bg-black/50">
          <GSAPPortfolioShowcase />
        </section>

        {/* Technology Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gradient mb-4">Our Equipment</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Professional gear for exceptional results
              </p>
            </div>

            <TechnologyStack />
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section ref={ctaRef} className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="cta-bg bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-2xl p-12 backdrop-blur-sm border border-red-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-purple-500/5 animate-pulse" />
              <div className="cta-content relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gradient mb-6">
                  Ready to Elevate Your Visual Story?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Let's create stunning photography that captures your brand's essence and drives results.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="magnetic-target inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 group"
                  >
                    Start Your Project
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="#portfolio"
                    className="magnetic-target inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    View More Work
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PhotographyEnhanced;