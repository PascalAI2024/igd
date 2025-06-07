import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingContactIcons from './components/FloatingContactIcons';
import LoadingSequence from './components/LoadingSequence';
import LightweightLoadingSequence from './components/LightweightLoadingSequence';
import BreadcrumbSchema from './components/BreadcrumbSchema';
import CustomCursor from './components/effects/CustomCursor';
import CookieConsent from './components/CookieConsent';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { 
  initializeAnalytics, 
  trackPageView, 
  trackError, 
  trackEngagement 
} from './utils/analytics';
import { measurePerformance } from './utils/performance';

// Declare missing type for analytics tracking timeout
declare global {
  interface Window {
    _scrollTimeout?: NodeJS.Timeout;
  }
}

// Helper to determine page type from path
const _getPageTypeFromPath = (path: string): string => {
  if (path === '/' || path === '/home') return 'home';
  if (path.startsWith('/services/')) return 'service';
  if (path.startsWith('/blog/')) return 'blog_post';
  if (path === '/blog') return 'blog_index';
  if (path.startsWith('/locations/')) return 'location';
  if (path === '/locations') return 'locations_index';
  if (path.startsWith('/case-studies/')) return 'case_study';
  if (path === '/case-studies') return 'case_studies_index';
  if (path === '/contact') return 'contact';
  if (path === '/about') return 'about';
  return 'other';
};

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const SimpleCaseStudies = React.lazy(() => import('./pages/SimpleCaseStudies'));
const SimpleCaseStudyDetail = React.lazy(() => import('./pages/SimpleCaseStudyDetail'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Landing = React.lazy(() => import('./pages/Landing'));

// Lazy load legal pages
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Cookie = React.lazy(() => import('./pages/Cookie'));
const GDPR = React.lazy(() => import('./pages/GDPR'));

// Lazy load service pages - SMB Focused
const DigitalMarketing = React.lazy(() => import('./pages/services/DigitalMarketing'));
const LeadGeneration = React.lazy(() => import('./pages/services/LeadGeneration'));
const CRM = React.lazy(() => import('./pages/services/CRM'));
const Communication = React.lazy(() => import('./pages/services/Communication'));
const WebDevelopment = React.lazy(() => import('./pages/services/WebDevelopment'));
const Photography = React.lazy(() => import('./pages/services/Photography'));
const Videography = React.lazy(() => import('./pages/services/Videography'));
const AdManagement = React.lazy(() => import('./pages/services/AdManagement'));
const BusinessAutomation = React.lazy(() => import('./pages/services/BusinessAutomation'));
const AiMachineLearning = React.lazy(() => import('./pages/services/AiMachineLearning'));

// Lazy load industry pages - Local Business Focused
const LocalRetail = React.lazy(() => import('./pages/industries/LocalRetail'));
const Restaurants = React.lazy(() => import('./pages/industries/Restaurants'));
const LocalServices = React.lazy(() => import('./pages/industries/LocalServices'));
const Healthcare = React.lazy(() => import('./pages/industries/Healthcare'));
const AutoServices = React.lazy(() => import('./pages/industries/AutoServices'));
const Manufacturing = React.lazy(() => import('./pages/industries/Manufacturing'));

// Lazy load location pages
const Locations = React.lazy(() => import('./pages/Locations'));
const Location = React.lazy(() => import('./pages/Location'));

// Lazy load animation showcase pages (development only)
const AnimationPlayground = React.lazy(() => import('./components/AnimationPlayground'));
const AnimationShowcase = React.lazy(() => import('./components/AnimationShowcase'));

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Check sessionStorage for a flag
    const hasLoadedBefore = sessionStorage.getItem('has_loaded_before');
    // Skip loading entirely if URL parameter is present
    const urlParams = new URLSearchParams(window.location.search);
    const skipLoading = urlParams.get('skip_loading') === 'true';
    
    // Only show loading on initial load of the home page, and not if explicitly skipped
    return !skipLoading && !hasLoadedBefore && location.pathname === '/';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize analytics and performance tracking
  useEffect(() => {
    // Initialize analytics immediately (opt-out approach)
    initializeAnalytics();
    
    const cleanup = measurePerformance();

    // Setup global error tracking
    const handleError = (event: ErrorEvent) => {
      trackError(event.error);
    };
    window.addEventListener('error', handleError);

    // Setup unhandled promise rejection tracking
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(`Unhandled Promise Rejection: ${event.reason}`);
    };
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      cleanup();
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Track page views and handle scrolling with smooth behavior
  useEffect(() => {
    // Send enhanced page view tracking immediately (opt-out approach)
    trackPageView(location.pathname + location.search);
    
    // Set up scroll tracking for enhanced analytics
    const handleScroll = () => {
        // Track max scroll depth every 2 seconds to avoid excessive events
        if (!window._scrollTimeout) {
          window._scrollTimeout = setTimeout(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
              const scrollDepth = Math.min(100, Math.round((window.scrollY / scrollHeight) * 100));
              
              // Only track if significant scroll has occurred
              if (scrollDepth > 25) {
                const scrollData = {
                  scroll_depth: scrollDepth,
                  page_path: location.pathname,
                  page_type: _getPageTypeFromPath(location.pathname)
                };
                
                // Update scroll depth in session
                const prevDepth = parseInt(sessionStorage.getItem(`scroll_depth_${location.pathname}`) || '0', 10);
                if (scrollDepth > prevDepth) {
                  sessionStorage.setItem(`scroll_depth_${location.pathname}`, scrollDepth.toString());
                  window.gtag?.('event', 'scroll_depth', scrollData);
                }
              }
            }
            window._scrollTimeout = undefined;
          }, 2000);
        }
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Set up exit intent tracking
      const handleExitIntent = (e: MouseEvent) => {
        // Track when mouse moves to top of page (potential exit)
        if (e.clientY < 20) {
          const pageViewStartTime = parseInt(sessionStorage.getItem('page_view_start_time') || '0', 10);
          if (pageViewStartTime) {
            const timeOnPage = Math.round((Date.now() - pageViewStartTime) / 1000);
            
            // Only track exit intent if user has been on page for at least 5 seconds
            if (timeOnPage > 5) {
              window.gtag?.('event', 'exit_intent', {
                page_path: location.pathname,
                time_on_page: timeOnPage,
                scroll_depth: parseInt(sessionStorage.getItem(`scroll_depth_${location.pathname}`) || '0', 10)
              });
            }
          }
        }
      };
      
      window.addEventListener('mousemove', handleExitIntent, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleExitIntent);
      clearTimeout(window._scrollTimeout);
    };
    
    // Scroll to top with performance optimization
    if ('scrollBehavior' in document.documentElement.style) {
      // Use smooth scroll if supported and not reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ 
        top: 0, 
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    } else {
      // Fallback for browsers without scrollBehavior support
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Handle route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location.pathname]);

  // Handle mobile menu state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileMenuOpen]);

  // Handle loading sequence completion
  const handleLoadingComplete = () => {
    document.body.style.overflow = 'visible';
    setIsLoading(false);
    // Set flag in sessionStorage after initial load completes
    sessionStorage.setItem('has_loaded_before', 'true');
  };

  // Hide navigation on landing page
  const showNavigation = !location.pathname.includes('/landing');

  // Effect to handle loading state based on location and session storage
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('has_loaded_before');
    if (!hasLoadedBefore && location.pathname === '/') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]); // Dependency on location.pathname


  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isLoading]);

  if (isLoading) {
    // Detect low-end devices or poor network conditions
    const isLowEndDevice = 
      (navigator as any).deviceMemory < 4 || 
      navigator.hardwareConcurrency < 4 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator as any).connection?.effectiveType === '2g' ||
      (navigator as any).connection?.effectiveType === 'slow-2g';
    
    // Use lightweight loading for low-end devices
    if (isLowEndDevice) {
      return <LightweightLoadingSequence onComplete={handleLoadingComplete} />;
    }
    
    return <LoadingSequence onComplete={handleLoadingComplete} />;
  }

  return (
    <PerformanceProvider>
      <div className="min-h-screen bg-black">
        {/* Add breadcrumb schema for SEO */}
        <BreadcrumbSchema />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
        
        {/* Custom cursor for desktop - with error boundary to prevent cursor loss */}
        <div className="hidden md:block">
          <React.Suspense fallback={null}>
            <CustomCursor color="#e03131" size={24} />
          </React.Suspense>
        </div>

        {showNavigation && (
          <>
            <ScrollProgress />
            <Navbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            <FloatingContactIcons isMobileMenuOpen={isMobileMenuOpen} />
          </>
        )}

      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{ 
              willChange: 'opacity, transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            className={isMobileMenuOpen ? 'pointer-events-none' : ''}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/case-studies" element={<SimpleCaseStudies />} />
              <Route path="/case-studies/:id" element={<SimpleCaseStudyDetail />} />

              {/* Service Routes - SMB Focused */}
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/lead-generation" element={<LeadGeneration />} />
              <Route path="/services/crm" element={<CRM />} />
              <Route path="/services/communication" element={<Communication />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/photography" element={<Photography />} />
              <Route path="/services/videography" element={<Videography />} />
              <Route path="/services/ad-management" element={<AdManagement />} />
              <Route path="/services/business-automation" element={<BusinessAutomation />} />
              <Route path="/services/ai-machine-learning" element={<AiMachineLearning />} />

              {/* Industry Routes - Local Business Focused */}
              <Route path="/industries/local-retail" element={<LocalRetail />} />
              <Route path="/industries/restaurants" element={<Restaurants />} />
              <Route path="/industries/local-services" element={<LocalServices />} />
              <Route path="/industries/healthcare" element={<Healthcare />} />
              <Route path="/industries/auto-services" element={<AutoServices />} />
              <Route path="/industries/manufacturing" element={<Manufacturing />} />

              {/* Location Pages */}
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:locationId" element={<Location />} />

              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<Cookie />} />
              <Route path="/gdpr" element={<GDPR />} />

              {/* Generic service route should come after specific service routes */}
              <Route path="/services/:id" element={<ServiceDetail />} />

              {/* Animation Showcase Routes (Development Only) */}
              {import.meta.env.DEV && (
                <>
                  <Route path="/animation-playground" element={<AnimationPlayground />} />
                  <Route path="/animation-showcase" element={<AnimationShowcase />} />
                </>
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </Suspense>
      </AnimatePresence>

      {showNavigation && <Footer />}
    </div>
    </PerformanceProvider>
  );
};

export default App;