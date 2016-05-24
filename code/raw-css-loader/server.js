var path = require('path');
var express = require('express');
var app = express();

app.use('/assets', express.static(path.resolve(__dirname, 'dist')));

var port = process.env.PORT || 8760;
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
