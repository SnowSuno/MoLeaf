import React from "react";

interface Props {
  max?: number;
  value: number;
  setValue: (val: number) => void;
}

export const GoalInput: React.FC<Props> = ({
  max = 999999,
  value,
  setValue,
}) => {
  const min = 0;

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
        backgroundColor: "var(--white)",
        borderRadius: "8px",
      }}
      value={("0" + value).slice(-2)}
      onChange={handleChange}
    />
  );
};
