import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState('');
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Custom scroll progress value
  const scrollYSpring = useSpring(scrollY, { damping: 15, stiffness: 300 });
  const scaleHeader = useTransform(scrollYSpring, [0, 100], [1, 0.95]);
  const opacityOverlay = useTransform(scrollYSpring, [0, 100], [0, 0.1]);
  
  // Update direction based on route depth
  useEffect(() => {
    if (prevPath && location.pathname !== prevPath) {
      // Determine the transition direction based on path depth
      const prevPathDepth = prevPath.split('/').filter(Boolean).length;
      const currentPathDepth = location.pathname.split('/').filter(Boolean).length;
      
      if (currentPathDepth > prevPathDepth) {
        setDirection('left'); // Moving deeper into the site
      } else if (currentPathDepth < prevPathDepth) {
        setDirection('right'); // Moving back up the hierarchy
      } else {
        // Same level, but different sections
        const prevSection = prevPath.split('/')[1] || '';
        const currentSection = location.pathname.split('/')[1] || '';
        
        // Determine direction based on navigation order (using a defined order of sections)
        const sections = ['', 'services', 'case-studies', 'blog', 'about', 'contact'];
        const prevIndex = sections.indexOf(prevSection);
        const currentIndex = sections.indexOf(currentSection);
        
        if (prevIndex < currentIndex) {
          setDirection('left');
        } else {
          setDirection('right');
        }
      }
    }
    setPrevPath(location.pathname);
  }, [location.pathname, prevPath]);
  
  // Listen for scroll with optimized event handler
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Define motion variants based on direction
  const getVariants = () => {
    const variants = {
      initial: {},
      animate: {},
      exit: {}
    };
    
    switch (direction) {
      case 'left':
        variants.initial = { opacity: 0, x: 20, filter: 'blur(10px)' };
        variants.animate = { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
        variants.exit = { 
          opacity: 0, 
          x: -20, 
          filter: 'blur(5px)', 
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        };
        break;
      case 'right':
        variants.initial = { opacity: 0, x: -20, filter: 'blur(10px)' };
        variants.animate = { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
        variants.exit = { 
          opacity: 0, 
          x: 20, 
          filter: 'blur(5px)', 
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        };
        break;
      case 'up':
        variants.initial = { opacity: 0, y: 20, filter: 'blur(10px)' };
        variants.animate = { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
        variants.exit = { 
          opacity: 0, 
          y: -20, 
          filter: 'blur(5px)', 
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        };
        break;
      case 'down':
        variants.initial = { opacity: 0, y: -20, filter: 'blur(10px)' };
        variants.animate = { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        };
        variants.exit = { 
          opacity: 0, 
          y: 20, 
          filter: 'blur(5px)', 
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        };
        break;
    }
    
    return variants;
  };
  
  const pageVariants = getVariants();
  
  // Define child variants for staggered animations
  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Add wrapper component to handle AnimatePresence
  return (
    <div className="page-transition-container" ref={containerRef}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen w-full"
        style={{
          willChange: 'transform, opacity',
          transformOrigin: 'center top'
        }}
      >
        {/* Subtle scroll parallax effect for headers */}
        <motion.div 
          className="page-header-effect fixed top-0 left-0 w-full pointer-events-none z-0"
          style={{ 
            scaleY: scaleHeader,
            transformOrigin: 'center top',
          }}
        >
          <motion.div 
            className="bg-gradient-to-b from-black/20 to-transparent h-40 w-full" 
            style={{ opacity: opacityOverlay }}
          />
        </motion.div>
        
        {/* Main content with children */}
        <motion.div
          variants={childVariants}
          className="page-content"
          style={{ visibility: 'visible' }} // Force visibility to prevent flashing
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageTransition;