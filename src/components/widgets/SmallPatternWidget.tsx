import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../Widget";
import { BarGauge } from "../BarGauge";

type Time = {
  hours: number;
  minutes: number;
};

interface Props extends PropsWithChildren {
  title: string;
  on: boolean;
  range?: {
    startTime: Time;
    endTime: Time;
  };
  success: boolean;
  selected?: boolean;
}

export const SmallPatternWidget: React.FC<Props> = ({
  title,
  on,
  range,
  success,
  selected,
}) => {
  const timeToString = (time: Time) => {
    const apm = time.hours >= 12 ? "PM" : "AM";
    return `${time.hours % 12}:${("0" + time.minutes).slice(-2)} ${apm}`;
  };
  return (
    <Widget full={false} title={title} success={success} selected={selected}>
      <Container>
        <MainText>{on ? "켜짐" : "꺼짐"}</MainText>
        {range ? (
          <GoalText>
            {!on ? (
              <>
                "다음 다운 타임:"
                <br />
              </>
            ) : (
              ""
            )}

            {range ? (
              <>
                {timeToString(range.startTime)} ~ {timeToString(range.endTime)}
              </>
            ) : (
              ""
            )}
          </GoalText>
        ) : (
          <GoalText style={{ color: "var(--gray)" }}>목표 미설정</GoalText>
        )}
        {/* {goal ? <BarGauge data={{ date: 0, value: 0 }} /> : <></>} */}
      </Container>
    </Widget>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
