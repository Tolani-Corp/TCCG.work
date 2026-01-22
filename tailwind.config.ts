import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TCCG Brand Colors
        tccg: {
          blue: "#1e40af",      // Primary - Trust/Professional
          green: "#059669",     // ESG/Sustainability
          orange: "#ea580c",    // Energy/HVAC
          slate: "#1e293b",     // Dark backgrounds
          light: "#f8fafc",     // Light backgrounds
        },
        // Tolani Ecosystem
        tolani: {
          red: "#E10600",       // Tolani Corp signal red
          graphite: "#2B2B2B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
