/*jshint camelcase: false */
'use strict';

var Twitter = require('twitter');

var newLinks = [],
    callback,
    user;


var TwitterAPIUtil = {

  getAPIAuth: function () {
    return new Twitter({
      consumer_key: process.env.TWIT_KEY || 'empty',
      consumer_secret: process.env.TWIT_SECRET || 'empty',
      access_token_key: user.token,
      access_token_secret: user.secret
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

      newLinks.push({
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
        return callback('Error while getting tweets');
      }

      data.forEach(this.extractUrlFromTweet);
      console.log('tweets found: ', data.length, ' links found: ', newLinks.length);

      callback(false, newLinks);

    }.bind(this));
  },

  retrieveUrlsFromRecentTweets: function (_user, _callback) {
    user = _user;
    callback = cb;

    console.log('TwitterAPIUtil: updating ' + _user.id);
    getTweets();
  }

};

module.exports = TwitterAPIUtil;
