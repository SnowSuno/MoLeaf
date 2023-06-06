import React from "react";
import { Header } from "../../components/layouts/Header";
import styled from "@emotion/styled";
import { TimeUsageGoal, PatternUsageGoal } from "../../components/goals";
import { AnimatedOutlet } from "../../components/layouts/AnimatedOutlet";

export const Goals: React.FC = () => {
  return (
    <div>
      <AnimatedOutlet />
      <Container>
        <Header title="Goals" />
        <section>
          <h2>현재 설정된 목표</h2>
          <TimeUsageGoal
            type="totalTime"
            totalTime={{ hours: 4, minutes: 0 }}
          />
          <TimeUsageGoal type="maxTime" totalTime={{ hours: 3, minutes: 0 }} />
          <PatternUsageGoal />
        </section>
        <section>
          <h2>미설정 목표</h2>
          <TimeUsageGoal type="avgTime" />
          <TimeUsageGoal type="pickups" />
        </section>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;

  & > section {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > h2 {
      font-size: 24px;
      font-weight: var(--medium-text);
    }
  }
`;
