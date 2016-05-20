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


## Url Loader

In this section we are going to use Webpack to automatically load our assets, including images and font files.

Using the following loader definition, you can automatically embed or load the assets in your app whenever they are required or referenced:

```javascript
loaders: [
  {
    test: /\.(png|jpg|jpeg)$|\.(woff|woff2|ttf|eot|svg)(.*)?$/,
    loader: "url?limit=10000&name=[name][hash:6].[ext]", // spit out a file if larger than 10kb
  }
]
```

With this definition we are checking for any file that has any of the following extensions:

`.png`, `.jpg`, `.jpeg`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.svg`

Whenever Webpack comes across any of these files, it would pass them through the `url` loader and would embed them if the filesize is less than the given limit. For example if you set the limit value to 10000, Webpack will only embed the file if the filesize is less 10kb, otherwise it will spit out a file for the asset named using the name string. For example if you set the name to `name=[name][hash:6].[ext]`, you will get the filename followed by a short hash and then followed by the extension of the file.

Now if the size of the is larger than the limit, Webpack would use the `file-loader` to extract the content and spit out a file for the asset.

**TODO**

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

In order to create a separate css file instead, we need to use the `extract-text-webpack-plugin` plugin. We haven't talked about plugins yet, but for now we don't have worry so much about it. All we need to know is that we can use this particular plugin to spit out a separate CSS file. Update your `webpack.config.js` file to look like the following:

```javascript
var path = require('path');
// ------------ Require the Plugin ------------ \\
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// ------------ Require Webpack ------------ \\
var webpack = require('webpack');

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
      {
        test: /\.css$/,
        // ------ Use the plugin to extract the content ------ \\
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ],
  },
  // ------ Register the plugin with Webpack ------
  plugins: [
    new ExtractTextPlugin('main.css') // <- name the output file: main.css
                                      // The result would be placed in `dist`
  ]
};
```

Notice that we are requiring the plugin, so make sure to install that with `npm i extract-text-webpack-plugin -D`. After you installed the plugin, you can then use in the loader config section to extract the result of `style!css`. Also note that we added an additional field called `plugins` and we have initialized the plugin with the name of the final output. Now if you run `webpack` you should see a file create in `dist/main.css`

## Compiling ES2015 JavaScript

In this section we are going to see how you can use the babel loader to compile ES2015 to ES5 JavaScript. The setup is similar to the previous section:

```
├── package.json
├── src
│   └── main.js
└── webpack.config.js
```

but we just need to add another loader for any file that ends with the `.js` extension:

```javascript
{
  test: /\.js$/, loader: 'babel',
  exclude: 'node_modules',
  query: {
    presets: ['es2015']
  }
}
```

Here we have specified that we want to use the babel loader to process our JavaScript files. Also note that we added an extra field called exclude. Using this option you can tell Webpack not to look into the `node_modules` folder. However, the preferred way is to tell Webpack which directories you want it to look at using the `include` option. Also the query option adds babel-specific options to use the 'es2015' preset:

```javascript
{
  test: /\.js$/, loader: 'babel',
  include: path.resolve('./src'),
  query: {
    presets: ['es2015']
  }
}
```

Now your config file and the `main.js` file should look like the following:

**webpack.config.js**

```javascript
var path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
```

**src/main.js**

```javascript
export default class Person {
  walk() {
    return 'walkin...';
  }
}
```

Now we just have to install the dev dependencies and then we can run Webpack to transpile the JavaScript:

```bash
npm i babel-core babel-loader babel-preset-es2015 webpack -D
```
then `./node_modules/.bin/webpack` to run Webpack. After running it, you should see the output in the `dist` folder.


