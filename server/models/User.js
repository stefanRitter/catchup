/*jshint camelcase: false */
'use strict';

var mongoose = require('mongoose'),
    Twitter = require('twitter'),
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

// Twitter API calls
schema.methods.getAPIAuth = function () {
  return new Twitter({
    consumer_key: process.env.TWIT_KEY || 'empty',
    consumer_secret: process.env.TWIT_SECRET || 'empty',
    access_token_key: this.token,
    access_token_secret: this.secret
  });
};


function cleanTweet (rawTweet) {
  var pics = rawTweet.extended_entities.media.map(function (e) {
              if (e.type === 'photo') { return e.media_url; }
             });

  var profile_image_url = rawTweet.user.profile_image_url;
  if (!!rawTweet.retweeted_status) {
    profile_image_url = rawTweet.retweeted_status.user.profile_image_url;
  }

  return {
    id_str:             rawTweet.id_str,
    created_at:         rawTweet.created_at,
    url:                'http://twitter.com/'+rawTweet.user.id_str+'/status/'+rawTweet.id_str,
    profile_image_url:  profile_image_url,
    text:               rawTweet.text,
    retweet_count:      rawTweet.retweet_count  || 0,
    favorite_count:     rawTweet.favorite_count || 0,
    pics:               pics
  };
}

module.exports = mongoose.model('User', schema);
