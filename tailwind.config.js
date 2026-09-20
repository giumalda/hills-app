/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF0",
        ink: "#111111",
        pop: {
          red: "#FF334B",
          yellow: "#FED90F",
          pink: "#FF70A6",
          sky: "#4CC9F0",
          orange: "#FFAA00",
          green: "#25D366",
        },
      },
      fontFamily: {
        display: ["System"],
      },
    },
  },
  plugins: [],
}
