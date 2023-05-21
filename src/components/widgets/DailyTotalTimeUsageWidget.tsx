import React from "react";
import styled from "@emotion/styled";
import { Widget } from "../Widget";

const totalTime = { hours: 2, minutes: 27 };
const goal = { hours: 4, minutes: 0 };


export const DailyTotalTimeUsageWidget: React.FC = () => {
  const childrenComponent = (
    <>
      <Container>
        <TotalTime>
          {totalTime.hours}h {totalTime.minutes}m
        </TotalTime>
        {goal ? (
          <GoalTime>
            / {goal.hours}h {goal.minutes}m
          </GoalTime>
        ) : (
          <></>
        )}
      </Container>
      (Horizontal Bar)
    </>
  );
  return <Widget title="전체 사용 시간" children={childrenComponent} />;
};

const Container = styled.div`
  display: flex;
  margin: 16px 0;
`;

const TotalTime = styled.div`
  color: var(--black);
  font-size: 36px;
  font-weight: bold;
  margin-right: 12px;
`;

const GoalTime = styled.div`
  color: var(--dark-text);
  font-size: 18px;
  font-weight: 500;
  align-self: flex-end;
  padding-bottom: 5px;
`;
