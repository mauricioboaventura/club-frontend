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
          gold: "#c4a265",
          "gold-light": "#d4b87a",
          "gold-dark": "#a08450",
          red: "#8b1a1a",
          "red-dark": "#6b1414",
          green: "#2d8a4e",
          border: "rgba(255,255,255,0.08)",
          "border-gold": "rgba(196,162,101,0.4)",
        },
        "text-primary": "#f0ece4",
        "text-secondary": "#9e9a92",
        "text-muted": "#6b6660",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        mc: "12px",
        "mc-sm": "8px",
        "mc-pill": "50px",
      },
    },
  },
  plugins: [],
};

export default config;
