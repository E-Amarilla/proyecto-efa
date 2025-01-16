const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-picker|dropdown|skeleton|table|ripple|spinner|calendar|date-input|form|popover|menu|divider|checkbox|spacer).js"
  ],
  type: "dark",
  theme: {
    extend: {
      colors: {
        customDark: "#131313",
        customGray: "#D9D9D9",
      },
      spacing: {
        '4' : '0px 0px 0px 0px',
        '1' : '133px 20px 20px 20px',
      },
    },
  },
  plugins: [nextui()],
}