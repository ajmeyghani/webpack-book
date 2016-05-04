# Loaders

- Loaders are at the heart of Webpack that do the heavy lifting
- They parse files, run some transformation and pass them to Webpack
- There are many loaders that are already available including TypeScript, LESS, SASS, and more
- Whenever you require a file, it has to go through a loader so that it can be loaded
- For example, if you want to `require` a css file, you have to pass it through two loaders, i.e. `css` and `style` loaders
- The simplest loader that we can install is the `raw` loader. We can use it to load a `html` file.

## The `raw` Loader

The `raw` loader reads the content of a file, converts it to a string and exports that string when it is required. So, we are going to install the loader, make a `html` file and then load it into our app in `main.js`.

- Install the `raw` loader with: `npm i raw-loader -D`.
- Then open the `webpack.config.js` file and tell webpack to pass `html` files through the `raw` loader:

```javascript
module.exports = {
  entry: './main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  // -> adding loader here.
  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' }
    ]
  }
  // -> end.
};
```

So we added the `module` field that specifies the loaders that we want to use for our module.

- Loaders is an array of objects
- Each object describes the loader. Every loader object at least has to attributes: `test` and `loader`. Test is a regular expression matching a file pattern. For example, `/\.html$/` means any file that ends with `.html`. The other attribute is `loader` which is the name of the loader that we want to use. In this case, the loader that we want to use is the `raw` loader.

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

