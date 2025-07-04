// tailwind.config.js
const lightTheme = require("./src/theme").default;

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ajusta a la estructura de tu proyecto
  ],
  theme: {
    extend: {
      colors: {
        ...lightTheme.colors,
      },
      fontFamily: {
        helveticaNeue: ['"helveticaNeue"', "sans-serif"],
        cabinetGrotesk: ['"CabinetGrotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
