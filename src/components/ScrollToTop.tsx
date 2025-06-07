import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when the route changes, ensuring consistent navigation behavior
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with proper performance optimization
    const scrollToTop = () => {
      // Check if smooth scrolling is supported and user doesn't prefer reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if ('scrollBehavior' in document.documentElement.style && !prefersReducedMotion) {
        // Use smooth scroll if supported and not reduced motion
        window.scrollTo({ 
          top: 0, 
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback for browsers without scrollBehavior support or reduced motion
        window.scrollTo(0, 0);
      }
    };

    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      scrollToTop();
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;