import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Plugin } from 'vite';
import Critters from 'critters';

// Custom plugin for critical CSS extraction
function criticalCssPlugin(): Plugin {
  return {
    name: 'vite:critical-css',
    apply: 'build', // only run during build
    async transformIndexHtml(html, { filename }) {
      // Skip non-index HTML files
      if (!/index\.html$/.test(filename)) return html;

      // Initialize Critters
      const critters = new Critters({
        // Inline all styles from external stylesheets
        inlineThreshold: 0,
        // Avoid potentially infinite loop with "recursion" approach
        pruneSource: true,
        // Don't worry about unused CSS - we'll do that with PurgeCSS
        reduceInlineStyles: false,
        // Don't actually remove critical styles from the main CSS bundle
        // This ensures all styles are still applied when JS runs
        mergeStylesheets: false,
        // Enhance page speed by preloading the remaining stylesheets
        preload: 'swap',
        // Ensure the CSS is ready to apply when the page loads
        noscriptFallback: true,
        // Add media="print" to print-only styles
        printRules: true,
      });

      try {
        // Process the HTML to inline critical CSS
        const processedHtml = await critters.process(html);
        return processedHtml;
      } catch (err) {
        console.error('Error processing critical CSS:', err);
        return html; // Return original if processing fails
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    criticalCssPlugin(),
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
