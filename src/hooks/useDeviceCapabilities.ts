import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  performanceLevel: 'low' | 'medium' | 'high';
  isMobile: boolean;
  supportsWebGL2: boolean;
  maxTextureSize: number;
  devicePixelRatio: number;
  concurrentComputations: number;
  canUsePostProcessing: boolean;
  canUseHDR: boolean;
  isLowEndDevice: boolean;
  particleMultiplier: number;
}

const checkWebGL2Support = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (e) {
    return false;
  }
};

const getMaxTextureSize = (): number => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) return 2048; // fallback
    
    return gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;
  } catch (e) {
    return 2048; // fallback
  }
};

const evaluatePerformance = (): 'low' | 'medium' | 'high' => {
  // Heuristic for performance level based on various factors
  const memory = (navigator as any).deviceMemory || 4; // Default to 4GB if not available
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
  const isLowEndMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) && (memory < 4 || cores < 4);
  
  if (isLowEndMobile || memory <= 2 || cores <= 2) {
    return 'low';
  } else if (memory <= 8 || cores <= 6) {
    return 'medium';
  } else {
    return 'high';
  }
};

const checkHDRSupport = (): boolean => {
  // Basic check for HDR display capabilities 
  try {
    // Cast to any to access displayP3 which might not be in all TypeScript definitions
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as any;
    return context && typeof context.fillStyle === 'string' &&
      typeof context.createImageData === 'function' && 
      (window as any).matchMedia?.('(color-gamut: p3)').matches;
  } catch (e) {
    return false;
  }
};

export const useDeviceCapabilities = (): DeviceCapabilities => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    performanceLevel: 'medium',
    isMobile: false,
    supportsWebGL2: true,
    maxTextureSize: 4096,
    devicePixelRatio: 1,
    concurrentComputations: 4,
    canUsePostProcessing: true,
    canUseHDR: false,
    isLowEndDevice: false,
    particleMultiplier: 1
  });

  useEffect(() => {
    const performanceLevel = evaluatePerformance();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const supportsWebGL2 = checkWebGL2Support();
    const maxTextureSize = getMaxTextureSize();
    const canUseHDR = checkHDRSupport();
    const isLowEndDevice = 
      performanceLevel === 'low' || 
      !supportsWebGL2 || 
      (navigator as any).deviceMemory < 4 || 
      navigator.hardwareConcurrency < 4;
    
    // Calculate particle multiplier based on device capabilities
    let particleMultiplier = 1.0; // default value
    
    if (performanceLevel === 'high' && supportsWebGL2) {
      particleMultiplier = 1.5; // More particles on high-end devices
    } else if (performanceLevel === 'low' || !supportsWebGL2) {
      particleMultiplier = 0.5; // Fewer particles on low-end devices
    }
    
    // Limit concurrent computations based on available cores
    const concurrentComputations = Math.min(
      navigator.hardwareConcurrency || 4,
      isLowEndDevice ? 2 : 8 
    );
    
    // Determine if post-processing should be enabled
    const canUsePostProcessing = !isLowEndDevice && supportsWebGL2;
    
    setCapabilities({
      performanceLevel,
      isMobile,
      supportsWebGL2,
      maxTextureSize,
      devicePixelRatio: window.devicePixelRatio || 1,
      concurrentComputations,
      canUsePostProcessing,
      canUseHDR,
      isLowEndDevice,
      particleMultiplier
    });
  }, []);

  return capabilities;
};

export default useDeviceCapabilities;