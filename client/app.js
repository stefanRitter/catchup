var CatchUpApp = require('./components/CatchUpApp.react');

var React = require('react');
window.React = React; // export for http://fb.me/react-devtools


React.render(
    <CatchUpApp />,
    document.getElementById('#reactApp')
);
