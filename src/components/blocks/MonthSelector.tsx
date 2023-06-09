import React from "react";
import styled from "@emotion/styled";
import { ArrowLeft, ArrowRight } from "~/assets/icons";
import { useTranslation } from "react-i18next";

interface Props {
  page: 0 | 1;
  setPage: (page: 0 | 1) => void;
}

export const MonthSelector: React.FC<Props> = ({ page, setPage }) => {
  const { t, i18n } = useTranslation();
  return (
    <Container>
      <button disabled={page === 0} onClick={() => setPage(0)}>
        <ArrowLeft size={23} />
      </button>
      <h2>
        {i18n.language == "ko" ? `2019년 5월 ${page ? 3 : 2}주` : `Week ${page ? 3 : 2}, May 2019`}
      </h2>
      <button disabled={page === 1} onClick={() => setPage(1)}>
        <ArrowRight size={23} />
      </button>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  z-index: 10;
  padding-inline: var(--margin-inline);
  gap: 10px;
  color: var(--dark-text);
  padding-bottom: 10px;

  & > h2 {
    font-size: 18px;
    font-weight: 500;
  }

  & > button {
    &:disabled {
      opacity: 0.3;
    }
  }
`;
