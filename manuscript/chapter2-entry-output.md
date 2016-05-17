# Entry Points and Outputs

In this chapter we are going to look at entry points and outputs in detail. Below is a summary of what we are going to explore:

- `entry` accepts three types of values:
    - `string`: name of the module resolved by Webpack bundled into a single file.
    - `Array of Strings`: Array of modules resolved by Webpack bundled into a single file.
    - `object`: eg: `{bundleName1: 'module name', bundleName2: ['mod1', 'mod2']}`: Each entry point gets bundled into a separate file.

- `output`: Has several options, the important ones are:
    - `path`: absolute path to the output
    - `filename`: filename for the output module
    - `publicPath`: string used to define the output path for a server.
    - `library`: The type of library
    - ...

## Entry Points in Depth

The `entry` option can be used to define entry points. Webpack will look at this field and decide what to do for the entry point(s) of the app. There are three different types of values you can assign to entry:

- String
- Array of Strings
- an Object

### Entry as a String

If you pass set the `entry` to a string, then Webpack will treat it as a module name. It is not necessarily the file name, but the module name that corresponds to a file. Webpack works with modules, so when you set `entry: './main'`, it assumes that your module in the current directory as the directory that you are running Webpack and it adds the `.js` extension automatically. Try changing the entry value to `entry: './main'` for your config and confirm that it still works.

Now if you change the `entry` value to `main`, Webpack will resolve the module differently. It will no longer look at the same directory as the one that is executing Webpack, but it will look at the `resolve` field of the config file. It also has some default folders that it looks at, such as the standard `node_modules` folder. If it doesn't find it, then it will throw the "module not found" error:

> ERROR in Entry module not found: Error: Cannot resolve module 'main' in /Users/amin.meyghani/Desktop/hello-webpack

So to solve that, you can use the [`resolve.root`](https://webpack.github.io/docs/configuration.html#resolve-root) property to tell Webpack where your modules are using an **absolute path**. We will talk about the `resolve` property in detail later but for now let's just add the `resolve.root` property to the `webpack.config.js` file:

**`webpack.config.js`**

```javascript
var path = require('path'); // <- loading path module from node
module.exports = {
  entry: 'main',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  // -> adding resolve field
  resolve: {
    root: path.resolve('.')
  }
  //
};
```

Notice that we used the `path.resolve` method to get an absolute path to the current directory. The `resolve.root` property only accepts absolute paths. You could also pass it an array of absolute paths:

```javascript
resolve: {
  root: [path.resolve('.'), path.resolve('mymodules')]
}
```

Now, if we make a file in `mymodules/mymod.js`, we can load that it `main.js` by simply requiring the name of the module and we won't have to worry about the folder structure, Wepack will figure it out:

**`main.js`**

```javascript
require('mymod'); // <- it will look at modules folders until it finds it.
```

### Array of Strings as Entry Point

If you set the `entry` property to an array of strings, Webpack will treat each entry as a module and will load them in sequence, and it will export whatever the last item exports. To illustrate the point, let's add another file to the `mymodules` folder called `another.js`:

**`mymodules/another.js`**

```javascript
console.log('another.js loaded');
module.exports = 'another module exported value';
```

and let's modify the `mymodules/mod.js` to export a value as well:

**`mymodules/mod.js`**

```javascript
console.log('mod.js loaded');
module.exports = 'mod exported value';
```

and our `main.js` will follow the above pattern as well:

**`main.js`**

```javascript
console.log('main.js loaded');
module.exports = 'main.js exported value';
```

and now, let's change the `webpack.config.js` file to load these modules in an array:

```javascript
var path = require('path');
module.exports = {
  entry: ['main', 'mod', 'another'], // <- an array of modules as the entry point.
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    root: [path.resolve('.'), path.resolve('./mymodules')]
  }
};
```

And if you run Webpack, you can see that each module is loaded, but only the exported value of the last module gets exported:

**`dist/bundle.js` with an array of modules for entry point**

```javascript
//....
/***/ function(module, exports, __webpack_require__) {
  __webpack_require__(1);
  __webpack_require__(2);
  module.exports = __webpack_require__(3); // <- last module is exported
  //...
/***/ },
```

You can see the difference when we had one module for the entry point:

**`dist/bundle.js` with single entry point**

```javascript
/***/ function(module, exports, __webpack_require__) {
  module.exports = __webpack_require__(1); // <- there is only one module, so that one is exported
  //....
/***/ },
```

This means that later if you `requre('./dist/bundle')` from another application, only the exported value of the last module gets exported. In our case that value would be the exported value of the `another` module, that is the string: `another module exported value`.

### Object as the Entry Points

If you assign an object to the entry point, Webpack will spit out a bundle for each. So let's say we want to create two bundles: The first one will have `main` and `mod` modules, and the other will only have the `another` module. Let's update the config file to make that happen:

**`webpack.config.js`**

```javascript
var path = require('path');
module.exports = {
  entry: {
    first: ['main', 'mod'], // <- first entry point, `mod`'s value is exported.
    second: 'another' // <- second entry point, it's value is exported
  },
  output: {
    path: './dist',
    filename: "[name].bundle.js", // <- setting name for the bundle.
    chunkFilename: "[id].bundle.js" // <- setting chunck name when using `require.ensure` for example.
  },
  resolve: {
    root: [path.resolve('.'), path.resolve('./mymodules')]
  }
};
```

You can notice that we used an object to define the bundles. So, with this new configuration, we are going to have two bundles and each gets a corresponsing output. The corresponsing output is set in `output.filename`:

```javascript
filename: "[name].bundle.js"
```

Where, `[name]` is replace by the name that we chose for our bundles. You can use other placeholders:

- `[id]`: is replaced by the id of the chunk.
- `[name]`: is replaced by the name of the chunk (or with the id when the chunk has no name).
- `[hash]`: is replaced by the hash of the compilation.

So this is totally a valid file name for the output bundle:

```javascript
filename: "[id]-[name]-[hash].bundle.js" // 0-first-4d471a9f4fa3b3db64ea.bundle.js
```

After you run`bin/webpack`, you should see two bundles in the `dist` folder:

1. `dist/first.bundle.js`: contains `main` and `mod` and only `mod`'s exported value is exported by the bundle.
2. `dist/second.bundle.js`: contains only the `another` module and exports its exported value.

In addition to changing the `filename`, if you notice we also added the `chunkFilename` property. This value sets the name of the non-entry chuncks that are required by the app. So let's quickly demonstrate that by quickly adding a new module called `dependent` and require it in the `mod` module:

**`mymodules/dependent.js`**

```javascript
console.log('dependent file loaded by one of the modules');
module.exports = 'dependent exported value';
```

and in `mymodules/mod.js` we are going to lazy load the `dependent` module. We will talk about lazy loading in detail later, but for now let's just see what Webpack outputs:

**`mymodules/mod.js`**

```javascript
console.log('mod loaded');
require.ensure([], function (require) {
  require('dependent');
});
module.exports = 'mod';
```

Now if you run `bin/webpack`, you should get another non-entry bundle like `dist/1.bundle.js` in addition to the entry bundles:

```
           Asset       Size  Chunks             Chunk Names
 first.bundle.js     4.1 kB       0  [emitted]  first
     1.bundle.js  185 bytes       1  [emitted]  <------ the "lazy" chunck
second.bundle.js    1.46 kB       2  [emitted]  second
   ...
```

If you look at the output, Webpack is using JSONP to download the chunck when needed.

We can clean up the modules set up by moving the `main.js` file to the `mymodules` folder and update the `webpack.config.js` settings. The final code is in the [code/entry-options](../../code/entry-options) folder.

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




