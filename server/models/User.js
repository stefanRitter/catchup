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


module.exports = mongoose.model('User', schema);
