import React from 'react';

import './index.less';

class RefreshIndicator extends React.Component {
  render() {
    const rootStyle = this._getRootStyle();
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

  _renderChildren() {
    const paperSize = this._getPaperSize();
    let childrenCmp = null;
    if (this.props.status !== 'ready') {
      const circleStyle = this._getCircleStyle(paperSize);
      childrenCmp = (
        <div className={ this.props.status === "loading" ? "loading-div-anim" : null }
          ref="wrapper" 
          style={{
            transition: 'transform 20s linear',
            width: '100%',
            height: '100%',
          }}
        >
          <svg style={{
              width: paperSize,
              height: paperSize,
            }}
          >
            <circle className={ this.props.status === "loading" ? "circle-anim" : null }
              ref="path"
              style={circleStyle.style}
              {...circleStyle.attr}
            />
          </svg>
        </div>
      );
    } else {
      const circleStyle = this._getCircleStyle(paperSize);
      const polygonStyle = this._getPolygonStyle(paperSize);
      childrenCmp = (
        <svg style={{
            width: paperSize,
            height: paperSize,
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

    return childrenCmp;
  }

  _getPaddingSize() {
    const padding = this.props.size * 8 / 80;
    return padding;
  }

  _getPaperSize() {
    return this.props.size - this._getPaddingSize() * 2;
  }

  _getRadius(paperSize) {
    return paperSize / 2 - 5;
  }

  _getArcDeg() {
    const p = this.props.percentage / 100;

    const beginDeg = p * 120;
    const endDeg = p * 410;
    return [beginDeg, endDeg];
  }

  _getFactor() {
    const p = this.props.percentage / 100;
    const p1 = Math.min(1, p / 0.4);

    return p1;
  }

  _getRootStyle() {
    const padding = this._getPaddingSize();
    return {
      width: this.props.size,
      height: this.props.size,
      padding: padding,
      transform: `translate3d(${1000 + this.props.left}px, ${1000 + this.props.top}px, 0) scale(${this.props.size / 40})`,
      opacity: this.props.status === 'hide' ? 0 : 1,
      [this.prefixed('transition')]: this.props.status === 'hide' ? 'all .3s ease-out' : 'none',
    };
  }

  _getCircleStyle(paperSize) {
    const isLoading = this.props.status === 'loading';
    const p1 = isLoading ? 1 : this._getFactor();
    const radius = this._getRadius(paperSize);
    const stroke = Math.max(3, this.props.size * 4 / 80);
    const originX = paperSize / 2;
    const originY = paperSize / 2;
    const perimeter = Math.PI * 2 * radius;

    const [beginDeg, endDeg] = this._getArcDeg();
    const arcLen = (endDeg - beginDeg) * perimeter / 360;
    const dashOffset = -beginDeg * perimeter / 360;

    return {
      style: {
        strokeDasharray: arcLen + ', ' + (perimeter - arcLen),
        strokeDashoffset: dashOffset,
        stroke: (isLoading || this.props.percentage === 100) ? 'rgb(0, 188, 212)' : '#CCC',
        strokeLinecap: 'round',
        opacity: p1,
        strokeWidth: stroke * p1,
        fill: 'none',
      },
      attr: {
        cx: originX,
        cy: originY,
        r: radius,
      },
    };
  }

  _getPolygonStyle(paperSize) {
    const p1 = this._getFactor();
    const radius = this._getRadius(paperSize);

    const circleStroke = Math.max(3, this.props.size * 4 / 80);
    const originX = paperSize / 2;
    const originY = paperSize / 2;

    const triangleCx = originX + radius;
    const triangleCy = originY;
    const dx = (circleStroke * 7 / 4) * p1;
    const trianglePath = (triangleCx - dx) + ',' + triangleCy + ' ' + (triangleCx + dx) + ',' + triangleCy + ' ' + triangleCx + ',' + (triangleCy + dx);

    const [, endDeg] = this._getArcDeg();

    return {
      style: {
        fill: this.props.percentage === 100 ? 'rgb(0, 188, 212)' : '#CCC',
        [this.prefixed('transform')]: `rotate(${endDeg}deg)`,
        [this.prefixed('transformOrigin')]: `${originX}px ${originY}px`,
        opacity: p1,
      },
      attr: {
        points: trianglePath,
      },
    };
  }

  /**
   * 原值返回，因为很多库都依赖不同的autoprefixer的实现
   * 可以用mixin进行重写
   */
  prefixed(key) {
    return key;
  }

}


RefreshIndicator.propTypes = {
  size: React.PropTypes.number,
  percentage: React.PropTypes.number,
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  status: React.PropTypes.oneOf(['ready', 'loading', 'hide']).isRequired,
};

RefreshIndicator.defaultProps = {
  size: 60,
  percentage: 0,
};

export default RefreshIndicator;
