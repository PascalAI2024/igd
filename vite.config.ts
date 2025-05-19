import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Plugin } from 'vite';

// Simple CSS preload plugin (no external dependency)
function cssPreloadPlugin(): Plugin {
  return {
    name: 'vite:css-preload',
    apply: 'build', // only run during build
    transformIndexHtml(html) {
      // Add preload links for CSS files
      const cssLinkPattern = /<link rel="stylesheet" href="([^"]+)">/g;
      const preloadLinks = [];
      let match;

      // Find all CSS files and create preload links
      while ((match = cssLinkPattern.exec(html)) !== null) {
        const cssFile = match[1];
        preloadLinks.push(
          `<link rel="preload" href="${cssFile}" as="style">`
        );
      }

      // Insert preload links in head
      if (preloadLinks.length > 0) {
        html = html.replace('</head>', `${preloadLinks.join('\n')}\n</head>`);
      }

      return html;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssPreloadPlugin(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
    strictPort: true, // Don't try other ports
    host: true,
    open: true // Open browser automatically
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
          // Add new chunks for better code splitting
          'components-core': [
            '/src/components/MetaTags.tsx',
            '/src/components/PageTransition.tsx',
            '/src/components/Navbar.tsx',
            '/src/components/Footer.tsx',
            '/src/components/ErrorBoundary.tsx'
          ],
        },
        // Optimize CSS and assets
        assetFileNames: 'assets/[name]-[hash].[ext]',
      }
    },
    // Optimize loading performance
    cssCodeSplit: true,
    sourcemap: false,
    // Minimize output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // Optimize dev experience
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react']
  },
  // Enable fast refresh
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
