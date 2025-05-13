import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingContactIcons from './components/FloatingContactIcons';
import LoadingSequence from './components/LoadingSequence';
import BreadcrumbSchema from './components/BreadcrumbSchema';
import { initializeAnalytics, trackPageView, trackError } from './utils/analytics';
import { measurePerformance } from './utils/performance';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const CaseStudies = React.lazy(() => import('./pages/SimpleCaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/SimpleCaseStudyDetail'));
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

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Check sessionStorage for a flag
    const hasLoadedBefore = sessionStorage.getItem('has_loaded_before');
    // Only show loading on initial load of the home page
    return !hasLoadedBefore && location.pathname === '/';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize analytics and performance tracking
  useEffect(() => {
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

  // Track page views and handle scrolling
  useEffect(() => {
    trackPageView(location.pathname + location.search);
    window.scrollTo(0, 0);
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
    return <LoadingSequence onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Add breadcrumb schema for SEO */}
      <BreadcrumbSchema />

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
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
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
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />

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

              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<Cookie />} />
              <Route path="/gdpr" element={<GDPR />} />

              {/* Generic service route should come after specific service routes */}
              <Route path="/services/:id" element={<ServiceDetail />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </Suspense>
      </AnimatePresence>

      {showNavigation && <Footer />}
    </div>
  );
};

export default App;
