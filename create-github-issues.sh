#!/bin/bash

# Script to create GitHub issues for IGD project
# Run this after authenticating with: gh auth login

echo "Creating GitHub issues for PascalAI2024/igd..."

# Issue 1: Page loading timeouts
gh issue create \
  --repo PascalAI2024/igd \
  --title "Page loading timeouts on Lead Generation and Ad Management pages" \
  --body "$(cat <<'EOF'
## Problem Description

Multiple pages are experiencing 30-second timeouts due to heavy 3D visualizations:

### Affected Pages:
- `/services/lead-generation` - ProcessFlow3D component timeout
- `/services/ad-management` - NetworkVisualization3D component timeout
- `/solutions/customer-acquisition` - Slow loading with 3D background

### Root Cause:
The Three.js components (ProcessFlow3D, NetworkVisualization3D) are resource-intensive and causing timeouts on initial page loads. This impacts user experience and SEO.

### Recommended Solutions:
1. Implement lazy loading for 3D components
2. Add loading states with progressive enhancement
3. Consider simpler alternatives for mobile devices
4. Optimize Three.js scene complexity

### Impact:
- Poor user experience with long wait times
- Potential SEO penalties for slow page loads
- Higher bounce rates on affected pages
EOF
)" \
  --label "bug" \
  --label "performance"

# Issue 2: React Helmet upgrade
gh issue create \
  --repo PascalAI2024/igd \
  --title "Upgrade from react-helmet to react-helmet-async for React 18" \
  --body "$(cat <<'EOF'
## Problem Description

The application is using the deprecated `react-helmet` package which is causing warnings with React 18:

```
Warning: Using UNSAFE_componentWillMount in strict mode is not recommended
```

### Current State:
- Using `react-helmet: ^6.1.0`
- Multiple warnings appear during development
- May cause issues with React 18's concurrent features

### Required Migration:
1. Replace `react-helmet` with `react-helmet-async`
2. Update all imports from `react-helmet` to `react-helmet-async`
3. Wrap the app with `HelmetProvider`
4. Test all pages to ensure meta tags still work correctly

### Files to Update:
- `package.json` - Update dependency
- `src/main.tsx` - Add HelmetProvider
- All components using Helmet (multiple files across the codebase)

### Benefits:
- React 18 compatibility
- Better support for server-side rendering
- No deprecation warnings
- Improved performance with concurrent rendering
EOF
)" \
  --label "enhancement" \
  --label "dependencies"

# Issue 3: ROI Calculator review
gh issue create \
  --repo PascalAI2024/igd \
  --title "Review ROI calculator formulas - multipliers may be too aggressive" \
  --body "$(cat <<'EOF'
## Problem Description

The ROI calculators across various service pages are showing potentially unrealistic revenue multipliers that could mislead clients:

### Examples Found:
- **Lead Generation**: 2.5x revenue growth claims
- **Email Marketing**: 4x ROI claims
- **Social Media Marketing**: 3x engagement to revenue conversion
- **Ad Management**: Claims of 250-400% revenue increases

### Concerns:
1. These multipliers appear to be hardcoded without industry benchmarks
2. No disclaimers about "results may vary"
3. Could create unrealistic client expectations
4. May damage credibility if results don't match claims

### Recommended Actions:
1. Review all ROI calculator formulas with realistic industry benchmarks
2. Add disclaimers about typical vs best-case scenarios
3. Consider showing ranges instead of fixed multipliers
4. Add case study links to support claims
5. Include factors that affect ROI (industry, budget, competition)

### Affected Files:
- `/src/pages/services/LeadGeneration.tsx`
- `/src/pages/services/EmailMarketing.tsx`
- `/src/pages/services/SocialMediaMarketing.tsx`
- `/src/pages/services/AdManagement.tsx`
- Various solution pages with ROI calculators
EOF
)" \
  --label "content" \
  --label "enhancement"

# Issue 4: Google Analytics errors
gh issue create \
  --repo PascalAI2024/igd \
  --title "Google Analytics failing to load - net::ERR_ABORTED errors" \
  --body "$(cat <<'EOF'
## Problem Description

Google Analytics is failing to load across all pages with network errors:

### Error Details:
```
GET https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX net::ERR_ABORTED 404
```

### Root Causes:
1. Invalid or placeholder Google Analytics ID (`G-XXXXXXXXX`)
2. Script is being loaded but the ID is not configured
3. Errors appear on every page load

### Impact:
- No analytics data being collected
- Console errors on every page
- Potential performance impact from failed requests
- Missing crucial user behavior data

### Recommended Fix:
1. Add proper Google Analytics ID to environment variables
2. Update the implementation to check for valid ID before loading
3. Add error handling for analytics failures
4. Consider implementing a fallback analytics solution

### Implementation Location:
- Check `index.html` or main app component for GA initialization
- Add environment variable `VITE_GA_TRACKING_ID`
- Implement conditional loading based on ID availability
EOF
)" \
  --label "bug" \
  --label "analytics"

# Issue 5: Three.js resource management
gh issue create \
  --repo PascalAI2024/igd \
  --title "Implement resource manager for Three.js components to prevent memory leaks" \
  --body "$(cat <<'EOF'
## Problem Description

Multiple Three.js components are not properly disposing of resources, leading to memory leaks and performance degradation:

### Affected Components:
- `ProcessFlow3D` - geometries and materials not disposed
- `NetworkVisualization3D` - particle systems and textures retained
- `NeuralNetworkAnimation` - animation loops continue after unmount
- `ThreeDBarChart` & `ThreeDPieChart` - chart resources not cleaned up

### Memory Leak Evidence:
- Memory usage increases on page navigation
- Old WebGL contexts remain active
- Geometries and materials accumulate in memory
- Animation frames continue running after component unmount

### Proposed Solution:

1. **Create a centralized resource manager:**
```typescript
class ThreeResourceManager {
  private geometries: Set<THREE.BufferGeometry> = new Set();
  private materials: Set<THREE.Material> = new Set();
  private textures: Set<THREE.Texture> = new Set();
  
  register(resource: THREE.BufferGeometry | THREE.Material | THREE.Texture) { }
  dispose(resource: THREE.BufferGeometry | THREE.Material | THREE.Texture) { }
  disposeAll() { }
}
```

2. **Implement proper cleanup in useEffect:**
- Cancel animation frames
- Dispose geometries, materials, and textures
- Remove event listeners
- Clear WebGL contexts

3. **Add resource tracking hooks:**
- `useThreeResource` hook for automatic cleanup
- Integration with existing AnimationController

### Benefits:
- Prevent memory leaks
- Improve performance on navigation
- Better mobile device support
- Reduced browser crashes
EOF
)" \
  --label "enhancement" \
  --label "performance"

echo "All issues created successfully!"
echo "Check them at: https://github.com/PascalAI2024/igd/issues"