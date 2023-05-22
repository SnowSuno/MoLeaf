import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { BarGauge } from "../graphs";

interface Props extends PropsWithChildren {
  title: string;
  actual: number;
  goal?: number;
  selected?: boolean;
  onClick?: () => void;
}

export const SmallNumberWidget: React.FC<Props> = ({
  title,
  actual,
  goal,
  selected,
  onClick,
}) => {
  return (
    <Widget
      full={false}
      title={title}
      success={goal ? actual <= goal : undefined}
      selected={selected}
      onClick={onClick}
    >
      <Container>
        <MainText>{actual} 회</MainText>
        {goal ? (
          <GoalText>목표 {goal}회</GoalText>
        ) : (
          <GoalText style={{ color: "var(--gray)" }}>목표 미설정</GoalText>
        )}
        {goal ? (
          <BarGauge
            data={{ date: 0, value: actual }}
            limit={goal}
            showAxis={false}
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
