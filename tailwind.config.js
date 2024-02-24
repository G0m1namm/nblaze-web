/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'sequel-wide': [
          'var(--font-sequel-wide),ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        ]
      },
      colors: {
        accent: 'oklch(var(--color-accent) / <alpha-value>)',
        primary: 'oklch(var(--color-primary) / <alpha-value>)',
        dark: 'oklch(var(--color-dark) / <alpha-value>)',
        light: 'oklch(var(--color-light) / <alpha-value>)'
      }
    }
  },
  plugins: [require('tailwind-fluid-typography')]
}
