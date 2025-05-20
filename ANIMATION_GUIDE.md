# Animation Framework Guide

This guide provides information and best practices for using and extending the animation framework in our application.

## Table of Contents

1. [Animation Utilities](#animation-utilities)
2. [Animation Hooks](#animation-hooks)
3. [3D Visualization Components](#3d-visualization-components)
4. [Best Practices](#best-practices)
5. [Performance Optimization](#performance-optimization)

## Animation Utilities

The animation utility module provides core classes and functions for managing animations.

### AnimationController

The `AnimationController` class is the core of the animation system, handling:

- Frame-rate control
- Battery optimization
- Visibility detection (pausing when tab is not visible)
- High-resolution timing

```typescript
import { AnimationController, getOptimalSettings } from '../utils/animation';

// Create controller with optimal settings for the device
const controller = new AnimationController({
  ...getOptimalSettings(),
  onPauseChange: (isPaused) => console.log(`Animation ${isPaused ? 'paused' : 'resumed'}`)
});

// Start animation loop
const cleanup = controller.start((deltaTime) => {
  // Animation logic here
  // deltaTime is in milliseconds since last frame
});

// Stop animation when done
cleanup();
```

## Animation Hooks

### useAnimation

The primary hook for canvas-based animations with performance optimizations:

```typescript
import { useAnimation } from '../hooks/useAnimation';

const MyAnimation = () => {
  const { canvasRef, start, stop, pause, resume, fps, isRunning, isPaused } = useAnimation(
    (deltaTime) => {
      // Animation frame logic
      // deltaTime is in milliseconds
    },
    {
      targetFPS: 60,
      batterySaver: true,
      autoStart: true,
      showError: true,
      onError: (err) => console.error('Animation error:', err)
    }
  );

  return <canvas ref={canvasRef} width={800} height={600} />;
};
```

### useMobileAnimation

Specialized hook for mobile-optimized animations:

```typescript
import { useMobileAnimation } from '../hooks/useAnimation';

// Automatically uses optimal settings for mobile devices
const { canvasRef } = useMobileAnimation((deltaTime) => {
  // Animation logic
});
```

### useHighPerformanceAnimation

For animations that require maximum performance:

```typescript
import { useHighPerformanceAnimation } from '../hooks/useAnimation';

// Uses maximum FPS and disables battery saving
const { canvasRef } = useHighPerformanceAnimation((deltaTime) => {
  // Animation logic
});
```

## 3D Visualization Components

Our application includes several high-quality 3D visualization components:

### ThreeDBarChart

3D bar chart visualization with interactive features:

```tsx
import ThreeDBarChart from '../components/charts/ThreeDBarChart';

<ThreeDBarChart
  title="Performance Metrics"
  description="Key performance indicators"
  data={[
    { label: 'Metric 1', value: 85, color: '#ef4444' },
    { label: 'Metric 2', value: 92, color: '#3b82f6' },
    // ...
  ]}
  height={400}
  animationDelay={0.3}
/>
```

### ThreeDPieChart

3D pie chart visualization with interactive features:

```tsx
import ThreeDPieChart from '../components/charts/ThreeDPieChart';

<ThreeDPieChart
  title="Data Distribution"
  description="Distribution by category"
  data={[
    { label: 'Category 1', value: 35, color: '#ef4444' },
    { label: 'Category 2', value: 25, color: '#3b82f6' },
    // ...
  ]}
  height={400}
  animationDelay={0.3}
/>
```

### ProcessFlow3D

3D visualization of a multi-step process:

```tsx
import ProcessFlow3D from '../components/services/shared/ProcessFlow3D';
import { Search, Target, ChartBar } from 'lucide-react';

<ProcessFlow3D
  steps={[
    {
      icon: Search,
      title: 'Step 1',
      description: 'Step 1 description',
      focus: 'Focus Area',
      details: ['Detail 1', 'Detail 2', 'Detail 3']
    },
    // Additional steps...
  ]}
  title="Process Title"
  subtitle="Process description"
  primaryColor="#ef4444"
  secondaryColor="#3b82f6"
/>
```

### NetworkVisualization3D

3D visualization of network and system architectures:

```tsx
import NetworkVisualization3D from '../components/services/shared/NetworkVisualization3D';

<NetworkVisualization3D
  title="System Architecture"
  description="Interactive visualization of system components"
  height={600}
  nodes={[
    { id: 'node1', type: 'server', label: 'Server', description: 'Main server' },
    { id: 'node2', type: 'database', label: 'Database', description: 'Data storage' },
    // Additional nodes...
  ]}
  links={[
    { source: 'node1', target: 'node2', label: 'Connection', animated: true },
    // Additional links...
  ]}
/>
```

### NeuralNetworkAnimation

Animated visualization of a neural network:

```tsx
import NeuralNetworkAnimation from '../components/services/ai-ml/NeuralNetworkAnimation';

<NeuralNetworkAnimation
  title="Neural Network"
  description="Interactive neural network visualization"
  layers={[4, 8, 6, 2]}
  height={400}
  animationDelay={0.3}
  highlightColor="rgba(255, 0, 0, 0.8)"
/>
```

## Best Practices

### Performance Optimization

1. **Throttle Animation Frames**: 
   - Use the targetFPS setting to limit frame rate on less powerful devices
   - Lower FPS (30-45) is often sufficient for most UI animations

2. **Battery Awareness**:
   - Enable batterySaver for mobile animations
   - Reduce complexity on battery-powered devices

3. **Visibility Detection**:
   - Animations should automatically pause when the tab is not visible
   - Resume when the tab becomes visible again

4. **Error Handling**:
   - Always wrap animations in AnimationErrorBoundary
   - Provide fallbacks for devices that don't support canvas animations

### Code Organization

1. **Separation of Concerns**:
   - Keep animation logic separate from component rendering
   - Use dedicated hooks for animation state management

2. **Component Structure**:
   - For complex animations, split into smaller components
   - Use composition for reusable animation elements

3. **Consistent API**:
   - Use consistent prop names across animation components
   - Follow the same patterns for controls (start, stop, pause, resume)

### Adding New Animations

When adding new animation components:

1. Start by choosing the appropriate base:
   - Canvas-based: use useAnimation hook
   - Three.js-based: extend from 3D visualization components
   - Simple UI animations: use framer-motion

2. Implement the animation logic in a separate function or hook

3. Ensure proper cleanup to prevent memory leaks

4. Add error boundaries and fallbacks

5. Test performance on various devices

## Performance Optimization

### Strategies for Optimizing Complex Animations

1. **Reduce Drawing Operations**:
   - Limit what gets redrawn each frame
   - Use layers for static elements
   - Only animate changing elements

2. **Optimize Calculations**:
   - Precalculate what you can
   - Use memoization for expensive calculations
   - Throttle physics calculations for complex simulations

3. **Level of Detail**:
   - Reduce detail based on performance metrics
   - Simplify geometry for distant or background elements
   - Implement a progressive level of detail system

4. **Batching**:
   - Batch similar operations
   - Minimize state changes
   - Group draw calls

### Measuring Performance

Use the built-in performance monitoring:

```tsx
// The fps value from useAnimation gives real-time performance metrics
const { fps } = useAnimation(animationCallback, options);

// Display it during development
{import.meta.env.DEV && (
  <div className="performance-stats">FPS: {Math.round(fps)}</div>
)}
```

For more detailed performance analysis, use the utility functions in `utils/performance.ts`.

## Further Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Canvas API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL Fundamentals](https://webglfundamentals.org/)