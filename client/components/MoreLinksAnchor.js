var React = require('react');

var MoreLinksAnchor = React.createClass({

  propTypes: {
    anchorName: React.PropTypes.string.isRequired
  },

  render: function () {
    var className = "button green load-more "+this.props.anchorName;

    return (
      <div className={className} onClick={this._handleClick}>{this.props.anchorName}</div>
    );
  },

  _handleClick: function (event) {

  }

});

module.exports = MoreLinksAnchor;
