import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf3",
          100: "#d6f5e1",
          200: "#b0eac7",
          300: "#7cd9a6",
          400: "#42c07f",
          500: "#1fa564",
          600: "#128550",
          700: "#0f6a42",
          800: "#0f5437",
          900: "#0d452e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
