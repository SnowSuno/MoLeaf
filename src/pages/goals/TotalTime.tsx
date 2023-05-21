import React, { useState } from "react";
import styled from "@emotion/styled";

import { Page } from "../../components/Page";

import { Toggle } from "../../components/elements/Toggle";
import { GoalInput } from "../../components/GoalInput";

export const TotalTime: React.FC = () => {
  const [toggled, setToggled] = useState<boolean>(false);

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
            <InnerContainer2>
              <GoalInput max={24} initVal={4} />
              <GoalTime1>h</GoalTime1>
              <GoalInput max={59} initVal={0} />
              <GoalTime1>m</GoalTime1>
              <GoalTime2>/ 일</GoalTime2>
            </InnerContainer2>
          </Container>
        )}

        {toggled ? (
          <></>
        ) : (
          <InformationBox>
            <Information>
              다른 사람들은 평균적으로 하루에 6h 32m 사용합니다.
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
