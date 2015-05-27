'use strict';

var Code = require('code');
var Sinon = require('sinon');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var expect = Code.expect;


var noUrlTweet = {
  'id': '1',
  'entities': {
    'hashtags': [],
    'urls': [],
    'user_mentions': []
  }
};

var withUrlTweet = {
  'id': '2',
  'retweet_count': 2,
  'favorite_count': 10,
  'entities': {
    "urls":[{
      "indices":[32,52],
      "url":"http:\/\/t.co\/IOwBrTZR",
      "display_url":"youtube.com\/watch?v=oHg5SJ\u2026",
      "expanded_url":"http:\/\/www.youtube.com\/watch?v=oHg5SJYRHA0"
    }]
  }
};



describe('TwitterAPIUtil', function () {

  var TwitterAPIUtil;
  var mockTweets = [noUrlTweet, withUrlTweet];
  var twitStub = {};

  beforeEach(function (done) {
    TwitterAPIUtil = require('../TwitterAPIUtil');
    TwitterAPIUtil.getAPIAuth = Sinon.stub().returns(twitStub);
    done();
  });


  it('ignores tweets without url entities', function (done) {
    mockTweets.forEach(TwitterAPIUtil.extractUrlFromTweet.bind(TwitterAPIUtil));
    expect(TwitterAPIUtil.newLinks.length).to.equal(1);
    done();
  });

  it('should calculate the correct rank', function (done) {
    TwitterAPIUtil.extractUrlFromTweet(withUrlTweet);
    expect(TwitterAPIUtil.newLinks[0].rank).to.equal(3);
    done();
  });

  it(
    var twitStub = {
      get: function (type, query, callback) { callback(false, mockTweets, {statusCode: 200})}
    };
  )
});
