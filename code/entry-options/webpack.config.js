var path = require('path');
module.exports = {
  entry: {
    first: ['main', 'mod'], // <- first entry point, `mod`'s value is exported.
    second: 'another' // <- second entry point, it's value is exported
  },
  output: {
    path: './dist',
    filename: "[name].bundle.js", // <- setting name for the bundle.
    chunkFilename: "[id].bundle.js" // <- setting chunk id name for `require.ensure`
  },
  resolve: {
    root: [path.resolve('./mymodules')]
  }
};
