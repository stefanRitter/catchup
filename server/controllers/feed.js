'use strict';

var User = require('mongoose').model('User'),
    Boom = require('boom');


function getLinks (request, reply) {
  var links = [{
      title: 'Do Something Different',
      href: '//www.escapethecity.org'
    },{
      title: 'second link',
      href: '//blog.escapethecity.org'
    }
  ];
  reply({links: links});
}

module.exports = function (server) {
  [
    {
      method: 'GET',
      path: '/feed/{page}',
      config: {
        handler: getLinks,
        auth: 'session'
      }
    }
  ]
  .forEach(function (route) { server.route(route); });
};
