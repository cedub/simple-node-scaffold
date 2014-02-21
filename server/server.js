var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

// set the static path to be the client folder
var staticPath = path.dirname(path.join(__dirname))+'/client';
app.use('/static', express.static(staticPath));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// view urls
var routes = require('./routes/routes');
app.get('/', routes.index);

// api urls
var api = require('./routes/api');
app.post('/api/contact', api.contact);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});