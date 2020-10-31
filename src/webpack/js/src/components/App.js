import React from "react";

const App = () => {
  const [counter, setCounter] = React.useState(0);

  const add = () => setCounter(counter + 1);
  const sub = () => setCounter(counter - 1);

  return (
    <div>
      <p>App Component</p>
      <button onClick={sub}>Sub -</button>
      <strong>{counter}</strong>
      <button onClick={add}>Add +</button>
    </div>
  );
};

export default App;
