# Animation Mobile Performance & Accessibility Guide

## Overview

This guide provides comprehensive strategies for ensuring animations perform well on mobile devices while maintaining accessibility standards. Based on analysis of the current codebase, these recommendations will help create inclusive, performant animations that work for all users.

## Current Implementation Analysis

### ✅ Existing Good Practices
- **AnimationController**: Battery-aware optimization
- **Device Detection**: Conditional rendering based on capabilities
- **FPS Throttling**: Automatic reduction for mobile devices
- **Visibility Detection**: Pausing animations when not visible

### ⚠️ Areas for Improvement
- Limited accessibility controls for motion sensitivity
- Inconsistent fallback strategies across components
- No user preference persistence
- Missing performance budgets for animations

## Mobile Performance Guidelines

### 1. Progressive Enhancement Strategy

```typescript
// Device capability detection
const getDeviceCapabilities = () => {
  const gpu = getGPUTier();
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 2;
  const connection = (navigator as any).connection?.effectiveType || '4g';
  
  return {
    tier: gpu.tier || 1,
    memory,
    cores,
    connection,
    canHandle3D: gpu.tier >= 2 && memory >= 4,
    canHandleShaders: gpu.tier >= 3 && memory >= 8,
    canHandlePhysics: cores >= 4 && memory >= 8
  };
};

// Animation quality levels
enum AnimationQuality {
  MINIMAL = 'minimal',     // CSS only
  BASIC = 'basic',        // Simple Framer Motion
  STANDARD = 'standard',  // Framer + Basic Three.js
  HIGH = 'high',         // Full effects
  ULTRA = 'ultra'        // All effects + shaders
}
```

### 2. Performance Budgets

```typescript
const PERFORMANCE_BUDGETS = {
  mobile: {
    fps: 30,
    memoryMB: 50,
    loadTimeMs: 1000,
    interactionDelayMs: 100
  },
  tablet: {
    fps: 45,
    memoryMB: 100,
    loadTimeMs: 800,
    interactionDelayMs: 50
  },
  desktop: {
    fps: 60,
    memoryMB: 200,
    loadTimeMs: 500,
    interactionDelayMs: 16
  }
};
```

### 3. Optimization Techniques

#### A. Texture Optimization
```typescript
// Dynamic texture sizing based on device
const getOptimalTextureSize = (baseSize: number): number => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.tier === 1) return baseSize / 4;
  if (capabilities.tier === 2) return baseSize / 2;
  return baseSize * pixelRatio;
};
```

#### B. Geometry Simplification
```typescript
// LOD (Level of Detail) for 3D models
const getLODSettings = () => ({
  mobile: {
    segments: 16,
    detail: 0.5,
    shadows: false,
    reflections: false
  },
  tablet: {
    segments: 32,
    detail: 0.75,
    shadows: true,
    reflections: false
  },
  desktop: {
    segments: 64,
    detail: 1.0,
    shadows: true,
    reflections: true
  }
});
```

#### C. Animation Frame Management
```typescript
// Intelligent frame skipping
class AdaptiveAnimationController {
  private targetFPS: number;
  private frameBudgetMs: number;
  private skipFrames: boolean = false;
  
  constructor(deviceTier: number) {
    this.targetFPS = deviceTier === 1 ? 24 : deviceTier === 2 ? 30 : 60;
    this.frameBudgetMs = 1000 / this.targetFPS;
  }
  
  shouldSkipFrame(renderTime: number): boolean {
    return renderTime > this.frameBudgetMs * 0.8;
  }
}
```

### 4. Memory Management

```typescript
// Resource pooling for particle systems
class ParticlePool {
  private pool: Particle[] = [];
  private active: Set<Particle> = new Set();
  private maxParticles: number;
  
  constructor(deviceMemory: number) {
    this.maxParticles = deviceMemory >= 8 ? 1000 : 
                       deviceMemory >= 4 ? 500 : 200;
  }
  
  acquire(): Particle | null {
    if (this.active.size >= this.maxParticles) return null;
    // Reuse or create particle
  }
  
  release(particle: Particle): void {
    this.active.delete(particle);
    this.pool.push(particle);
  }
}
```

### 5. Network-Aware Loading

```typescript
// Adaptive asset loading based on connection
const loadAssets = async (connection: string) => {
  const quality = {
    'slow-2g': 'low',
    '2g': 'low',
    '3g': 'medium',
    '4g': 'high',
    'wifi': 'ultra'
  }[connection] || 'medium';
  
  return {
    textures: await loadTextures(quality),
    models: await loadModels(quality),
    sounds: connection === 'wifi' ? await loadSounds() : null
  };
};
```

## Accessibility Considerations

### 1. Motion Sensitivity Support

```typescript
// Respect prefers-reduced-motion
const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReduced;
};

// Animation wrapper that respects preferences
const AccessibleAnimation: FC<Props> = ({ children, fallback }) => {
  const reducedMotion = useReducedMotion();
  
  if (reducedMotion) {
    return fallback || <div>{children}</div>;
  }
  
  return <AnimatedComponent>{children}</AnimatedComponent>;
};
```

### 2. Keyboard Navigation

```typescript
// Ensure 3D scenes are keyboard navigable
const Accessible3DScene: FC = () => {
  const [focusedObject, setFocusedObject] = useState(0);
  const objects = useRef<THREE.Object3D[]>([]);
  
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowRight':
          setFocusedObject(prev => (prev + 1) % objects.current.length);
          break;
        case 'ArrowLeft':
          setFocusedObject(prev => 
            prev === 0 ? objects.current.length - 1 : prev - 1
          );
          break;
        case 'Enter':
        case ' ':
          interactWithObject(objects.current[focusedObject]);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [focusedObject]);
  
  return <Canvas>{/* 3D content */}</Canvas>;
};
```

### 3. Screen Reader Support

```typescript
// Provide alternative content for screen readers
const AnimationWithScreenReaderSupport: FC<Props> = ({ 
  animation, 
  description 
}) => {
  return (
    <>
      <div role="img" aria-label={description} className="sr-only">
        {description}
      </div>
      <div aria-hidden="true">
        {animation}
      </div>
    </>
  );
};
```

### 4. Focus Management

```typescript
// Trap focus within interactive 3D components
const useFocusTrap = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    element.addEventListener('keydown', handleTab);
    return () => element.removeEventListener('keydown', handleTab);
  }, [ref]);
};
```

### 5. Color Contrast & Visual Clarity

```typescript
// Ensure sufficient contrast in animations
const ensureContrast = (color: string, background: string): string => {
  const contrast = getContrastRatio(color, background);
  if (contrast < 4.5) {
    // Adjust color to meet WCAG AA standards
    return adjustColorForContrast(color, background, 4.5);
  }
  return color;
};

// Add outlines to interactive 3D objects
const AccessibleMesh: FC<MeshProps> = (props) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <mesh 
      {...props}
      onPointerOver={() => setFocused(true)}
      onPointerOut={() => setFocused(false)}
    >
      {props.children}
      {focused && (
        <lineSegments>
          <edgesGeometry args={[props.geometry]} />
          <lineBasicMaterial color="#ffff00" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
};
```

## Implementation Checklist

### Performance Testing
- [ ] Test on real devices (not just Chrome DevTools)
- [ ] Monitor memory usage during animations
- [ ] Check battery drain over 5-minute sessions
- [ ] Verify touch responsiveness (< 100ms)
- [ ] Test with network throttling
- [ ] Validate against performance budgets

### Accessibility Testing
- [ ] Test with prefers-reduced-motion enabled
- [ ] Navigate using only keyboard
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Test with browser zoom at 200%
- [ ] Validate focus indicators

### Device-Specific Testing
- [ ] iPhone SE (small screen, older processor)
- [ ] Mid-range Android (varying capabilities)
- [ ] iPad (touch + larger screen)
- [ ] Low-end devices (< 4GB RAM)
- [ ] Slow network conditions (3G)
- [ ] Battery saver mode enabled

## Best Practices Summary

1. **Always provide fallbacks** - Never assume 3D will work
2. **Respect user preferences** - Motion, contrast, data saver
3. **Progressive enhancement** - Start simple, add complexity
4. **Monitor performance** - Real-time adaptation is key
5. **Test on real devices** - Simulators lie about performance
6. **Provide controls** - Let users adjust quality
7. **Document accessibility** - Help users understand interactions
8. **Optimize aggressively** - Every millisecond counts on mobile
9. **Cache intelligently** - Reduce repeated calculations
10. **Measure impact** - Track real user metrics

## Performance Monitoring Code

```typescript
// Real User Monitoring for animations
class AnimationRUM {
  private metrics: PerformanceMetrics[] = [];
  
  trackAnimation(name: string, duration: number, fps: number) {
    this.metrics.push({
      name,
      duration,
      fps,
      timestamp: Date.now(),
      device: this.getDeviceInfo(),
      dropped: this.getDroppedFrames()
    });
    
    // Send to analytics
    if (this.metrics.length >= 10) {
      this.flush();
    }
  }
  
  private flush() {
    // Send metrics to analytics service
    analytics.track('animation_performance', {
      metrics: this.metrics,
      averageFPS: this.getAverageFPS(),
      deviceScore: this.calculateDeviceScore()
    });
    
    this.metrics = [];
  }
}
```

This comprehensive guide ensures that animations not only look impressive but also perform well across all devices and remain accessible to all users. The key is finding the right balance between visual impact and inclusive design.