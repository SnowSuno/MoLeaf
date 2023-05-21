import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { IconComponent } from "../../assets/icons/utils";

interface Props extends PropsWithChildren {
  icon?: IconComponent;
  text: string;
}

export const Button: React.FC<Props> = ({ icon: Icon, text }) => {
  return (
    <Container>
      {Icon ? <Icon size={24} /> : <></>}
      {text}
    </Container>
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
  margin: 0 auto;
  font-size: 18px;

  &:hover {
    background-color: var(--primary);
    color: var(--white);
  }
`;
