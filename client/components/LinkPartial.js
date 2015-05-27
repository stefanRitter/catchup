var React = require('react');

var LinkPartial = React.createClass({

  propTypes: {
    link: React.PropTypes.object.isRequired
  },

  render: function () {
    var link = this.props.link;

    return (
      <a className="link-partial" target="_blank" href={link.url}>
        <div className="link-partial-title">{link.title}</div>
        <div className="link-partial-rank">Rank: {link.rank}</div>
      </a>
    );
  }

});

module.exports = LinkPartial;
