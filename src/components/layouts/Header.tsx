import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { Globe } from "~/assets/icons";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    console.log(i18n.language);
    i18n.changeLanguage(i18n.language == "ko" ? "en" : "ko");
  };
  return (
    <Container>
      <h1>{title}</h1>
      <Globe size={24} weight={2} color="var(--gray)" onClick={changeLanguage} />
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 10px;

  & > h1 {
    font-size: 36px;
  }
`;
