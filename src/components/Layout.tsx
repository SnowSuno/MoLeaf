import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navigator } from "./Navigator";

export const Layout: React.FC = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Navigator/>
    </>
  );
};
