const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve('util/')
    }
  },
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib')
    }
  }
  // Other webpack configuration options...
};