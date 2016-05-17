var path = require('path');
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
      // ------ new stuff ------
      {
        test: /\.css$/,
        loader: 'style!css' // passing through two loaders:
                            // css-loader -> style-loader
                            // Note the order is from right to left
                            // not left to right.
                            // The `!` acts like a pipe.
      }
      // ------ new stuff ------
    ]
  }
};


// style-loader: Adds some css to the DOM by adding a <style> tag


// exports.push([module.id, "body {\n  background-color: gray;\n}\n", ""]);
//
// // css base code, injected by the css-loader
//
// // By default, add <style> tags to the bottom of <head>.
