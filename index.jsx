import React from 'react';

import "./index.less";

class RefreshIndicator extends React.Component {
  _getPaddingSize() {
    let padding = this.props.size * 8 / 80;
    return padding;
  }

  _getPaperSize() {
    return this.props.size - this._getPaddingSize() * 2;
  }

  _getRadius(paperSize) {
    return paperSize / 2 - 5;
  }

  _getArcDeg() {
    let p = this.props.percentage / 100;

    let beginDeg = p * 120;
    let endDeg = p * 410;
    return [beginDeg, endDeg];
  }

  _getFactor() {
    let p = this.props.percentage / 100;
    let p1 = Math.min(1, p / 0.4);

    return p1;
  }

  _getRootStyle() {
    let padding = this._getPaddingSize();
    return {
      width: this.props.size + "px",
      height: this.props.size + "px",
      padding: padding,
      top: this.props.top,
      left: this.props.left,
      opacity: this.props.transitionEnabled ? 0 : 1,
      [this.prefixed("transition")]: this.props.transitionEnabled ? 'all .2s ease-out' : 'none',
    };
  }

  _getCircleStyle(paperSize) {
    let p1 = this.props.loading ? 1 : this._getFactor();
    let radius = this._getRadius(paperSize);
    let stroke = Math.max(3, this.props.size * 4 / 80);
    let originX = paperSize / 2;
    let originY = paperSize / 2;
    let perimeter = Math.PI * 2 * radius;

    let [beginDeg, endDeg] = this._getArcDeg();
    let arcLen = (endDeg - beginDeg) * perimeter / 360;
    let dashOffset = -beginDeg * perimeter / 360;

    return {
      style: {
        strokeDasharray: arcLen + ", " + (perimeter - arcLen),
        strokeDashoffset: dashOffset,
        stroke: (this.props.loading || this.props.percentage === 100) ? "rgb(0, 188, 212)" : "#CCC",
        strokeLinecap: "round",
        opacity: p1,
        strokeWidth: stroke * p1,
        fill: "none",
      },
      attr: {
        cx: originX,
        cy: originY,
        r: radius
      }
    };
  }

  _getPolygonStyle(paperSize) {
    let p1 = this._getFactor();
    let radius = this._getRadius(paperSize);

    let circleStroke = Math.max(3, this.props.size * 4 / 80);
    let originX = paperSize / 2;
    let originY = paperSize / 2;
    
    let triangleCx= originX + radius;
    let triangleCy = originY;
    let dx = circleStroke * 7 / 4;
    dx = dx * p1;
    let trianglePath = (triangleCx - dx) + "," + triangleCy + " " + (triangleCx + dx) + "," + triangleCy + " " + triangleCx + "," + (triangleCy + dx);

    let [, endDeg] = this._getArcDeg();

    return {
      style: {
        fill: this.props.percentage === 100 ? "rgb(0, 188, 212)" : "#CCC",
        [this.prefixed("transform")]: `rotate(${endDeg}deg)`,
        [this.prefixed("transformOrigin")]: `${originX}px ${originY}px`,
        opacity: p1,
      },
      attr: {
        points: trianglePath
      }
    };
  }

  componentDidUpdate() {
    this._scalePath(React.findDOMNode(this.refs.path), 0);
    this._rotateWrapper(React.findDOMNode(this.refs.wrapper));
  }

  _scalePath(path, step) {
    if (!this.props.loading) return;

    step = step || 0;
    step %= 3;

    clearTimeout(this._timer1);
    this._timer1 = setTimeout(this._scalePath.bind(this, path, step + 1), step ? 750 : 250);

    let paperSize = this._getPaperSize();
    let radius = this._getRadius(paperSize);
    let perimeter = Math.PI * 2 * radius;
    let arcLen = perimeter * 0.64;

    if (step === 0) {
      path.style.strokeDasharray = "1, 200";
      path.style.strokeDashoffset = 0;
      path.style[this.prefixed("transitionDuration")] = "0ms";
    }
    else if (step === 1) {
      path.style.strokeDasharray = arcLen + ", 200";
      path.style.strokeDashoffset = -15;
      path.style[this.prefixed("transitionDuration")] = "750ms";
    }
    else {
      path.style.strokeDasharray = arcLen + ",200";
      path.style.strokeDashoffset = -(perimeter - 1);
      path.style[this.prefixed("transitionDuration")]= "850ms";
    }
  }

  _rotateWrapper(wrapper) {
    if (!this.props.loading) return;

    clearTimeout(this._timer2);
    this._timer2= setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    wrapper.style[this.prefixed("transform")] = null;
    wrapper.style[this.prefixed("transform")] = "rotate(0deg)";
    wrapper.style[this.prefixed("transitionDuration")] = "0ms";

    setTimeout(() => {
      wrapper.style[this.prefixed("transform")] = "rotate(1800deg)";
      wrapper.style[this.prefixed("transitionDuration")] = "10s";
      wrapper.style[this.prefixed("transitionTimingFunction")] = "linear";
    }, 50);
  }

  /**
   * 原值返回，因为很多库都依赖不同的autoprefixer的实现
   * 可以用mixin进行重写
   */
  prefixed(key) {
    return key;
  }

  _renderChildren() {
    let paperSize = this._getPaperSize();
    if (this.props.loading) {
      let circleStyle = this._getCircleStyle(paperSize);
      return (
        <div ref="wrapper" style={{
            transition: "transform 20s linear",
            width: "100%",
            height: "100%"
          }}
        >
          <svg style={{
              width: paperSize + "px",
              height: paperSize + "px",
            }}
          >
            <circle ref="path" 
              style={Object.assign(circleStyle.style, {
                transition: "all 1.5s ease-in-out"
              })} 
              {...circleStyle.attr}
            />
          </svg>
        </div>
      );
    } else {
      let circleStyle = this._getCircleStyle(paperSize);
      let polygonStyle = this._getPolygonStyle(paperSize);
      return (
        <svg style={{
            width: paperSize + "px",
            height: paperSize + "px",
          }}
        >
          <circle 
            style={circleStyle.style} 
            {...circleStyle.attr}
          >
          </circle>
          <polygon 
            style={polygonStyle.style} 
            {...polygonStyle.attr}
          />
        </svg>
      );
    }
  }

  render() {
    let rootStyle = this._getRootStyle();
    return (
      <div 
        style={rootStyle}
        ref="indicatorCt" 
        className="refresh-indicator"
      >
        {this._renderChildren()}
      </div>
    );
  }
};


RefreshIndicator.propTypes = {
  size: React.PropTypes.number,
  percentage: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool,
  transitionEnabled: React.PropTypes.bool
};

RefreshIndicator.defaultProps = {
  size: 60,
  loading: false,
  transitionEnabled: false
};

export default RefreshIndicator;
