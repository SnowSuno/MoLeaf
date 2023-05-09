import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {

}

export const Card: React.FC<Props> = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;
