<<<<<<< HEAD
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
=======
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
>>>>>>> 7124c8d2a8292535ccd66172806f2adacbdab2d1
};
