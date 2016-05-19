var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

