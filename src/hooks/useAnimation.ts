import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimationController, getOptimalSettings, isAnimationSupported } from '../utils/animation';

interface AnimationConfig {
  /** Target FPS for the animation */
  targetFPS?: number;
  /** Whether to enable battery saving mode on mobile */
  batterySaver?: boolean;
  /** Callback when animation is paused/resumed */
  onPauseChange?: (isPaused: boolean) => void;
  /** Callback for cleanup */
  onCleanup?: () => void;
}

interface UseAnimationOptions extends AnimationConfig {
  /** Whether to auto-start the animation */
  autoStart?: boolean;
  /** Whether to show error messages */
  showError?: boolean;
  /** Error callback */
  onError?: (error: Error) => void;
}

interface UseAnimationReturn {
  /** Canvas ref to attach to your canvas element */
  canvasRef: React.RefObject<HTMLCanvasElement>;
  /** Start the animation */
  start: () => void;
  /** Stop the animation */
  stop: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Resume the animation */
  resume: () => void;
  /** Current FPS */
  fps: number;
  /** Whether animation is supported */
  isSupported: boolean;
  /** Whether animation is currently running */
  isRunning: boolean;
  /** Whether animation is paused */
  isPaused: boolean;
  /** Any error that occurred */
  error: Error | null;
}

/**
 * Hook for managing canvas animations with performance optimizations
 * @param callback Animation frame callback
 * @param options Animation options
 * @returns Animation controls and state
 * 
 * @example
 * ```tsx
 * const MyAnimation = () => {
 *   const { canvasRef, start, stop, isPaused } = useAnimation((deltaTime) => {
 *     // Animation logic here
 *   }, { targetFPS: 60 });
 * 
 *   return (
 *     <canvas ref={canvasRef} />
 *   );
 * };
 * ```
 */
export function useAnimation(
  callback: (deltaTime: number) => void,
  options: UseAnimationOptions = {}
): UseAnimationReturn {
  const {
    autoStart = true,
    showError = true,
    onError,
    ...animationConfig
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);
  const [fps, setFPS] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Check if animation is supported
  const isSupported = isAnimationSupported();

  // Initialize animation controller
  useEffect(() => {
    if (!isSupported) {
      const err = new Error('Canvas animation not supported in this browser');
      setError(err);
      if (showError) {
        onError?.(err);
      }
      return;
    }

    const config = {
      ...getOptimalSettings(),
      ...animationConfig,
      onPauseChange: (paused: boolean) => {
        setIsPaused(paused);
        options.onPauseChange?.(paused);
      }
    };

    controllerRef.current = new AnimationController(config);

    // Auto-start if enabled
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [isSupported, autoStart]);

  // Update FPS counter
  useEffect(() => {
    if (!controllerRef.current || !isRunning) return;

    const interval = setInterval(() => {
      setFPS(controllerRef.current?.getFPS() || 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Start animation
  const start = useCallback(() => {
    if (!controllerRef.current || !canvasRef.current) return;

    try {
      const cleanup = controllerRef.current.start(callback);
      setIsRunning(true);
      setError(null);

      return cleanup;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start animation');
      setError(error);
      setIsRunning(false);
      if (showError) {
        onError?.(error);
      }
    }
  }, [callback, showError, onError]);

  // Stop animation
  const stop = useCallback(() => {
    controllerRef.current?.start(() => {})(); // Call the cleanup function
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  // Pause animation
  const pause = useCallback(() => {
    controllerRef.current?.pause();
  }, []);

  // Resume animation
  const resume = useCallback(() => {
    controllerRef.current?.resume();
  }, []);

  return {
    canvasRef,
    start,
    stop,
    pause,
    resume,
    fps,
    isSupported,
    isRunning,
    isPaused,
    error
  };
}

/**
 * Hook for managing mobile-optimized animations
 * Automatically adjusts settings for mobile devices
 */
export function useMobileAnimation(
  callback: (deltaTime: number) => void,
  options: Omit<UseAnimationOptions, 'targetFPS' | 'batterySaver'> = {}
): UseAnimationReturn {
  const mobileSettings = getOptimalSettings();
  return useAnimation(callback, {
    ...options,
    ...mobileSettings
  });
}

/**
 * Hook for managing high-performance animations
 * Disables battery saving and runs at maximum FPS
 */
export function useHighPerformanceAnimation(
  callback: (deltaTime: number) => void,
  options: Omit<UseAnimationOptions, 'targetFPS' | 'batterySaver'> = {}
): UseAnimationReturn {
  return useAnimation(callback, {
    ...options,
    targetFPS: 60,
    batterySaver: false
  });
}
