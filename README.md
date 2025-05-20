# Ingenious Digital v3

A modern React application built with TypeScript, Tailwind CSS, and Framer Motion, designed to provide digital solutions for local businesses.

## Features

- 🚀 Performance-optimized with smooth page transitions
- 📱 Fully responsive design
- 🎨 Modern UI with animated components
- 🔍 SEO-friendly structure
- 🔒 Built-in security features

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript
- **3D Rendering**: Three.js with React Three Fiber
- **Post-processing**: @react-three/postprocessing

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── services/        # Service-specific components
│   └── NavigationButton # Smooth navigation handling
├── data/                # Static data and content
│   ├── blog/           # Blog posts and categories
│   ├── case-studies/   # Case study content
│   └── services/       # Service information
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── industries/    # Industry-specific pages
│   └── services/      # Service pages
├── services/          # Service-related logic
└── utils/             # Utility functions

```

## Key Components

- **NavigationButton**: Handles smooth page transitions
- **PageTransition**: Provides consistent page transition animations
- **ServiceComponents**: Modular components for each service type
- **AnimationErrorBoundary**: Graceful handling of animation errors
- **3D Visualizations**: Interactive 3D components for enhanced user experience

### 3D Components

The project includes several interactive 3D visualizations built with Three.js:

- **LocationDemographics3D**: Visualizes demographic data for locations
- **SystemNetwork3D**: Displays system integration networks
- **CRMDashboard3D**: Interactive CRM dashboard visualization
- **RankingVisualizer3D**: SEO ranking visualization

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/igdv3.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Navigation System

The application uses a custom navigation system that provides:
- Smooth page transitions
- Consistent animation behavior
- Proper state management during navigation
- Optimized performance

## Performance Optimizations

- Lazy loading of components and routes
- Optimized animations with Framer Motion
- Efficient state management
- Smart caching strategies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.
