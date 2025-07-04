import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import FloatingContactIcons from './components/FloatingContactIcons';
import LightweightLoadingSequence from './components/LightweightLoadingSequence';
import BreadcrumbSchema from './components/BreadcrumbSchema';
import CustomCursor from './components/effects/CustomCursor';
import CookieConsent from './components/CookieConsent';
import { StickyCTA } from './components/ui/StickyCTA';
import MobileCTASection from './components/MobileCTASection';
import { PerformanceProvider } from './contexts/PerformanceContext';
import { useDeviceCapabilities } from './hooks/useDeviceCapabilities';
import { useMobilePerformance } from './hooks/useMobilePerformance';
import { getViewportDimensions, supportsTouch } from './utils/mobileOptimizations';
import { 
  initializeAnalytics, 
  trackPageView, 
  trackError, 
  trackEngagement 
} from './utils/analytics';
import { measurePerformance } from './utils/performance';
import { ExitIntentPopup, ScrollTriggeredCTA } from './components/interactive-tools';
import './styles/mobile.css';

// Declare missing type for analytics tracking timeout
declare global {
  interface Window {
    _scrollTimeout?: NodeJS.Timeout;
  }
}

// Helper to determine page type from path
const _getPageTypeFromPath = (path: string): string => {
  if (path === '/' || path === '/home') return 'home';
  if (path.startsWith('/solutions/')) return 'solution';
  if (path === '/solutions') return 'solutions_index';
  if (path.startsWith('/services/')) return 'service';
  if (path === '/services') return 'services_index';
  if (path.startsWith('/industries/')) return 'industry';
  if (path === '/industries') return 'industries_index';
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
const Tools = React.lazy(() => import('./pages/Tools'));

// Lazy load solution pages
const Solutions = React.lazy(() => import('./pages/Solutions'));
const DigitalGrowth = React.lazy(() => import('./pages/solutions/DigitalGrowth'));
const Automation = React.lazy(() => import('./pages/solutions/Automation'));
const LocalBusiness = React.lazy(() => import('./pages/solutions/LocalBusiness'));
const Enterprise = React.lazy(() => import('./pages/solutions/Enterprise'));

// Lazy load index pages
const Services = React.lazy(() => import('./pages/Services'));
const Industries = React.lazy(() => import('./pages/Industries'));

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
const SystemIntegration = React.lazy(() => import('./pages/services/SystemIntegration'));

// Lazy load industry pages - Local Business Focused
const LocalRetail = React.lazy(() => import('./pages/industries/LocalRetail'));
const Retail = React.lazy(() => import('./pages/industries/Retail'));
const Restaurants = React.lazy(() => import('./pages/industries/Restaurants'));
const LocalServices = React.lazy(() => import('./pages/industries/LocalServices'));
const Healthcare = React.lazy(() => import('./pages/industries/Healthcare'));
// const RealEstate = React.lazy(() => import('./pages/industries/RealEstate'));
// const Automotive = React.lazy(() => import('./pages/industries/Automotive'));
// const Hospitality = React.lazy(() => import('./pages/industries/Hospitality'));

// Lazy load location pages
const Locations = React.lazy(() => import('./pages/Locations'));
// const BoiseIdaho = React.lazy(() => import('./pages/locations/BoiseIdaho'));

// Lazy load showcase pages
const AnimationShowcase = React.lazy(() => import('./components/AnimationShowcase'));
const UIShowcase = React.lazy(() => import('./pages/UIShowcase'));

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Check sessionStorage for a flag
    const hasLoadedBefore = sessionStorage.getItem('has_loaded_before');
    // Skip loading entirely if URL parameter is present
    const urlParams = new URLSearchParams(window.location.search);
    const skipLoading = urlParams.get('skip_loading') === 'true';
    
    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    
    // Only show loading on initial load of the home page, and not if explicitly skipped
    return !skipLoading && !hasLoadedBefore && isHomePage;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useDeviceCapabilities();
  const { quality, shouldReduceMotion } = useMobilePerformance();

  // Initialize analytics and mobile optimizations
  useEffect(() => {
    // Initialize analytics immediately (opt-out approach)
    initializeAnalytics();
    
    // Set up viewport dimensions for mobile
    getViewportDimensions();
    
    // Update viewport on resize and orientation change
    const handleResize = () => {
      getViewportDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    const cleanup = measurePerformance();

    // Setup global error tracking
    const handleError = (event: ErrorEvent) => {
      trackError(event.error);
    };
    window.addEventListener('error', handleError);

    // Track page load time
    const loadTime = window.performance?.timing?.loadEventEnd - window.performance?.timing?.navigationStart;
    if (loadTime && loadTime > 0) {
      trackEngagement('page_load_time', loadTime);
    }

    return () => {
      cleanup();
      window.removeEventListener('error', handleError);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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
      
      // Set up exit intent tracking - Desktop only
      const handleExitIntent = (e: MouseEvent) => {
        if (isMobile) return;
        
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
      
      if (!isMobile) {
        window.addEventListener('mousemove', handleExitIntent, { passive: true });
      }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleExitIntent);
      }
      clearTimeout(window._scrollTimeout);
    };
    
    // Scroll to top with performance optimization
    if ('scrollBehavior' in document.documentElement.style) {
      // Use smooth scroll if supported and not reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ 
        top: 0, 
        behavior: (prefersReducedMotion || shouldReduceMotion) ? 'auto' : 'smooth'
      });
    } else {
      // Fallback for browsers without scrollBehavior support
      window.scrollTo(0, 0);
    }
  }, [location, isMobile, shouldReduceMotion]);

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

  // Set a flag after the initial load to skip loading next time
  useEffect(() => {
    if (!isLoading) {
      sessionStorage.setItem('has_loaded_before', 'true');
    }
  }, [isLoading]);

  const showNavigation = location.pathname !== '/animation-showcase' && 
                        location.pathname !== '/ui-showcase' &&
                        location.pathname !== '/landing' &&
                        location.pathname !== '/tools';

  const showBreadcrumbs = location.pathname !== '/' && 
                         !location.pathname.includes('/blog/') && 
                         !location.pathname.includes('/case-studies/') &&
                         !location.pathname.includes('/landing') &&
                         !location.pathname.includes('/tools');

  // Show loading sequence
  if (isLoading) {
    return (
      <div className="relative">
        <LightweightLoadingSequence 
          onComplete={() => setIsLoading(false)} 
        />
      </div>
    );
  }

  return (
    <PerformanceProvider>
    <div className="bg-black min-h-screen text-white">
        {/* Schema markup for breadcrumbs */}
        {showBreadcrumbs && <BreadcrumbSchema />}
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
        
        {/* Custom cursor for desktop - with error boundary to prevent cursor loss */}
        {!isMobile && !supportsTouch() && (
          <div className="hidden md:block">
            <React.Suspense fallback={null}>
              <CustomCursor color="#e03131" size={24} />
            </React.Suspense>
          </div>
        )}

        {/* Mobile CTA Section */}
        {isMobile && (
          <MobileCTASection 
            position="floating"
            phoneNumber="(208) 555-0123"
            showSchedule={true}
          />
        )}

        {/* Interactive Components - only on certain pages */}
        {!location.pathname.includes('/landing') && !location.pathname.includes('/tools') && (
          <>
            {/* Desktop only components - prevent mobile conflicts */}
            {!isMobile && (
              <>
                <ExitIntentPopup delay={2000} cookieDuration={7} />
                <ScrollTriggeredCTA 
                  triggerPercentage={60} 
                  position="bottom-right" 
                  variant={location.pathname === '/' ? 'floating' : 'slide-in'} 
                />
              </>
            )}
          </>
        )}

        {showNavigation && (
          <>
            <ScrollProgress />
            <Navbar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            {!isMobile && <FloatingContactIcons isMobileMenuOpen={isMobileMenuOpen} />}
          </>
        )}

      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <motion.main
            id="main-content"
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: shouldReduceMotion ? 0.1 : 0.3 
            }}
            className="relative"
          >
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/case-studies" element={<SimpleCaseStudies />} />
              <Route path="/case-studies/:slug" element={<SimpleCaseStudyDetail />} />
              <Route path="/services/:service" element={<ServiceDetail />} />
              
              {/* Solutions Routes */}
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/digital-growth" element={<DigitalGrowth />} />
              <Route path="/solutions/automation" element={<Automation />} />
              <Route path="/solutions/local-business" element={<LocalBusiness />} />
              <Route path="/solutions/enterprise" element={<Enterprise />} />
              
              {/* Services Routes */}
              <Route path="/services" element={<Services />} />
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
              <Route path="/services/system-integration" element={<SystemIntegration />} />
              
              {/* Industries Routes */}
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/local-retail" element={<LocalRetail />} />
              <Route path="/industries/retail" element={<Retail />} />
              <Route path="/industries/restaurants" element={<Restaurants />} />
              <Route path="/industries/local-services" element={<LocalServices />} />
              <Route path="/industries/healthcare" element={<Healthcare />} />
              {/* <Route path="/industries/real-estate" element={<RealEstate />} />
              <Route path="/industries/automotive" element={<Automotive />} />
              <Route path="/industries/hospitality" element={<Hospitality />} /> */}
              
              {/* Location Routes */}
              <Route path="/locations" element={<Locations />} />
              {/* <Route path="/locations/boise-idaho" element={<BoiseIdaho />} /> */}
              
              {/* Legal Routes */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie-policy" element={<Cookie />} />
              <Route path="/gdpr" element={<GDPR />} />
              
              {/* Special Routes */}
              <Route path="/animation-showcase" element={<AnimationShowcase />} />
              <Route path="/ui-showcase" element={<UIShowcase />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/tools" element={<Tools />} />
              
              {/* Dynamic Routes */}
              {['retail', 'restaurants', 'healthcare', 'real-estate', 'automotive', 'hospitality'].map(industry => (
                <Route key={industry} path={`/${industry}`} element={<Industries />} />
              ))}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </Suspense>
      </AnimatePresence>

      {showNavigation && <Footer />}
      
      {/* Sticky CTA - Desktop only, on specific pages */}
      {!isMobile && (location.pathname.startsWith('/blog/') || 
        location.pathname.startsWith('/services/') ||
        location.pathname.startsWith('/industries/')) && 
       !location.pathname.includes('thank-you') && (
        <StickyCTA 
          title="Ready to transform your business?"
          buttonText="Get Started"
          onButtonClick={() => window.location.href = '/contact'}
          showAfter={800}
          position="bottom"
          dismissible={true}
          variant="gradient"
        />
      )}
    </div>
    </PerformanceProvider>
  );
};

export default App;