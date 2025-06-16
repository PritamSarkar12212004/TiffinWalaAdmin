const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

// Merge your custom config (empty or with options)
const mergedConfig = mergeConfig(baseConfig, {
  // Add your custom Metro config options here if needed
});

// Enhance the merged config with NativeWind
module.exports = withNativeWind(mergedConfig, {
  input: './global.css', // Ensure this file exists or change the path
});
