var CatchUpAppDispatcher = require('../dispatcher/CatchUpAppDispatcher');
var ActionTypes = require('../constants/CatchUpConstants').ActionTypes;

module.exports = {

  receiveAll: function (rawMessages) {
    CatchUpAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_MESSAGES,
      rawMessages: rawMessages
    });
  },

  receiveCreatedMessage: function (createdMessage) {
    CatchUpAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    });
  }

};
