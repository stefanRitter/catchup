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
      href: String,
      title: String,
      rank: Number,
      tweets: [String]
    }
  ],

  passiveLinks: [
    {
      href: String,
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
      // file in passive or visible links
      // sort by rank reply with top ten

      console.log(err, links);
    });
  }.bind(this));
};


module.exports = mongoose.model('User', schema);
