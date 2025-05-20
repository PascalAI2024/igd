/// <reference types="vite/client" />

declare module 'gsap/ScrollTrigger' {
  export class ScrollTrigger {
    static create(config: any): any;
    static getAll(): ScrollTrigger[];
    kill(): void;
  }
  
  export function ScrollTrigger(config: any): any;
  
  export default ScrollTrigger;
}