import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Blog from '../components/Blog';
import TestimonialsEnhanced from '../components/TestimonialsEnhanced';
import ContactOptions from '../components/ContactOptions';
import PageTransition from '../components/PageTransition';
import InteractiveBackground from '../components/backgrounds/InteractiveBackground';
import { MagneticCursor, createStaggerAnimation, createParallaxEffect } from '../utils/gsapAnimations';
import MetaTags from '../components/MetaTags';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const HomeEnhanced = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const magneticCursorRef = useRef<MagneticCursor | null>(null);

  useEffect(() => {
    // Initialize magnetic cursor
    magneticCursorRef.current = new MagneticCursor();

    const ctx = gsap.context(() => {
      // Enhanced hero animations
      const heroTimeline = gsap.timeline();
      
      // Split hero title into characters for animation
      const heroTitle = heroRef.current?.querySelector('.hero-title');
      if (heroTitle) {
        const originalText = heroTitle.textContent || '';
        heroTitle.innerHTML = originalText.split(' ').map(word => 
          `<span class="word inline-block">${
            word.split('').map(char => 
              `<span class="char inline-block">${char}</span>`
            ).join('')
          }</span>`
        ).join(' ');

        // 3D text reveal
        heroTimeline
          .fromTo('.hero-title .char', 
            {
              opacity: 0,
              y: 100,
              z: -100,
              rotationX: -90,
              transformOrigin: '50% 50% -50',
              transformPerspective: 1000
            },
            {
              opacity: 1,
              y: 0,
              z: 0,
              rotationX: 0,
              duration: 1.2,
              stagger: {
                amount: 0.8,
                from: 'random',
                ease: 'power3.out'
              },
              ease: 'elastic.out(1, 0.5)'
            }
          );
      }

      // Hero subtitle typewriter effect
      const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');
      if (heroSubtitle) {
        const text = heroSubtitle.textContent || '';
        heroSubtitle.textContent = '';
        
        heroTimeline.to(heroSubtitle, {
          text: {
            value: text,
            delimiter: ''
          },
          duration: 2,
          ease: 'none',
          delay: 0.5
        });
      }

      // Hero CTA buttons with magnetic effect
      heroTimeline.fromTo('.hero-cta',
        {
          scale: 0,
          opacity: 0,
          rotationY: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)'
        },
        '-=1'
      );

      // Enhanced service cards animation
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.service-card',
            {
              opacity: 0,
              scale: 0.5,
              rotationY: -45,
              transformOrigin: 'center center',
              transformPerspective: 1000
            },
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.8,
              stagger: {
                amount: 0.6,
                from: 'edges',
                grid: 'auto',
                ease: 'power2.inOut'
              },
              ease: 'back.out(1.7)',
              onComplete: () => {
                // Add hover animations
                document.querySelectorAll('.service-card').forEach(card => {
                  const hoverTl = gsap.timeline({ paused: true });
                  
                  hoverTl
                    .to(card, {
                      scale: 1.05,
                      y: -10,
                      boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)',
                      duration: 0.3,
                      ease: 'power2.out'
                    })
                    .to(card.querySelector('.service-icon'), {
                      rotationY: 360,
                      scale: 1.2,
                      duration: 0.6,
                      ease: 'power2.inOut'
                    }, 0);

                  card.addEventListener('mouseenter', () => hoverTl.play());
                  card.addEventListener('mouseleave', () => hoverTl.reverse());
                });
              }
            }
          );
        }
      });

      // Projects with 3D card flip
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.set('.project-card', {
            transformStyle: 'preserve-3d',
            transformPerspective: 1000
          });

          gsap.fromTo('.project-card',
            {
              opacity: 0,
              rotationY: -180,
              scale: 0.8
            },
            {
              opacity: 1,
              rotationY: 0,
              scale: 1,
              duration: 1,
              stagger: {
                amount: 0.8,
                from: 'start'
              },
              ease: 'power3.out'
            }
          );
        }
      });

      // Tech stack with floating animation
      ScrollTrigger.create({
        trigger: techRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Initial reveal
          gsap.fromTo('.tech-item',
            {
              opacity: 0,
              scale: 0,
              rotation: -180
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: {
                amount: 1,
                from: 'random',
                grid: 'auto'
              },
              ease: 'back.out(2)',
              onComplete: () => {
                // Add floating animation
                document.querySelectorAll('.tech-item').forEach((item, index) => {
                  gsap.to(item, {
                    y: 'random(-20, 20)',
                    x: 'random(-10, 10)',
                    rotation: 'random(-15, 15)',
                    duration: 'random(3, 5)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: index * 0.1
                  });
                });
              }
            }
          );
        }
      });

      // Blog posts with magazine-style reveal
      ScrollTrigger.create({
        trigger: blogRef.current,
        start: 'top 70%',
        onEnter: () => {
          const blogPosts = gsap.utils.toArray('.blog-post');
          
          blogPosts.forEach((post: any, index) => {
            gsap.timeline({
              scrollTrigger: {
                trigger: post,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            })
            .fromTo(post,
              {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                rotationY: index % 2 === 0 ? -30 : 30,
                transformPerspective: 1000
              },
              {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'power3.out'
              }
            )
            .fromTo(post.querySelector('.blog-image'),
              {
                scale: 1.3,
                filter: 'blur(10px)'
              },
              {
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.8,
                ease: 'power2.out'
              },
              0
            );
          });
        }
      });

      // Testimonials with premium effects
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Background gradient animation
          gsap.to('.testimonials-bg', {
            backgroundPosition: '100% 100%',
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'none'
          });

          // Testimonial cards
          gsap.fromTo('.testimonial-card',
            {
              opacity: 0,
              scale: 0.8,
              y: 50,
              filter: 'blur(10px)'
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out'
            }
          );
        }
      });

      // Contact form with morphing background
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Form container animation
          gsap.fromTo('.contact-container',
            {
              opacity: 0,
              scale: 0.9,
              borderRadius: '100px'
            },
            {
              opacity: 1,
              scale: 1,
              borderRadius: '20px',
              duration: 1,
              ease: 'power3.out'
            }
          );

          // Form fields stagger
          gsap.fromTo('.form-field',
            {
              opacity: 0,
              x: -50,
              skewX: -10
            },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out'
            }
          );
        }
      });

      // Parallax effects
      createParallaxEffect('.parallax-slow', 0.3);
      createParallaxEffect('.parallax-medium', 0.5);
      createParallaxEffect('.parallax-fast', 0.8);

      // Section transitions with color shifts
      const sections = gsap.utils.toArray('.section');
      sections.forEach((section: any, index) => {
        const colors = ['#000000', '#0a0a0a', '#111111', '#0a0a0a', '#000000'];
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            gsap.to('body', {
              backgroundColor: colors[index % colors.length],
              duration: 0.8,
              ease: 'power2.inOut'
            });
          },
          onLeaveBack: () => {
            gsap.to('body', {
              backgroundColor: colors[(index - 1) % colors.length] || '#000000',
              duration: 0.8,
              ease: 'power2.inOut'
            });
          }
        });
      });

      // Premium scroll indicator
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Add glitch effect to logo on hover
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.addEventListener('mouseenter', () => {
          const glitchTl = gsap.timeline();
          
          glitchTl
            .to(logo, {
              skewX: 20,
              duration: 0.1
            })
            .to(logo, {
              skewX: -20,
              duration: 0.1
            })
            .to(logo, {
              skewX: 0,
              duration: 0.1
            })
            .to(logo, {
              scaleX: 1.1,
              scaleY: 0.9,
              duration: 0.1
            })
            .to(logo, {
              scaleX: 1,
              scaleY: 1,
              duration: 0.1
            });
        });
      }

    }, heroRef);

    return () => {
      ctx.revert();
      magneticCursorRef.current?.destroy();
    };
  }, []);

  return (
    <PageTransition>
      <MetaTags 
        title="AI-Powered Digital Solutions for Local Businesses"
        description="Transform your business with Ingenious Digital's AI-powered digital marketing, web development, and automation solutions. Get more customers and increase revenue with our expert team in Fort Lauderdale."
        keywords={['digital marketing', 'AI solutions', 'web development', 'business automation', 'SEO', 'Fort Lauderdale', 'local business', 'lead generation']}
      />
      <main className="relative z-10 overflow-hidden">
        {/* Hero section with enhanced animations */}
        <section ref={heroRef} className="section relative min-h-screen">
          <InteractiveBackground height="100vh" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90 z-10"></div>
          <div className="relative z-20">
            <Hero />
          </div>
          
          {/* Scroll indicator */}
          <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            <svg className="w-6 h-10" viewBox="0 0 24 40">
              <rect x="10" y="8" width="4" height="8" fill="currentColor" />
              <path d="M12 2C6.48 2 2 6.48 2 12v16c0 5.52 4.48 10 10 10s10-4.48 10-10V12c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v16c0 4.41-3.59 8-8 8s-8-3.59-8-8V12c0-4.41 3.59-8 8-8z" fill="currentColor" />
            </svg>
          </div>
        </section>
        
        {/* Services section with enhanced animations */}
        <section ref={servicesRef} className="section relative parallax-slow">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-purple-500/5" />
          <Services />
        </section>
        
        {/* Projects with 3D effects */}
        <section ref={projectsRef} className="section relative">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-500/5 via-transparent to-green-500/5 parallax-medium" />
          <Projects />
        </section>
        
        {/* Tech stack with floating elements */}
        <section ref={techRef} className="section relative">
          <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />
          <TechStack />
        </section>
        
        {/* Blog with magazine layout */}
        <section ref={blogRef} className="section relative parallax-fast">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-pink-500/5" />
          <Blog />
        </section>
        
        {/* Testimonials with animated background */}
        <section ref={testimonialsRef} className="section relative">
          <div 
            className="testimonials-bg absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, #ef4444 0%, transparent 50%), radial-gradient(circle at 75% 75%, #a855f7 0%, transparent 50%)',
              backgroundSize: '200% 200%'
            }}
          />
          <TestimonialsEnhanced />
        </section>
        
        {/* Contact options with morphing effects */}
        <section ref={contactRef} className="section relative">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-transparent" />
          <ContactOptions />
        </section>
      </main>
    </PageTransition>
  );
};

export default HomeEnhanced;