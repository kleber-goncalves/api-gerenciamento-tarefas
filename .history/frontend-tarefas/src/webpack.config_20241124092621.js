const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/')
    }
  }
};
