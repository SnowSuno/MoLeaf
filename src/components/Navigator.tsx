import React, { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { Home } from "../assets/icons/Home";
import { Settings } from "../assets/icons/Settings";
import { Timer } from "../assets/icons/Timer";
import { css } from "@emotion/css";

interface Props {
  icon: ReactNode;
  to: string;
}


export const Navigator: React.FC = () => (
  <Container>
    <NavItem to="/" icon={<Home/>}/>
    <NavItem to="/goals" icon={<Timer/>}/>
    <NavItem to="/settings" icon={<Settings/>}/>
  </Container>
);


const NavItem: React.FC<Props> = ({ icon, to }) =>
  <NavLink
    to={to}
    className={({ isActive }) => css`
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: var(--black);
      opacity: ${isActive ? 1 : 0.3};
    `}
  >
    {icon}
  </NavLink>;

const Container = styled.nav`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
`;
