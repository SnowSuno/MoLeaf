import React from "react";
import { Header } from "../components/layouts/Header";
import styled from "@emotion/styled";
import { Card, Checkbox } from "../components/elements";
import { ChevronRight, Edit } from "../assets/icons";
import { useTranslation } from "react-i18next";

const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card full>
      <UserInfoContainer>
        <div id="header">
          {t(`settings.userInfo`)}
          <Edit size={20} color="var(--dark-text)" />
        </div>
        <div id="nameWrapper">
          <div id="name">{t(`settings.name`)}</div>
          <>2015.06.10</>
        </div>
        <div id="phone">(+82) 010-0000-0000</div>
        <div id="email">doradora@gmail.com</div>
      </UserInfoContainer>
    </Card>
  );
};

const PrivacyConsent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card full>
      <PrivacyConsentContainer>
        <div id="header">
          {t(`settings.privacy.consent`)}
          <ChevronRight size={24} color="var(--black)" />
        </div>
        <div id="agree">
          <Checkbox checked={true} />
          {t(`settings.privacy.agree`)}
        </div>
      </PrivacyConsentContainer>
    </Card>
  );
};

export const Settings: React.FC = () => {
  return (
    <Container>
      <Header title="Settings" />
      <UserInfo />
      <PrivacyConsent />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
`;

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
