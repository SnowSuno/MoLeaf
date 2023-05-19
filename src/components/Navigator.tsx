import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { Flag, Home, Settings } from "../assets/icons";

interface Props {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  to: string;
}

const NavItem: React.FC<Props> = ({ name, icon, to }) => (
  <NavLink
    id={name}
    to={to}
    style={({ isActive }) =>
      isActive ? { color: "var(--primary)" } : { color: "var(--dark-text)" }
    }
  >
    {icon({ size: 24 })}
  </NavLink>
);

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 12px 12px 0 0;
  background-color: var(--white);
  padding-bottom: env(safe-area-inset-bottom, 0);

  & > * {
    flex: 1;
    padding: 16px;
    text-align: center;
  }
`;

export const Navigator: React.FC = () => {
  return (
    <Container>
      <NavItem name="goals" icon={Flag} to="/goals" />
      <NavItem name="home" icon={Home} to="/" />
      <NavItem name="settings" icon={Settings} to="/settings" />
    </Container>
  );
};
