var React = require('react');

var MoreLinksAnchor = require('./MoreLinksAnchor');
var LinkPartial = require('./LinkPartial');
var LoadingSpinner = require('./LoadingSpinner');

var LinkStore = require('../stores/LinkStore');

var CatchUpApp = React.createClass({

  getInitialState: function () {
    return {links: [], currentPage: 0};
  },

  componentDidMount: function() {
    LinkStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    LinkStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var prevButton = <MoreLinksAnchor anchorName="Prev" />;
    var nextButton = <MoreLinksAnchor anchorName="Next" />;

    if (this.state.currentPage === 0) { nextButton = undefined; }

    return (
      <div className="app-view">
        <header>
          {prevButton}
          {nextButton}
        </header>

        {this.state.links.map(function (link) {
          return <LinkPartial link={link} key={link.href} />
        })}

        <LoadingSpinner display={this.state.links.length === 0} />
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      links: LinkStore.getLinks(),
      currentPage: LinkStore.getCurrentPage()
    });
  }

});

module.exports = CatchUpApp;
