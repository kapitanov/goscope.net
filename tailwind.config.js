/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './*.vue'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#007d9c',
        background: '#f5f5f5',
        foreground: '#18181b'
      }
    }
  },
  plugins: []
};
