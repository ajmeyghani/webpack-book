## `raw` Loader

The `raw` loader reads the content of a file, converts it to a string and exports that string when it is required. Let's demonstrate this with an example. In this example we are going to make a `html` file and then load it into our app in a `main.js` file.

Like always, make a folder, run `npm init` and make a `main.js` file. Then, follow the steps below.

- Install the `raw` loader along with Webpack: `npm i webpack raw-loader -D`.
- Then create the `webpack.config.js` file and the following to it:

```javascript
var path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  // -----------New Stuff --------------
  module: {              // module object contains the loaders definition
    loaders: [           // The loaders array containing loader object definitions
      {                  // Our first loader definition
        test: /\.html$/,   // Matches any file that ends with the .html extension
        loader: 'raw'      // Uses the `raw` loader when an html file is required.
      }                    // e.g require('path/to/home.tpl.html')
    ]
  }
// -----------New Stuff --------------
};
```

So we added the `module` field that specifies the loaders that we want to use for our module.

- Loaders is an array of objects

- Each object describes the loader. Every loader object at least has two attributes: `test` and `loader`.

    - Test is a regular expression matching a file pattern. For example, `/\.html$/` means any file that ends with `.html`.
    - The other field is the`loader` option. This specifies the name of the loader that we want to use. In this case, the loader that we want to use is the `raw` loader. The `-loader` suffix is optional, both `raw-loader` and `raw` would work here.

Now lets add a basic html file and load it in `main.js`.

```bash
touch sample.html
```

**sample.html**

```html
<div>
  <p>I am sample.html</p>
</div>
```

Now, in `main.js` we are going to `require` the file:

**main.js**

```javascript
var name = 'My app';
console.log(name);
// -> loading the file
var content = require('./sample.html');
console.log(content);
```

Now, if you do `bin/webpack` to compile the app again, you should be able to see that `content` is assigned to the exported value by Webpack:

**dist/bundle.js**

```javascript
var content = __webpack_require__(1);
//...
/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = "<div>\n  <p>I am sample.html</p>\n</div>\n"

/***/ }
```

That's the magic of Webpack, it references modules by number and it uses its own require method to load them.


