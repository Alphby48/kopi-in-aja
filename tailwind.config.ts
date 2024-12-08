import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        light: "#f8f3e7",
        dark: "#181307",
        secondary: "#dab58b",
        accent: "#c78a5c",
        accentDark: "#a36638",
      },
      textColor: {
        light: "#4b4035",
        dark: "#cabfb4",
        secondary: "#dab58b",
      },
      colors: {
        primary: "#8c5a2b",
        primaryDark: "#d4a273",
        secondary: "#dab58b",
        secondaryDark: "#744f25",
        accent: "#c78a5c",
        accentDark: "#a36638",
      },
      boxShadow: {
        boxNav: ["0 0 3px rgba(0, 0, 0, 0.5)"],
      },
      borderColor: {
        secondary: "#dab58b",
        light: "#f8f3e7",
        dark: "#181307",
      },
    },
  },
  plugins: [],
} satisfies Config;
