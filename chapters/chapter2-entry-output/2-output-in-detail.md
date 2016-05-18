## Output in Detail

In the previous chapter we briefly touched on the `output` property. In this section we are going to look at this option in detail.

The `output` property defines how to output the bundles. Below is a full list of all the options:


- **`output.path`**: Absolute path containing all the output files (**required**)

- **`output.filename`**: Filename of each bundle or chunk outputted by Webpack

- **`output.publicPath`**: specifies the public URL address of the output files when referenced in a browser

- **`output.pathinfo`**: Include comments with information about the modules. Should not be set to `true` for production

- **`output.library`**: If set, export the bundle as library where `output.library` is the name of the library

- **`output.libraryTarget`**: Which format to export the library such as `commonjs`, `umd`, or `amd`

- `output.chunkFilename`: The file for non-entry chuncks

- `output.sourceMapFilename`: The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.

- `output.devtoolModuleFilenameTemplate`: Filename template string of function for the `sources` array in a generated SourceMap.

- `output.devtoolFallbackModuleFilenameTemplate`: Similar to `output.devtoolModuleFilenameTemplate`, but used in the case of duplicate module identifiers.

- `output.devtoolLineToLine`: Enable line to line mapped mode for all/specified modules. By default it is disabled. Only use it if your performance needs to be better and you are sure that input lines match which generated lines. When set to `true`, it is enabled for all modules (not recommended)


- `output.hotUpdateChunkFilename`: The filename of the Hot Update Chunks outputted in the `output.path` directory

- `output.hotUpdateMainFilename`: The filename of the Hot Update Main File which is outputted in the `output.path` directory

- `output.jsonpFunction`: The JSONP function used by Webpack for asynchronous loading of chunks

- `output.hotUpdateFunction`: The JSONP function used by Webpack for asynchronous loading of hot update chunks


- `output.umdNamedDefine`: If `output.libraryTarget` is set to `umd` and `output.library` is set, setting this to `true` will name the AMD module.

- `output.sourcePrefix`: Prefixes every line of the source in the bundle with this string. The default value is `"\t"`

- `output.crossOriginLoading`: This option enables cross-origin loading of chunks

In this section we are going to focus on the most important ones and briefly talk about the other options.

### `output.path`

The `output.path` option is a required field that determines the output path of Webpack. Note that this is an absolute path and not a relative path. This means that you can use `path.resolve('./path/to/folder')` to get the absolute path to a given folder.

### `output.filename`

This options specifies the output file name. For example, if you have set your environment variable to production, you can set the file name based on the `NODE_ENV` value. This makes it very convenient to output different file names depending on configurations:


```javascript
output: {
  path: path.resolve('./output'),
  filename: process.env.NODE_ENV === 'prod' ? 'bundle.min.js' : 'bundle.js'
}
```

In the example above if we are in production, the file name would be 'bundle.min.js' and 'bundle.js' otherwise.


### `output.publicPath`

This option is a little bit confusing, but once you use it, you will understand how it works. You can use this option to set the path of the output assets. The best way to explain this is really with an example. Let's say we have the following configuration:

```javascript
var path = require('path');
module.exports = {
  entry: './input.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
    //------------------^-----: note the trailing slash!
  }
};
```
Assuming that you have the input file, once you run Webpack, you will get a single file in the `dist` folder in the current directory. So far so good. But let's say you want to serve your app with a server. Let's use Express for an example here:

```javascript
var path = require('path');
var express = require('express');
var app = express();

app.use('/assets', express.static(path.resolve(__dirname, 'dist')));

var port = process.env.PORT || 8760;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
```

This is a simple Express configuration that starts a server. The most important line here is the mapping from `/assets` to the `dist` folder:

```javascript
app.use('/assets', express.static(path.resolve(__dirname, 'dist')));
```

Now if you start the server you can load the file at `http://localhost:8760/assets/bundle.js`. Notice that the path is `/assets/bundle.js` but not `/dist/bundle.js` because of the mapping that we have defined. Also notice that this value matches the value that we have defined for the `output.publicPath`. Also notice that we have included a trailing slash for the `output.publicPath` value:

```javascript
publicPath: '/assets/'
//__________________^__
```

This is important because Webpack uses the string literal to prepend to other paths. Now that we have specified the public path, Webpack can use its internal mechanism to asynchronously load other modules. If you don't provide this path, Webpack won't be able to properly resolve other modules which would result in a 404 http error code.

The public path value is also useful when working with the Webpack DevServer. Also, when you require css files, anything that you reference with `url()` will be prepended with the public path value. But for now let's now worry about them, we will explore this option more in the loaders chapter.

### `output.pathinfo`

If this option is set to true, you will see a lot of comments in the output of Webpack files. The comments tell you where the files are coming from but this option should be set to false for production. This is because comments added to the file can increase the file size at the end. Also, maybe you don't want to tell people where your files are. So, it is important to turn this options off for production.

### `output.library`

If you decide to create a module or library to be used by other people, you can use this option to set the name of the object exported. For example, if you set this value to 'mylib' and load it in the browser, you can access the object in `window.mylib`. See `output.libraryTarget` to learn more about how these two options are related.



### `output.libraryTarget`

This is an interesting and probably one of the most useful options. By setting this option, you can easily create libraries. Now what does that mean ?

Let's say you are working on a little JavaScript library to format phones. You want others to be able to use in. You want to support CommonJS, AMD, and any other format. Or maybe you just want to support the browser, or just AMD ... . This option enables you determine how others can load your library. So, if you set the option to `AMD`, any AMD loader like `requirejs` can load it. If you set it to `commonjs`, only commonJS compatible loaders like Node can load it. But if you set the value to `umd`, anyone can load it. Because when you set it to `umd`, your code is wrapped around a factory function and checks the environment to see what is available to decide how to load the library. Below is a snippet that explains how that works:

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["myLib"] = factory();
  else
    root["myLib"] = factory();
})(this, function() {})
```

As you can see it will first and check to see if it is in Node-like environment. If not, then it will check if the `define` object is defined (AMD-like environment). And then at the end, it will just export the object to the root object. In the case of the browser, this would be the window object. So if you load this file with the browser, you can use the library with `window.myLib`. Similarly, with Node, you can load the library with `var mod = require('./dist/bundle.js');`. We will look at this option in later chapters, since this is a very useful option that Webpack provides which makes it very easy to refactor existing libraries or modules in a project.




