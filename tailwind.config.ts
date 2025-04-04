import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      base: "320px",
      "1sm": "370px",
      xs:"400px",
      sm: "420px",
      smm:"500px",
      md: "768px",
      mdd:'896px',
      lg: "1024px",
      lgg:'1200px',
      xl: "1340px",
      "2xl": "1560px",
      "3xl": "3560px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      navyBlue: "#06259B",
      lightGrey: "#D9D9D9",
      brown: {
        gold: "#b87d50",
        grey: "#f3dbc8",
        light: "#675F4C",
        DEFAULT: "#372D25",
      },
      milky: "#CBB590",
      black: "#000000",
      white: {
        offWhite: "#FEF8EF",
        DEFAULT: "#ffffff",
      },
      blue: {
        light: "#ADD8E6",
        DEFAULT: "#225377",
        dark: "#00008B",
      },
      yellow: {
        light: "#FFF9C4",
        DEFAULT: "#9DA34F",
        dark: "#FBC02D",
      },
      green: {
        light: "#A8E6A2",
        DEFAULT: "#22774E",
        dark: "#388E3C",
      },
    },
    extend: {},
  },
  plugins: [],
};

export default config;
