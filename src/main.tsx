import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/animations.css';

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render with strict mode
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Report web vitals in development
if (import.meta.env.DEV) {
  const reportWebVitals = () => {
    // Report Cumulative Layout Shift
    const layoutShiftEntries = performance.getEntriesByType('layout-shift') as LayoutShift[];
    const cls = layoutShiftEntries.reduce((sum, entry) => sum + entry.value, 0);
    console.log('Cumulative Layout Shift:', cls.toFixed(3));

    // Report First Contentful Paint
    const [fcp] = performance.getEntriesByName('first-contentful-paint');
    if (fcp) {
      console.log('First Contentful Paint:', (fcp.startTime / 1000).toFixed(2), 's');
    }
  };

  // Report after a short delay to ensure metrics are available
  setTimeout(reportWebVitals, 3000);
}

// TypeScript interfaces for Web Vitals
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
