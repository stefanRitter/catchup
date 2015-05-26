'use strict';

var Path = require('path'),
    publicPath = Path.join(__dirname, '../../public');

module.exports = function (server) {

  server.route({
    method: 'GET',
    path: '/app',
    config: {
      auth: {
        mode: 'optional',
        strategy: 'session'
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          reply.file(publicPath + '/app.html');
        } else {
          reply.redirect('/');
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: {
        mode: 'optional',
        strategy: 'session'
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          reply.redirect('/app');
        } else {
          reply.file(publicPath + '/index.html');
        }
      }
    }
  });

};
