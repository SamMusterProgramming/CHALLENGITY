// const { getDefaultConfig } = require("@expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, {
//   input: "./global.css",
// });



const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: "./global.css", // if you have a global Tailwind file
});

