'use strict';

var User = require('mongoose').model('User'),
    Boom = require('boom');



function loginTwitter (request, reply) {
  var userData = request.auth.credentials;

  User.findOne({id: userData.profile.id}, function (err, user) {
    if (err) { return reply(Boom.badImplementation(err)); }

    if (!user) {
      var userToCreate = {
        id: userData.profile.id,
        username: userData.profile.username,
        displayName: userData.profile.displayName,
        token: userData.token,
        secret: userData.secret
      };

      return User.create(userToCreate, function (err, newUser) {
        if (err || !newUser) { return reply(Boom.badImplementation(err)); }
        request.auth.session.set({_id: newUser._id});
        reply.redirect('/');
      });
    }

    request.auth.session.set({_id: user._id});
    reply.redirect('/');
  });
}

function logout (request, reply) {
  request.auth.session.clear();
  return reply.redirect('/');
}


module.exports = function (server) {

  server.auth.strategy('session', 'cookie', {
    password: 'cookie_encryption_password',
    cookie: 'sessionid',
    redirectTo: false,
    isSecure: false,
    ttl: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  server.auth.strategy('twitter', 'bell', {
    provider: 'twitter',
    password: 'cookie_encryption_password',
    clientId: process.env.TWIT_KEY || 'empty',
    clientSecret: process.env.TWIT_SECRET || 'empty',
    isSecure: false
  });


  [
    {
      method: ['GET', 'POST'],
      path: '/loginTwitter',
      config: {
        auth: 'twitter',
        handler: loginTwitter
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        auth: {
          mode: 'optional',
          strategy: 'session'
        },
        handler: logout
      }
    }
  ]
  .forEach(function (route) { server.route(route); });
};
