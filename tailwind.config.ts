import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f4efe6",
        foreground: "#1f2937",
        brand: {
          DEFAULT: "#2f5d50",
          dark: "#23473d",
          soft: "#8eb3a7"
        },
        surface: "#fffaf2",
        accent: "#b7703c",
        sand: "#e5d6be"
      },
      boxShadow: {
        glow: "0 22px 70px rgba(47, 93, 80, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
