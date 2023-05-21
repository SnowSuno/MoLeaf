import React, { useState } from "react";
import styled from "@emotion/styled";

interface Props {
  max: number;
}

export const GoalInput: React.FC<Props> = ({ max }) => {
  const min = 0;

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  return (
    <Input>
      <input
        type='number'
        style={{ width: '50px' }}
        value={value}
        onChange={handleChange} />
    </Input>
  );
}

const Input = styled.div`
  color: var(--black);
  font-size: 20px;
  width: 50px;
`;