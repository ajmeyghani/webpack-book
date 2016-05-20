## Using Angular with Webpack

In this section we are going to set up a workflow for developing Angular apps and Webpack.

### Project Setup

Let's start by creating a folder and a package file for our project:

```bash
mkdir -p ~/Desktop/ng-webpack && cd $_ && npm init
```

When prompted accept all the defaults to generate your package file.

After that, install some dependencies:

```bash
npm i webpack concurrently express faker nodemon babel-core babel-loader babel-preset-es2015 babel-plugin-add-module-exports raw-loader -D
```

After all the dependencies are installed, create a symbolic link to the `bin` folder of `node_modules`:

```bash
ln -s ./node_modules/.bin ./bin
```

Then create a `webpack.config.js` file and put in the following in the file:

```javascript
var path = require('path');

module.exports = {
  entry: 'main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/public/',
    library: 'myapp',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: 'node_modules',
        loader: 'babel',
        query: {
          presets: ['es2015'],
          "plugins": [ "add-module-exports" ]
        }
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  externals: {
    angular: 'angular'
  }
};
```

We are pointing Webpack to look at the `src` folder for modules. So let's create that folder along with the `main.js` file:

```bash
mkdir src && touch src/main.js
```

Before we go any further let's see if the basics are set up. Put the following in the `src/main.js` and then run `./bin/webpack`:

**src/main.js**

```javascript
class Person {
  walk() {
    return 'walking ....'
  }
}
const p = new Person();
console.log(p.walk());
```

If everything is set up correctly you should see an output in the `dist` folder.

Now that we have Webpack set up, let's create a simple Express app to server our app for development:

```bash
touch server.js
```

After you created the file, copy paste the following to the file:

**server.js**

```javascript
var express = require('express');
var path = require('path');
var faker = require('faker');
var logger = require('morgan');
var app = express();
var router = express.Router();
app.use(logger('dev'));

app.use('/public', express.static(path.resolve(__dirname, 'dist')));

// GET /api/posts
router.use('/posts', function (req, res) {
  var posts = [];
  var count = 20;
  while (count-- > 0) {
    posts.push({
      id: faker.random.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.sentences(),
    })
  }
  res.json(posts);
});

// For all the requests that does not start with
// /api serve index.html
app.all(/^\/(?!api).*/, function(req, res){
  res.sendFile('index.html', {root: path.resolve(__dirname) });
});

app.all("/404", function(req, res, next) {
  res.sendFile("index.html", {root: path.resolve(__dirname)});
});

app.use('/api', router);


var port = process.env.PORT || 8089;
app.listen(port, function () {
  console.log('Server running at %s', port);
});
```

We also need to create an `index.html` for the project:

```bash
touch index.html
```

After you created the html file, copy past the following:

**index.html**

```html
<!DOCTYPE html>
<html>

<head>
  <title>Example</title>
  <script src="/public/bundle.js"></script>
</head>

<body>
  <p>Hello</p>
</body>

</html>
```

Now, if you run the server with `node server.js`, and go to `http://localhost:8089/`, you should see the text `walking` in the browser console. If you see the text, it means that you are all set up.

For our convenience, we are going to set up some task scripts in our `package.json` file:

**package.json**

```json
{
  "name": "ng-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "./bin/concurrently \"npm run watch\" \"npm run server\"",
    "watch": "./bin/webpack -w --debug --devtool eval --output-pathinfo",
    "server": "./bin/nodemon -w server.js -w webpack.config.js server.js"
  },
  "author": "Amin Meyghani <meyghania@gmail.com> (http://meyghani.com)",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.9.0",
    "babel-loader": "^6.2.4",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-preset-es2015": "^6.9.0",
    "concurrently": "^2.1.0",
    "express": "^4.13.4",
    "faker": "^3.1.0",
    "morgan": "^1.7.0",
    "nodemon": "^1.9.2",
    "raw-loader": "^0.5.1",
    "webpack": "^1.13.1"
  },
  "dependencies": {
    "angular": "^1.5.5"
  }
}
```

Now you can stop the server that was running before with ctrl + c. After you stopped the server, you do `npm run dev` to start Webpack and the server in watch mode. Try it!

```bash
[1]
[1] > ng-webpack@1.0.0 server /Users/amin.meyghani/Desktop/ng-webpack
[1] > ./bin/nodemon -w server.js -w webpack.config.js server.js
[1]
[0]
[0] > ng-webpack@1.0.0 watch /Users/amin.meyghani/Desktop/ng-webpack
[0] > ./bin/webpack -w --debug --devtool eval --output-pathinfo
[0]
[1] [nodemon] 1.9.2
[1] [nodemon] to restart at any time, enter `rs`
[1] [nodemon] watching: server.js webpack.config.js
[1] [nodemon] starting `node server.js`
[0] Hash: 5bda51e6325813c68069
[0] Version: webpack 1.13.1
[0] Time: 695ms
[0]     Asset     Size  Chunks             Chunk Names
[0] bundle.js  2.67 kB       0  [emitted]  main
[0]     + 1 hidden modules
[1] Server running at 8089
```

### Hello Angular

Now let's start playing with Angular by first install it:

```bash
npm i angular -S
```

Then open your `src/main.js` file and replace the content with the following:

```javascript
const angular = require('angular');
const appModule = angular.module('app', []);

require('services')(appModule);
require('page/page-directive')(appModule);

angular.element(document).ready(function () {
  angular.bootstrap(document.getElementsByTagName('body')[0], ['app']);
});

export default appModule;
```

As you can see, first we load Angular and then create and Angular module called 'app'. Then we load `services` and the `page-directive` by passing the `appModule` to the result of require:

```javascript
const s = require('services'); // This returns a function
// then we call the function passing an instance of our appModule
s(appModule);
```

That's where the magic happens, so make sure you understand that part because that's what makes it easy to create modules and refactor them without worrying about names.

Now let's create the `src/services` folder and define the `src/services/index.js` file:

```bash
mkdir -p src/services && touch src/services/index.js
```

After you created the `src/services/index.js` file, copy past the following:

**src/services/index.js**

```javascript
export default ngModule => {
  ngModule.factory('PostService', function ($http) {
    return {
      getPosts() {
        return $http.get('/api/posts')
      }
    };
  });
};
```

Let's spend some time and understand what's happing here:

First of all we have the `export default` which is equivalent to `module.exports = ...`. Then, we have a function with `ngModule` as the parameter which is equivalent to `function (ngModule) {}`. So the ES5 equivalent of the first line is:

```javascript
module.exports = function (ngModule) {}
```
Now the body of the function is familiar, you can pretend that `ngModule` is simple an instance of the `angular.module`. But the neat part is that you don't have to care what the name of the module is, you simply add stuff to the instance. Again, this is what makes working with Angular and Webpack special, the fact that you get to decouple your modules is a big win. This will protect you from module definitions like the following:

```javascript
var app = angular.module('app', ['moduleName1', 'moduleName2', 'moduleName3', 'moduleName4', 'moduleName5']);
```

Now let's look at creating our page directive which is going to contain the definition of our directive including the controller and the template definition:

```bash
mkdir -p src/page && touch src/page/page-directive.js && touch src/page/page-tpl.html
```

After you created the files and folders, copy paste the following to their respective files:

**src/page/page-tpl.html**

```html
<p>{{pageCtrl.hello}}</p>
<ul>
  <li ng-repeat="post in pageCtrl.posts">
    {{ post.title }}
  </li>
</ul>
```

**src/page/page-directive.js**

```javascript
export default pageModule => {

  pageModule.run(function ($templateCache) {
    $templateCache.put('page-tpl', require('./page-tpl.html'));
  });

  pageModule.directive('page', function() {
    return {
      restrict: 'E',
      controller: 'pageCtrl',
      controllerAs: 'pageCtrl',
      templateUrl: 'page-tpl'
    };
  });

  pageModule.controller('pageCtrl', function($scope, PostService) {
    const self = this;
    self.hello = 'hello there';
    PostService.getPosts()
      .then(function ok(resp) {
        self.posts = resp.data;
        $scope.$broadcast('posts:loaded', resp.data);
      },
      function err(errResp) {
        console.log(errResp);
      });
  });
};

```

Let's go through the Webpack-specific stuff. First of all, we are adding the template of our directive to the cache:

```javascript
pageModule.run(function ($templateCache) {
  $templateCache.put('page-tpl', require('./page-tpl.html'));
});
```
If you notice we are using Webpack to load the content of the `page-tpl.html` template as a string and assigning that to the `page-tpl` value of the cache. This means that we can reference our template using the key, which in this case is `page-tpl`:

```javascript
pageModule.directive('page', function() {
  return {
    restrict: 'E',
    controller: 'pageCtrl',
    controllerAs: 'pageCtrl',
    templateUrl: 'page-tpl' // <--- Referencing the templateUrl
  };
});
```

The rest is pretty much standard Angular code. Now that you have the directive, you can load that in the `index.html` file. So now your `index.html` would like the following:

```html
<!DOCTYPE html>
<html>

<head>
  <title>Example</title>
  <script type="text/javascript" src="/node_modules/angular/angular.js"></script>
  <script src="/public/bundle.js"></script>
</head>

<body>
  <page></page>
</body>

</html>
```

After you load the page, you should be to see the posts that are returned from our Express API!


