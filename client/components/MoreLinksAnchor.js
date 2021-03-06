var React = require('react');

var MoreLinksAnchor = React.createClass({

  propTypes: {
    anchorName: React.PropTypes.string.isRequired
  },

  render: function () {
    var className = "button red load-more "+this.props.anchorName;

    return (
      <div className={className} onClick={this._handleClick}>{this.props.anchorName}</div>
    );
  },

  _handleClick: function (event) {
    // trigger load more action
  }

});

module.exports = MoreLinksAnchor;
