var React = require('react');

var LoadingSpinner = React.createClass({

  propTypes: {
    display: React.PropTypes.bool.isRequired
  },

  render: function () {
    var style = {opacity: 0};

    if (this.props.display) {
      style.opacity = 1;
    }

    return (
      <div className="spinner" style={style}>
        <div className="double-bounce1" />
        <div className="double-bounce2" />
        <span className="spinner-ie">loading...</span>
      </div>
    );
  }
});

module.exports = LoadingSpinner;
