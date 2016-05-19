## Resolving Basics

Let's spend a little time and see how Webpack resolves modules. Let's say we have an entry point like so:

**main.js**

```javascript
var Person = require('person');
```
let's compre that with the following:

```javascript
var Person = require('./person');
```
In the first case Webpack will try to resolve the file the same way that node does, by recursively looking into node_modules folders in parent directories, starting from the current directory, until it finds the `person.js` file.

In the second case however, Webpack will look at the current directory as the file that is requiring the module. This means that if you use a relative path, Webpack will resolve the module relative to the file requiring the module. But if you don't specify a relative path, Webpack will resolve the module the same way that Node does. In addition to that, Webpack allows you to add more directories in addition to the `node_modules` directory. In summary, here is what will happen if the path is not relative:

```javascript
require('person');
/*
    Webpack will look into:
      ./node_modules/person.js
     ../node_modules/person.js
  ../../node_modules/person.js

  and so on ...
*/
```

In the next section we will explore how to add more directories in the resolution path for Webpack to look at.

## `resolve.modulesDirectories`

You can use the `resolve.modulesDirectories` to add more directories to the list of resolution directories. It is best demonstrate the concept with an example. Let's say we have the following folder structure:

```
├── main.js
├── src
│   └── person.js
└── webpack.config.js
```

and in the `main.js` file we have:

**main.js**

```javascript
var Person = require('person');
```

If you compile this with the `webpack` command, you will get an error from Webpack:

```bash
ERROR in ./main.js
Module not found: Error: Cannot resolve module 'person' in
/Users/amin.meyghani/projects/webpackmin-book/code/resolve-example
 @ ./main.js 1:13-30
```

Let's go through this an understand why this happens. As mentioned before, if a relative path to a module is used, Webpack will resolve the module relative to the file loading the module, otherwise it will use Node's strategy. So in this case, given `require('person')` Webpack will, loosely speaking, first look into `./node_modules/person.js`, then in `../node_modules/person.js` and so on. That's why it can't resolve the module. But we can use the `resolve.modulesDirectories` to add the `src` folder to the list of folders:

**webpack.config.js**

```javascript
var path = require('path');
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories : ['src'] // <- Adding the `src` folder as a modules directory.
  }
};
```

Now we if we run this, Webpack, in addition to looking into node_modules folder, it will also look into `./src/person.js`, `../src/person.js`, `../../src/person.js` and so on. Also notice that we did not specify a path for `resolve.modulesDirectories`, just specified the folder and Webpack takes care of the rest.

There are other things that you can do with the `resolve` option that we will explore in the next sections.

## `resolve.alias`

Coming soon ... **TODO**

## `resolve.extensions`

Coming soon ... **TODO**

## `resolve.alias`

Coming soon ... **TODO**












