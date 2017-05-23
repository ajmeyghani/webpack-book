# Plugins

Webpack is extensible by plugins. Some of the most commonly used plugins include:

- `NormalModuleReplacementPlugin`
- `ContextReplacementPlugin`
- `DedupePlugin`
- `LimitChunkCountPlugin`
- `UglifyJsPlugin`
- `CommonsChunkPlugin`
- `ProvidePlugin`
- `SourceMapDevToolPlugin`

For the full list of Webpack's plugins visit Webpack's [wiki](https://github.com/webpack/docs/wiki/list-of-plugins)

## Other Plugins

Below is a list of other plugins:

- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [nyan-progress](https://github.com/alexkuz/nyan-progress-webpack-plugin)

## Defining Environment Variables

Using the `webpack.DefinePlugin` you can easily define environment-specefic values:

```javascript
var plugins = [
  new webpack.DefinePlugin({ IS_PROD: process.env.NODE_ENV === 'production' }),
  new webpack.DefinePlugin({ IS_TEST: process.env.NODE_ENV === 'test' }),
  new webpack.DefinePlugin({ IS_DEV: process.env.NODE_ENV === undefined }),
];
```
**TODO**

## Uglify Plugin

Using the Uglify plugin you can specify how to minify your JavaScript code. For example, if you are working with Angular and don't want to mangle the names, you can use the following:

```javascript
var webpack = require('webpack');
/* uglify settings for prod */
if (isProd) {
  var uglify = new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {
        warnings: false
      }
  });
  plugins.push(uglify);
}
```

**TODO**

