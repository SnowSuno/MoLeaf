import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Widget } from "../Widget";

interface Props extends PropsWithChildren {
  title: string;
  mainText: string;
  goalText?: string;
}

export const SmallWidget: React.FC<Props> = ({ title, mainText, goalText }) => {
  const children = (
    <>
      <Container>
        <MainText>{mainText}</MainText>
        {goalText ? (
          <GoalText>목표 {goalText}</GoalText>
        ) : (
          <GoalText style={{ color: "var(--light-text)" }}>
            목표 미설정
          </GoalText>
        )}
      </Container>
    </>
  );
  return <Widget full={false} title={title} children={children} />;
};

const Container = styled.div``;

const MainText = styled.div`
  color: var(--black);
  font-size: 24px;
  font-weight: bold;
  margin-top: 4px;
`;

const GoalText = styled.div`
  color: var(--dark-text);
  font-size: 14px;
  font-weight: var(--medium-text);
  margin-top: 4px;
`;
