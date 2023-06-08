import React from "react";
import styled from "@emotion/styled";
import { Goal } from "../elements/Goal";

interface Props {
  goal?: [number, number][];
}

type Time = {
  hours: number;
  minutes: number;
};

const timeToString = (time: number) => {
  const hours = time; //(time - (time % 60)) / 60;
  const minutes = 0; //time % 60;
  const apm = hours >= 12 ? "PM" : "AM";
  return `${hours % 12}:${("0" + minutes).slice(-2)} ${apm}`;
};

export const PatternUsageGoal: React.FC<Props> = ({ goal, ...props }) => {
  console.log(goal);
  return (
    <Goal type="downTime" {...props}>
      {!goal ? (
        <NotSet>미설정</NotSet>
      ) : (
        goal.map((range) => (
          <Time>
            <TotalTime>
              {timeToString(range[0])} ~ {timeToString(range[1])}
            </TotalTime>
          </Time>
        ))
      )}
    </Goal>
  );
};

const Time = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
`;

const TotalTime = styled.div`
  color: var(--black);
  font-size: 28px;
  font-weight: bold;
  margin-right: 12px;
`;

const NotSet = styled.div`
  color: var(--gray);
  font-size: 24px;
  font-weight: bold;
  margin-right: 12px;
`;
