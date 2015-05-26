var CatchUpServerActionCreators = require('../actions/CatchUpServerActionCreators');
var ActionTypes = require('../constants/CatchUpConstants').ActionTypes;


module.exports = {

  loadNextLinks: function () {
    $.ajax({
      url: CategoryStore.nextPageUrl(),
      dataType: 'json'
    }).fail(function (data) {
      MagazineActions.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    }).done(function (data) {
      MagazineActions.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    });
  },

  loadPrevLinks: function () {
    $.ajax({
      url: CategoryStore.nextPageUrl(),
      dataType: 'json'
    }).fail(function (data) {
      MagazineActions.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    }).done(function (data) {
      MagazineActions.create(ActionTypes.RECIEVE_MORE_LINKS, data)
    });
  },

};
