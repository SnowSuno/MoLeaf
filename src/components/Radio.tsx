import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { IconComponent } from "../assets/icons/utils";

interface Props extends PropsWithChildren {
  text: string;
  selected: boolean;
  onClick?: () => void;
}

export const Radio: React.FC<Props> = ({ text, selected, onClick }) => {
  return (
    <Container>
      <RadioContainer
        onClick={onClick}
        style={
          selected
            ? { display: "inline-block", backgroundColor: "var(--primary)" }
            : {}
        }
      ></RadioContainer>
      {text}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 16px;
  cursor: pointer;
  margin: 8px 0;
`;

const RadioContainer = styled.div`
  color: var(--dark-text);
  background-color: var(--gray);
  border: solid 3px var(--light-gray);
  border-radius: 50%;
  width: 20px;
  height: 20px;

  &:hover {
    background-color: var(--primary);
  }
`;
