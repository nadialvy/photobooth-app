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
        background: "var(--background)",
        foreground: "var(--foreground)",
        pinkPh:{
          300: ""
        }
      },
      fontFamily: {
        lilita: "var(--font-lilita-one)",
      },
      backgroundImage:{
        "gradientCloud": "url('/images/background.png')"
      }
    },
  },
  plugins: [],
};
export default config;
