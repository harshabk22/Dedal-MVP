/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'SF Pro Text'",
          "'Helvetica Neue'",
          "sans-serif"
        ],
        mono: [
          "'SF Mono'",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ]
      },
      colors: {
        campus: {
          dark: "#090A0F",
          card: "rgba(18, 20, 29, 0.7)",
          cardBorder: "rgba(255, 255, 255, 0.08)",
          accent: "#00F0FF",
          accentGlow: "rgba(0, 240, 255, 0.25)",
          gold: "#FFB800",
          purple: "#8B5CF6",
          emerald: "#10B981"
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        xl: '24px'
      }
    },
  },
  plugins: [],
}
