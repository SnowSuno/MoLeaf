import React, { useState } from "react";

import styled from "@emotion/styled";

import { Page } from "../../components/layouts/Page";
import { GoalInput } from "../../components/GoalInput";
import { Toggle } from "../../components/elements";

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
  removeData: (index: number) => void;
}

const DownTimeBox: React.FC<Props> = ({
  startTime,
  endTime,
  index,
  removeData,
}) => {
  return (
    <InnerContainer1>
      <InnerContainer2>
        <GoalInput max={11} initVal={startTime.hours % 12} />
        <GoalTime>:</GoalTime>
        <GoalInput max={59} initVal={startTime.minutes} />
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
        >
          <option selected={endTime.hours < 12}>AM</option>
          <option selected={endTime.hours >= 12}>PM</option>
        </select>

        <GoalTime>~</GoalTime>

        <GoalInput max={11} initVal={endTime.hours % 12} />
        <GoalTime>:</GoalTime>
        <GoalInput max={59} initVal={endTime.minutes} />
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
        >
          <option selected={endTime.hours < 12}>AM</option>
          <option selected={endTime.hours >= 12}>PM</option>
        </select>
      </InnerContainer2>

      <DeleteButton onClick={() => removeData(index)}>-</DeleteButton>
    </InnerContainer1>
  );
};

export const DownTime: React.FC = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [data, setData] = useState([
    {
      startTime: { hours: 3, minutes: 0 },
      endTime: { hours: 9, minutes: 0 },
    },
    {
      startTime: { hours: 20, minutes: 0 },
      endTime: { hours: 23, minutes: 0 },
    },
  ]);

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

  return (
    <Page title="전체 사용 시간">
      <PageContainer>
        <InnerContainer1>
          <Category>목표 설정 해제하기</Category>
          <Toggle toggled={toggled} setToggled={setToggled} />
        </InnerContainer1>

        {toggled ? (
          <></>
        ) : (
          <Container>
            <Category>목표 설정하기</Category>
            {data.map((x, index) => (
              <DownTimeBox
                startTime={x.startTime}
                endTime={x.endTime}
                index={index}
                removeData={removeData}
              />
            ))}
            <AddButton onClick={addData}>+</AddButton>
          </Container>
        )}

        {toggled ? (
          <></>
        ) : (
          <InformationBox>
            <Information>
              다른 사람들이 자주 설정하는 다운 타임 시간대는 3AM ~ 6AM입니다.
            </Information>
          </InformationBox>
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
