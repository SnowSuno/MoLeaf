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
  padding: 20px 20px 0;
`;
