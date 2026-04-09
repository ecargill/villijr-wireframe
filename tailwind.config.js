/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5F3F',
          light: '#4A8B5C',
        },
        secondary: '#D97706',
        accent: '#F59E0B',
        surface: '#F8F7F4',
        content: {
          DEFAULT: '#1F2937',
          muted: '#6B7280',
        },
        border: '#E5E7EB',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
