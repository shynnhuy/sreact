import React from "react";
import { render } from "react-dom";
import App from "components/App";

const Root = () => {
  return (
    <div>
      <h1>Root Component</h1>
      <App />
    </div>
  );
};

render(<Root />, document.getElementById("root"));
