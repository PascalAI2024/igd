# Code Organization Plan

This document outlines the organization structure for our codebase, focusing on components, utilities, and documentation.

## Component Structure

```
/src
  /components
    /core                       # Base/core UI components
      Button.tsx
      Card.tsx
      ...
    
    /layout                     # Layout-related components
      Footer.tsx
      Header.tsx
      Navbar.tsx
      PageTransition.tsx
      ...
      
    /forms                      # All form-related components
      ContactForm.tsx           # Base contact form
      LeadCaptureForm.tsx       # Form with lead capture functionality
      FormField.tsx             # Reusable form field component
      ...
      
    /visualizations             # All visualization components
      /charts                   # Chart components
        BaseChart.tsx           # Base chart component with shared functionality
        ThreeDBarChart.tsx      # 3D bar chart implementation
        ThreeDPieChart.tsx      # 3D pie chart implementation
        ...
        
      /network                  # Network visualization components
        NetworkVisualization3D.tsx  # 3D network visualization
        SystemNetwork.tsx           # System network visualization
        ...
        
      /process                  # Process visualization components
        ProcessFlow3D.tsx       # 3D process flow visualization
        LeadFunnel3D.tsx        # 3D lead funnel visualization
        ...
        
      /animations               # Animation components
        NeuralNetworkAnimation.tsx  # Neural network animation
        DataVisualization.tsx       # Generic data visualization
        ...
        
    /services                   # Service-specific components
      /ai-ml                    # AI/ML specific components
      /digital-marketing        # Digital marketing specific components
      /web-development          # Web development specific components
      ...
      
    /shared                     # Shared components used across services
      ServiceCard.tsx           # Unified service card component
      ServiceCTA.tsx            # Service call-to-action component
      ...
  
  /hooks                        # Custom React hooks
    useAnimation.ts            # Base animation hook
    useNavigate.ts             # Navigation hook
    ...
    
  /utils                        # Utility functions
    /animation                  # Animation utilities
      controller.ts            # Animation controller classes
      effects.ts               # Animation effects
      performance.ts           # Performance optimization utilities
      
    analytics.ts               # Analytics utilities
    ...
    
  /pages                        # Page components
    /services                   # Service pages
    /industries                 # Industry pages
    ...
```

## Naming Conventions

1. **Components**:
   - Use PascalCase for component files and function names
   - Use descriptive names that clearly indicate the component's purpose
   - For variants, use consistent suffixes (e.g., `Basic`, `Enhanced`, `3D`)

2. **Hooks**:
   - Prefix with `use` (React convention)
   - Clearly indicate the hook's purpose (e.g., `useAnimation`, `useServiceData`)

3. **Utilities**:
   - Use camelCase for utility files and functions
   - Group related utilities in subdirectories
   - Use clear, action-oriented names for functions

## Documentation Structure

```
/
  README.md                     # Project overview and setup instructions
  CONTRIBUTING.md               # Contributing guidelines
  CODE_ORGANIZATION.md          # This file - code organization guidelines
  ANIMATION_GUIDE.md            # Guide for working with animations
  VISUALIZATION_GUIDE.md        # Guide for working with visualizations
  SEO_GUIDE.md                  # SEO guidelines for the project
  QA_REPORT.md                  # Quality assurance report
  /docs
    /components                 # Component documentation
    /architecture               # Architecture documentation
    /performance                # Performance optimization guides
```

## Refactoring Plan

### Phase 1: Consolidate Duplicate Components

1. Create a unified `ServiceCard` component with variants
2. Consolidate contact form components into a base component with variants
3. Create a base visualization component structure

### Phase 2: Reorganize Directory Structure

1. Create the directory structure as outlined above
2. Move components to their appropriate locations
3. Update imports across the codebase

### Phase 3: Standardize Animation Framework

1. Refactor animation utilities into a more modular structure
2. Standardize naming conventions across animation components
3. Extract common animation patterns into reusable hooks

### Phase 4: Improve Documentation

1. Create comprehensive documentation for each major component
2. Document the animation and visualization frameworks
3. Create guides for extending the system

## Style Guidelines

1. **Component Structure**:
   - Props interface at the top
   - Component function
   - Export statement at the bottom

2. **Comments**:
   - JSDoc comments for component definitions
   - Inline comments for complex logic
   - TODO comments for future improvements

3. **Imports**:
   - Group imports in this order:
     1. React and framework imports
     2. Third-party library imports
     3. Internal component imports
     4. Utility and hook imports
     5. Asset imports