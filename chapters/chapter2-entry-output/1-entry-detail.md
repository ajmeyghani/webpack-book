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

