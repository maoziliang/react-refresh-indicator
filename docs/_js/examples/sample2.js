var SAMPLE2_COMPONENT = `
var Sample2 = React.createClass({
  getInitialState: function() {
    this._indicatorSize = 40;
    return {
      indicatorPercentage: 0,
      indicatorY: -this._indicatorSize,
      indicatorStatus: "hide",
    };
  },
  render: function () {
    return (
      <div style={{
          position: "relative",
          width: 236,
          height: 300,
          margin: "0 auto",
          overflow: "hidden",
          border: "1px dashed #999",
        }}
        onMouseDown={this._handleMouseDown}
        onMouseMove={this._handleMouseMove}
        onMouseUp={this._handleMouseUp}
      >
        <RefreshIndicator
          percentage={this.state.indicatorPercentage}
          top={this.state.indicatorY}
          left={236 / 2 - 40 / 2}
          size={this._indicatorSize}
          status={this.state.indicatorStatus}
        />
      </div>
    );
  },
  _handleMouseDown: function(e) {
    this._mouseDownY = e.pageY;
    this._maybePull = true;
  },

  _handleMouseMove: function(e) {
    if (!this._maybePull) return;

    var currY = e.pageY;
    var offsetY = currY - this._mouseDownY;
    if (offsetY > 0) {
      offsetY = Math.min(offsetY, 100);
      var percentage = offsetY * 100 / 100;
      this.setState({
        indicatorPercentage: percentage,
        indicatorY: offsetY - this._indicatorSize,
        indicatorStatus: "ready",
      });
      if (percentage === 100) {
        this._pulling = true;
      } else {
        this._pulling = false;
      }
    }
  },

  _handleMouseUp: function(e) {
    this._maybePull = false;

    if (this._pulling) {
      this.setState({
        indicatorStatus: "loading",
      });
      setTimeout(function(me) {
        me.setState({
          indicatorStatus: "hide",
          indicatorY: -me._indicatorSize,
        });
      }, 5000, this);
    } else {
      this.setState({
        indicatorStatus: "hide",
        indicatorY: -this._indicatorSize,
      });
    }
  }
});

React.render(<Sample2 />, mountNode);
`;

React.render(
  <ReactPlayground codeText={SAMPLE2_COMPONENT} />,
  document.getElementById('sample2')
);
