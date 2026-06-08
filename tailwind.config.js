/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        cream: "hsl(var(--canvas-cream) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        ink: "hsl(var(--text-ink) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Pretendard", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
