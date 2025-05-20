// Type extensions for Three.js
import { Material, BufferAttribute, Color } from 'three';
import { ThreeEvent } from '@react-three/fiber';

// Extend Material to include opacity for proper typing
declare module 'three' {
  interface Material {
    opacity?: number;
  }

  interface MaterialArray extends Array<Material> {
    opacity?: number;
  }

  // Add support for additional buffer attribute properties
  interface BufferAttributeProps {
    attachObject?: string[];
  }
}

// Add extensions for React Three Fiber events
declare module '@react-three/fiber' {
  interface ThreeEvent<E> {
    stopPropagation: () => void;
  }
}