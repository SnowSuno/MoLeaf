import React, { useState } from "react";

import styled from "@emotion/styled";

import { Page } from "~/components/layouts/Page";
import { GoalInput } from "~/components/GoalInput";
import { Button, Toggle } from "~/components/elements";
import { useTranslation } from "react-i18next";
import { useGoalState } from "~/state/goals";

interface Props {
  startTime: {
    hours: number;
    minutes: number;
  };
  endTime: {
    hours: number;
    minutes: number;
  };
  index: number;
  setGoal: (
    index: number,
    val: {
      startTime: {
        hours: number;
        minutes: number;
      };
      endTime: {
        hours: number;
        minutes: number;
      };
    }
  ) => void;
  removeData: (index: number) => void;
}

const DownTimeBox: React.FC<Props> = ({
  startTime,
  endTime,
  index,
  setGoal,
  removeData,
}) => {
  return (
    <InnerContainer1>
      <InnerContainer2>
        <GoalInput
          max={11}
          value={startTime.hours % 12}
          setValue={(val: number) =>
            setGoal(index, {
              startTime: { hours: val, minutes: startTime.minutes },
              endTime: endTime,
            })
          }
        />
        <GoalTime>:</GoalTime>
        <GoalInput
          max={59}
          value={startTime.minutes}
          setValue={(val: number) =>
            setGoal(index, {
              startTime: { hours: startTime.hours, minutes: val },
              endTime: endTime,
            })
          }
        />
        <select
          style={{
            position: "relative",
            width: "72px",
            fontSize: "20px",
            color: "var(--black)",
            textAlign: "center",
            justifyContent: "center",
            border: "none",
            padding: "4px 12px",
            backgroundColor: "var(--light-gray)",
            borderRadius: "8px",
          }}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const type = event.target.value;
            setGoal(index, {
              startTime: {
                hours: (startTime.hours % 12) + (type == "AM" ? 0 : 12),
                minutes: startTime.minutes,
              },
              endTime: endTime,
            });
          }}
        >
          <option selected={endTime.hours < 12}>AM</option>
          <option selected={endTime.hours >= 12}>PM</option>
        </select>

        <GoalTime>~</GoalTime>

        <GoalInput
          max={11}
          value={endTime.hours % 12}
          setValue={(val: number) =>
            setGoal(index, {
              startTime: startTime,
              endTime: { hours: val, minutes: endTime.minutes },
            })
          }
        />
        <GoalTime>:</GoalTime>
        <GoalInput
          max={59}
          value={endTime.minutes}
          setValue={(val: number) =>
            setGoal(index, {
              startTime: startTime,
              endTime: { hours: endTime.hours, minutes: val },
            })
          }
        />
        <select
          style={{
            position: "relative",
            width: "72px",
            fontSize: "20px",
            color: "var(--black)",
            textAlign: "center",
            justifyContent: "center",
            border: "none",
            padding: "4px 12px",
            backgroundColor: "var(--light-gray)",
            borderRadius: "8px",
          }}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const type = event.target.value;
            setGoal(index, {
              startTime: startTime,
              endTime: {
                hours: (endTime.hours % 12) + (type == "AM" ? 0 : 12),
                minutes: endTime.minutes,
              },
            });
          }}
        >
          <option selected={endTime.hours < 12}>AM</option>
          <option selected={endTime.hours >= 12}>PM</option>
        </select>
      </InnerContainer2>

      <DeleteButton onClick={() => removeData(index)}>-</DeleteButton>
    </InnerContainer1>
  );
};

export const DownTime: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [toggled, setToggled] = useState<boolean>(active);
  // const [data, setData] = useState([
  //   {
  //     startTime: { hours: 3, minutes: 0 },
  //     endTime: { hours: 9, minutes: 0 },
  //   },
  //   {
  //     startTime: { hours: 20, minutes: 0 },
  //     endTime: { hours: 23, minutes: 0 },
  //   },
  // ]);
  const initGoal = useGoalState((state) => state.goals).downTime;
  // console.log(
  //   initGoal?.map((val) => ({
  //     startTime: { hours: val[0], minutes: 0 },
  //     endTime: { hours: val[1], minutes: 0 },
  //   }))
  // );
  const [data, setData] = useState<
    {
      startTime: { hours: number; minutes: number };
      endTime: { hours: number; minutes: number };
    }[]
  >(
    initGoal
      ? initGoal.map((val) => ({
          startTime: { hours: val[0], minutes: 0 },
          endTime: { hours: val[1], minutes: 0 },
        }))
      : []
  );

  const setGoal = (
    index: number,
    val: {
      startTime: { hours: number; minutes: number };
      endTime: { hours: number; minutes: number };
    }
  ) => {
    const newGoal = [...data];
    newGoal[index] = val;
    setData(newGoal);
  };

  const addData = () => {
    const newRange = {
      startTime: { hours: 0, minutes: 0 },
      endTime: { hours: 0, minutes: 0 },
    };
    setData(data.concat(newRange));
  };

  const removeData = (index: number) => {
    data.splice(index, 1);
    setData(data);
  };

  const setGoals = useGoalState((state) => state.setGoal);

  const { t } = useTranslation();

  return (
    <Page title={t(`usage.downTime.long`)} background>
      <PageContainer>
        <InnerContainer1>
          <Category>{t(`goal.setGoal`)}</Category>
          <Toggle toggled={toggled} setToggled={setToggled} />
        </InnerContainer1>
        {!toggled ? (
          <></>
        ) : (
          <Container>
            {data.map((x, index) => (
              <DownTimeBox
                startTime={x.startTime}
                endTime={x.endTime}
                index={index}
                setGoal={setGoal}
                removeData={removeData}
              />
            ))}
            <AddButton onClick={addData}>+</AddButton>
          </Container>
        )}
        {!toggled ? (
          <></>
        ) : (
          <InformationBox>
            <Information>{t(`goal.helper.downTime`)}</Information>
          </InformationBox>
        )}
        {!toggled ? (
          <></>
        ) : (
          <Button
            text={t(`common.saveButton`)}
            full={true}
            onClick={() =>
              setGoals(
                "downTime",
                data.map((v) => [v.startTime.hours, v.endTime.hours])
              )
            }
          />
        )}{" "}
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
  gap: 12px;
`;

const InnerContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const InnerContainer2 = styled.div`
  display: flex;
  gap: 4px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const Category = styled.div`
  color: var(--black);
  font-size: 16px;
`;

const GoalTime = styled.div`
  color: var(--black);
  font-size: 20px;
  font-weight: 500;
`;

const DeleteButton = styled.div`
  background-color: var(--gray);
  width: 24px;
  height: 24px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 20px;
  font-weight: 300;
`;

const AddButton = styled.div`
  background-color: var(--gray);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  font-size: 20px;
  font-weight: 300;
`;

const InformationBox = styled.div`
  border: solid 1px var(--gray);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Information = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: 500;
`;
