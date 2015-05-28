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

var mockHtml = '<html><head><title>testing title</title></head><body>some body</body></html>';


describe('UrlProcessor', function () {
  var UrlProcessor = require('../UrlProcessor');

  it('should extract the title from the HTML', function (done) {
    UrlProcessor.request = function (request, callback) {
      callback(false, {statusCode: 200, request: {href: 'www.test.com'}}, mockHtml);
    };

    UrlProcessor.process([{url: 't.co/test'}], function (err, links) {
      expect(err).to.be.null();
      expect(links.length).to.equal(1);
      expect(links[0].title).to.equal('testing title');
      done();
    });
  });


});
