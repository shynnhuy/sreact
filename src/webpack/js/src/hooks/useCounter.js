import { useState } from "react";

export default (init = 0) => {
  const [counter, setCounter] = useState(init);
  const add = (number = 1) => setCounter(counter + number);
  const sub = (number = 1) => setCounter(counter - number);

  return { counter, add, sub };
};
