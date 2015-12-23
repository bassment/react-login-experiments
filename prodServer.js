var path = require('path');
var express = require('express');
var app = express();

var port = 3000;
var domain = '46.101.215.89';

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http:%s//:%s/ in your browser.", port, domain, port);
});
