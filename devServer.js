var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose/');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore =  require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/Automate');

var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: {type: String, unique: true, lowercase: true},
      password: String
    }, {
      collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);

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

var sess = {
  resave: true,
  saveUninitialized: true,
  // Use generic cookie name for security purposes
  key: 'sessionId',
  secret: process.env.MONGO,
  // Add HTTPOnly, Secure attributes on Session Cookie
  // If secure is set, and you access your site over HTTP, the cookie will not be set
  cookie: {
    httpOnly: true,
    secure: false
  },
  store: new MongoStore({url: process.env.MONGO_URL, autoReconnect: true})
};

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

app.use(cookieParser());
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function() {
      UserDetails.findOne({
        'username': username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {message: 'Username ' + username + ' not found'});
        }

        if (user.password != password) {
          return done(null, false, {message: 'Invalid username or password'});
        } else {
          return done(null, user);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('serialize')
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser')
  UserDetails.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

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
.post(function (req, res) {
  mailOptions.html = Object.keys(req.body)[0]
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
})

app.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  }, function(err, user, info) {
    if (err) return next(err);

    if (!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', {msg: 'Success! You are logged in'});
      res.end('Success');
    });
  })(req, res, next);
});

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

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
