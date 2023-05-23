import React from "react";
import styled from "@emotion/styled";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({title}) => {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
};

const Container = styled.header`
  padding: 30px 0 10px;
  
  & > h1 {
    font-size: 36px;
  }
`;
