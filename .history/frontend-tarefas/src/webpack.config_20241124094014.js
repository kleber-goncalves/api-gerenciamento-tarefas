const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert/'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser'),
    }
  }
};
