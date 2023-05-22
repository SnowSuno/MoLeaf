import React from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { BarGauge } from "../graphs";
import { IconComponent } from "../../assets/icons/utils";

interface Props {
  type: string;
  icon?: IconComponent;
  selected?: boolean;
  onClick?: () => void;
}

export const MainWidget: React.FC<Props> = ({ type, icon: Icon, selected, ...props }) => {
  const text = {
    totalTime: "전체 사용 시간",
    maxTime: "최대 사용 시간",
    averageTime: "평균 사용 시간",
    // downtime: "다운 타임",
    // numUnlocks: "잠금 해제 횟수",
  }[type] as string;

  const time = {
    totalTime: { hours: 2, minutes: 27 },
    maxTime: { hours: 3, minutes: 12 },
    averageTime: { hours: 0, minutes: 12 },
  }[type];
  const goal = {
    totalTime: { hours: 4, minutes: 0 },
    maxTime: { hours: 3, minutes: 0 },
  }[type];

  return (
    <Widget full title={text} selected={selected} {...props}>
      {Icon ? (
        <div style={{ float: "right", marginTop: "-24px", cursor: "pointer" }}>
          <Icon size={24} color="var(--dark-text)" />
        </div>
      ) : (
        <></>
      )}
      <Container>
        {time ? (
          <TotalTime>
            {time.hours}h {("0" + time.minutes).slice(-2)}m
          </TotalTime>
        ) : (
          <></>
        )}
        {goal ? (
          <GoalTime>
            / {goal.hours}h {("0" + goal.minutes).slice(-2)}m
          </GoalTime>
        ) : (
          <></>
        )}
      </Container>
      {time && goal ? (
        <BarGauge
          data={{ date: 0, value: time.hours + time.minutes / 60 }}
          limit={goal.hours + goal.minutes / 60}
        />
      ) : (
        <></>
      )}
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
