import React, { type PropsWithChildren } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";


const Container = styled(motion.main)`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  top: 0;
  bottom: 0;
`;


export const Page: React.FC<PropsWithChildren> = ({children}) => {

  return (
    <Container
      initial={{left: "100%"}}
      animate={{left: 0}}
      exit={{left: "100%"}}
    >
      {children}
    </Container>
  )
}
