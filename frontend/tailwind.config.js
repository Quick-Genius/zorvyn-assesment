/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed": "#3f001c",
        "inverse-surface": "#2e3130",
        "primary-fixed-dim": "#88d982",
        "error": "#ba1a1a",
        "background": "#f8faf8",
        "primary-fixed": "#a3f69c",
        "primary": "#0d631b",
        "on-background": "#191c1b",
        "surface": "#f8faf8",
        "on-primary-fixed-variant": "#005312",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#304e2e",
        "secondary-fixed-dim": "#add0a6",
        "on-primary-fixed": "#002204",
        "outline": "#707a6c",
        "on-primary": "#ffffff",
        "inverse-on-surface": "#eff1ef",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#bfcaba",
        "on-primary-container": "#cbffc2",
        "secondary-container": "#c6e9be",
        "secondary": "#476644",
        "surface-variant": "#e1e3e1",
        "surface-dim": "#d8dad9",
        "on-surface-variant": "#40493d",
        "on-secondary-fixed": "#052106",
        "tertiary": "#923357",
        "tertiary-container": "#b14b6f",
        "surface-tint": "#1b6d24",
        "surface-container": "#eceeec",
        "surface-container-low": "#f2f4f2",
        "surface-bright": "#f8faf8",
        "on-tertiary": "#ffffff",
        "on-error-container": "#93000a",
        "surface-container-high": "#e7e9e7",
        "tertiary-fixed": "#ffd9e2",
        "primary-container": "#2e7d32",
        "tertiary-fixed-dim": "#ffb1c7",
        "surface-container-highest": "#e1e3e1",
        "on-tertiary-container": "#ffedf0",
        "on-secondary-container": "#4c6a48",
        "on-secondary": "#ffffff",
        "secondary-fixed": "#c9ecc1",
        "on-surface": "#191c1b",
        "on-error": "#ffffff",
        "inverse-primary": "#88d982",
        "on-tertiary-fixed-variant": "#7f2448"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      boxShadow: {
        'editorial': '0 20px 40px -12px rgba(25, 28, 27, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
