import React, { useState } from "react";
import styled from "@emotion/styled";

import { Page } from "../../components/layouts/Page";

import { Button, Toggle } from "../../components/elements";
import { GoalInput } from "../../components/GoalInput";
import { useTranslation } from "react-i18next";
import { UsageType } from "~/types";
import { useGoalState } from "~/state/goals";

interface Props {
  type: UsageType;
  goal?: number;
  active?: boolean;
}

export const TotalTime: React.FC<Props> = ({ type, active = true }) => {
  const [toggled, setToggled] = useState<boolean>(active);
  const { t } = useTranslation();
  const initGoal = useGoalState((state) => state.goals)[type] as number;
  const [goal, setGoal] = useState<{ hours: number; minutes: number }>(
    initGoal
      ? {
          hours: (initGoal - (initGoal % 60)) / 60,
          minutes: initGoal % 60,
        }
      : {
          hours: 0,
          minutes: 0,
        }
  );
  const setGoals = useGoalState((state) => state.setGoal);

  return (
    <Page title={t(`usage.${type}.long`)} background>
      <PageContainer>
        <InnerContainer1>
          <Category> {t(`goal.setGoal`)}</Category>
          <Toggle toggled={toggled} setToggled={setToggled} />
        </InnerContainer1>

        {!toggled ? (
          <></>
        ) : (
          <Container>
            <InnerContainer2>
              <GoalInput
                max={23}
                value={goal?.hours}
                setValue={(val: number) =>
                  setGoal({ hours: val, minutes: goal.minutes })
                }
              />
              <GoalTime1>h</GoalTime1>
              <GoalInput
                max={59}
                value={goal?.minutes}
                setValue={(val: number) =>
                  setGoal({ hours: goal.hours, minutes: val })
                }
              />
              <GoalTime1>m</GoalTime1>
              <GoalTime2>/ {t(`common.units.day`)}</GoalTime2>
            </InnerContainer2>
          </Container>
        )}

        {!toggled ? (
          <></>
        ) : (
          <InformationBox>
            <Information>{t(`goal.helper.${type}`)}</Information>
          </InformationBox>
        )}

        {!toggled ? (
          <></>
        ) : (
          <Button
            text={t(`common.saveButton`)}
            full={true}
            onClick={() => setGoals(type, goal.hours * 60 + goal.minutes)}
          />
        )}
      </PageContainer>
    </Page>
  );
};

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0;
  gap: 24px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InnerContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InnerContainer2 = styled.div`
  display: flex;
  gap: 8px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;

const Category = styled.div`
  color: var(--black);
  font-size: 16px;
`;

const GoalTime1 = styled.div`
  color: var(--black);
  font-size: 20px;
  font-weight: 500;
`;

const GoalTime2 = styled.div`
  color: var(--dark-text);
  font-size: 20px;
  font-weight: 500;
`;

const InformationBox = styled.div`
  border: solid 1px var(--gray);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const Information = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: 500;
`;
