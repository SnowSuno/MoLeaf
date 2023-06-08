import React from "react";
import { Header } from "~/components/layouts/Header";
import styled from "@emotion/styled";
import {
  TimeUsageGoal,
  PatternUsageGoal,
  NumberUsageGoal,
} from "~/components/goals";
import { AnimatedOutlet } from "~/components/layouts/AnimatedOutlet";
import { useTranslation } from "react-i18next";
import { Text } from "~/components/elements/Text";
import { useGoalState } from "~/state/goals";

export const Goals: React.FC = () => {
  const { t } = useTranslation();
  const goal = useGoalState((state) => state.goals);
  return (
    <div>
      <AnimatedOutlet />
      <Container>
        <Header title="Goals" />
        <section>
          <Text>{t(`goal.active`)}</Text>
          <TimeUsageGoal type="totalTime" totalTime={goal?.totalTime} />
          <TimeUsageGoal type="maxTime" totalTime={goal?.maxTime} />
          <TimeUsageGoal type="avgTime" totalTime={goal?.avgTime} />
          <NumberUsageGoal data={goal?.pickups} />
          <PatternUsageGoal
            goal={goal?.downTime ? goal.downTime.map((val) => val) : undefined}
          />
        </section>
        <section>
          <Text>{t(`goal.undefined`)}</Text>
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
