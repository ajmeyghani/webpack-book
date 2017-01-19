## Webpack with PostCSS

Webpack combined with PostCSS creates a very nice workflow for authoring CSS. In this section we are going to explore how you can use Webpack with the autoprefixer PostCSS plugin to autoprefix your css.

### Set up

Like always we are going to set up a project folder and the webpack.config.js file:

```bash
mkdir -p ~/Desktop/webpack-css-example && cd $_ && npm init
```

Once prompted, accept all the defaults to create the package.json file. Once the file has been created you are ready to go. First, let's install all the dependencies including Webpack to get started:

```bash
npm i autoprefixer css-loader postcss-loader precss style-loader webpack -D
```

If you are noticing we are installing the modules as dev dependencies because we only need them for development purposes.

Once the dependencies are installed, we are ready to set up the configuration file for our Webpack:

**webpack.config.js**

```javascript
var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ]
  },
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: ['ie >= 10', 'last 2 versions'] })]
    };
  }
};
```

After creating the config file, we just need to create the `main.js` file and the `main.css` file to demonstrate how the autoprefixing would works. So let's create the two files right now and put the following code in them:


```bash
touch main.js main.css
```

**mian.js**

```javascript
require('./main.css');
```

**main.css**

```css
.container {
  display: flex;
}
```

After you created the files, you can compile the code with Webpack. Just run `./node_modules/.bin/webpack` and you should see the output in the `dist` folder. And of course you can put Webpack on watch mode by using the `-w` flag. After you compile the code, you should see an output like the following in the `dist/bundle.js` file:

**dist/bundle.js**

```javascript
//.....
//......
exports.push([module.id, ".container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n", ""]);
```

As you can see the CSS has be automatically prefixed using the options that we have defined in the 'webpack.config.js' file. You can obviously change that based on your project or spit out a new file if you need to have separate CSS files.

I have found this to be very usefully specially when working with flexbox because flexbox has different specifications that have been implemented differently across browsers. Autoprefixer solves that problem so you don't have to worry about the prefixes or different specifications.



