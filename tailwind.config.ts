import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        'dark-bg': '#192636',
        'dark-sidebar': '#253140',
        'dark-header': '#253140',
        'dark-active': '#3a4553',
        
        // Light theme colors
        'light-bg': '#fbfbfb',
        'light-sidebar': '#ffffff',
        'light-header': '#ffffff',
        'light-active': '#f2f7fc',
        'light-active-icon': '#005bd1',
        
        // Button colors
        'button-green-dark': '#2c664e',
        'button-blue-dark': '#21426c',
        'button-green-light': '#ecfff1',
        'button-grey-light': '#f3f3f3',
        'button-blue-light': '#e8f2fe',
        'button-black': '#1b1b1b',
        
        // Theme toggle colors
        'toggle-bg-dark': '#303c4b',
        'toggle-bg-light': '#005bd1',
        'toggle-circle-dark': '#444f5d',
        'toggle-circle-light': '#ffffff',
      },
      fontFamily: {
        'neue-haas': ['"Neue Haas Grotesk Display Pro"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      width: {
        'toggle-track': '64px',
        'toggle-circle': '26.67px',
      },
      height: {
        'toggle-track': '32px',
        'toggle-circle': '26.67px',
      },
      borderRadius: {
        'toggle-track': '42.6667px',
        'toggle-circle': '26.6667px',
      },
      spacing: {
        'toggle-offset': '2.67px',
      },
    },
  },
  plugins: [],
}

export default config