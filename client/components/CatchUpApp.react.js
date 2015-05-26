var React = require('react');

var MoreLinksAnchor = require('./MoreLinksAnchor');
var LinkPartial = require('./LinkPartial');
var LoadingSpinner = require('./LoadingSpinner');


var CatchUpApp = React.createClass({

  getDefaultProps: function () {
    return {links: [{
      title: "Do Something Different",
      href:"//www.escapethecity.org"
    }]};
  },

  render: function () {

    return (
      <div className="app-view">
        <header>
          <MoreLinksAnchor anchorName="Prev" />
          <MoreLinksAnchor anchorName="Next" />
        </header>

        {this.props.links.map(function (link) {
          return <LinkPartial link={link} key={link.href} />
        })}

        <LoadingSpinner display={this.props.links.length === 0} />
      </div>
    );
  }

});

module.exports = CatchUpApp;
