import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface Props {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggle: React.FC<Props> = ({ toggled = false, setToggled }) => {
  return (
    <>
      <Container
        data-toggled={toggled}
        onClick={() => setToggled(t => !t)}
      >
        <motion.div layout transition={spring}/>
      </Container>
    </>
  );
};

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 50
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--light-gray);
  width: 56px;
  border-radius: 999px;
  padding: 4px;
  
  &[data-toggled="true"] {
    justify-content: flex-end;
    background-color: var(--primary);
  }
  
  & > div {
    background-color: var(--white);
    border-radius: 50%;
    width: 22px;
    height: 22px;
  }
`;
