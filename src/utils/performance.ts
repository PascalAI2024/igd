import { trackPerformance } from './analytics';

interface PerformanceEntryWithStart extends PerformanceEntry {
  processingStart?: number;
  responseStart?: number;
  requestStart?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

export const measurePerformance = () => {
  // Track First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        trackPerformance(
          'first_contentful_paint',
          entry.startTime,
          'core_web_vitals'
        );
      }
    }
  });
  observer.observe({ entryTypes: ['paint'] });

  // Track Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    trackPerformance(
      'largest_contentful_paint',
      lastEntry.startTime,
      'core_web_vitals'
    );
  });
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

  // Track First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as PerformanceEntryWithStart;
      if (fidEntry.processingStart) {
        trackPerformance(
          'first_input_delay',
          fidEntry.processingStart - fidEntry.startTime,
          'core_web_vitals'
        );
      }
    }
  });
  fidObserver.observe({ entryTypes: ['first-input'] });

  // Track Cumulative Layout Shift
  const clsObserver = new PerformanceObserver((list) => {
    let clsValue = 0;
    for (const entry of list.getEntries()) {
      const shiftEntry = entry as LayoutShiftEntry;
      if (!shiftEntry.hadRecentInput) {
        clsValue += shiftEntry.value;
      }
    }
    trackPerformance(
      'cumulative_layout_shift',
      clsValue,
      'core_web_vitals'
    );
  });
  clsObserver.observe({ entryTypes: ['layout-shift'] });

  // Track Time to First Byte
  const navigationObserver = new PerformanceObserver((list) => {
    const navigation = list.getEntries()[0] as PerformanceEntryWithStart;
    if (navigation.responseStart && navigation.requestStart) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      trackPerformance(
        'time_to_first_byte',
        ttfb,
        'core_web_vitals'
      );
    }
  });
  navigationObserver.observe({ entryTypes: ['navigation'] });

  // Track Resource Loading Performance
  const resourceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        trackPerformance(
          `resource_load_${resource.initiatorType}`,
          resource.duration,
          'resource_timing'
        );
      }
    });
  });
  resourceObserver.observe({ entryTypes: ['resource'] });

  // Cleanup function
  return () => {
    observer.disconnect();
    lcpObserver.disconnect();
    fidObserver.disconnect();
    clsObserver.disconnect();
    navigationObserver.disconnect();
    resourceObserver.disconnect();
  };
};

// Track errors
export const trackError = (error: Error) => {
  trackPerformance(
    'js_error',
    1,
    error.name,
  );
};
