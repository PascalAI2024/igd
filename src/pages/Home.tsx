import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import TechStack from '../components/TechStack';
import Blog from '../components/Blog';
import TestimonialsEnhanced from '../components/TestimonialsEnhanced';
import ContactFormEnhanced from '../components/ContactFormEnhanced';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <main className="relative z-10">
        <Hero />
        <Services />
        <Projects />
        <TechStack />
        <Blog />
        <TestimonialsEnhanced />
        <ContactFormEnhanced />
      </main>
    </PageTransition>
  );
};

export default Home;
