import React from "react";
import { Outlet } from "react-router-dom";
import { Navigator } from "./Navigator";
import styled from "@emotion/styled";

export const Layout: React.FC = () => {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
      <Navigator />
    </>
  );
};

const Main = styled.main`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-inline: var(--margin-inline);
  padding-bottom: calc(120px + env(safe-area-inset-bottom, 0));

  & > div {
    height: max-content;
  }


  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
