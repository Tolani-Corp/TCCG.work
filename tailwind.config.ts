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
          navy: "#0A1628",      // Primary dark
          blue: "#1E3A5F",      // Secondary
          cyan: "#00B4D8",      // Accent
          green: "#2ECC71",     // ESG/Success
          orange: "#F39C12",    // Warning/CTA
          gray: "#6B7280",      // Text secondary
        },
        // Tolani Ecosystem
        tolani: {
          red: "#E10600",
          graphite: "#2B2B2B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
