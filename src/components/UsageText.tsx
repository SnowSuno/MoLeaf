import React from "react";
import styled from "@emotion/styled";

interface Props {
  date: number;
  value: number;
}
export const UsageText: React.FC<Props> = ({date, value}) => {
  const hour = Math.trunc(value);
  const minute = Math.trunc((value - hour) * 60);

  return (
    <Container>
      <p>5월 {date}일</p>
      <div>{hour}h {minute}m</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 4px 8px;
  
  & > p {
    font-size: 16px;
  }

  & > div {
    font-size: 32px;
    font-weight: 600;
  }
`;
