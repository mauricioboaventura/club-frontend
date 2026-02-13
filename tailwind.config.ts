import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          bg: "#121212",
          card: "#1e1e1e",
          "card-light": "#252525",
          elevated: "#2a2a2a",
          gold: "#e5b62a",
          "gold-light": "#ecc54d",
          "gold-dark": "#c99a1f",
          red: "#8b1a1a",
          "red-dark": "#6b1414",
          green: "#2d8a4e",
          border: "rgba(255,255,255,0.08)",
          "border-gold": "rgba(229,182,42,0.4)",
        },
        "text-primary": "#f0ece4",
        "text-secondary": "#9e9a92",
        "text-muted": "#6b6660",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        mc: "12px",
        "mc-sm": "8px",
        "mc-pill": "50px",
      },
      keyframes: {
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
