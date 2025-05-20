# Deployment Guide

This document outlines the deployment process for the Ingenious Digital website, including build steps, optimization strategies, and deployment procedures.

## Pre-deployment Checklist

1. **Code Quality**
   - [ ] Run `npm run typecheck` to ensure all TypeScript errors are fixed
   - [ ] Run `npm run lint` to ensure code quality
   - [ ] Verify all components render properly in development mode

2. **Performance**
   - [ ] Check that 3D animations work as expected
   - [ ] Verify that animations are battery-aware and degrade gracefully
   - [ ] Ensure animations pause when tab is not visible

3. **SEO**
   - [ ] Verify all meta tags are present and correctly configured
   - [ ] Check schema.org JSON-LD data for accuracy
   - [ ] Validate canonical URLs

## Build Process

To build the website for production, follow these steps:

1. Clean any previous build to avoid stale files:
   ```bash
   npm run clean
   ```

2. Run type checking to catch any TypeScript errors:
   ```bash
   npm run typecheck
   ```

3. Build the production version of the site:
   ```bash
   npm run build
   ```

4. Test the production build locally:
   ```bash
   npm run preview
   ```

## Performance Optimizations

The build process includes several optimizations:

1. **Code Splitting**
   - The build automatically splits code into chunks
   - Vendor code (React, Three.js) is separated into dedicated chunks
   - Each route gets its own chunk for efficient loading

2. **CSS Optimization**
   - Critical CSS is extracted and inlined
   - Non-critical CSS is loaded asynchronously
   - CSS is minified and optimized

3. **3D Visualizations**
   - Three.js components are optimized for performance
   - Mobile devices use lower-quality settings automatically
   - Animations pause when tab is not visible to save resources

## Deployment to Netlify

The website is deployed to Netlify using continuous deployment:

1. Push changes to the main branch on GitHub
2. Netlify automatically deploys the site using the configuration in `netlify.toml`
3. The build command includes cleaning to avoid stale files:
   ```
   rm -rf dist && npm install --legacy-peer-deps && npm run build
   ```

4. Netlify handles redirects based on the `_redirects` file

## Post-deployment Verification

After deployment, verify the following:

1. **Functionality**
   - [ ] Test the site on multiple browsers (Chrome, Firefox, Safari)
   - [ ] Test on mobile devices
   - [ ] Verify all animations and 3D visualizations work correctly

2. **Performance**
   - [ ] Run Lighthouse tests to ensure good performance scores
   - [ ] Check Core Web Vitals in Google Search Console
   - [ ] Verify loading times are acceptable even on slower connections

3. **SEO**
   - [ ] Submit updated sitemap.xml to search engines
   - [ ] Check for any crawl errors in Google Search Console
   - [ ] Verify schema.org markup using Google's Rich Results Test

## Rollback Procedure

If issues are discovered after deployment:

1. Revert to the previous version in the Netlify dashboard
2. Fix issues in the codebase
3. Deploy the fixed version using the standard deployment process

## 3D Visualization Troubleshooting

If 3D visualizations aren't working correctly:

1. Check console for WebGL errors
2. Verify Three.js dependencies are correctly installed
3. Ensure proper fallbacks for devices that don't support WebGL
4. Test with `?debug=true` URL parameter to enable debug mode

## Contact

For deployment questions or issues, contact Pascal at pascal@ingeniousdigital.com