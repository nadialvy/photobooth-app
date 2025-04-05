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
        "filterNone": "url('/images/filterThumbnail/none.png')",
        "filterBnW": "url('/images/filterThumbnail/bnw.png')",
        "filterFairy": "url('/images/filterThumbnail/fairy.png')",
        "filterPinkGlow": "url('/images/filterThumbnail/pinkGlow.png')",
        "filterRio": "url('/images/filterThumbnail/rio.png')",
        "grainTexture": "url('/images/filterThumbnail/graintexture.jpg')",
      }
    },
  },
  plugins: [],
};
export default config;
