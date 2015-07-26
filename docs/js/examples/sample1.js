"use strict";

var SAMPLE1_COMPONENT = "\nvar Sample1 = React.createClass({\n  render: function() {\n    return (\n      <div style={{\n        position: \"relative\",  \n        height: 100,\n      }}>\n        <RefreshIndicator percentage={30} size={40} left={10} top={5} status=\"ready\" />\n      </div>\n    );\n  }\n});\n\nReact.render(<Sample1 />, mountNode);\n";

React.render(React.createElement(ReactPlayground, { codeText: SAMPLE1_COMPONENT }), document.getElementById('sample1'));

// The big indicator in top of the page.
var percentage = 0;
function renderIndicator() {
  var status = percentage === 100 ? "loading" : "ready";
  percentage = Math.min(100, percentage + 2);
  React.render(React.createElement(RefreshIndicator, { status: status, left: 40, top: 5, percentage: percentage }), document.getElementById("indicator"));
  if (status !== "loading") {
    setTimeout(renderIndicator, 16);
  }
}
setTimeout(renderIndicator, 800);