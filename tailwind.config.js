// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // NOTE: Update this to include the paths to all of your component files.
//   content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#161622",
//         secondary: {
//           DEFAULT: "#FF9C01",
//           100: "#FF9001",
//           200: "#FF8E01",
//         },
//         black: {
//           DEFAULT: "#000",
//           100: "#1E1E2D",
//           200: "#232533",
//         },
//         gold: "#D4AF37",
//         goldSoft: "#C9A227",
//         darkBg: "#0B0B0B",
//         netflixRed: "#E50914",
//         textMuted: "#B3B3B3",
//         },
//         fontFamily: {
//           pthin: ["Poppins-Thin", "sans-serif"],
//           pextralight: ["Poppins-ExtraLight", "sans-serif"],
//           plight: ["Poppins-Light", "sans-serif"],
//           pregular: ["Poppins-Regular", "sans-serif"],
//           pmedium: ["Poppins-Medium", "sans-serif"],
//           psemibold: ["Poppins-SemiBold", "sans-serif"],
//           pbold: ["Poppins-Bold", "sans-serif"],
//           pextrabold: ["Poppins-ExtraBold", "sans-serif"],
//           pblack: ["Poppins-Black", "sans-serif"],
//           interThin: ['interThin'],
//           interBlack: ['interBlack'],
//           bebas: ["BebasNeue_400Regular"],
//           montserrat: ["Montserrat_400Regular"],
//           montserratSemi: ["Montserrat_600SemiBold"],
//         },
//   },
// },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gold: "#D4AF37",
        goldSoft: "#C9A227",
        darkBg: "#0B0B0B",
        netflixRed: "#E50914",
        textMuted: "#B3B3B3",
      },
      fontFamily: {
        // Poppins
        pthin: ["Poppins_100Thin"],
        pextralight: ["Poppins_200ExtraLight"],
        plight: ["Poppins_300Light"],
        pregular: ["Poppins_400Regular"],
        pmedium: ["Poppins_500Medium"],
        psemibold: ["Poppins_600SemiBold"],
        pbold: ["Poppins_700Bold"],
        pextrabold: ["Poppins_800ExtraBold"],
        pblack: ["Poppins_900Black"],

        // Inter (ensure these are loaded if used)
        interThin: ["Inter_100Thin"],
        interBlack: ["Inter_900Black"],

        // Bebas & Montserrat
        bebas: ["BebasNeue_400Regular"],
        montserrat: ["Montserrat_400Regular"],
        montserratSemi: ["Montserrat_600SemiBold"],
      },
    },
  },
  plugins: [],
};