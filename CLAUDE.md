# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ingenious Digital v3 is a modern React application built with TypeScript, Tailwind CSS, and Framer Motion, designed to provide digital solutions for local businesses. The project features smooth page transitions, fully responsive design, and interactive 3D visualizations built with Three.js and React Three Fiber.

## Development Commands

### Essential Commands

```bash
# Start the development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Clean the dist directory
npm run clean

# Build the project for production (includes type checking)
npm run build

# Build the project without type checking (when needed)
npm run build-force

# Preview the production build
npm run preview

# Run the complete validation process before deployment
npm run validate

# Check for broken links in the codebase
npm run check-links

# Check for broken links in a specific file or directory
npm run check-links:specific
```

### Deployment Process

Follow these steps for deployment:

1. Run the validation script to ensure the build is ready:
   ```bash
   npm run validate
   ```

2. If validation passes, deploy to Netlify by pushing to the main branch.

## Architecture Overview

### Core Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **3D Rendering**: Three.js with React Three Fiber and @react-three/drei
- **Post-processing**: @react-three/postprocessing

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── services/        # Service-specific components
│   ├── locations/       # Location visualization components
│   ├── backgrounds/     # Background and effect components 
│   ├── charts/          # Data visualization components
│   └── effects/         # Animation and visual effect components
├── data/                # Static data and content
│   ├── blog/           # Blog posts and categories
│   ├── case-studies/   # Case study content
│   ├── services/       # Service information
│   └── solutions/      # Solution templates
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── industries/    # Industry-specific pages
│   └── services/      # Service pages
├── services/          # Service-related logic
└── utils/             # Utility functions and helpers
```

### Animation Framework

The project uses a sophisticated animation system:

1. **Animation Controller**: Core classes for managing animations with battery optimization and visibility detection
2. **Animation Hooks**: Custom hooks like `useAnimation` for canvas-based animations with performance optimizations
3. **3D Components**: Several 3D visualization components built with Three.js:
   - `ThreeDBarChart` & `ThreeDPieChart`: 3D data visualizations
   - `ProcessFlow3D`: 3D visualization of multi-step processes
   - `NetworkVisualization3D`: 3D visualization of networks
   - `NeuralNetworkAnimation`: Animated neural network visualization

Animation components follow performance best practices:
- Throttle animation frames and limit FPS for performance
- Battery awareness with reduced complexity on mobile
- Visibility detection to pause when not visible
- Error handling with AnimationErrorBoundary
- Level of detail adjustments based on device capabilities

### Performance Optimization

The build system includes several optimizations:
- Code splitting with dedicated chunks for vendor libraries
- CSS optimization with critical CSS extraction
- 3D visualizations with adaptive quality based on device

### SEO Considerations

- Meta tags are managed through the MetaTags component
- Schema.org JSON-LD data is included for better search results
- The site includes proper canonical URLs and a sitemap

## Working with 3D Visualizations

When making changes to 3D visualization components:

1. Follow the performance best practices in ANIMATION_GUIDE.md
2. Test on multiple devices and browser types
3. Ensure components have appropriate fallbacks
4. Use the shared components when possible (ProcessFlow3D, NetworkVisualization3D)
5. Enable battery optimization for mobile devices

## Code Standards

1. Use TypeScript for all new components and files
2. Follow the project's naming conventions (PascalCase for components, camelCase for utilities)
3. Implement appropriate error boundaries and fallbacks
4. Ensure components are responsive across device types
5. Test changes with both `npm run typecheck` and `npm run lint` before committing