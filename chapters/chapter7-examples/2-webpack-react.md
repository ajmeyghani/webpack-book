## Using React with Webpack

Webpack and Babel makes working with React pretty straightforward. In this section we are going to set up a very simple React project that uses Babel and Webpack to bundle the app.

### Project Setup

First, create a folder on your desktop and call `npm init`:

```bash
cd ~/Desktop
mkdir webpack-react && cd $_
npm init
```

After you run `npm init` it will ask you a couple of questions. You can just use the defaults by keep hitting enter on the keyboard. Then, run the following to install the development dependencies:

```bash
npm install babel-core babel-loader \
babel-plugin-add-module-exports \
babel-preset-es2015 \
babel-preset-react webpack -D
```

After all the dev dependencies are installed, we need to install React:

```bash
npm install react react-dom -S
```

### Creating the Config File

Now that we have all the dependencies installed, we can add the `webpack.config.js` file:

```bash
touch webpack.config.js
```

After creating the the config file, add the following configuration:

```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: 'main'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  devtool: "cheap-module-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          retainLines: 'true',
          plugins: ['add-module-exports']
        }
      },
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', 'web.js', '.js', '.jsx'],
    modulesDirectories: [
     'node_modules',
      path.resolve('./src'),
    ]
  }
};
```
Let's examine the config file a bit further:

- The entry point of the app is a file called `main` that is expected to exist in the resolve modules directories path.
- We are outputing the result to the `dist` folder.
- We are using a fast dev tool to generate row-only source-maps
- In the loaders section we are processing any file that ends with the `.jsx` extension. All these files are passed through the babel loader
- In the resolve section we are resolving `.js` and `.jsx` extensions in addition to Webpack default file extensions.
- Using the `modulesDirectories` we are specifying that the `src` directory is to be considered as a module folder

Now that we have the config file, we can start by creating the `src` modules directory:

```bash
mkdir src
```

Now we need to create the entry point. Remember that the entry point in our config file is set to be `main` which means that Webpack will resolve any of the following patterns:

```bash
src/main.js
src/main.jsx
...
```

### Adding the Main File

Because our main file is going to contain some JSX, we are going to name the file `main.jsx`. Let's create it in the `src` folder:

```bash
touch src/main.jsx
```

Now open the `main.jsx` file and add the following:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
const App = props => (<h1>Hello</h1>);
ReactDOM.render(<App />, document.getElementById('app'));
```

Now we can run Webpack to bundle the project:

```bash
./node_modules/.bin/webpack
```

After running this you should be able to see the bundle result in the `dist` folder. Now if you notice, you can see that React is also bundled with the package. And that's not quite what we want. We want to tell Webpack not to bundle react and react-dom and assume that somehow they are available. In order to do that, we can use the `externals` property. Let's add that to the `webpack.config.js` file:

```javascript
externals: {
  react: 'React',
  'react-dom': 'ReactDOM'
}
```

Now the full config file contains the following:

```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: 'main'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  devtool: "cheap-module-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          retainLines: 'true',
          plugins: ['add-module-exports']
        }
      },
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', 'web.js', '.js', '.jsx'],
    modulesDirectories: [
     'node_modules',
      path.resolve('./src'),
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
```

Now if you run `./node_modules/.bin/webpack` you can see that the size of the `dist/app.js` file is much smaller. And if you look closely you can see the part that has been converted from jsx to javascript:


```
var App = function App(props) {return _react2.default.createElement('h1', null, 'Hello');};
  _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
```

If you don't want to run `./node_modules/.bin/webpack` everytime, you can just create a task in the `package.json` file:

```javascript
{
  "name": "webpack-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "./node_modules/.bin/webpack -w"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "webpack": "^1.14.0"
  },
  "dependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  }
}
```

Notice the script section:

```javascript
"scripts": {
  "dev": "./node_modules/.bin/webpack -w"
},
```

Now we can just use `npm run dev` and Webpack will bundle our app and also re builds the project on any new changes.

The last step is just adding an `index.html` file and verifying that our app works. So first create the index file:

```bash
touch index.html
```

And then add the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.js"></script>
  <title>React with Webpack</title>
</head>
<body>
  <div id="app"></div>
  <script src="/dist/app.js"></script>
</body>
</html>
```

Now all we have to do is to server the folder. You can use `http-server` to do that. If you don't have it, you can install it by `npm i http-server -g` and then run `http-server .` Simply navigate to `http://localhost:8080/` and you should be able to see `hello` on the screen.



