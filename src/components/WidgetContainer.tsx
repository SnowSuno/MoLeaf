import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface Props extends PropsWithChildren {}

export const WidgetContainer: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  space-between: 16px
  overflow-x: scroll;
`;
