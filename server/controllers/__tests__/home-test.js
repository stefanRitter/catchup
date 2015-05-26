'use strict';
process.env.NODE_ENV = 'test';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var server = require('../../index.js');


describe('auth controller', function () {

  it('redirects to home on logout', function (done) {
    server.inject({url: '/app', method: 'GET'}, function (response) {
      expect(response.statusCode).to.equal(302);
      expect(response.headers.location).to.equal('/');
      done();
    });
  });

});
