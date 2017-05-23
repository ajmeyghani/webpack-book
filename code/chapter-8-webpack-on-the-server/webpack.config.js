var path = require('path');
var serverSrc = path.resolve('src');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    entry: path.resolve('./src/server.js'),
    target: 'node',
    output: {
          filename: 'index.js',
          path: path.resolve('./dist')
        },
    module: {
          loaders: [
	          { test: /\.js$/, loader: 'babel', include: path.resolve('src') }
	        ]
        },
    externals: [ nodeModules ]
};
