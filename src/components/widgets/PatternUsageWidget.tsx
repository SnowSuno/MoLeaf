import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { ChevronRight } from "../../assets/icons";

interface Props extends PropsWithChildren {
  title: string;
}

type Time = {
  hours: number;
  minutes: number;
};

const timeToString = (time: Time) => {
  const apm = time.hours >= 12 ? "PM" : "AM";
  return `${time.hours % 12}:${("0" + time.minutes).slice(-2)} ${apm}`;
};

export const PatternUsageWidget: React.FC<Props> = ({ title }) => {
  const data = [
    {
      startTime: { hours: 3, minutes: 0 },
      endTime: { hours: 9, minutes: 0 },
    },
    {
      startTime: { hours: 20, minutes: 0 },
      endTime: { hours: 23, minutes: 0 },
    },
  ];
  return (
    <Widget full title={title}>
      <Container>
        <InnerContainer>
          {!data ? (
            <NotSet>미설정</NotSet>
          ) : (
            data.map((range) => (
              <Time>
                <TotalTime>
                  {timeToString(range.startTime)} ~{" "}
                  {timeToString(range.endTime)}
                </TotalTime>
              </Time>
            ))
          )}
        </InnerContainer>
        <ChevronRight size={36} color="var(--dark-text)" />
      </Container>
    </Widget>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 8px 0;
  justify-content: space-between;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: baseline;
  margin: 16px 0;
  justify-content: space-between;
`;

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
