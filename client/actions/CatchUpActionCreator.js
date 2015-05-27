var CatchUpAppDispatcher = require('../dispatcher/CatchUpAppDispatcher');
var ActionTypes = require('../constants/CatchUpConstants').ActionTypes;


module.exports = {

  INIT: function () {
    CatchUpAppDispatcher.handleServerAction({
      type: ActionTypes.INIT,
      data: {}
    });
  },

  RECIEVE_MORE_LINKS: function (data) {
    CatchUpAppDispatcher.handleServerAction({
      type: ActionTypes.RECIEVE_MORE_LINKS,
      data: data
    });
  },

  create: function (action, data) {
    this[action](data);
  }

};
