var React = require('react');

var MoreLinksAnchor = require('./MoreLinksAnchor');
var LinkPartial = require('./LinkPartial');
var LoadingSpinner = require('./LoadingSpinner');

var LinkStore = require('../stores/LinkStore');

var CatchUpApp = React.createClass({

  getInitialState: function () {
    return {links: []};
  },

  componentDidMount: function() {
    LinkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LinkStore.removeChangeListener(this._onChange);
  },

  render: function () {

    return (
      <div className="app-view">
        <header>
          <MoreLinksAnchor anchorName="Prev" />
          <MoreLinksAnchor anchorName="Next" />
        </header>

        {this.state.links.map(function (link) {
          return <LinkPartial link={link} key={link.href} />
        })}

        <LoadingSpinner display={this.state.links.length === 0} />
      </div>
    );
  },

  _onChange: function () {
    this.setState({links: LinkStore.getLinks()});
  }

});

module.exports = CatchUpApp;
