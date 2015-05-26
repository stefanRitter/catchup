'use strict';

var Path = require('path'),
    publicPath = Path.join(__dirname, '../../public');


module.exports = function (config, server) {

  require('../controllers/auth.js')(server);
  require('../controllers/feed.js')(server);
  require('../controllers/home.js')(server);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: publicPath
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: {
      file: publicPath + 'img/favicon.ico'
    }
  });

  return server;
};
