// api
var main = require('./api/main');
var mainPost = require('./api/post');
var mainConfig = require('./api/config');
var authentication = require('./api/authentication')

// admin api
var admin = require('./admin/api/admin');
var adminPost = require('./admin/api/post');
var adminConfig = require('./admin/api/config');

module.exports = function (app) {
    
  // api route generate
  main(app);
  mainPost(app);
  mainConfig(app);
  authentication(app);
  
  // admin api route generate
  admin(app);
  adminPost(app);
  adminConfig(app);
  
  // other route generate
  
  app.get('/admin', function (req, res) {
    res.sendFile(__base + './public/views/index_admin.html');
  });
  
  app.get('/admin/login', function (req, res) {
    res.sendFile(__base + './public/views/partials/admin/login.html');
  });
  
  app.get('/admin/*', function (req, res) {
    res.sendFile(__base + './public/views/index_admin.html');
  });
  
  app.get('*', function (req, res) {
    res.sendFile(__base + './public/views/index.html');
  });

}