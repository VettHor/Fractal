import * as React from "react";

const Counter = ({ onChange, value = 0 }) => (
  <span>
    <button onClick={() => onChange(value - 1)}>-</button>

    <span>{value}</span>

    <button onClick={() => onChange(value + 1)}>+</button>
  </span>
);

export default Counter;
