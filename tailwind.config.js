const {heroui} = require('@heroui/theme');
const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-picker|dropdown|skeleton|table|ripple|spinner|calendar|date-input|form|popover|menu|divider|checkbox|spacer|pagination).js",
    "./node_modules/@heroui/theme/dist/components/spinner.js"
  ],
  type: "dark",
  theme: {
    extend: {
      colors: {
        'orange': '#EF8225',
        'oranget': '#F826',
        'blue': '#30A0F0',
        'bluet': '#06E5',
        'water': '#33A7FD',
        'red': '#F00',
        'green': '#54C42D',
        'white': '#D9D9D9',
        'lightGrey': '#8C8C8C',
        'grey': '#1F1F1F',
        'black': '#131313',
        'footerbg': '#2C2C2C'
      },
      spacing: {
        '4' : '0px 0px 0px 0px',
        '1' : '133px 20px 20px 20px',
      },
    },
  },
  plugins: [nextui(),heroui()],
}