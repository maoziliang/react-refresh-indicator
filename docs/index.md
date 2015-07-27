---
layout: page
title: Refresh indicator in material design
id: home
---

<a class="github-button" href="https://github.com/maoziliang/react-refresh-indicator" data-icon="octicon-star" data-style="mega" data-count-href="/maoziliang/react-refresh-indicator/stargazers" data-count-api="/repos/maoziliang/react-refresh-indicator#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star maoziliang/react-refresh-indicator on GitHub">Star</a>
<script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>

[![David](https://img.shields.io/david/maoziliang/react-refresh-indicator.svg)](https://david-dm.org/maoziliang/react-refresh-indicator)
[![David](https://img.shields.io/david/dev/maoziliang/react-refresh-indicator.svg)](https://david-dm.org/maoziliang/react-refresh-indicator#info=devDependencies)
[![Travis branch](https://img.shields.io/travis/maoziliang/react-refresh-indicator/master.svg)](https://travis-ci.org/maoziliang/react-refresh-indicator)

## Usage
This package is written in ES6. Maybe you should use this package with **webpack + babel + babel-runtime**.

Perhaps you should overwrite `prefixed` method of this component by mixin to implement the autoprefix feature. The default behaviour will not autoprefix for css3 property name.

``` bash
$ npm install react-refresh-indicator --save
```
``` javascript
RefreshIndicator.propsType = {
  // size in pixel
  size: React.PropTypes.number,
  // percentage is 100 always means the user comfirm to reload.
  percentage: React.PropTypes.number,
  // RefreshIndicator position is absolute. Please give a correct positioned container.
  left: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  // status is an enum. It can be "ready" "loading" or "hide"
  // ready: This phase give user a change to confirm to fetch data. Display upon the percentage prop.
  // loading: This means data fetch has began. Display a spinning animated arc.
  // hide: Finished and hide to specified left and top with animation.
  status: React.PropTypes.oneOf(["ready", "loading", "hide"]).isRequired,
};

RefreshIndicator.defaultProps = {
  size: 60,
  percentage: 0,
};

```

## Examples
<section class="home-section">
  <div id="examples">
    <div class="example">
      <h3>A static state indicator</h3>
      <p>
        Render <strong>RefreshIndicator</strong> directly. You can modify the props of the component to see the change.
      </p>
      <p>
        <strong>JSX is optional and not required to use React.</strong> Try
        clicking on "Compiled JS" to see the raw JavaScript code produced by
        the JSX compiler.
      </p>
      <div id="sample1"></div>
    </div>
    <div class="example">
      <h3>A complete and complex example</h3>
      <p>
        You can press down your mouse within the right side box. Then move down. And then release. That's all.
      </p>
      <div id="sample2"></div>
    </div>
  </div>
  <script src="/react-refresh-indicator/js/examples/sample1.js"></script>
  <script src="/react-refresh-indicator/js/examples/sample2.js"></script>
</section>
