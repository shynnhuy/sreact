import React from "react";
import useCounter from "@hooks/useCounter";

const App = () => {
  const {counter, add, sub} = useCounter()

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
