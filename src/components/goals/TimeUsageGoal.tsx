import React from "react";
import styled from "@emotion/styled";
import { Goal } from "../elements/Goal";
import { UsageType } from "~/types";

interface Props {
  type: Exclude<UsageType, "downTime">;
  totalTime?: {
    hours: number;
    minutes: number;
  };
}

export const TimeUsageGoal: React.FC<Props> = ({
  type,
  totalTime,
  ...props
}) => (
  <Goal type={type} {...props}>
    <Time>
      {totalTime ? (
        <TotalTime>
          {totalTime.hours}h {totalTime.minutes}m
        </TotalTime>
      ) : (
        <NotSet>미설정</NotSet>
      )}
      <GoalTime>/ 1일</GoalTime>
    </Time>
  </Goal>
);

const Time = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
`;

const TotalTime = styled.div`
  color: var(--black);
  font-size: 32px;
  font-weight: bold;
  margin-right: 12px;
`;

const NotSet = styled.div`
  color: var(--gray);
  font-size: 24px;
  font-weight: bold;
  margin-right: 12px;
`;

const GoalTime = styled.div`
  color: var(--dark-text);
  font-size: 18px;
  font-weight: 500;
`;
