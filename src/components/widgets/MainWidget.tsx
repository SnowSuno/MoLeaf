import React from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { BarGauge } from "../graphs";
import { IconComponent } from "../../assets/icons/utils";

const totalTime = { hours: 2, minutes: 27 };
const goal = { hours: 4, minutes: 0 };

interface Props {
  text: string;
  icon?: IconComponent;
  selected?: boolean;
}

export const MainWidget: React.FC<Props> = ({ text, icon: Icon, selected }) => {
  return (
    <Widget title={text} selected={selected}>
      {Icon ? (
        <div style={{ float: "right", marginTop: "-24px", cursor: "pointer" }}>
          <Icon size={24} color="var(--dark-text)" />
        </div>
      ) : (
        <></>
      )}
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
      <BarGauge data={{ date: 0, value: 1.2 }} />
    </Widget>
  );
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
