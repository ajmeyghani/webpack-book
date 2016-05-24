var path = require('path');
var webpack = require('webpack');
var isProd = process.env.NODE_ENV === 'production';
var isDebug = process.env.NODE_ENV === 'debug';

var plugins = [];
if (isProd) {
  var uglify = new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false
      }
  });
  plugins.push(uglify);
}

module.exports = {
  entry: 'main.js',
  output: {
    path: path.resolve('dist'),
    filename: isProd ?  'bundle.min.js' : isDebug ? 'bundle.debug.js' : 'bundle.js',
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
  },
  plugins: plugins
};

