/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// use the html view
app.engine('html', require('ejs').renderFile);

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'jbms'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'templates/app')));
});

// config the route rules express
routes(app);

app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found'))
    return next();

  // log it
  console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
  res.status(404).render('404', { url: req.originalUrl });
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
