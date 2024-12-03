const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "fs": false, // ou "fs": require.resolve("fs-browserify") se for necessário
      "zlib": require.resolve("zlib-browserify")
    }
  }
}


module.exports = {
  // Se você já tem um 'entry', mantenha o seu; caso contrário, adicione o caminho do seu arquivo principal
  entry: './src/App.js', // ou qualquer arquivo de entrada que você esteja usando
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      fs: 
      zlib: require.resolve('zlib-browserify'),
    },
  },
};
