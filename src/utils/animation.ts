/**
 * Utility functions for animation performance and optimization
 */

// Check if animation is supported
export const isAnimationSupported = (): boolean => {
  return typeof window !== 'undefined' && 
    typeof window.requestAnimationFrame === 'function' &&
    typeof window.cancelAnimationFrame === 'function' &&
    typeof window.performance === 'object' &&
    typeof window.performance.now === 'function';
};

interface BatteryManager {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

// Get optimal settings based on device and battery status
export const getOptimalSettings = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasBattery = !!(navigator as NavigatorWithBattery).getBattery;

  return {
    targetFPS: isMobile ? 30 : 60,
    batterySaver: isMobile && hasBattery
  };
};

interface AnimationConfig {
  targetFPS?: number;
  batterySaver?: boolean;
  onPauseChange?: (isPaused: boolean) => void;
}

// Animation controller class
export class AnimationController {
  private frameId: number | null = null;
  private lastTime: number = 0;
  private fps: number = 60;
  private fpsInterval: number;
  private isPaused: boolean = false;
  private onPauseChange?: (isPaused: boolean) => void;

  constructor(config: AnimationConfig) {
    this.fps = config.targetFPS || 60;
    this.fpsInterval = 1000 / this.fps;
    this.onPauseChange = config.onPauseChange;

    // Handle battery status changes
    if (config.batterySaver && (navigator as NavigatorWithBattery).getBattery) {
      (navigator as NavigatorWithBattery).getBattery?.()
        .then((battery: BatteryManager) => {
          const handleBatteryChange = () => {
            if (battery.level <= 0.2 && !battery.charging) {
              this.fps = 30; // Reduce FPS on low battery
              this.fpsInterval = 1000 / this.fps;
            } else {
              this.fps = config.targetFPS || 60;
              this.fpsInterval = 1000 / this.fps;
            }
          };

          battery.addEventListener('levelchange', handleBatteryChange);
          battery.addEventListener('chargingchange', handleBatteryChange);
        })
        .catch(() => {
          // Fallback to default settings if battery API fails
          this.fps = config.targetFPS || 60;
          this.fpsInterval = 1000 / this.fps;
        });
    }

    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }

  // Start animation loop
  start(callback: (deltaTime: number) => void): () => void {
    let then = performance.now();
    let elapsed: number;

    const animate = (now: number) => {
      if (this.isPaused) return;

      this.frameId = requestAnimationFrame(animate);
      elapsed = now - then;

      if (elapsed > this.fpsInterval) {
        then = now - (elapsed % this.fpsInterval);
        callback(elapsed);
      }
    };

    this.frameId = requestAnimationFrame(animate);

    // Return cleanup function
    return () => {
      if (this.frameId !== null) {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
      }
    };
  }

  // Pause animation
  pause(): void {
    if (!this.isPaused) {
      this.isPaused = true;
      this.onPauseChange?.(true);
    }
  }

  // Resume animation
  resume(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.onPauseChange?.(false);
      this.lastTime = performance.now();
    }
  }

  // Get current FPS
  getFPS(): number {
    return this.fps;
  }
}

interface LoadingCallback {
  (): void;
}

// Utility function to handle loading states
export const handleLoadingState = (callback: LoadingCallback, minTime: number = 800): LoadingCallback => {
  const startTime = performance.now();
  
  return () => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, minTime - elapsedTime);

    setTimeout(callback, remainingTime);
  };
};
