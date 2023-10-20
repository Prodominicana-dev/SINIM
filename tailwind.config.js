const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "prodominicana-logo": "/images/prodominicana.png",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navy: "#062381",
        mint: "#1AD25D",
        "sky-blue": "rgba(41,151,242, 0.7)",
      },
      boxShadow: {
        button: "0px 0px 15px 15px rgba(255, 255, 255, 0.3)",
      },
    },
    fontFamily: {
      custom: ["SAWoodlandHills", "normal"],
    },
    colors: {
      ...colors,
    },
  },
  plugins: [],
});
