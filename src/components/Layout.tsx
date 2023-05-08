import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header.tsx";
import { BottomNavigator } from "./BottomNavigator.tsx";

export const Layout: React.FC = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <BottomNavigator/>
    </>
  );
};
