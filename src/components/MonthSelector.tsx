import React from "react";
import styled from "@emotion/styled";
import { ArrowLeft, ArrowRight } from "../assets/icons";

export const MonthSelector: React.FC = () => {
  return (
    <Container>
      <ArrowLeft size={23}/>
      <div>2023년 4월</div>
      <ArrowRight size={23}/>
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

  & > div {
    font-size: 18px;
    font-weight: 600;
  }


`;
