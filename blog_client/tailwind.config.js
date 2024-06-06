/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx,css}",],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('./Assets/lines.svg')",
        'bgtext': 'linear-gradient(90deg, rgba(0,44,255,1) 0%, rgba(243,29,253,1) 50%, rgba(252,69,69,1) 100%)'
      },
      fontFamily: {
        'mainfont': ["'Alata', sans-serif"],
        // 'mainfont': ["'Forum', serif"],

      }
    },
  },
  plugins: [],
}

