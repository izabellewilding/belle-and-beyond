import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#11153e',
        olive: '#3d4b3d',
        tan: '#c9b991',
        cream: '#f5efe6',
      },
    },
  },
  plugins: [],
}

export default config 