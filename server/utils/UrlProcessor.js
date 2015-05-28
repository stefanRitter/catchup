'use strict';

var cheerio = require('cheerio'),
    Batch = require('batch');


var UrlProcessor = {

  request: require('request'),

  requestAndCleanUrl: function (url, done) {
    this.request(
      {
        method: 'GET',
        url: url.url,
        followAllRedirects: true,
        timeout: 1000,
        headers: {
          'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/33.0.1750.149 Safari/537.36'
        }
      },

      function (err, response, body) {
        if (err) {
          console.error('UrlProcessor: ', err);
          return done(false, {});
        }

        if (response.statusCode !== 200) {
          console.error('UrlProcessor: URL STATUS ERROR', url.url, response.statusCode);
          return done(false, {});
        }

        var $ = cheerio.load(body),
            title = $('title').first().text().trim();

        url.url = response.request.href.split('?')[0];
        url.title = title;

        done(false, url);
      });
  },


  process: function (urls, callback) {
    console.log('UrlProcessor: processing ' + urls.length);

    var batch = new Batch(),
        requestAndCleanUrl = this.requestAndCleanUrl.bind(this);

    batch.concurrency(4);

    urls.forEach(function (url) {
      batch.push(function (done) {
        console.log(url.url);
        requestAndCleanUrl(url, done);
      });
    });

    batch.on('progress', function (e) {
      console.log('UrlProcessor: progress');
    });

    batch.end(function (err, links) {
      callback(err, links);
    });
  }

};

module.exports = UrlProcessor;
