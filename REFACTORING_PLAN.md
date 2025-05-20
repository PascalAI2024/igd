# Refactoring Plan

This document outlines the specific steps to refactor and reorganize our codebase, with a focus on visualizations, animations, and duplicated components.

## Phase 1: Directory Structure Reorganization

### Step 1: Create New Directory Structure

Create the following new directories:

```
/src
  /components
    /visualizations
      /charts
      /network
      /process
      /animations
    /forms
    /core
    /layout
    /shared
  /utils
    /animation
```

### Step 2: Move and Consolidate 3D Visualization Components

#### 2.1 Move Chart Components

Move and rename:
- `/components/charts/ThreeDBarChart.tsx` → `/components/visualizations/charts/ThreeDBarChart.tsx`
- `/components/charts/ThreeDPieChart.tsx` → `/components/visualizations/charts/ThreeDPieChart.tsx`

#### 2.2 Move Network Visualization Components

Move and rename:
- `/components/services/shared/NetworkVisualization3D.tsx` → `/components/visualizations/network/NetworkVisualization3D.tsx`
- `/components/services/system-integration/SystemNetwork.tsx` → `/components/visualizations/network/SystemNetwork.tsx`

#### 2.3 Move Process Visualization Components

Move and rename:
- `/components/services/shared/ProcessFlow3D.tsx` → `/components/visualizations/process/ProcessFlow3D.tsx`
- `/components/services/lead-generation/LeadFunnel3D.tsx` → `/components/visualizations/process/LeadFunnel3D.tsx`

#### 2.4 Move Animation Components

Move and rename:
- `/components/services/ai-ml/NeuralNetworkAnimation.tsx` → `/components/visualizations/animations/NeuralNetworkAnimation.tsx`
- `/components/services/ai-ml/DataVisualization.tsx` → `/components/visualizations/animations/DataVisualization.tsx`
- `/components/AnimationTest.tsx` → `/components/visualizations/animations/AnimationTest.tsx`
- `/components/AnimationErrorBoundary.tsx` → `/components/visualizations/animations/AnimationErrorBoundary.tsx`

### Step 3: Consolidate Service Components

#### 3.1 Consolidate Service Cards

1. Create a unified `/components/shared/ServiceCard.tsx` with variants
2. Refactor to replace:
   - `/components/ServiceCard.tsx`
   - `/components/ServiceCardEnhanced.tsx`
   - `/components/services/ServiceCard.tsx`

#### 3.2 Consolidate Form Components

1. Create a unified `/components/forms/ContactForm.tsx` with variants
2. Refactor to replace:
   - `/components/ContactForm.tsx`
   - `/components/ContactFormEnhanced.tsx`
   - `/components/LeadCaptureForm.tsx`

### Step 4: Reorganize Animation Utilities

1. Refactor animation utilities into:
   - `/utils/animation/controller.ts` (AnimationController class)
   - `/utils/animation/helpers.ts` (utility functions)
   - `/utils/animation/hooks.ts` (custom hooks)
   - `/utils/animation/index.ts` (unified exports)

2. Consolidate duplicate animation logic across components

## Phase 2: Code Refactoring

### Step 1: Create Base Components

#### 1.1 Create Base Chart Component

Create a `/components/visualizations/charts/BaseChart.tsx` that:
- Handles common chart functionality
- Provides shared props and types
- Implements base Three.js setup

#### 1.2 Create Base Form Component

Create a `/components/forms/BaseForm.tsx` that:
- Handles common form functionality
- Manages form state and validation
- Provides shared props and types

### Step 2: Standardize Component APIs

#### 2.1 Standardize Visualization Props

Create a consistent prop interface for all visualization components:
- Common props: `title`, `description`, `height`, `width`, `animationDelay`
- Shared color props: `primaryColor`, `secondaryColor`, `backgroundColor`
- Component-specific props clearly typed and documented

#### 2.2 Standardize Animation APIs

Create a consistent API for all animation components:
- Standard lifecycle methods: `start`, `stop`, `pause`, `resume`
- Consistent event handling: `onPauseChange`, `onComplete`, `onError`
- Performance metrics: `fps`, `memoryUsage`, etc.

### Step 3: Update Imports and References

#### 3.1 Update Import Statements

Update all import statements throughout the codebase to reference the new locations:
- Use a recursive find and replace to update paths
- Verify each component still works after the update

#### 3.2 Update Component References

Update any references to component props or methods:
- Ensure compatibility with the new standardized APIs
- Update documentation to reflect the new structures

## Phase 3: Performance Optimization

### Step 1: Implement Shared Performance Monitoring

1. Create a unified performance monitoring system in `/utils/animation/performance.ts`
2. Add integration with browser performance APIs
3. Implement FPS counter and memory usage tracking

### Step 2: Optimize Animation Rendering

1. Implement shared rendering optimizations:
   - Request animation frame batching
   - Offscreen canvas rendering where appropriate
   - Web worker support for complex calculations

2. Add adaptive quality settings based on device capabilities

## Phase 4: Documentation Updates

### Step 1: Update Component Documentation

1. Add JSDoc comments to all components
2. Create README files for each major component directory
3. Update the animation guide with new examples

### Step 2: Create Visual Component Library

1. Create a simple component showcase page
2. Document each component with examples
3. Provide usage instructions and API documentation

## Implementation Timeline

| Phase | Description | Estimated Time |
|-------|-------------|----------------|
| 1.1   | Directory Structure | 1 day |
| 1.2   | Move Components | 1 day |
| 1.3   | Consolidate Components | 2 days |
| 1.4   | Animation Utilities | 1 day |
| 2.1   | Base Components | 2 days |
| 2.2   | Standardize APIs | 2 days |
| 2.3   | Update References | 1 day |
| 3     | Performance Optimization | 2 days |
| 4     | Documentation | 2 days |

## Testing Strategy

After each phase:

1. Run the application to ensure no visual regressions
2. Verify all animations work as expected
3. Test on various devices and browsers
4. Check performance metrics
5. Fix any issues before proceeding to the next phase

## Final Deliverables

1. Reorganized codebase with clear directory structure
2. Consolidated and standardized components
3. Improved animation framework
4. Comprehensive documentation
5. Performance metrics and optimization report