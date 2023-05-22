import React from "react";
import { Outlet } from "react-router-dom";
import { Navigator } from "./Navigator";
import styled from "@emotion/styled";

export const Layout: React.FC = () => {
  return (
    <>
      {/*<Header/>*/}
      <Main>
        <Outlet />
      </Main>
      <Navigator />
    </>
  );
};

const Main = styled.main`
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-inline: var(--margin-inline);
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0));
  & > div {
    height: max-content;
  }
`;
