var CatchUpApp = require('./components/CatchUpApp.react');
var CatchUpActionCreator = require('./actions/CatchUpActionCreator')
var ActionTypes = require('./constants/CatchUpConstants').ActionTypes;

var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

CatchUpActionCreator.create(ActionTypes.INIT);

React.render(
    <CatchUpApp />,
    document.getElementById('reactApp')
);
