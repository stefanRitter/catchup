var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    INIT: null,
    RECIEVE_MORE_LINKS: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};
