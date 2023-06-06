import React from "react";
import styled from "@emotion/styled";
import { BarGauge } from "~/components/graphs";
import { Text } from "~/components/elements/Text";
import { UsageType } from "~/types";
import { toDisplayTime } from "~/utils/time";

interface Props {
  date: number;
  type: UsageType;
  value: number;
  limit?: number;
}

export const Usage: React.FC<Props> = ({ date, value, limit }) => {
  const hour = Math.trunc(value / 60);
  const minute = value % 60;

  return (
    <Container>
      <Text>전체 사용 시간 <span> · 5월 {date}일</span></Text>
      <Time>
        <h3>{toDisplayTime(value)}</h3>
        {limit && <p> /&nbsp;&nbsp;{toDisplayTime(limit)}</p>}
      </Time>
      {limit
        ? <BarGauge
          value={value}
          limit={limit}
        />
        : <div>No goal TODO</div>
      }
    </Container>
  );
};

const Container = styled.div`
  padding: 0 4px 8px;

  

  & > p > span {
    opacity: 0.3;
    font-weight: 400;
  }
`;

const Time = styled.div`
  display: flex;
  flex-direction: row;
  
  padding: 8px 0;
  
  align-items: flex-end;
  gap: 12px;
  
  & > h3 {
    font-size: 40px;
    font-weight: 600;
    
    & > span {
      font-size: 32px;
    }
  }
  
  & > p {
    font-size: 20px;
    font-weight: 500;
    color: var(--dark-text);

    padding-bottom: 6px;
  }
`;


