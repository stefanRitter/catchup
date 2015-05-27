'use strict';

var TwitterAPIUtil = require('../utils/TwitterAPIUtil'),
    UrlProcessor = require('../utils/UrlProcessor'),
    mongoose = require('mongoose'),
    Boom = require('boom');

var schema = mongoose.Schema({
  id: {
    type:  String,
    index: true
  },
  username:     String,
  displayName:  String,
  token:        String,
  secret:       String,

  visibleLinks: [
    {
      url: String,
      title: String,
      rank: Number,
      tweets: [String]
    }
  ],

  passiveLinks: [
    {
      url: String,
      title: String,
      rank: Number,
      tweets: [String]
    }
  ]
});


schema.methods.updateFeed = function (request, reply) {
  TwitterAPIUtil.retrieveUrlsFromRecentTweets(this, function (err, urls) {
    if (err) { return reply(Boom.badImplementation(err)); }

    UrlProcessor.process(urls, function (err, links) {
      if (err) { return reply(Boom.badImplementation(err)); }

      // TODO:
      // file/sort in passive or visible links
      // paginate

      links = links.filter(function (link) { return !!link.title; });
      links = links.sort(function (a, b) { return b.rank - a.rank; });
      reply({links: links.splice(0,10)});
    });
  }.bind(this));
};


module.exports = mongoose.model('User', schema);
