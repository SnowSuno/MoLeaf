import React from "react";
import styled from "@emotion/styled";
import { ChevronDown } from "../../assets/icons";

interface Props {
  checked?: boolean;
}

export const Checkbox: React.FC<Props> = ({ checked = false }) => {
  return (
    <Container
      style={
        checked
          ? { backgroundColor: "var(--primary)" }
          : { backgroundColor: "var(--light-gray)" }
      }
    >
      {checked ? <ChevronDown size={16} color="var(--white)" /> : <></>}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  background-color: var(--white);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
