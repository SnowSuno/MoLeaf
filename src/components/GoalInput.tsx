import React, { useState } from "react";

interface Props {
  max: number;
  initVal?: number;
}

export const GoalInput: React.FC<Props> = ({ max, initVal = 0 }) => {
  const min = 0;

  const [value, setValue] = useState(initVal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  return (
    <input
      type="number"
      style={{
        position: "relative",
        width: "50px",
        fontSize: "20px",
        color: "var(--black)",
        textAlign: "center",
        justifyContent: "center",
        border: "none",
        padding: "4px 12px",
        backgroundColor: "var(--light-gray)",
        borderRadius: "8px",
      }}
      value={("0" + value).slice(-2)}
      onChange={handleChange}
    />
  );
};
