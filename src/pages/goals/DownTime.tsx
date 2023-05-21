import React, { useState } from "react";

import styled from "@emotion/styled";

import { Page } from "../../components/Page";
import { GoalInput } from "../../components/GoalInput";
import { ToggleSwitch } from "../../components/ToggleSwitch";

const DownTimeBox: React.FC = () => {
  return (
    <InnerContainer1>
      <InnerContainer2>
        <GoalInput max={11}/>
        <GoalTime>:</GoalTime>
        <GoalInput max={59}/>
        <select>
          <option>AM</option>
          <option>PM</option>
        </select>

        <GoalTime>~</GoalTime>

        <GoalInput max={11}/>
        <GoalTime>:</GoalTime>
        <GoalInput max={59}/>
        <select>
          <option>AM</option>
          <option>PM</option>
        </select>
      </InnerContainer2>

      <DeleteButton/>
    </InnerContainer1>
  );
};

export const DownTime: React.FC = () => {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <Page title="전체 사용 시간">
      <PageContainer>
        <InnerContainer1>
          <Category>목표 설정 해제하기</Category>
          <ToggleSwitch toggled={toggled} setToggled={setToggled}/>
        </InnerContainer1>

        {toggled ?
          <></> :
          <Container>
            <Category>목표 설정하기</Category>
            <DownTimeBox/>
            <DownTimeBox/>
            <AddButton>+</AddButton>
          </Container>}

        {toggled ?
          <></> :
          <InformationBox>
            <Information>다른 사람들이 자주 설정하는 다운 타임 시간대는 3AM ~ 6AM입니다.</Information>
          </InformationBox>}
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
`;

const InnerContainer2 = styled.div`
  display: flex;
  gap: 4px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Category = styled.div`
  color: var(--black);
  font-size: 16px;
  font-weight: 500;
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
