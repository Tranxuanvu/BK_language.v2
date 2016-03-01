var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var app = express();

// port config
var port = 3000;

// favicon using
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// router init
require('./app/routes')(app);

// make app listen on port
app.listen(port, function(){
  console.log('SERVER RUNNING ON PORT ' + port);
});

module.exports = app;