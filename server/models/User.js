/*jshint camelcase: false */

'use strict';

var mongoose = require('mongoose'),
    schema;

var twitter = require('twitter'),
    Boom = require('boom');

schema = mongoose.Schema({
  id: {
    type:  String,
    index: true
  },
  username:     String,
  displayName:  String,
  token:        String,
  secret:       String
});


module.exports = mongoose.model('User', schema);
