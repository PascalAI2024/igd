# Component Usage Guide

This guide provides examples and best practices for using the performance and accessibility components.

## Table of Contents
1. [Performance Components](#performance-components)
2. [Accessibility Components](#accessibility-components)
3. [Animation Components](#animation-components)
4. [Button Styles](#button-styles)
5. [Integration Examples](#integration-examples)

## Performance Components

### OptimizedImage
Automatically handles lazy loading, blur placeholders, and error states.

```tsx
import { OptimizedImage } from '../components/OptimizedImage';

// Basic usage
<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  className="rounded-lg shadow-xl"
/>

// Priority loading (above the fold)
<OptimizedImage
  src="/images/logo.png"
  alt="Company logo"
  width={200}
  height={50}
  priority={true}
/>

// With custom loading behavior
<OptimizedImage
  src="/images/product.jpg"
  alt="Product showcase"
  width={800}
  height={800}
  loading="eager"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### ResponsiveImage
Serves different images based on screen size.

```tsx
import { ResponsiveImage } from '../components/OptimizedImage';

<ResponsiveImage
  sources={[
    {
      srcSet: '/images/hero-mobile.webp',
      type: 'image/webp',
      media: '(max-width: 640px)'
    },
    {
      srcSet: '/images/hero-tablet.webp',
      type: 'image/webp',
      media: '(max-width: 1024px)'
    },
    {
      srcSet: '/images/hero-desktop.webp',
      type: 'image/webp'
    }
  ]}
  src="/images/hero-fallback.jpg"
  alt="Responsive hero image"
  width={1920}
  height={1080}
/>
```

### LazyLoad
Defers rendering of components until they're in viewport.

```tsx
import { LazyLoad } from '../components/LazyLoad';

// With default loading indicator
<LazyLoad>
  <ExpensiveChart data={chartData} />
</LazyLoad>

// With custom loading state
<LazyLoad
  fallback={
    <div className="skeleton-loader h-64 bg-gray-200 animate-pulse" />
  }
  threshold={0.5}
  rootMargin="100px"
>
  <ComplexVisualization />
</LazyLoad>

// Without animation
<LazyLoad animateIn={false}>
  <DataTable rows={1000} />
</LazyLoad>
```

### LazyComponent
For code-splitting React components.

```tsx
import { LazyComponent } from '../components/LazyLoad';

// Define lazy component
const Dashboard = React.lazy(() => import('./Dashboard'));

// Use with LazyComponent wrapper
<LazyComponent
  component={Dashboard}
  props={{
    user: currentUser,
    data: dashboardData
  }}
  fallback={<DashboardSkeleton />}
/>
```

## Accessibility Components

### SkipLinks
Provides keyboard navigation shortcuts.

```tsx
import { SkipLinks } from '../components/accessibility';

// Default skip links
<SkipLinks />

// Custom skip links
<SkipLinks
  links={[
    { id: 'main-content', label: 'Skip to content' },
    { id: 'search', label: 'Skip to search' },
    { id: 'footer', label: 'Skip to footer' }
  ]}
/>
```

### ScreenReaderOnly
Hides content visually but keeps it accessible to screen readers.

```tsx
import { ScreenReaderOnly } from '../components/accessibility';

// Provide additional context
<button>
  Download
  <ScreenReaderOnly> report as PDF (2.5MB)</ScreenReaderOnly>
</button>

// Use different HTML element
<ScreenReaderOnly as="h2">
  Navigation Menu
</ScreenReaderOnly>
```

### LiveRegion
Announces dynamic content changes to screen readers.

```tsx
import { LiveRegion } from '../components/accessibility';

// Polite announcements (default)
<LiveRegion
  message={statusMessage}
  clearAfter={3000}
/>

// Assertive announcements (urgent)
<LiveRegion
  message={errorMessage}
  ariaLive="assertive"
  clearAfter={5000}
/>
```

### FocusTrap
Constrains keyboard focus within a container.

```tsx
import { FocusTrap } from '../components/accessibility';

// Modal with focus trap
{isModalOpen && (
  <FocusTrap isActive={true} restoreFocus={true}>
    <div className="modal">
      <h2>Modal Title</h2>
      <input type="text" />
      <button onClick={closeModal}>Close</button>
    </div>
  </FocusTrap>
)}

// Conditional focus trap
<FocusTrap isActive={isEditing}>
  <form>
    {/* Form fields */}
  </form>
</FocusTrap>
```

### FocusIndicator
Provides enhanced focus indicators for better visibility.

```tsx
import { FocusIndicator } from '../components/accessibility';

// Default focus indicator
<FocusIndicator>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <button>Contact</button>
  </nav>
</FocusIndicator>

// Custom offset
<FocusIndicator offset={8}>
  <div className="card">
    <button>Action 1</button>
    <button>Action 2</button>
  </div>
</FocusIndicator>
```

## Animation Components

### Using Animation Configs
Pre-configured animations for consistency.

```tsx
import { motion } from 'framer-motion';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  scaleIn,
  slideInLeft
} from '../utils/animationConfig';

// Fade in up animation
<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>
  <h1>Welcome</h1>
</motion.div>

// Stagger children
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Scale animation
<motion.button
  variants={scaleIn}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Respecting Motion Preferences
Always check for reduced motion preference.

```tsx
import { prefersReducedMotion } from '../utils/performance';
import { getAnimationVariants } from '../utils/animationConfig';

const reducedMotion = prefersReducedMotion();
const variants = getAnimationVariants(reducedMotion, fadeInUp);

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  transition={{ duration: reducedMotion ? 0 : 0.3 }}
>
  Content
</motion.div>
```

## Button Styles

### Available Button Classes

```tsx
// Primary button
<button className="btn-primary">
  Get Started
</button>

// Secondary button
<button className="btn-secondary">
  Learn More
</button>

// Outline button
<button className="btn-outline">
  View Details
</button>

// White button (for dark backgrounds)
<button className="btn-white">
  Download
</button>

// Ghost button
<button className="btn-ghost">
  Cancel
</button>

// Button sizes
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary">Default</button>
<button className="btn-primary btn-lg">Large</button>
<button className="btn-primary btn-xl">Extra Large</button>

// Button with icon
<button className="btn-primary btn-with-icon">
  <FiSend />
  Send Message
</button>

// Icon button
<button className="btn-icon btn-ghost">
  <FiMenu />
</button>

// Loading state
<button className="btn-primary btn-loading">
  Processing...
</button>

// Pill button
<button className="btn-primary btn-pill">
  Subscribe
</button>

// Gradient button
<button className="btn-gradient">
  Premium Feature
</button>
```

### Button Group
```tsx
<div className="btn-group">
  <button className="btn-secondary">Previous</button>
  <button className="btn-secondary">1</button>
  <button className="btn-secondary">2</button>
  <button className="btn-secondary">3</button>
  <button className="btn-secondary">Next</button>
</div>
```

## Integration Examples

### Complete Page Example
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../components/OptimizedImage';
import { LazyLoad } from '../components/LazyLoad';
import { SkipLinks, ScreenReaderOnly } from '../components/accessibility';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animationConfig';
import { useAnimationPerformance } from '../utils/performance';

const ProductPage: React.FC = () => {
  const { isLowPerformance } = useAnimationPerformance();

  return (
    <>
      <SkipLinks />
      
      <main id="main-content">
        <motion.section
          variants={isLowPerformance ? {} : fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1>Our Products</h1>
          <ScreenReaderOnly>
            <p>Browse our collection of 24 products</p>
          </ScreenReaderOnly>
        </motion.section>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={staggerItem}
              className="product-card"
            >
              <LazyLoad>
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                />
              </LazyLoad>
              
              <h2>{product.name}</h2>
              <p className="price">${product.price}</p>
              
              <button className="btn-primary btn-with-icon">
                <FiShoppingCart />
                Add to Cart
                <ScreenReaderOnly>
                  {product.name} for ${product.price}
                </ScreenReaderOnly>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </main>
    </>
  );
};
```

### Form with Accessibility
```tsx
import { FocusTrap, LiveRegion } from '../components/accessibility';
import { announce } from '../utils/accessibility';

const ContactForm: React.FC = () => {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0) {
      announce('Please fix the errors in the form', 'assertive');
      return;
    }
    
    setStatus('Sending...');
    // Submit logic
    setStatus('Message sent successfully!');
    announce('Your message has been sent', 'polite');
  };

  return (
    <FocusTrap isActive={true}>
      <form onSubmit={handleSubmit}>
        <LiveRegion message={status} />
        
        {/* Form fields */}
        
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>
    </FocusTrap>
  );
};
```

### Performance-Aware Gallery
```tsx
import { useBatteryStatus, getNetworkSpeed } from '../utils/performance';

const ImageGallery: React.FC = () => {
  const { batteryLevel, isCharging } = useBatteryStatus();
  const networkSpeed = getNetworkSpeed();
  
  // Determine image quality based on conditions
  const getImageQuality = () => {
    if (batteryLevel && batteryLevel < 0.2 && !isCharging) {
      return 'low';
    }
    if (networkSpeed === 'slow') {
      return 'medium';
    }
    return 'high';
  };
  
  const quality = getImageQuality();
  
  return (
    <div className="gallery">
      {images.map((image) => (
        <LazyLoad key={image.id}>
          <OptimizedImage
            src={image.urls[quality]}
            alt={image.description}
            width={400}
            height={400}
          />
        </LazyLoad>
      ))}
    </div>
  );
};
```

## Best Practices

1. **Always provide alt text** for images
2. **Test with keyboard navigation** to ensure all interactive elements are accessible
3. **Use semantic HTML** before adding ARIA attributes
4. **Respect user preferences** for motion and color scheme
5. **Monitor performance** on real devices
6. **Lazy load below-the-fold content** to improve initial load time
7. **Provide loading states** for better perceived performance
8. **Use appropriate button styles** for consistency
9. **Test with screen readers** to ensure announcements work
10. **Implement focus management** for dynamic content changes