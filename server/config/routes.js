'use strict';

var Path = require('path'),
    publicPath = Path.join(__dirname, '../../puplic');


module.exports = function (config, server) {

  require('../controllers/auth.js')(server);
  require('../controllers/feed.js')(server);

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

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        reply.file(Path.join(__dirname, '../../client/app.html'));
      } else {
        reply.file(publicPath + '/index.html');
      }
    }
  });

  return server;
};
