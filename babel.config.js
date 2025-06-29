module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        'expo-router/babel',
        // 'nativewind/babel',
        'react-native-reanimated/plugin', // Must be last
      ],
    };
  };