var CatchUpAppDispatcher = require('../dispatcher/CatchUpAppDispatcher');
var ActionTypes = require('../constants/CatchUpConstants').ActionTypes;
var CatchUpAppAPIUtils = require('../utils/CatchUpAppAPIUtils');


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currentPage = 0;
var _links = [];


var LinkStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentPage: function () {
    return _currentPage;
  },

  getLinks: function () {
    return _links;
  }

});


LinkStore.dispatchToken = CatchUpAppDispatcher.register(function (payload) {
  var action = payload.action;

  switch (action.type) {

    case ActionTypes.INIT:
      CatchUpAppAPIUtils.loadMoreLinks(_currentPage);
      break;

    case ActionTypes.RECIEVE_MORE_LINKS:
      _links = action.data.links;
      LinkStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = LinkStore;
