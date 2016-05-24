# Hello Webpack

Create a folder on your desktop and navigate to it:

```bash
mkdir ~/Desktop/hello-webpack && cd $_
```

start `npm` in this folder with `npm init` and accept all the defaults. Then, install webpack as a devDependency with:

```bash
npm i webpack -D
```

Create a symLink to `bin/webpack` in this folder with:

```bash
ln -s node_modules/.bin bin
```

Now, you should be able to use webpack with `bin/webpack`. Try `bin/webpack --help` to verify that you can run it.

## Add a Config File

Webpack works with a config file. The default name for the config file is `webpack.config.js`. So let's create that:

```bash
touch webpack.config.js
```

Open the file and add this configuration:

**`webpack.config.js`**

```javascript
module.exports = {
  entry: './main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};
```

This is as simple as it can get:

- Entry point of the app is `main.js`
- It outputs to `dist` folder
- The name of the bundle is `bundle.js`

Add a `main.js` and add something to it:

```bash
touch main.js
```

**`main.js`**

```javascript
var name = 'My app';
console.log(name);
```

Now, run `bin/webpack` and you should see the output generated in `dist/bundle.js`

```bash
Hash: 8798cb88f986653e4256
Version: webpack 1.12.9
Time: 37ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.43 kB       0  [emitted]  main
   [0] ./main.js 40 bytes {0} [built]
```

That's it! That's as simple as it can get. Now let's look at the `entry` and `output` options in more detail.

