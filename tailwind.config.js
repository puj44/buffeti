/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite-react/tailwind";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,html}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      xs: "368px",
      "2sm": "486px",
      sm: "640px",

      md: "787px",

      lg: "1050px",

      xl: "1280px",

      "2xl": "1536px",
    },
  },
  plugins: [flowbite.plugin()],
};
