var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: 'main'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  devtool: "cheap-module-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          retainLines: 'true',
          plugins: ['add-module-exports']
        }
      },
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', 'web.js', '.js', '.jsx'],
    modulesDirectories: [
     'node_modules',
      path.resolve('./src'),
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
