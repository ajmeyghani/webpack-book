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

