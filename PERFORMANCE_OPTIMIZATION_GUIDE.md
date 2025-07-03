# Performance Optimization Guide

This guide documents all performance optimizations implemented in the Ingenious Digital v3 application.

## Table of Contents
1. [Image Optimization](#image-optimization)
2. [Code Splitting](#code-splitting)
3. [Animation Performance](#animation-performance)
4. [SEO & Accessibility](#seo--accessibility)
5. [Implementation Examples](#implementation-examples)

## Image Optimization

### Enhanced OptimizedImage Component
The `OptimizedImage` component now includes:
- **Lazy loading** with `loading="lazy"` attribute
- **Blur-up placeholders** using base64 encoded images
- **Explicit dimensions** to prevent layout shift
- **Multiple format support** (AVIF, WebP, JPG)
- **Automatic retry logic** for failed loads

### Usage Example
```tsx
import OptimizedImage from '@/components/OptimizedImage';
import { generateBlurDataURL } from '@/utils/imageUtils';

// Generate blur placeholder
const blurDataURL = generateBlurDataURL(10, 10, '#1f2937');

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image showing our team"
  width={1920}
  height={1080}
  priority={true} // For above-the-fold images
  blurDataURL={blurDataURL}
  quality={85}
/>
```

### Image Utilities
- `generateBlurDataURL()` - Creates base64 blur placeholders
- `preloadImage()` - Preloads critical images
- `getOptimizedImageUrl()` - Generates optimized URLs with parameters
- `getBestImageFormat()` - Detects browser support for modern formats

## Code Splitting

### Lazy Loading Components
Heavy components are now lazy loaded to reduce initial bundle size:

```tsx
import { LazyComponents } from '@/utils/lazyLoadComponents';

// Instead of direct import
// import WebsiteVisualizer from './WebsiteVisualizer';

// Use lazy loaded version
const WebsiteVisualizer = LazyComponents.WebsiteVisualizer;
```

### 3D Component Lazy Loading
All 3D components use the existing `lazyLoad3D` utility:

```tsx
import { lazy3D } from '@/utils/lazyLoad3D';

const ProcessFlow3D = lazy3D.ProcessFlow3D;
```

### Preloading on Interaction
```tsx
import { usePreloadOnInteraction } from '@/utils/lazyLoadComponents';

const preloadProps = usePreloadOnInteraction('LiveCodeEditor');

<button {...preloadProps} onClick={handleClick}>
  Open Editor
</button>
```

## Animation Performance

### Optimized Motion Component
The new `OptimizedMotion` component provides:
- GPU acceleration with `translateZ(0)`
- Automatic `will-change` management
- Viewport-based animation triggering
- Reduced motion support

```tsx
import { OptimizedMotion, optimizedVariants } from '@/components/OptimizedMotion';

<OptimizedMotion
  initial={optimizedVariants.slideUp.hidden}
  animate={optimizedVariants.slideUp.visible}
  threshold={0.2}
  enableGPU={true}
>
  <YourContent />
</OptimizedMotion>
```

### Performance Utilities
- `throttleAnimation()` - Limits animation frame rate
- `isLowEndDevice()` - Detects device capabilities
- `getOptimizedAnimationSettings()` - Returns appropriate settings

### Reduced Motion Support
```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

// Conditionally apply animations
const animationProps = prefersReducedMotion 
  ? {} 
  : { animate: { x: 100 } };
```

## SEO & Accessibility

### Semantic Heading Component
Ensures proper heading hierarchy:

```tsx
import { PageTitle, SectionHeading, CardHeading } from '@/components/SemanticHeading';

<PageTitle subtitle="Welcome to our site">
  Main Page Title (h1)
</PageTitle>

<SectionHeading level={2}>
  Section Title (h2)
</SectionHeading>

<CardHeading level={3}>
  Card Title (h3)
</CardHeading>
```

### Accessible Button Component
Fully accessible button with keyboard support:

```tsx
import { AccessibleButton, IconButton } from '@/components/AccessibleButton';

<AccessibleButton
  variant="primary"
  size="lg"
  leftIcon={<SaveIcon />}
  ariaLabel="Save your changes"
  isLoading={isSaving}
  loadingText="Saving..."
>
  Save Changes
</AccessibleButton>

<IconButton
  icon={<MenuIcon />}
  ariaLabel="Open menu"
  variant="ghost"
/>
```

### Skip Links
Improves keyboard navigation:

```tsx
import { SkipLinks, MainContent } from '@/components/SkipLinks';

// In App.tsx or Layout
<>
  <SkipLinks />
  <NavigationWrapper>
    <Navbar />
  </NavigationWrapper>
  <MainContent>
    <Routes>...</Routes>
  </MainContent>
</>
```

### Accessibility Utilities
- `makeKeyboardAccessible()` - Makes clickable elements keyboard accessible
- `trapFocus()` - Traps focus within modals
- `announceToScreenReader()` - Announces changes to screen readers
- `formatTimeForScreenReader()` - Formats time for accessibility

## Implementation Examples

### Optimized Page Component
```tsx
import { OptimizedMotion } from '@/components/OptimizedMotion';
import { LazyComponents } from '@/utils/lazyLoadComponents';
import { PageTitle, SectionHeading } from '@/components/SemanticHeading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import OptimizedImage from '@/components/OptimizedImage';

const OptimizedPage = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Lazy load heavy components
  const LiveDashboard = LazyComponents.LiveMarketingDashboard;
  
  return (
    <div>
      <PageTitle subtitle="High-performance page example">
        Optimized Page
      </PageTitle>
      
      <OptimizedMotion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        triggerOnce
      >
        <SectionHeading level={2}>
          Features Section
        </SectionHeading>
        
        <OptimizedImage
          src="/images/feature.jpg"
          alt="Feature demonstration"
          width={800}
          height={600}
          blurDataURL="data:image/jpeg;base64,..."
        />
      </OptimizedMotion>
      
      <LiveDashboard />
    </div>
  );
};
```

### Performance Configuration
Use the centralized config for consistent settings:

```tsx
import { performanceConfig, getPerformanceSettings } from '@/config/performance';

const settings = getPerformanceSettings();

// Apply settings based on device
const imageQuality = settings.imageQuality === 'high' 
  ? performanceConfig.images.quality.high 
  : performanceConfig.images.quality.low;
```

## Best Practices

1. **Images**
   - Always provide width/height to prevent layout shift
   - Use blur placeholders for better perceived performance
   - Lazy load images below the fold
   - Use `priority` prop for hero images

2. **Animations**
   - Only animate `transform` and `opacity`
   - Use GPU acceleration with `translateZ(0)`
   - Implement reduced motion support
   - Throttle scroll-based animations

3. **Code Splitting**
   - Lazy load route components
   - Lazy load heavy visualization components
   - Preload components on hover/focus
   - Use Suspense with proper fallbacks

4. **Accessibility**
   - Maintain proper heading hierarchy
   - Provide keyboard navigation for all interactions
   - Include skip links for navigation
   - Test with screen readers

## Monitoring Performance

```tsx
import { measurePerformance, trackWebVitals } from '@/utils/performance';

// Mark performance points
measurePerformance('page-start');
// ... render components
measurePerformance('page-end');

// Measure between marks
measurePerformanceBetween('page-start', 'page-end', 'page-render-time');

// Track Core Web Vitals
useEffect(() => {
  trackWebVitals();
}, []);
```

## Conclusion

These optimizations significantly improve:
- **Initial Load Time**: Reduced bundle size through code splitting
- **Perceived Performance**: Blur placeholders and optimized animations
- **Runtime Performance**: GPU acceleration and reduced motion support
- **Accessibility**: Proper semantics and keyboard navigation
- **SEO**: Structured content and performance metrics

Continue monitoring performance metrics and adjust optimizations based on real-world usage data.