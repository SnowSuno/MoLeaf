import React from "react";
import styled from "@emotion/styled";

export const UsageText: React.FC = () => {
  return (
    <Container>
      <p>4월 18일</p>
      <div>2h 27m</div>
    </Container>
  );
};

const Container = styled.div`
  margin-inline: var(--margin-inline);

  & > p {
    font-size: 16px;
  }

  & > div {
    font-size: 32px;
    font-weight: 600;
  }
`;
