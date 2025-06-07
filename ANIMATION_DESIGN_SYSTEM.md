# Animation Design System Documentation

## Overview

This document provides comprehensive guidelines for using the unified animation design system in the Ingenious Digital v3 project. The system ensures consistency, performance, and accessibility across all animated elements.

## Table of Contents

1. [Core Principles](#core-principles)
2. [Getting Started](#getting-started)
3. [Animation System Structure](#animation-system-structure)
4. [Using Animation Wrappers](#using-animation-wrappers)
5. [CSS Animation Classes](#css-animation-classes)
6. [Performance Guidelines](#performance-guidelines)
7. [Accessibility](#accessibility)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Core Principles

### 1. **Consistency**
All animations follow standardized timing, easing, and movement patterns to create a cohesive experience.

### 2. **Performance**
Animations are optimized for 60fps performance with adaptive quality based on device capabilities.

### 3. **Accessibility**
The system respects user preferences for reduced motion and maintains WCAG compliance.

### 4. **Developer Experience**
Simple, composable components make it easy to implement complex animations.

## Getting Started

### Basic Usage

```tsx
import { SlideIn, FadeIn, InteractiveWrapper } from '@/components/AnimationWrappers';
import animationSystem from '@/styles/animation-system';

// Simple fade-in animation
<FadeIn delay={0.2}>
  <h1>Welcome</h1>
</FadeIn>

// Slide animation with direction
<SlideIn direction="up" delay={0.3}>
  <Card>Content</Card>
</SlideIn>

// Interactive hover effects
<InteractiveWrapper hoverType="lift" tapType="press">
  <button>Click me</button>
</InteractiveWrapper>
```

### Advanced Usage

```tsx
// Composed animations
<AnimationComposer 
  animations={['fade', 'slide']} 
  options={{ slide: { direction: 'up' } }}
>
  <ComplexComponent />
</AnimationComposer>

// Staggered animations
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <SlideIn key={item.id}>
      <Item {...item} />
    </SlideIn>
  ))}
</StaggerContainer>
```

## Animation System Structure

### Timing Constants

```typescript
ANIMATION_DURATION = {
  instant: 0.1,    // Quick feedback
  fast: 0.2,       // Hover effects
  medium: 0.3,     // Standard transitions
  normal: 0.5,     // Default animations
  slow: 0.8,       // Dramatic reveals
  verySlow: 1.2,   // Special effects
}
```

### Easing Functions

```typescript
// Spring animations (preferred for interactions)
spring: {
  default: { damping: 20, stiffness: 300 },
  gentle: { damping: 30, stiffness: 200 },
  bouncy: { damping: 15, stiffness: 400 },
  stiff: { damping: 30, stiffness: 500 },
}

// Bezier curves (for precise control)
bezier: {
  smooth: [0.22, 1, 0.36, 1],      // Premium feel
  elegant: [0.25, 0.46, 0.45, 0.94], // Sophisticated
  snappy: [0.68, -0.55, 0.265, 1.55], // Playful
}
```

## Using Animation Wrappers

### FadeIn

Basic opacity animation:

```tsx
<FadeIn delay={0.2} duration={0.5}>
  <Content />
</FadeIn>
```

### SlideIn

Directional slide animation:

```tsx
<SlideIn direction="up" delay={0.1}>
  <Card />
</SlideIn>

// Available directions: 'up', 'down', 'left', 'right'
```

### SlideBlur

Premium slide + blur effect:

```tsx
<SlideBlur direction="up">
  <Hero />
</SlideBlur>
```

### ScaleIn

Scale transformation:

```tsx
<ScaleIn delay={0.3}>
  <Icon />
</ScaleIn>
```

### StaggerContainer

Animate children sequentially:

```tsx
<StaggerContainer staggerDelay={0.1}>
  <SlideIn><Item1 /></SlideIn>
  <SlideIn><Item2 /></SlideIn>
  <SlideIn><Item3 /></SlideIn>
</StaggerContainer>
```

### InteractiveWrapper

Add hover and tap animations:

```tsx
<InteractiveWrapper 
  hoverType="lift"     // 'scale' | 'lift' | 'glow' | 'brighten'
  tapType="press"      // 'scale' | 'press'
  showFocusRing={true}
>
  <Button />
</InteractiveWrapper>
```

### RevealOnScroll

Viewport-triggered animations:

```tsx
<RevealOnScroll 
  threshold={0.2}    // 0-1, percentage visible
  once={true}        // Only animate once
  rootMargin="50px"  // Trigger offset
>
  <Section />
</RevealOnScroll>
```

### LoadingAnimation

Loading states:

```tsx
<LoadingAnimation type="pulse"> {/* 'pulse' | 'spinner' | 'dots' */}
  <Skeleton />
</LoadingAnimation>
```

### ErrorAnimation

Error feedback:

```tsx
<ErrorAnimation type="shake" trigger={hasError}>
  <ErrorMessage />
</ErrorAnimation>
```

## CSS Animation Classes

For cases where Framer Motion isn't suitable:

### Entrance Animations

```css
.animate-fadeIn
.animate-slideUp
.animate-slideDown
.animate-slideLeft
.animate-slideRight
.animate-scaleIn
.animate-rotateIn
.animate-blurIn
```

### Continuous Animations

```css
.animate-float      /* Floating effect */
.animate-pulse      /* Pulsing opacity/scale */
.animate-spin       /* 360° rotation */
.animate-bounce     /* Bouncing motion */
.animate-shimmer    /* Loading shimmer */
.animate-gradient   /* Gradient animation */
```

### Hover States

```css
.hover-scale      /* Scale on hover */
.hover-lift       /* Lift with shadow */
.hover-glow       /* Glow effect */
.hover-brighten   /* Brightness increase */
```

### Animation Delays

```css
.animation-delay-100  /* 100ms delay */
.animation-delay-200  /* 200ms delay */
/* ... up to 1000ms */
```

## Performance Guidelines

### 1. **Use Transform and Opacity**
These properties are GPU-accelerated and perform best:

```tsx
// Good
<motion.div animate={{ x: 100, opacity: 1 }} />

// Avoid when possible
<motion.div animate={{ left: 100, backgroundColor: 'red' }} />
```

### 2. **Limit Concurrent Animations**
Keep under 5 simultaneous animations for optimal performance.

### 3. **Use will-change Sparingly**

```css
/* Only on elements that will definitely animate */
.will-animate {
  will-change: transform, opacity;
}
```

### 4. **Throttle Scroll Animations**
Use the built-in throttling in scroll-triggered animations.

### 5. **Optimize for Mobile**

```tsx
// Use device-aware settings
const settings = animationSystem.utils.getOptimalSettings();
```

## Accessibility

### Respecting Reduced Motion

All animation components automatically respect user preferences:

```tsx
// This will use instant transitions if reduced motion is enabled
<SlideIn respectReducedMotion={true}>
  <Content />
</SlideIn>
```

### Focus Management

Ensure interactive elements maintain focus indicators:

```tsx
<InteractiveWrapper showFocusRing={true}>
  <button>Accessible Button</button>
</InteractiveWrapper>
```

### Screen Reader Support

Animations should not interfere with screen reader announcements:

```tsx
// Use semantic HTML and ARIA when needed
<motion.div role="status" aria-live="polite">
  <LoadingAnimation>Loading...</LoadingAnimation>
</motion.div>
```

## Best Practices

### 1. **Choose the Right Animation**

- **Entrance**: Use for new content appearing
- **Exit**: Use for content being removed
- **Hover**: Use for interactive feedback
- **Loading**: Use for async operations
- **Error/Success**: Use for user feedback

### 2. **Timing Guidelines**

- **Micro-interactions**: 100-200ms
- **Standard transitions**: 300-500ms
- **Page transitions**: 600-800ms
- **Complex animations**: 800-1200ms

### 3. **Stagger Complex Lists**

```tsx
// Good - creates visual hierarchy
<StaggerContainer staggerDelay={0.05}>
  {items.map(item => <SlideIn key={item.id}>{item}</SlideIn>)}
</StaggerContainer>

// Avoid - all items animate at once
{items.map(item => <SlideIn key={item.id}>{item}</SlideIn>)}
```

### 4. **Layer Animations**

```tsx
// Create depth with multiple animation layers
<SlideIn delay={0}>
  <h1>Title</h1>
</SlideIn>
<SlideIn delay={0.1}>
  <p>Subtitle</p>
</SlideIn>
<SlideIn delay={0.2}>
  <Button />
</SlideIn>
```

### 5. **Test Performance**

Always test animations on:
- Low-end devices
- Different browsers
- With DevTools CPU throttling

## Troubleshooting

### Animation Not Playing

1. Check if component is wrapped in `AnimatePresence` for exit animations
2. Ensure unique `key` props for list items
3. Verify no CSS conflicts with `transform` or `opacity`

### Performance Issues

1. Reduce number of concurrent animations
2. Use `transform` instead of position properties
3. Enable GPU acceleration with `transform: translateZ(0)`
4. Check for layout thrashing

### Accessibility Issues

1. Test with `prefers-reduced-motion: reduce`
2. Ensure focus states are visible
3. Check color contrast during animations
4. Test with screen readers

### Browser Compatibility

The animation system supports:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

For older browsers, animations gracefully degrade to instant transitions.

## Examples

### Hero Section

```tsx
<section className="hero">
  <AnimationComposer animations={['fade', 'scale']}>
    <h1>Welcome to Our Site</h1>
  </AnimationComposer>
  
  <SlideBlur direction="up" delay={0.2}>
    <p>Premium animations for modern web</p>
  </SlideBlur>
  
  <div className="cta-buttons">
    <InteractiveWrapper hoverType="lift" tapType="press">
      <button>Get Started</button>
    </InteractiveWrapper>
  </div>
</section>
```

### Card Grid

```tsx
<StaggerContainer className="grid grid-cols-3 gap-6">
  {services.map((service, index) => (
    <RevealOnScroll key={service.id} threshold={0.3}>
      <InteractiveWrapper hoverType="lift">
        <Card>
          <ScaleIn delay={index * 0.1}>
            <Icon icon={service.icon} />
          </ScaleIn>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </Card>
      </InteractiveWrapper>
    </RevealOnScroll>
  ))}
</StaggerContainer>
```

### Form with States

```tsx
<form onSubmit={handleSubmit}>
  <SlideIn direction="up">
    <input type="text" className="focus-ring" />
  </SlideIn>
  
  <ErrorAnimation type="shake" trigger={hasError}>
    <div className="error-message">{error}</div>
  </ErrorAnimation>
  
  <InteractiveWrapper hoverType="scale" tapType="press">
    <button type="submit">
      {isLoading ? (
        <LoadingAnimation type="spinner">
          <Spinner />
        </LoadingAnimation>
      ) : (
        'Submit'
      )}
    </button>
  </InteractiveWrapper>
</form>
```

## Conclusion

The animation design system provides a comprehensive toolkit for creating premium, performant, and accessible animations. By following these guidelines and using the provided components, you can ensure a consistent and delightful user experience across the entire application.

For questions or contributions, please refer to the main project documentation or contact the development team.