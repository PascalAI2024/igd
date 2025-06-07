import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Blog from '../components/Blog';
import TestimonialsEnhanced from '../components/TestimonialsEnhanced';
import ContactOptions from '../components/ContactOptions';
import PageTransition from '../components/PageTransition';
import InteractiveBackground from '../components/backgrounds/InteractiveBackground';
import ScrollReveal, { StaggerReveal } from '../components/effects/ScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  // Initialize page-level animations
  useEffect(() => {
    // Create a timeline for the page sections
    const sections = document.querySelectorAll('.section');
    
    // Set up scroll-based navigation highlights
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleClass: {
          targets: section,
          className: 'active'
        },
        onEnter: () => {
          // Enhanced section enter effect
          gsap.to(section, { 
            backgroundColor: 'rgba(17, 17, 17, 1)',
            duration: 0.5,
            ease: 'power2.out'
          });
        },
        onLeave: () => {
          gsap.to(section, { 
            backgroundColor: 'rgba(0, 0, 0, 1)',
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  return (
    <PageTransition>
      
      <main className="relative z-10">
        {/* Hero section with 3D interactive background */}
        <section className="relative min-h-screen">
          <InteractiveBackground height="100vh" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/90 z-10"></div>
          <div className="relative z-20">
            <Hero />
          </div>
        </section>
        
        {/* Services section with scroll animations */}
        <ScrollReveal 
          animation="fade" 
          className="section relative"
          threshold={0.1}
          duration={0.7}
        >
          <Services />
        </ScrollReveal>
        
        {/* Projects with staggered reveal */}
        <StaggerReveal 
          className="section relative"
          itemSelector=".project-card"
          staggerAmount={0.15}
        >
          <Projects />
        </StaggerReveal>
        
        {/* Tech stack with scroll-triggered animations */}
        <ScrollReveal 
          animation="slide-up" 
          className="section relative"
          threshold={0.2}
          duration={0.8}
        >
          <TechStack />
        </ScrollReveal>
        
        {/* Blog with slide-in animation */}
        <ScrollReveal 
          animation="slide-left" 
          className="section relative"
          threshold={0.2}
          duration={0.8}
        >
          <Blog />
        </ScrollReveal>
        
        {/* Testimonials with zoom effect */}
        <ScrollReveal 
          animation="zoom" 
          className="section relative"
          threshold={0.3}
          duration={1}
        >
          <TestimonialsEnhanced />
        </ScrollReveal>
        
        {/* Contact options with fade animation */}
        <ScrollReveal 
          animation="fade" 
          className="section relative"
          threshold={0.2}
          duration={0.8}
        >
          <ContactOptions />
        </ScrollReveal>
      </main>
    </PageTransition>
  );
};

export default Home;
