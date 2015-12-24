var path = require('path');
var express = require('express');
var app = express();

var port = 3000;
var domain = 'pixelant.space';

app.use(express.static(__dirname + '/public'));

app.get('api', function (req, res) {
  res.send('API express route...');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.info("==> 🌎 Listening on port %s. Open up http:%s in your browser.", port, domain);
});
