var CatchUpActionCreator = require('../actions/CatchUpActionCreator');
var ActionTypes = require('../constants/CatchUpConstants').ActionTypes;


module.exports = {

  loadMoreLinks: function (page) {
    $.ajax({
      url: '/feed/'+page,
      dataType: 'json'
    }).fail(function (data) {
      CatchUpActionCreator.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    }).done(function (data) {
      CatchUpActionCreator.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    });
  },

};
