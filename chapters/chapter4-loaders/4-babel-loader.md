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


