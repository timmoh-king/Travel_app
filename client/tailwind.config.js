/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        travelRed: "#C5221F",
        travelGreen: "#34A853",
        travelBlue: "#1976D2",
        travelBlack: "#000000",
        travelWhite: "#FFFFFF",
        travelGray: "#262626",
      },
      fontFamily: {
        primary: "Nunito"
      }
    },
  },
  plugins: [],
}

