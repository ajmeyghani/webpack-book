# Using Webpack on the Server

In this short chapter we are going to explore how you can use Webpack to compile your server-side code. Even though Webpack shines on the client-side, you can still use it to compile your server-side JavaScript code.

## Set up

Let's make a folder for our project and install Webpack and other dependencies for the project:

```bash
mkdir -p ~/Desktop/webpack-on-the-server && cd $_
npm init -y
npm i webpack@^1 -D
npm i express -S
```

Next, we are going to make a server file that uses some ES2015 features:

```bash
mkdir src && cd $_
touch server.js
```

Open the server file and add the following:

```javascript
const express = require('express');
const app = express();

app.get('/api', (req, resp) => {
  resp.json({
    data: 'Simple api'
  });
});

app.listen(8581, () => {
  console.log('server running at port 8581');
});
```

If you want to run this code on a host that doesn't run the latest version of the node you need to transpile your code to ES5. To achieve that we can use Webpack to handle that, otherwise if you are using the latest version of Node, you probably won't need to transpile your code. In the next section, we will write the Webpack configuration to enable transpiling the server-side code.

## Adding the Webpack Config

Go to the root of the project and create a Webpack file:

```bash
cd ~/Desktop/webpack-on-the-server
touch webpack.config.js
```
Open the file and add the following:

```javascript
var path = require('path');
var serverSrc = path.resolve('src');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: path.resolve('./src/server.js'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve('./dist')
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.resolve('src') }
    ]
  },
  externals: [ nodeModules ]
};
```

After that add the following to the list of dev dependencies in your `package.json` file:

```
"babel-core": "^5.8.34",
"babel-loader": "^5.3.3",
"babel-polyfill": "^6.2.0",
```

and run `npm install` to install the dev dependencies. After installing the dependencies, run the following in the root of the project to transpile your server code to ES5:

```bash
./node_modules/.bin/webpack
```

Now you should be able to see the compiled code in `dist/index.js`. To run the server using the transpiled code, run `node dist/index.js` and go to the browser at `http://localhost:8581/api`


## Webpack Config Details

Let's look at the config file and understand what it does. The most important part of the config file is the `externals` entry and the function that reads the node modules. The `externals` entry tells webpack not to compile the javascript files in the node_modules folder. And the function starting from line 5, goes through the files in the `node_modules` folder and creates a list of the modules/folders that Webpack should ignore. That list is the used on line 26 in the `external` entry.

The rest of the config file is pretty straightforward:

- On line 15 we defined the entry point to the server app which is an absolute path to `src/server.js`
- On line 16, we set the target environment to node
- On line 17, we set the output to `dist/index.js`
- On line 23, we define the loader to look for files with the `.js` extension in the `src` folder and transpile them to ES5 javascript and put them in the `dist` folder.
