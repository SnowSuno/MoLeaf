import React from "react";
import styled from "@emotion/styled";

export const MonthSelector: React.FC = () => {
  return (
    <Container>
      <div>2023년 4월</div>
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
  
  & > div {
    font-size: 18px;
    font-weight: 600;
  }
`;
