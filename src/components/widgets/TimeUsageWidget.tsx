import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../elements";
import { ChevronRight } from "../../assets/icons";

//const totalTime = { hours: 2, minutes: 27 };
//const goal = { hours: 4, minutes: 0 };

interface Props extends PropsWithChildren {
  title: string;
  totalTime?: {
    hours: number;
    minutes: number;
  };
}

export const TimeUsageWidget: React.FC<Props> = ({ title, totalTime }) => {
  const childrenComponent = (
    <>
      <Container>
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
        <ChevronRight size={36} color="var(--dark-text)" />
      </Container>
    </>
  );
  return <Widget full title={title} children={childrenComponent} />;
};

const Container = styled.div`
  display: flex;
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
