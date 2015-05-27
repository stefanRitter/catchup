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


describe('TwitterAPIUtil', function () {

  var TwitterAPIUtil;

  beforeEach(function (done) {
    TwitterAPIUtil = require('../TwitterAPIUtil');

    var twitStub = {
      get: function (type, query, callback) {

      }
    };

    TwitterAPIUtil.getAPIAuth = sinon.stub().returns(twitStub);
    done();
  });


});
