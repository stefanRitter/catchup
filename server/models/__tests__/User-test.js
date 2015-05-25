'use strict';

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var expect = Code.expect;

var server = require('../../index.js');

require('../../common/mongoUtils.js')(beforeEach);

var User = require('../User.js');


describe('User', function () {

  it('should create a new User', function (done) {
    User.create({id: 'test'}, function (err, created) {
      expect(err).to.equal(null);
      expect(created.id).to.equal('test');
      done();
    });
  });

});
