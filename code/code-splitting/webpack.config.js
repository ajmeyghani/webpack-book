var path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  }
};

