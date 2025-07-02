# GitHub Issues to Create

## Issue 1: Upgrade react-helmet to react-helmet-async to fix deprecation warnings

**Labels:** bug, dependencies

### Description
All pages are showing console warnings about UNSAFE_componentWillMount in strict mode from react-helmet v6.1.0.

### Current State
- Using react-helmet v6.1.0
- Shows deprecation warning on every page load
- Not compatible with React 18 strict mode

### Console Error
```
Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code.
Please update the following components: SideEffect(NullComponent2)
```

### Proposed Solution
Upgrade to react-helmet-async which is the modern, actively maintained fork that's compatible with React 18.

Steps:
1. `npm uninstall react-helmet @types/react-helmet`
2. `npm install react-helmet-async @types/react-helmet-async`
3. Update imports in MetaTags.tsx and any other files using react-helmet
4. Wrap app with HelmetProvider from react-helmet-async

### Impact
- Affects all pages that use MetaTags component
- Currently shows warnings but functionality works
- Will become breaking in future React versions

### Priority
Medium - Functionality works but creates console noise and will break in future

---

## Issue 2: Page Loading Timeouts on Lead Generation and Ad Management Pages

**Labels:** bug, performance

### Description
Two service pages are experiencing navigation timeouts during automated testing, indicating potential performance issues with 3D component loading.

### Affected Pages
- `/services/lead-generation` - Navigation timeout of 30000 ms exceeded
- `/services/ad-management` - Navigation timeout of 30000 ms exceeded

### Possible Causes
1. Heavy 3D components taking too long to load
2. Missing or misconfigured lazy loading
3. Large bundle sizes for these specific pages

### Investigation Needed
1. Check bundle size for these pages
2. Verify 3D components are properly lazy loaded
3. Test on various network conditions
4. Consider implementing loading states or progressive enhancement

### Proposed Solutions
1. Ensure all 3D components use lazy loading from lazyLoad3D utility
2. Add loading skeletons while 3D components load
3. Consider lighter fallbacks for low-end devices
4. Implement timeout handling in 3D components

### Priority
High - Affects user experience on these key service pages

---

## Issue 3: Google Analytics Failed Requests

**Labels:** bug, analytics

### Description
Multiple pages show failed requests to Google Analytics with net::ERR_ABORTED errors.

### Console Error
```
Failed request: https://www.google-analytics.com/g/collect?v=2&tid=G-VEDZ17M6MH... - net::ERR_ABORTED
```

### Affected Pages
- Home page
- Enterprise solution page
- Others (intermittent)

### Possible Causes
1. Ad blockers or privacy extensions
2. Network connectivity issues
3. GA initialization timing issues
4. Missing CORS headers

### Investigation Needed
1. Check GA initialization in analytics.ts
2. Verify tracking ID is correct
3. Test with/without ad blockers
4. Check if errors affect actual tracking

### Proposed Solutions
1. Add error handling to GA requests
2. Consider using try-catch around GA calls
3. Implement fallback tracking mechanism
4. Add retry logic for failed requests

### Priority
Low - Analytics still function, but creates console noise

---

## Issue 5: Browser Back/Forward Cache (bfcache) Handling in 3D Components

**Labels:** enhancement, performance

### Description
The lazyLoad3D utility has code to handle browser back/forward cache, but some 3D components may still have issues when users navigate using browser buttons.

### Current Implementation
- lazyLoad3D.tsx has pageshow and visibilitychange event handlers
- Components unmount and remount based on visibility state
- May cause flickering or loading issues on navigation

### Recommendation
1. Test all 3D components with browser back/forward navigation
2. Ensure proper cleanup of WebGL contexts
3. Consider implementing a more robust state management for 3D components
4. Add performance monitoring for navigation events

### Priority
Low - Current implementation works but could be optimized

---

## Issue 4: Residual Symbol Conversion Errors in MetaTags

**Labels:** bug

### Description
After fixing the httpEquiv attribute, some pages still show "Cannot convert a Symbol value to a string" errors, suggesting additional issues with the MetaTags component or react-helmet integration.

### Error Message
```
Cannot convert a Symbol value to a string
The above error occurred in the <HelmetWrapper> component
```

### Affected Pages
- Landing page
- About page
- Contact page
- Various solution and service pages

### Investigation Needed
1. Check for any other HTML attributes that need React-specific naming
2. Verify all props passed to Helmet are serializable
3. Check for Symbol usage in meta tag values
4. Test with react-helmet-async (may fix this issue)

### Proposed Solutions
1. Audit all attributes in MetaTags component
2. Ensure all values passed to meta tags are strings
3. Add prop validation/sanitization
4. Consider upgrading to react-helmet-async (Issue #1)

### Priority
Medium - Causes errors but pages still load