'use strict';

var User = require('mongoose').model('User'),
    Boom = require('boom');


function getLinks (request, reply) {
  var userData = request.auth.credentials;

  User.findOne({_id: userData._id}, function (err, user) {
    if (err || !user) { return reply(Boom.badImplementation(err)); }

    user.updateFeed(request, reply);
  });
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
