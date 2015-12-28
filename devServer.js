var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 3000 : process.env.PORT;
var app = express();

var compiler = webpack(config);
var middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(stormpath.init(app, {
  website: true,
  web: {
    spaRoot: __dirname
  }
}));

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
});

var mailOptions = {
  from: 'Jim Hendrig <jim.hendrix@gmail.com>',
  to: 'jannis.joplin@gmail.com',
  subject: 'Tests'
};

app.route('/api/test')
.get(function (req, res) {
  res.send('Hello')
})
.post(function (req, res) {
  mailOptions.html = Object.keys(req.body)[0]
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
})

app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});

app.on('stormpath.ready', function () {
  app.listen(config._hotPort, 'localhost', function(err) {
    if (err) {
      console.log(err);
    }

    console.info("==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.", config._hotPort, config._hotPort);
  });
});
