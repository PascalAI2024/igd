import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheck, 
  FiX, 
  FiAlertCircle,
  FiInfo,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiDatabase
} from 'react-icons/fi';

// Import all our components
import { OptimizedImage, ResponsiveImage } from '../components/OptimizedImage';
import { LazyLoad, LazyComponent } from '../components/LazyLoad';
import { SkipLinks, ScreenReaderOnly, LiveRegion, FocusTrap, FocusIndicator } from '../components/accessibility';
import { useAnimationPerformance, useDebounce, useThrottle, prefersReducedMotion } from '../utils/performance';
import { announce } from '../utils/accessibility';

// Demo components
const DemoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-gray-900">{title}</h2>
    <div className="bg-white rounded-lg shadow-lg p-8">
      {children}
    </div>
  </section>
);

const UIShowcase: React.FC = () => {
  // Demo states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [counter, setCounter] = useState(0);
  const [notification, setNotification] = useState('');
  
  // Performance hooks
  const { fps, isLowPerformance, devicePerformance } = useAnimationPerformance();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const throttledIncrement = useThrottle(() => setCounter(c => c + 1), 1000);
  
  const reducedMotion = prefersReducedMotion();

  // Handle notification
  const showNotification = (message: string) => {
    setNotification(message);
    announce(message, 'polite');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SkipLinks />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">UI Component Showcase</h1>
          <p className="text-lg text-gray-600 mt-2">Development-only page showcasing all components</p>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 py-12">
        {/* Performance Stats */}
        <DemoSection title="Performance Monitoring">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">FPS Monitor</h3>
              <p className="text-3xl font-bold text-primary-600">{fps}</p>
              <p className="text-sm text-gray-600 mt-1">
                {isLowPerformance ? 'Low Performance Detected' : 'Performance Normal'}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Device Performance</h3>
              <p className="text-3xl font-bold text-primary-600 capitalize">{devicePerformance}</p>
              <p className="text-sm text-gray-600 mt-1">Based on hardware capabilities</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Motion Preference</h3>
              <p className="text-3xl font-bold text-primary-600">
                {reducedMotion ? 'Reduced' : 'Normal'}
              </p>
              <p className="text-sm text-gray-600 mt-1">User's motion preference</p>
            </div>
          </div>
        </DemoSection>

        {/* Image Optimization */}
        <DemoSection title="Optimized Images">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Lazy Loaded Image</h3>
              <OptimizedImage
                src="https://source.unsplash.com/800x600/?technology"
                alt="Technology demo"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-4">Priority Image (No Lazy Load)</h3>
              <OptimizedImage
                src="https://source.unsplash.com/800x600/?business"
                alt="Business demo"
                width={400}
                height={300}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </DemoSection>

        {/* Button Styles */}
        <DemoSection title="Button Variants">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">
                  Primary Button
                </button>
                <button className="btn-primary flex items-center gap-2">
                  With Icon <FiArrowRight />
                </button>
                <button className="btn-primary" disabled>
                  Disabled
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-secondary">
                  Secondary Button
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  With Icon <FiCheck />
                </button>
                <button className="btn-secondary" disabled>
                  Disabled
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-outline">
                  Outline Button
                </button>
                <button className="btn-outline flex items-center gap-2">
                  With Icon <FiInfo />
                </button>
                <button className="btn-outline" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Lazy Loading Demo */}
        <DemoSection title="Lazy Loading Components">
          <div className="space-y-8">
            <LazyLoad
              fallback={
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                  <p className="text-gray-500">Scroll to load content...</p>
                </div>
              }
            >
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-2">Lazy Loaded Content</h3>
                <p>This content was loaded when it came into view!</p>
              </div>
            </LazyLoad>
          </div>
        </DemoSection>

        {/* Accessibility Features */}
        <DemoSection title="Accessibility Features">
          <div className="space-y-6">
            {/* Focus Trap Demo */}
            <div>
              <h3 className="font-semibold mb-4">Focus Trap Demo</h3>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                Open Modal with Focus Trap
              </button>
              
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <FocusTrap>
                    <div className="bg-white rounded-lg p-8 max-w-md">
                      <h3 className="text-xl font-bold mb-4">Modal with Focus Trap</h3>
                      <p className="mb-4">Tab navigation is trapped within this modal.</p>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Try tabbing through..."
                          className="w-full px-4 py-2 border rounded"
                        />
                        <div className="flex gap-4">
                          <button className="btn-primary">Action</button>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn-secondary"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </FocusTrap>
                </div>
              )}
            </div>

            {/* Screen Reader Demo */}
            <div>
              <h3 className="font-semibold mb-4">Screen Reader Only Content</h3>
              <p>
                This button has additional context for screen readers:
                <ScreenReaderOnly> (Opens in new window)</ScreenReaderOnly>
              </p>
              <button className="btn-primary mt-2">
                External Link
                <ScreenReaderOnly> (Opens in new window)</ScreenReaderOnly>
              </button>
            </div>

            {/* Live Region Demo */}
            <div>
              <h3 className="font-semibold mb-4">Live Announcements</h3>
              <button
                onClick={() => showNotification('Action completed successfully!')}
                className="btn-primary"
              >
                Trigger Announcement
              </button>
              <LiveRegion message={notification} />
            </div>
          </div>
        </DemoSection>

        {/* Performance Hooks Demo */}
        <DemoSection title="Performance Hooks">
          <div className="space-y-6">
            {/* Debounce Demo */}
            <div>
              <h3 className="font-semibold mb-4">Debounced Search</h3>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search (debounced)..."
                className="w-full px-4 py-2 border rounded"
              />
              <p className="mt-2 text-sm text-gray-600">
                Debounced value: {debouncedSearch || '(empty)'}
              </p>
            </div>

            {/* Throttle Demo */}
            <div>
              <h3 className="font-semibold mb-4">Throttled Action</h3>
              <button
                onClick={throttledIncrement}
                className="btn-primary"
              >
                Increment (Throttled to 1/sec)
              </button>
              <p className="mt-2 text-lg">Counter: {counter}</p>
            </div>
          </div>
        </DemoSection>

        {/* Animation States */}
        <DemoSection title="Animation States">
          <div className="grid md:grid-cols-3 gap-6">
            {['success', 'error', 'loading'].map((state) => (
              <motion.div
                key={state}
                className={`p-6 rounded-lg text-center ${
                  state === 'success' ? 'bg-green-50 text-green-800' :
                  state === 'error' ? 'bg-red-50 text-red-800' :
                  'bg-blue-50 text-blue-800'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {state === 'success' && <FiCheck className="text-4xl mx-auto mb-2" />}
                {state === 'error' && <FiX className="text-4xl mx-auto mb-2" />}
                {state === 'loading' && (
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-current mx-auto mb-2" />
                )}
                <p className="font-semibold capitalize">{state} State</p>
              </motion.div>
            ))}
          </div>
        </DemoSection>

        {/* Icons Gallery */}
        <DemoSection title="Icon Library">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              FiZap, FiUsers, FiTrendingUp, FiShield,
              FiCpu, FiGlobe, FiLayers, FiDatabase,
              FiArrowRight, FiCheck, FiX, FiAlertCircle,
              FiInfo
            ].map((Icon, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              >
                <Icon className="text-2xl text-gray-700" />
              </div>
            ))}
          </div>
        </DemoSection>

        {/* Focus Indicator Demo */}
        <DemoSection title="Focus Indicators">
          <FocusIndicator>
            <div className="space-y-4">
              <p>Tab through these elements to see custom focus indicators:</p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-100 rounded">Button 1</button>
                <button className="px-4 py-2 bg-gray-100 rounded">Button 2</button>
                <input type="text" placeholder="Input field" className="px-4 py-2 border rounded" />
                <select className="px-4 py-2 border rounded">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
          </FocusIndicator>
        </DemoSection>
      </main>
    </div>
  );
};

export default UIShowcase;