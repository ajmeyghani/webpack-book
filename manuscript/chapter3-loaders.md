# Loaders

- Loaders are at the heart of Webpack that do the heavy lifting
- They parse files, run some transformation and pass them to Webpack
- There are many loaders that are already available including TypeScript, LESS, SASS, and more
- Whenever you require a file, it has to go through a loader so that it can be loaded
- For example, if you want to `require` a css file, you have to pass it through two loaders, i.e. `css` and `style` loaders
- The simplest loader that we can install is the `raw` loader. We can use it to load a `html` file.

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


## Loading CSS Files

**Note**: From this point on, I assume that you have your work folder, main file, and Webpack config file are setup. For more information, see the previous section.

In order to load CSS files, you need two loaders, `style` and `css`. Let's go ahead and install them:

```shell
npm i css-loader style-loader
```

After that, we need to add the loader definition in the loaders array. After you add the loader, your `webpack.config.js` file should look like this:

```javascript
var path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw'
      },
      // ------ new stuff ------
      {
        test: /\.css$/,
        loader: 'style!css' // passing through two loaders:
                            // css-loader -> style-loader
                            // Note the order is from right to left
                            // not left to right.
                            // The `!` acts like a pipe.
      }
      // ------ new stuff ------
    ]
  }
};
```

- As you can notice, we have added a loader definition for css files. Here we are telling Webpack to run any file that ends with a `.css` extension pass it through two loaders: The CSS loader first and then the style loader.

- If you read `loader: style!css` from left to right, you might think that the css file is passed through the `style` loader first, and then the `css` loader. However, that's not the case, Webpack reads it from right to left where `!` acts like a pipe.

Now, if you run `webpack` you should get the output in the `bundle.js` file. If you look at the output file, you can see this line where the content of the file is exported:


```javascript
exports.push([module.id, "body {\n  background-color: gray;\n}\n", ""]);
```

As you can see the content of the css file has been exported as a string literal. But the magic happens with the `style` loader and the `css` loader. First, the `style` loader kicks in and adds some css to the DOM by adding a style tag. Then the `css` loader kicks in and does the heavy lifting. By default, the styles are added to the bottom of the head section on the page. By adding a style tag on the page, no http request is made to actually load the css file. If you need to output actual css files, Webpack can help you with that too. In the next section, we are going to talk just about that.

### Creating Separate CSS Outputs


**TODO**


