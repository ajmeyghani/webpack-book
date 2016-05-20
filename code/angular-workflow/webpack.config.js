var path = require('path');

module.exports = {
  entry: 'main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/public/',
    library: 'myapp',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: 'node_modules',
        loader: 'babel',
        query: {
          presets: ['es2015'],
          "plugins": [ "add-module-exports" ]
        }
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  externals: {
    angular: 'angular'
  }
};

