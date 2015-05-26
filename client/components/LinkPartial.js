var React = require('react');

var LinkPartial = React.createClass({

  propTypes: {
    link: React.PropTypes.object.isRequired
  },

  render: function () {
    var link = this.props.link;

    return (
      <a className="link-partial" target="_blank" href={link.href}>
        {link.title}
      </a>
    );
  }

});

module.exports = LinkPartial;
