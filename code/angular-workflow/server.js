var express = require('express');
var path = require('path');
var faker = require('faker');
var logger = require('morgan');
var app = express();
var router = express.Router();
app.use(logger('dev'));

app.use('/public', express.static(path.resolve(__dirname, 'dist')));
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')))

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
