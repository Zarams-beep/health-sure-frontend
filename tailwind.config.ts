import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      base: "320px",
      "1sm": "370px",
      xs: "400px",
      sm: "420px",
      smm: "500px",
      md: "768px",
      mdd: "896px",
      lg: "1024px",
      lgg: "1200px",
      xl: "1340px",
      "2xl": "1560px",
      "3xl": "3560px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // ── Healthcare Color Palette ──────────────────────────────────────
      // Primary brand: deep medical teal-blue
      navyBlue: "#0A3D62",       // deep navy — trust, authority
      lightGrey: "#EAF2F8",      // very light blue-grey — clean backgrounds

      // "brown" namespace kept for CSS-class compatibility → now healthcare teal
      brown: {
        gold: "#17A589",         // teal-green accent (success, health)
        grey: "#D6EEF8",         // pale blue — subtle borders/bg
        light: "#2E86C1",        // medium medical blue — secondary text
        DEFAULT: "#0D6E9A",      // primary teal-blue — main brand color
      },

      milky: "#EBF5FB",          // clean sky-white — page background
      black: "#000000",
      white: {
        offWhite: "#F4F9FC",     // crisp clinical white
        DEFAULT: "#ffffff",
      },

      blue: {
        light: "#AED6F1",
        DEFAULT: "#0D6E9A",
        dark: "#0A3D62",
      },

      teal: {
        light: "#A2D9CE",
        DEFAULT: "#17A589",
        dark: "#0E6655",
      },

      // Alert / status colors
      yellow: {
        light: "#FEF9E7",
        DEFAULT: "#F39C12",      // warning amber
        dark: "#D68910",
      },
      green: {
        light: "#D5F5E3",
        DEFAULT: "#1E8449",      // healthy green
        dark: "#145A32",
      },
      red: {
        light: "#FADBD8",
        DEFAULT: "#E74C3C",
        dark: "#C0392B",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Clash Display"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        alt: ['"Space Grotesk"', "sans-serif"],
        modern: ['"Sora"', "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(13, 110, 154, 0.10)",
        nav: "0 4px 16px rgba(10, 61, 98, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
