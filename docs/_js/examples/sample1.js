var SAMPLE1_COMPONENT = `
var Sample1 = React.createClass({
  render: function() {
    return (
      <div style={{
        position: "relative",  
        height: 100,
      }}>
        <RefreshIndicator percentage={30} size={40} left={10} top={5} status="ready" />
      </div>
    );
  }
});

React.render(<Sample1 />, mountNode);
`;

React.render(
  <ReactPlayground codeText={SAMPLE1_COMPONENT} />,
  document.getElementById('sample1')
);

// The big indicator in top of the page.
var percentage = 0;
function renderIndicator() {
  var status = percentage === 100 ? "loading" : "ready";
  percentage = Math.min(100, percentage + 2);
  React.render(
    <RefreshIndicator status={status} left={40} top={5} percentage={percentage} />,
    document.getElementById("indicator")
  );
  if (status !== "loading") {
    setTimeout(renderIndicator, 16);
  }
}
setTimeout(renderIndicator, 800);
