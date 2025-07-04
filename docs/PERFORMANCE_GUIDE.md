# Performance Optimization Guide

This guide covers best practices and utilities for optimizing performance in the Ingenious Digital application.

## Table of Contents
1. [Performance Utilities](#performance-utilities)
2. [Image Optimization](#image-optimization)
3. [Lazy Loading](#lazy-loading)
4. [Animation Performance](#animation-performance)
5. [Accessibility Performance](#accessibility-performance)
6. [Best Practices](#best-practices)

## Performance Utilities

### Device Performance Detection
```typescript
import { getDevicePerformance } from '../utils/performance';

const performance = getDevicePerformance(); // 'high' | 'medium' | 'low'
```

### Motion Preference
```typescript
import { prefersReducedMotion } from '../utils/performance';

if (prefersReducedMotion()) {
  // Use simpler animations or disable them
}
```

### Performance Monitoring Hooks

#### FPS Monitoring
```typescript
import { useAnimationPerformance } from '../utils/performance';

const { fps, isLowPerformance, devicePerformance } = useAnimationPerformance();
```

#### Memory Monitoring
```typescript
import { useMemoryMonitor } from '../utils/performance';

const memoryUsage = useMemoryMonitor();
// Returns: { used: number, total: number, percentage: number }
```

#### Page Visibility
```typescript
import { usePageVisibility } from '../utils/performance';

const isVisible = usePageVisibility();
// Pause animations when page is not visible
```

#### Battery Status
```typescript
import { useBatteryStatus } from '../utils/performance';

const { batteryLevel, isCharging } = useBatteryStatus();
// Reduce performance-intensive operations on low battery
```

## Image Optimization

### OptimizedImage Component
```tsx
import { OptimizedImage } from '../components/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
  priority={false} // Set to true for above-the-fold images
/>
```

### ResponsiveImage Component
```tsx
import { ResponsiveImage } from '../components/OptimizedImage';

<ResponsiveImage
  sources={[
    { srcSet: '/image-mobile.jpg', media: '(max-width: 640px)' },
    { srcSet: '/image-tablet.jpg', media: '(max-width: 1024px)' },
    { srcSet: '/image-desktop.jpg', media: '(min-width: 1025px)' }
  ]}
  src="/image-fallback.jpg"
  alt="Responsive image"
/>
```

## Lazy Loading

### LazyLoad Component
```tsx
import { LazyLoad } from '../components/LazyLoad';

<LazyLoad
  threshold={0.1}
  rootMargin="50px"
  animateIn={true}
>
  <ExpensiveComponent />
</LazyLoad>
```

### LazyComponent for Code Splitting
```tsx
import { LazyComponent } from '../components/LazyLoad';

const MyComponent = React.lazy(() => import('./MyComponent'));

<LazyComponent
  component={MyComponent}
  props={{ /* component props */ }}
/>
```

### useLazyLoad Hook
```typescript
import { useLazyLoad } from '../utils/performance';

const { ref, isIntersecting } = useLazyLoad(0.1, '50px');

return (
  <div ref={ref}>
    {isIntersecting && <ExpensiveContent />}
  </div>
);
```

## Animation Performance

### Debouncing
```typescript
import { useDebounce } from '../utils/performance';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  // Perform search with debouncedSearch
}, [debouncedSearch]);
```

### Throttling
```typescript
import { useThrottle } from '../utils/performance';

const throttledHandler = useThrottle((value) => {
  // Handle frequent updates
}, 100);
```

### Animation Configuration
```typescript
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  getAnimationVariants,
  ANIMATION_DURATION 
} from '../utils/animationConfig';

// Use predefined animations
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>

// Respect reduced motion
const variants = getAnimationVariants(prefersReducedMotion(), fadeInUp);
```

## Accessibility Performance

### Skip Links
```tsx
import { SkipLinks } from '../components/accessibility';

// Add at the beginning of your app
<SkipLinks />
```

### Screen Reader Announcements
```typescript
import { announce } from '../utils/accessibility';

// Announce important updates
announce('Form submitted successfully', 'polite');
announce('Error: Please fill required fields', 'assertive');
```

### Focus Management
```tsx
import { FocusTrap } from '../components/accessibility';

<FocusTrap isActive={isModalOpen}>
  <Modal>
    {/* Modal content */}
  </Modal>
</FocusTrap>
```

## Best Practices

### 1. Image Optimization
- Use `priority={true}` for above-the-fold images
- Provide appropriate `width` and `height` to prevent layout shifts
- Use responsive images with multiple sources for different screen sizes
- Implement blur placeholders for better perceived performance

### 2. Component Lazy Loading
- Lazy load routes and heavy components
- Use Suspense boundaries with meaningful fallbacks
- Implement intersection observer for below-the-fold content
- Group related lazy-loaded components to reduce bundle splits

### 3. Animation Performance
- Check `prefersReducedMotion()` before complex animations
- Use CSS transforms instead of position changes
- Throttle scroll and resize handlers
- Pause animations when page is not visible
- Reduce animation complexity on low-performance devices

### 4. Network Performance
```typescript
import { getNetworkSpeed } from '../utils/performance';

const speed = getNetworkSpeed(); // 'fast' | 'slow' | 'unknown'

// Adjust quality based on network
if (speed === 'slow') {
  // Load lower quality assets
}
```

### 5. Performance Measurement
```typescript
import { measurePerformance } from '../utils/performance';

// The existing measurePerformance function tracks Core Web Vitals
// It automatically reports:
// - First Contentful Paint (FCP)
// - Largest Contentful Paint (LCP)
// - First Input Delay (FID)
// - Cumulative Layout Shift (CLS)
// - Time to First Byte (TTFB)
```

### 6. Bundle Size Optimization
- Use dynamic imports for route-based code splitting
- Tree-shake unused exports
- Analyze bundle with `npm run build` and review the output
- Load heavy libraries only when needed

### 7. Rendering Performance
- Use React.memo for expensive components
- Implement virtualization for long lists
- Avoid inline function definitions in render
- Use useCallback and useMemo appropriately

### 8. Mobile Performance
- Test on real devices, not just device emulation
- Reduce JavaScript execution on mobile
- Optimize touch interactions
- Consider battery status for performance decisions

## Performance Checklist

Before deploying, ensure:
- [ ] All images use OptimizedImage component
- [ ] Heavy components are lazy loaded
- [ ] Animations respect reduced motion preference
- [ ] Performance monitoring is in place
- [ ] Bundle size is within acceptable limits
- [ ] Core Web Vitals meet targets
- [ ] Mobile performance is optimized
- [ ] Accessibility doesn't impact performance