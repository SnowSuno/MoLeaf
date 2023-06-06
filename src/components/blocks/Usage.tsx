import React from "react";
import styled from "@emotion/styled";
import { BarGauge } from "~/components/graphs";
import { Text } from "~/components/elements/Text";

interface Props {
  date: number;
  value: number;
  limit?: number;
}
export const Usage: React.FC<Props> = ({date, value, limit}) => {
  const hour = Math.trunc(value / 60);
  const minute = value % 60;

  return (
    <Container>
      <Text>5월 {date}일</Text>
      <div>{hour}h {minute}m</div>
      {limit
        ? <BarGauge
          value={value}
          limit={limit}
        />
        : <div>No goal</div>
      }
    </Container>
  );
};

const Container = styled.div`
  padding: 0 4px 8px;

  & > div {
    font-size: 32px;
    font-weight: 600;
  }
`;
