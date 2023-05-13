import React from "react";
import { Header } from "../components/Header";
import styled from "@emotion/styled";
import { Card } from "../components/Card";
import { ChevronRight, Edit } from "../assets/icons";
import { Checkbox } from "../components/Checkbox";

const UserInfo: React.FC = () => {
  return (
    <Card>
      <UserInfoContainer>
        <div id="header">
          유저 정보
          <Edit size={20} color="var(--dark-text)" />
        </div>
        <div id="nameWrapper">
          <div id="name">이도라</div>
          <>2015.06.10</>
        </div>
        <div id="phone">(+82) 010-0000-0000</div>
        <div id="email">doradora@gmail.com</div>
      </UserInfoContainer>
    </Card>
  );
};

const PrivacyConsent: React.FC = () => {
  return (
    <Card>
      <PrivacyConsentContainer>
        <div id="header">
          개인정보 수집 및 이용 안내
          <ChevronRight size={24} color="var(--black)" />
        </div>
        <div id="agree">
          <Checkbox checked={true} />
          개인정보 수집 및 이용에 동의합니다
        </div>
      </PrivacyConsentContainer>
    </Card>
  );
};

export const Settings: React.FC = () => {
  return (
    <>
      <Header title="Settings" />
      <UserInfo />
      <PrivacyConsent />
    </>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
  & > #header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  & > #nameWrapper {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 12px;
    font-size: 18px;
    & > #name {
      color: var(--black);
      font-size: 36px;
      font-weight: bold;
    }
  }
`;

const PrivacyConsentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
  & > #header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    font-size: 18px;
    color: var(--black);
  }
  & > #agree {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
`;
