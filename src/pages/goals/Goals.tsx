import React from "react";
import { Header } from "~/components/layouts/Header";
import styled from "@emotion/styled";
import { TimeUsageGoal, PatternUsageGoal } from "~/components/goals";
import { AnimatedOutlet } from "~/components/layouts/AnimatedOutlet";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/elements/Text";

export const Goals: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AnimatedOutlet/>
      <Container>
        <Header title="Goals"/>
        <section>
          <Text>{t(`goal.active`)}</Text>
          <TimeUsageGoal
            type="totalTime"
            totalTime={{ hours: 4, minutes: 0 }}
          />
          <TimeUsageGoal type="maxTime" totalTime={{ hours: 3, minutes: 0 }}/>
          <PatternUsageGoal/>
        </section>
        <section>
          <Text>{t(`goal.undefined`)}</Text>
          <TimeUsageGoal type="avgTime"/>
          <TimeUsageGoal type="pickups"/>
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
    gap: 12px;

    & > h2 {
      font-size: 24px;
      font-weight: var(--medium-text);
    }
  }
`;
