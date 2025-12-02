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
        navy: "#11153e",
        olive: "#3d4b3d",
        tan: "#c9b991",
        cream: "#f5efe6",
      },
      fontFamily: {
        sans: ["var(--font-cabinet-grotesk)", "sans-serif"],
        heading: ["var(--font-cabinet-grotesk)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
