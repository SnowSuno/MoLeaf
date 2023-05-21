import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { IconComponent } from "../assets/icons/utils";

interface Props extends PropsWithChildren {
  icon?: IconComponent;
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ icon: Icon, text, onClick }) => {
  return (
    <div onClick={onClick}>
      <Container>
        {Icon ? <Icon size={24} /> : <></>}
        {text}
      </Container>
    </div>
  );
};

const Container = styled.div`
  color: var(--dark-text);
  background-color: var(--light-gray);
  border-radius: 12px;
  padding: 16px 12px;
  display: inline-flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary);
    color: var(--white);
  }
`;
