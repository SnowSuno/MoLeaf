import React, { type PropsWithChildren } from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
  full?: boolean;
  title: string;
  success?: boolean;
}

export const Widget: React.FC<Props> = ({ full, title, success, children }) => {
  return (
    <Card full={full}>
      <Header>
        <Title>{title}</Title>
        {success == false ? <FailTag>실패</FailTag> : <></>}
      </Header>
      {children}
    </Card>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const Title = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
`;

const FailTag = styled.div`
  color: #ee5858;
  background-color: #ffcfcf;
  font-size: 12px;
  font-weight: var(--medium-text);
  padding: 4px 8px;
  border-radius: 4px;
`;
