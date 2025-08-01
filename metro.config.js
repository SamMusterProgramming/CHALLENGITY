const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require('path');

// const { mergeConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// config.resolver.unstable_enableSymlinks = true;
// config.resolver.unstable_enablePackageExports = true;
   
module.exports = withNativeWind(config, { input: "./global.css" });

// module.exports = (async () => {
//     const defaultConfig = await getDefaultConfig(__dirname);
  
//     return mergeConfig(defaultConfig, {
//       transformer: {
//         ...defaultConfig.transformer,
//         babelTransformerPath: require.resolve('metro-react-native-babel-transformer'), // Ensure this is set correctly
//         assetPlugins: ['expo-asset/tools/hashAssetFiles'],
//         // Add other custom transformer options here
//       },
//       resolver: {
//         // Add custom resolver options here
//       },
//     });
//   })();