import React, { createContext, useContext, ReactNode } from 'react';
import useDeviceCapabilities, { DeviceCapabilities } from '../hooks/useDeviceCapabilities';

// Create a context for performance settings
export const PerformanceContext = createContext<ReturnType<typeof useDeviceCapabilities> | undefined>(undefined);

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const capabilities = useDeviceCapabilities();
  
  return (
    <PerformanceContext.Provider value={capabilities}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Hook to use the performance context
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (context === undefined) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// Default export as a named object containing both the provider and hook
export default { PerformanceProvider, usePerformance };