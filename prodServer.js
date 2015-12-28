var path = require('path');
var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var port = 3000;
var domain = 'localhost';

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

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

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }

  console.info("==> 🌎 Listening on port %s. Open up http:%s in your browser.", port, domain);
});
