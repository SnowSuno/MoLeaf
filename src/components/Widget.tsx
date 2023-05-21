import React, { type PropsWithChildren } from "react";
import { Card } from "./Card";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {
  full?: boolean;
  title: string;
}

export const Widget: React.FC<Props> = ({ full, title, children }) => {
  return (
    <Card full={full}>
      <Title>{title}</Title>
      {children}
    </Card>
  );
};

const Title = styled.div`
  color: var(--dark-text);
  font-size: 16px;
  font-weight: var(--medium-text);
`;
