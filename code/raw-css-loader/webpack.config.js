var path = require('path');
// ------------ Require the Plugin ------------ \\
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// ------------ Require Webpack ------------ \\
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw'
      },
      {
        test: /\.css$/,
        // ------ Use the plugin to extract the content ------ \\
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ],
  },
  // ------ Register the plugin with Webpack ------
  plugins: [
    new ExtractTextPlugin('main.css') // <- name the output file: main.css
                                      // The result would be placed in `dist`
  ]
};
