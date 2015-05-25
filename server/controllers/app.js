'use strict';

var User = require('mongoose').model('User'),
    Boom = require('boom'),
    server = {};


module.exports = function (_server) {
  server = _server;

  [
    {
      method: 'GET',
      path: '/next',
      config: {
        handler: getNextLinks,
        auth: 'session'
      }
    },
    {
      method: 'GET',
      path: '/prev',
      config: {
        handler: getPrevLinks,
        auth: 'session'
      }
    },
  ]
  .forEach(function (route) { server.route(route); });
};


function getNextLinks (request, reply) {}
function getPrevLinks (request, reply) {}
