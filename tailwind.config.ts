import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        odin: {
          dark: "#050A14",
          blue: "#0A1628",
          accent: "#1E3A8A",
          gold: "#FBBF24",
          text: "#E2E8F0",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #1E3A8A 0deg, #0A1628 180deg, #FBBF24 360deg)",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
