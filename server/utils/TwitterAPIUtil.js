/*jshint camelcase: false */
'use strict';

var Twitter = require('twitter');


var TwitterAPIUtil = {
  callback: null,
  newLinks: [],
  user: {},

  getAPIAuth: function () {
    return new Twitter({
      consumer_key: process.env.TWIT_KEY || 'empty',
      consumer_secret: process.env.TWIT_SECRET || 'empty',
      access_token_key: this.user.token,
      access_token_secret: this.user.secret
    });
  },

  extractUrlFromTweet: function (rawTweet) {
    if (tweet.entities.urls && tweet.entities.urls.length > 0) {
      var link = tweet.entities.urls[0],
          url = link.expanded_url || link.url;

      // update rank
      var favs = tweet.favorite_count * 0.1 || 0,
          retweets = tweet.retweet_count || 0,
          rank = favs + retweets;

      if (!!tweet.in_reply_to_status_id) {
        rank += 1;
      }

      this.newLinks.push({
        id: tweet.id,
        url: url,
        rank: rank
      });
    }
  },

  getTweets: function () {
    var twit = this.getAPIAuth();

    var query = {
      include_entities: true,
      count: 100
    };

    twit.get('/statuses/home_timeline.json', query, function (err, data, res) {
      if (res.statusCode !== 200 || !!err) {
        return this.callback('Error while getting tweets');
      }

      data.forEach(this.extractUrlFromTweet.bind(this));
      console.log('tweets found: ', data.length, ' links found: ', this.newLinks.length);

      this.callback(false, this.newLinks);

    }.bind(this));
  },


  retrieveUrlsFromRecentTweets: function (user, callback) {
    console.log('TwitterAPIUtil: updating ' + user.id);

    this.user = user;
    this.callback = callback;
    this.getTweets();
  }

};

module.exports = TwitterAPIUtil;
