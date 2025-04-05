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
        quicksand: "var(--font-quicksand)",
      },
      backgroundImage:{
        "gradientCloud": "url('/images/background.png')",
        "gradientSettings": "url('/images/settings.png')",
        "filterNone": "url('/images/filter/none.png')",
        "filterBnW": "url('/images/filter/bnw.png')",
        "filterFairy": "url('/images/filter/fairy.png')",
        "filterPinkGlow": "url('/images/filter/pinkGlow.png')",
        "filterRio": "url('/images/filter/rio.png')",
        "grainTexture": "url('/images/filter/graintexture.jpg')",
      }
    },
  },
  plugins: [],
};
export default config;
