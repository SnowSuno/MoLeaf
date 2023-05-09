import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

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

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  
  //padding-bottom: 20px;
`;

export const Navigator: React.FC = () => {

  return (
    <Container>
      <NavItem name="home" to="/"/>
      <NavItem name="goals" to="/goals"/>
      <NavItem name="settings" to="/settings"/>
    </Container>
  );
};
