import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { BarGauge } from "../graphs";

type Time = {
  hours: number;
  minutes: number;
};

interface Props extends PropsWithChildren {
  title: string;
  actual: Time;
  goal?: Time;
  selected?: boolean;
  onClick?: () => void;
}

const goalSuccess = (actual: Time, goal: Time) => {
  const MINUTES_PER_HOUR = 60;
  const actualTotalMinutes = actual.hours * MINUTES_PER_HOUR + actual.minutes;
  const goalTotalMinutes = goal.hours * MINUTES_PER_HOUR + goal.minutes;
  return actualTotalMinutes <= goalTotalMinutes;
};

export const SmallTimeWidget: React.FC<Props> = ({
  title,
  actual,
  goal,
  selected,
  onClick,
}) => {
  return (
    <Widget
      title={title}
      success={goal ? goalSuccess(actual, goal) : undefined}
      selected={selected}
      onClick={onClick}
    >
      <Container>
        <MainText>
          {actual.hours && actual.hours !== 0 ? `${actual.hours}h` : ""}{" "}
          {actual.minutes && actual.minutes !== 0 ? `${actual.minutes}m` : ""}
        </MainText>
        {goal ? (
          <GoalText>
            목표 {goal.hours && goal.hours !== 0 ? `${goal.hours}h` : ""}{" "}
            {goal.minutes && goal.minutes !== 0 ? `${goal.minutes}m` : ""}
          </GoalText>
        ) : (
          <GoalText style={{ color: "var(--gray)" }}>목표 미설정</GoalText>
        )}
        {goal ? (
          <BarGauge
            widget
            value={ actual.hours + actual.minutes / 60}
            limit={goal.hours + goal.minutes / 60}
          />
        ) : (
          <></>
        )}
      </Container>
    </Widget>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainText = styled.div`
  color: var(--black);
  font-size: 24px;
  font-weight: bold;
`;

const GoalText = styled.div`
  color: var(--dark-text);
  font-size: 14px;
  font-weight: var(--medium-text);
`;
