var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECIEVE_MORE_STORIES: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
