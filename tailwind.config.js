/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF0000',
          black: '#000000',
          orange: '#FF4500',
          yellow: '#FFD700',
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 3s linear infinite',
        'warm-bounce': 'warm-bounce 2s ease-in-out infinite',
        'digital-gradient': 'digital-gradient 3s linear infinite',
        'slideInLeft': 'slideInLeft 3s infinite',
        'slideInRight': 'slideInRight 3s infinite',
        'scroll-left': 'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 40s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 69, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 69, 0, 0.6)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'warm-bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
            boxShadow: '0 0 20px rgba(255, 69, 0, 0.3)'
          },
          '50%': {
            transform: 'translateY(-20px)',
            boxShadow: '0 0 40px rgba(255, 69, 0, 0.6)'
          },
        },
        'digital-gradient': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        slideInLeft: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        slideInRight: {
          '0%, 100%': { transform: 'translateX(100%)' },
          '50%': { transform: 'translateX(-100%)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 48px))' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(calc(-100% - 48px))' },
          '100%': { transform: 'translateX(0)' }
        },
      },
    },
  },
  plugins: [],
};