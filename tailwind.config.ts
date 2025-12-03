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
        darkText: "#171717",
      },
      fontFamily: {
        sans: ["var(--font-hind-mysuru)", "sans-serif"],
        heading: ["var(--font-cabinet-grotesk)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      spacing: {
        gutter: "1rem", // 16px mobile
        "gutter-md": "2.5rem", // 40px tablet
        "gutter-lg": "5rem", // 80px desktop
        "gutter-xl": "6rem", // 96px large desktop
      },
    },
  },
  plugins: [],
};

export default config;
