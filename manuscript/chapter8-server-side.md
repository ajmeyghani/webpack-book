# Using Webpack on the Server

In this short chapter we are going to explore how you can use Webpack to compile your server-side code. Even though Webpack shines on the client-side, you can still use it to compile your server-side JavaScript code.

## Set up

Let's make a folder for our project and install Webpack and other dependencies for the project:

```bash
mkdir -p ~/Desktop/webpack-on-the-server && cd $_
npm init -y
npm i webpack@^1 express -S
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

app.list(8581, () => {
  console.log('server running at port 8581');
});
```

If you want to run this code on a host that doesn't run the latest version of the node you need to transpile your code to ES5. To do that, we can use Webpack to handle that, otherwise if you are using the latest version of Node, you probably won't need to transpile your code. In the next section, we will write the Webpack configuration to enable transpiling the server-side code.


