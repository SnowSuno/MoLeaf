import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  name: string;
  to: string;
}

const NavItem: React.FC<Props> = ({ name, to }) =>
  <NavLink
    to={to}
    style={({ isActive }) => isActive ? { color: "red" } : { color: "black" }}
  >
    {name}
  </NavLink>;

export const BottomNavigator: React.FC = () => {

  return (
    <>
      <nav>
        <NavItem name="home" to="/"/>
        <NavItem name="goal" to="/goal"/>
        <NavItem name="settings" to="/settings"/>
      </nav>
    </>
  );
};
