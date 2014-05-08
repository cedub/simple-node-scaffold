var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// set the static path to be the client folder
var staticPath = path.dirname(path.join(__dirname))+'/client';
app.use('/static', express.static(staticPath));

// view urls
var routes = require('./routes/routes');
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
